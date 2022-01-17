function SWF (p_oElement /*:String*/, swfURL /*:String*/, p_oAttributes /*:Object*/ ) {

    this._id = Y.guid("yuiswf");


    var _id = this._id;
    var oElement = Node.one(p_oElement);
    
    var p_oAttributes = p_oAttributes || {};

    var flashVersion = p_oAttributes.version || FLASH_VER;

    var flashVersionSplit = (flashVersion + '').split(".");
    var isFlashVersionRight = SWFDetect.isFlashVersionAtLeast(parseInt(flashVersionSplit[0], 10), parseInt(flashVersionSplit[1], 10), parseInt(flashVersionSplit[2], 10));
    var canExpressInstall = (SWFDetect.isFlashVersionAtLeast(8,0,0));
    var shouldExpressInstall = canExpressInstall && !isFlashVersionRight && p_oAttributes.useExpressInstall;
    var flashURL = (shouldExpressInstall)?EXPRESS_INSTALL_URL:swfURL;
    var objstring = '<object ';
    var w, h;
    var flashvarstring = "yId=" + Y.id + "&YUISwfId=" + _id + "&YUIBridgeCallback=" + EVENT_HANDLER + "&allowedDomain=" + document.location.hostname;

    Y.SWF._instances[_id] = this;
    if (oElement && (isFlashVersionRight || shouldExpressInstall) && flashURL) {
        objstring += 'id="' + _id + '" ';
        if (uA.ie) {
            objstring += 'classid="' + FLASH_CID + '" ';
        } else {
            objstring += 'type="' + FLASH_TYPE + '" data="' + Escape.html(flashURL) + '" ';
        }

        w = "100%";
        h = "100%";

        objstring += 'width="' + w + '" height="' + h + '">';

        if (uA.ie) {
            objstring += '<param name="movie" value="' + Escape.html(flashURL) + '"/>';
        }

        for (var attribute in p_oAttributes.fixedAttributes) {
            if (possibleAttributes.hasOwnProperty(attribute)) {
                objstring += '<param name="' + Escape.html(attribute) + '" value="' + Escape.html(p_oAttributes.fixedAttributes[attribute]) + '"/>';
            }
        }

        for (var flashvar in p_oAttributes.flashVars) {
            var fvar = p_oAttributes.flashVars[flashvar];
            if (Lang.isString(fvar)) {
                flashvarstring += "&" + Escape.html(flashvar) + "=" + Escape.html(encodeURIComponent(fvar));
            }
        }

        if (flashvarstring) {
            objstring += '<param name="flashVars" value="' + flashvarstring + '"/>';
        }

        objstring += "</object>";
        oElement.setContent(objstring);

        this._swf = Node.one("#" + _id);
    } else {
        /**
         * Fired when the Flash player version on the user's machine is
         * below the required value.
         *
         * @event wrongflashversion
         */
        var event = {};
        event.type = "wrongflashversion";
        this.publish("wrongflashversion", {fireOnce:true});
        this.fire("wrongflashversion", event);
    }
}