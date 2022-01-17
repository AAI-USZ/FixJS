function() {
                                var branch = this;

                                // read all related person node
                                this.queryNodes({
                                    "_type" : "n:person",
                                    "principal-name" : {
                                        "$in" : userNames
                                    }
                                }).each(function() {
                                    var principalName = this.get("principal-name");
                                    var gender = this.get("gender");
                                    var biography = this.get("biography");
                                    if (nodes[principalName]) {
                                        nodes[principalName]["gender"] = gender;
                                        nodes[principalName]["biography"] = biography;
                                    }
                                    personNodesLookup[this.getId()] = principalName;
                                });

                                var otherIds = [];

                                // find out person relations
                                this.queryNodes({
                                    "_type" : {
                                        "$in" : ["lotr:relationship", "lotr:seeking"]
                                    }
                                }).each(function() {

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
                                        "directionality" : this.getDirectionality()
                                    };
                                    links.push(link);
                                }).then(function() {
                                    if (otherIds.length > 0) {
                                        this.subchain(branch).queryNodes({
                                            "_doc" : {
                                                "$in" : otherIds
                                            }
                                        }).each(function() {
                                           var nodeObj = this.object;
                                           if (nodeObj['title']) {
                                               nodeObj['name'] = nodeObj['title'];
                                           }
                                           nodeObj["avatar"] = this.attachment('avatar').getDownloadUri();
                                           nodes[this.getId()] = this.object;
                                        });
                                    }
                                });
                            }