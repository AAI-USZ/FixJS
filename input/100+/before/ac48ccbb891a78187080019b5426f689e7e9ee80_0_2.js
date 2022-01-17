function(response)
    {
        var xmlDoc = response.responseXML;
        var list = [];
        var items = this.getItems(xmlDoc, "DBInstances", "DBInstance");
        for (var i = 0; i < items.length; i++) {
            var id = getNodeValue(items[i], "DBInstanceIdentifier");
            var name = getNodeValue(items[i], "DBName");
            var engine = getNodeValue(items[i], "Engine");
            var ver = getNodeValue(items[i], "EngineVersion");
            var host = getNodeValue(items[i], "Endpoint", "Address");
            var port = getNodeValue(items[i], "Endpoint", "Port");
            var user = getNodeValue(items[i], "MasterUsername");
            var dbclass = getNodeValue(items[i], "DBInstanceClass");
            var status = getNodeValue(items[i], "DBInstanceStatus");
            var azone = getNodeValue(items[i], "AvailabilityZone");
            var space = getNodeValue(items[i], "AllocatedStorage");
            var created = getNodeValue(items[i], "InstanceCreateTime");
            var license = getNodeValue(items[i], "LicenseModel");
            var autoupgrade = getNodeValue(items[i], "AutoMinorVersionUpgrade");
            var brperiod = getNodeValue(items[i], "BackupRetentionPeriod");
            var charset = getNodeValue(items[i], "CharacterSetName");
            var lrtime = getNodeValue(items[i], "LatestRestorableTime");
            var multiAZ = getNodeValue(items[i], "MultiAZ");
            var bkwin = getNodeValue(items[i], "PreferredBackupWindow");
            var prefwin = getNodeValue(items[i], "PreferredMaintenanceWindow");
            var replicas = getNodeValue(items[i], "ReadReplicaDBInstanceIdentifiers");
            var srcreplica = getNodeValue(items[i], "ReadReplicaSourceDBInstanceIdentifier");
            var optstatus = getNodeValue(items[i], "OptionGroupMembership", "Status");
            var optname = getNodeValue(items[i], "OptionGroupMembership", "OptionGroupName");

            var pendingMods = this.getItems(items[i], "PendingModifiedValues", null, null, function(obj) { return new Tag(obj.tagName, obj.firstChild.nodeValue); });

            var subnetGroup = ""
            var gname = getNodeValue(items[i], "DBSubnetGroup", "DBSubnetGroupName");
            if (gname) {
                var gdescr = getNodeValue(items[i], "DBSubnetGroup", "DBSubnetGroupDescription");
                var gstatus = getNodeValue(items[i], "DBSubnetGroup", "DBSubnetGroupStatus");
                var vpcId = getNodeValue(items[i], "DBSubnetGroup", "VpcId");
                var subnets = this.getItems(items[i], "DBSubnetGroup", "Subnets", ["SubnetIdentifier","SubnetAvailabilityZone","SubnetStatus"], function(obj) { return new DBSubnet(onj.SubnetIdentifier,obj.SubnetAvailabilityZone,obj.SubnetStatus) });
                subnetGroup = new DBSubnetGroup(gname, gdescr, gstatus, vpcId, subnets);
            }

            var sgroups = this.getItems(items[i], "DBSecurityGroups", "DBSecurityGroup", ["DBSecurityGroupName"], function(obj) { return obj.DBSecurityGroupName; })

            var pgroups = this.getItems(items[i], "DBParameterGroups", "DBParameterGroup", ["ParameterApplyStatus","DBParameterGroupName"], function(obj) { return new Tag(obj.DBParameterGroupName,obj.ParameterApplyStatus)});

            list.push(new DBInstance(id, name, engine, ver, host, port, user, dbclass, status, azone, space, created, license, autoupgrade,
                                     brperiod, charset, lrtime, multiAZ, bkwin, prefwin, replicas, srcreplica, optname, optstatus, pendingMods, subnetGroup, sgroups, pgroups))
        }

        this.core.setModel('dbinstances', list);
        response.result = list;
    }