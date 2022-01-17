function() {

                                    var sourceNodeId, targetNodeId;

                                    if (personNodesLookup[this.getSourceNodeId()]) {
                                        sourceNodeId = personNodesLookup[this.getSourceNodeId()];
                                    } else {
                                        sourceNodeId = this.getSourceNodeId();
                                        otherIds.push(sourceNodeId);
                                    }

                                    if (personNodesLookup[this.getTargetNodeId()]) {
                                        targetNodeId = personNodesLookup[this.getTargetNodeId()];
                                    } else {
                                        targetNodeId = this.getTargetNodeId();
                                        otherIds.push(targetNodeId);
                                    }

                                    var link = {
                                        "source" : sourceNodeId,
                                        "target" : targetNodeId,
                                        "type" : this.getTypeQName().replace(":","_"),
                                        "directionality" : this.getDirectionality(),
                                        "id" : this.getId()
                                    };
                                    links.push(link);
                                }