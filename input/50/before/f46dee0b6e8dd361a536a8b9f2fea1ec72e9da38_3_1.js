function(newPeerInfo){
                                var returnObj = factory.convertToJava(tableProperties.OBJECT_TYPE_PEER, newPeerInfo);
                                res.send(returnObj, 200);
                            }