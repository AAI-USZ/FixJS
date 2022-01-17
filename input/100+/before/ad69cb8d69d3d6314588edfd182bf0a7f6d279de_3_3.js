function(instance)
    {
        // Get the group in which this instance was launched
        var groups = this.core.queryModel('securityGroups');
        var instGroups = new Array(instance.groups.length);
        for (var j in instance.groups) {
            instGroups[j] = null;
            for (var i in groups) {
                if (groups[i].id == instance.groups[j]) {
                    instGroups[j] = groups[i];
                    break;
                }
            }
        }

        // If this is a Windows instance, we need to RDP instead
        if (isWindows(instance.platform)) {
            // Ensure that the RDP port is open in one of the instance's groups
            this.authorizeProtocolForGroup("tcp", "rdp", instGroups);
        } else {
            // Ensure that the SSH port is open in one of the instance's groups
            this.authorizeProtocolForGroup("tcp", "ssh", instGroups);
        }
    }