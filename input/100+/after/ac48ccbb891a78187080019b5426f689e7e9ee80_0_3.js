function(id, AllocatedStorage, DBInstanceClass, Engine, MasterUserName, MasterUserPassword, options, callback)
    {
        var params = []
        params.push([ "DBInstanceIdentifier", id ]);
        params.push([ "AllocatedStorage", storage ]);
        params.push([ "DBInstanceClass", DBInstanceClass ]);
        params.push([ "Engine", Engine ]);
        params.push([ "MasterUserName", MasterUserName])
        params.push([ "MasterUserPassword", MasterUserPassword])

        if (options.AutoMinorVersionUpgrade) {
            params.push([ "AutoMinorVersionUpgrade", options.AutoMinorVersionUpgrade ]);
        }
        if (options.availabilityZone) {
            params.push([ "AvailabilityZone", options.availabilityZone ]);
        }
        if (options.BackupRetentionPeriod) {
            params.push([ "BackupRetentionPeriod", options.BackupRetentionPeriod ]);
        }
        if (options.CharacterSetName) {
            params.push([ "CharacterSetName", options.CharacterSetName ]);
        }
        if (options.DBName) {
            params.push(["DBName", options.DBName])
        }
        if (options.DBParameterGroupName) {
            params.push([ "DBParameterGroupName", options.DBParameterGroupName ]);
        }
        for (var i in options.DBSecurityGroups) {
            params.push([ "DBSecurityGroups." + parseInt(i), typeof options.DBSecurityGroups[i] == "object" ? options.DBSecurityGroups[i].id : options.DBSecurityGroups[i] ]);
        }
        if (options.DBSubnetGroupName) {
            params.push([ "DBSubnetGroupName", options.DBSubnetGroupName])
        }
        if (options.EngineVersion) {
            params.push([ "EngineVersion", options.EngineVersion]);
        }
        if (options.LicenseModel) {
            params.push([ "LicenseModel", options.LicenseModel]);
        }
        if (options.MultiAZ) {
            params.push([ "MultiAZ", "true"]);
        }
        if (options.OptionGroupName) {
            params.push([ "OptionGroupName", options.OptionGroupName ]);
        }
        if (options.Port) {
            params.push([ "Port", options.Port ]);
        }
        if (options.PreferredBackupWindow) {
            params.push([ 'PreferredBackupWindow', options.PreferredBackupWindow ]);
        }
        if (options.PreferredMaintenanceWindow) {
            params.push([ 'PreferredMaintenanceWindow', options.PreferredMaintenanceWindow ]);
        }
        this.queryRDS("CreateDBInstance", params, this, false, "onCompleteCreateDBInstance", callback);
    }