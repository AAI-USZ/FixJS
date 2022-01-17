function (transport, protocol, port, groups)
    {
        var fAdd = true;
        var openCIDR = "0.0.0.0/0";
        var hostCIDR = this.core.api.queryCheckIP() + "/32";
        var networkCIDR = this.core.api.queryCheckIP("block");

        debug("Host: " + hostCIDR + ", net:" + networkCIDR + ", transport:" + transport + ", proto:" + protocol + ", port:" + port + ", groups:" + groups)

        var permissions = null;
        for (var j in groups) {
            var group = this.core.findModel('securityGroups', groups[j]);
            if (!group) continue;

            for (var i in group.permissions) {
                var perm = group.permissions[i];
                log("perm:" + perm.protocol + ":" + perm.fromPort + ":" + perm.toPort + ':' + perm.cidrIp);

                if (perm.protocol != transport) continue;
                // Nothing needs to be done if:
                // 1. Either the from or to port of a permission matches the protocol's port or the port is within the port range
                // AND
                // 2. The CIDR for the permission matches either the host's CIDR or the network's CIDR or the Firewall has been opened to the world
                var fromPort = parseInt(perm.fromPort);
                var toPort = parseInt(perm.toPort);
                port = parseInt(port);
                if ((perm.fromPort == port || perm.toPort == port || (perm.fromPort <= port && perm.toPort >= port)) &&
                    (perm.cidrIp == openCIDR || perm.cidrIp == hostCIDR || perm.cidrIp == networkCIDR)) {
                    fAdd = false;
                    break;
                }
            }
            if (!fAdd) return;
        }

        var result = true;
        if (this.core.getBoolPrefs("ew.prompt.open.port", true)) {
            port = port.toString();
            var msg = this.core.getAppName() + " needs to open " + transport.toUpperCase() + " port " + port + " (" + protocol + ") to continue. Click Ok to authorize this action";
            var check = {value: false};
            result = this.core.promptConfirm("EC2 Firewall Port Authorization", msg, "Do not ask me again", check);
            this.core.setBoolPrefs("ew.prompt.open.port", !check.value);
        }

        if (result) {
            result = false;
            // Authorize first available group
            for (var i in groups) {
                if (groups[i]) {
                    this.core.api.authorizeSourceCIDR('Ingress', groups[i], transport, port, port, hostCIDR, function() { ew_SecurityGroupsTreeView.refresh(); });
                    result = true
                    break;
                }
            }
        }
        if (!result) {
            this.core.errorMessage("Could not authorize " + transport + ":" + protocol + ":" + port)
        }
    }