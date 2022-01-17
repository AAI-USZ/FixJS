function(instance)
    {
        // If this is a Windows instance, we need to RDP instead
        if (isWindows(instance.platform)) {
            // Ensure that the RDP port is open in one of the instance's groups
            this.authorizeProtocolForGroup("tcp", "rdp", instance.securityGroups);
        } else {
            // Ensure that the SSH port is open in one of the instance's groups
            this.authorizeProtocolForGroup("tcp", "ssh", instance.securityGroups);
        }
    }