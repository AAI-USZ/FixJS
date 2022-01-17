function(sName, fCallback) {
    fCallback = typeof fCallback == 'function' ? fCallback  : function() {};

    var oEC2 = this.getEC2();

    // call something of the EC2 query API
    oEC2.run('/', 'DescribeInstances', {
        'Filter.1.Name':    'tag:Name',
        'Filter.1.Value.1': sName,
        'Filter.2.Name':    'instance-state-name',
        'Filter.2.Value.1': 'running'
    }, function (error, oResponse) {
        if (error) {
            console.error(error);
        } else {
            if (oResponse.reservationSet !== undefined) {
                if (oResponse.reservationSet.item !== undefined) {
                    var aInstanceSets = oResponse.reservationSet.item;

                    if (!Array.isArray(aInstanceSets)) {
                        aInstanceSets = [aInstanceSets];
                    }

                    if (aInstanceSets.length) {
                        var aServers = [];
                        for (var i in aInstanceSets) {
                            var aInstanceSet = aInstanceSets[i].instancesSet.item;

                            if (!Array.isArray(aInstanceSet)) {
                                aInstanceSet = [aInstanceSet];
                            }

                            for (var j in aInstanceSet) {
                                var oInstance = aInstanceSet[j];
                                aServers.push(oInstance.privateIpAddress);
                            }
                        }

                        fCallback(aServers);
                    }
                }
            }
        }
    });
}