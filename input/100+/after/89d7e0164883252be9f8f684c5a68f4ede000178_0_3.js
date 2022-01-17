function(err, result) {
                if (err) throw err;
                if (!result.volumeSet.item) throw new Error('Volume not found on instance ' + id + ' at ' + device);
                var volume = result.volumeSet.item.volumeId;
                var description = job.description + ' ' + device + ' ' + id;
                ec2.call('CreateSnapshot', {VolumeId: volume, Description: description}, function(err, result) {
                    if (err) throw err;
                    if (!result.Errors) {
                        var params = {};
                        params['Owner'] = 'self';
                        params['Filter.1.Name'] = 'description';
                        params['Filter.1.Value.1'] = description;
                        ec2.call("DescribeSnapshots", params, function(err, result) {
                            if (err) throw err;
                            if (!result.Errors) {
                                if (result.snapshotSet.item) {
                                    var snapshots = result.snapshotSet.item;
                                    if (snapshots.length > job.pool) {
                                        snapshots = _.sortBy(snapshots, function(snapshot) { return new Date(snapshot.startTime).getTime(); });
                                        // Delete oldest snapshot within the pool. Assumes pool is not already exceeded.
                                        ec2.call('DeleteSnapshot', {SnapshotId: snapshots[0].snapshotId}, function(err, result) {
                                            if (err) throw err;
                                            // Do nothing
                                        });
                                    }
                                }
                            }
                        });
                    }
                });
            }