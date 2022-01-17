function() {
    //Util.Debug(">> init_msg [rfb_state '" + rfb_state + "']");

    var strlen, reason, length, sversion, cversion, repeaterID,
        i, types, num_types, challenge, response, bpp, depth,
        big_endian, red_max, green_max, blue_max, red_shift,
        green_shift, blue_shift, true_color, name_length, is_repeater;

    //Util.Debug("ws.rQ (" + ws.rQlen() + ") " + ws.rQslice(0));
    switch (rfb_state) {

    case 'ProtocolVersion' :
        if (ws.rQlen() < 12) {
            return fail("Incomplete protocol version");
        }
        sversion = ws.rQshiftStr(12).substr(4,7);
        Util.Info("Server ProtocolVersion: " + sversion);
        is_repeater = 0;
        switch (sversion) {
            case "000.000": is_repeater = 1; break; // UltraVNC repeater
            case "003.003": rfb_version = 3.3; break;
            case "003.006": rfb_version = 3.3; break;  // UltraVNC
            case "003.889": rfb_version = 3.3; break;  // Apple Remote Desktop
            case "003.007": rfb_version = 3.7; break;
            case "003.008": rfb_version = 3.8; break;
            case "004.000": rfb_version = 3.8; break;  // Intel AMT KVM
            case "004.001": rfb_version = 3.8; break;  // RealVNC 4.6
            default:
                return fail("Invalid server version " + sversion);
        }
        if (is_repeater) { 
            repeaterID = conf.repeaterID;
            while (repeaterID.length < 250) {
                repeaterID += "\0";
            }
            ws.send_string(repeaterID);
            break;
        }
        if (rfb_version > rfb_max_version) { 
            rfb_version = rfb_max_version;
        }

        if (! test_mode) {
            sendTimer = setInterval(function() {
                    // Send updates either at a rate of one update
                    // every 50ms, or whatever slower rate the network
                    // can handle.
                    ws.flush();
                }, 50);
        }

        cversion = "00" + parseInt(rfb_version,10) +
                   ".00" + ((rfb_version * 10) % 10);
        ws.send_string("RFB " + cversion + "\n");
        updateState('Security', "Sent ProtocolVersion: " + cversion);
        break;

    case 'Security' :
        if (rfb_version >= 3.7) {
            // Server sends supported list, client decides 
            num_types = ws.rQshift8();
            if (ws.rQwait("security type", num_types, 1)) { return false; }
            if (num_types === 0) {
                strlen = ws.rQshift32();
                reason = ws.rQshiftStr(strlen);
                return fail("Security failure: " + reason);
            }
            rfb_auth_scheme = 0;
            types = ws.rQshiftBytes(num_types);
            Util.Debug("Server security types: " + types);
            for (i=0; i < types.length; i+=1) {
                if ((types[i] > rfb_auth_scheme) && (types[i] < 3)) {
                    rfb_auth_scheme = types[i];
                }
            }
            if (rfb_auth_scheme === 0) {
                return fail("Unsupported security types: " + types);
            }
            
            ws.send([rfb_auth_scheme]);
        } else {
            // Server decides
            if (ws.rQwait("security scheme", 4)) { return false; }
            rfb_auth_scheme = ws.rQshift32();
        }
        updateState('Authentication',
                "Authenticating using scheme: " + rfb_auth_scheme);
        init_msg();  // Recursive fallthrough (workaround JSLint complaint)
        break;

    // Triggered by fallthough, not by server message
    case 'Authentication' :
        //Util.Debug("Security auth scheme: " + rfb_auth_scheme);
        switch (rfb_auth_scheme) {
            case 0:  // connection failed
                if (ws.rQwait("auth reason", 4)) { return false; }
                strlen = ws.rQshift32();
                reason = ws.rQshiftStr(strlen);
                return fail("Auth failure: " + reason);
            case 1:  // no authentication
                if (rfb_version >= 3.8) {
                    updateState('SecurityResult');
                    return;
                }
                // Fall through to ClientInitialisation
                break;
            case 2:  // VNC authentication
                if (rfb_password.length === 0) {
                    // Notify via both callbacks since it is kind of
                    // a RFB state change and a UI interface issue.
                    updateState('password', "Password Required");
                    conf.onPasswordRequired(that);
                    return;
                }
                if (ws.rQwait("auth challenge", 16)) { return false; }
                challenge = ws.rQshiftBytes(16);
                //Util.Debug("Password: " + rfb_password);
                //Util.Debug("Challenge: " + challenge +
                //           " (" + challenge.length + ")");
                response = genDES(rfb_password, challenge);
                //Util.Debug("Response: " + response +
                //           " (" + response.length + ")");
                
                //Util.Debug("Sending DES encrypted auth response");
                ws.send(response);
                updateState('SecurityResult');
                return;
            default:
                fail("Unsupported auth scheme: " + rfb_auth_scheme);
                return;
        }
        updateState('ClientInitialisation', "No auth required");
        init_msg();  // Recursive fallthrough (workaround JSLint complaint)
        break;

    case 'SecurityResult' :
        if (ws.rQwait("VNC auth response ", 4)) { return false; }
        switch (ws.rQshift32()) {
            case 0:  // OK
                // Fall through to ClientInitialisation
                break;
            case 1:  // failed
                if (rfb_version >= 3.8) {
                    length = ws.rQshift32();
                    if (ws.rQwait("SecurityResult reason", length, 8)) {
                        return false;
                    }
                    reason = ws.rQshiftStr(length);
                    fail(reason);
                } else {
                    fail("Authentication failed");
                }
                return;
            case 2:  // too-many
                return fail("Too many auth attempts");
        }
        updateState('ClientInitialisation', "Authentication OK");
        init_msg();  // Recursive fallthrough (workaround JSLint complaint)
        break;

    // Triggered by fallthough, not by server message
    case 'ClientInitialisation' :
        ws.send([conf.shared ? 1 : 0]); // ClientInitialisation
        updateState('ServerInitialisation', "Authentication OK");
        break;

    case 'ServerInitialisation' :
        if (ws.rQwait("server initialization", 24)) { return false; }

        /* Screen size */
        fb_width  = ws.rQshift16();
        fb_height = ws.rQshift16();

        /* PIXEL_FORMAT */
        bpp            = ws.rQshift8();
        depth          = ws.rQshift8();
        big_endian     = ws.rQshift8();
        true_color     = ws.rQshift8();

        red_max        = ws.rQshift16();
        green_max      = ws.rQshift16();
        blue_max       = ws.rQshift16();
        red_shift      = ws.rQshift8();
        green_shift    = ws.rQshift8();
        blue_shift     = ws.rQshift8();
        ws.rQshiftStr(3); // padding

        Util.Info("Screen: " + fb_width + "x" + fb_height + 
                  ", bpp: " + bpp + ", depth: " + depth +
                  ", big_endian: " + big_endian +
                  ", true_color: " + true_color +
                  ", red_max: " + red_max +
                  ", green_max: " + green_max +
                  ", blue_max: " + blue_max +
                  ", red_shift: " + red_shift +
                  ", green_shift: " + green_shift +
                  ", blue_shift: " + blue_shift);

        if (big_endian !== 0) {
            Util.Warn("Server native endian is not little endian");
        }
        if (red_shift !== 16) {
            Util.Warn("Server native red-shift is not 16");
        }
        if (blue_shift !== 0) {
            Util.Warn("Server native blue-shift is not 0");
        }

        /* Connection name/title */
        name_length   = ws.rQshift32();
        fb_name = ws.rQshiftStr(name_length);
        
        if (conf.true_color && fb_name === "Intel(r) AMT KVM")
        {
            Util.Warn("Intel AMT KVM only support 8/16 bit depths. Disabling true color");
            conf.true_color = false;
        }

        display.set_true_color(conf.true_color);
        display.resize(fb_width, fb_height);
        keyboard.grab();
        mouse.grab();

        if (conf.true_color) {
            fb_Bpp           = 4;
            fb_depth         = 3;
        } else {
            fb_Bpp           = 1;
            fb_depth         = 1;
        }

        response = pixelFormat();
        response = response.concat(clientEncodings());
        response = response.concat(fbUpdateRequests());
        timing.fbu_rt_start = (new Date()).getTime();
        ws.send(response);
        
        /* Start pushing/polling */
        setTimeout(checkEvents, conf.check_rate);

        if (conf.encrypt) {
            updateState('normal', "Connected (encrypted) to: " + fb_name);
        } else {
            updateState('normal', "Connected (unencrypted) to: " + fb_name);
        }
        break;
    }
    //Util.Debug("<< init_msg");
}