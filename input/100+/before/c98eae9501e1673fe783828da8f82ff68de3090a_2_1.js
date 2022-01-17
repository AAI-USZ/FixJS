function (transport, protocol, port, groups)
    {
        var fAdd = true;
        var openCIDR = "0.0.0.0/0";
        var hostCIDR = this.core.api.queryCheckIP() + "/32";
        var networkCIDR = this.core.api.queryCheckIP("block");

        debug("Host: " + hostCIDR + ", net:" + networkCIDR)

        var permissions = null;
        for (var j in groups) {
            if (groups[j])
                permissions = groups[j].permissions;
            else
                continue;

            // Is the Protocol enabled for the group?
            for (var i in permissions) {
                var perm = permissions[i];

                if (perm.protocol == transport) {
                    // Nothing needs to be done if:
                    // 1. Either the from or to port of a permission
                    // matches the protocol's port or the port is within the
                    // port range
                    // AND
                    // 2. The CIDR for the permission matches either
                    // the host's CIDR or the network's CIDR or
                    // the Firewall has been opened to the world
                    var fromPort = parseInt(perm.fromPort);
                    var toPort = parseInt(perm.toPort);
                    port = parseInt(port);
                    if ((perm.fromPort == port || perm.toPort == port || (perm.fromPort <= port && perm.toPort >= port)) &&
                        (perm.cidrIp == openCIDR || perm.cidrIp == hostCIDR || perm.cidrIp == networkCIDR)) {
                        // We have a match!
                        fAdd = false;
                        break;
                    }
                }
            }

            if (!fAdd) {
                break;
            }
        }

        if (fAdd) {
            var result = false;
            if (this.core.getBoolPrefs("ew.prompt.open.port", true)) {
                port = port.toString();
                var msg = this.core.getAppName() + " needs to open " + transport.toUpperCase() + " port " + port + " (" + protocol + ") to continue. Click Ok to authorize this action";
                var check = {value: false};
                result = this.core.promptConfirm("EC2 Firewall Port Authorization", msg, "Do not ask me again", check);
                this.core.setBoolPrefs("ew.prompt.open.port", !check.value);
            } else {
                result = true;
            }

            if (result) {
                result = false;
                var wrap = function() {
                    ew_SecurityGroupsTreeView.refresh();
                }
                // Authorize first available group
                for (var i in groups) {
                    if (groups[i]) {
                        this.core.api.authorizeSourceCIDR('Ingress', groups[i], transport, port, port, hostCIDR, wrap);
                        result = true
                        break;
                    }
                }
            }
            if (!result) {
                alert("Could not authorize port " + port)
            }
        }
    }