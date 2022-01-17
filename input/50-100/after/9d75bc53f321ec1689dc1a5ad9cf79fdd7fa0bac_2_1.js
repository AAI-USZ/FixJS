function() {
                                           var nodeObj = this.object;
                                           if (nodeObj['title']) {
                                               nodeObj['name'] = nodeObj['title'];
                                           }

                                           this.listAttachments(true).then(function() {
                                                if (this.map["avatar"]) {
                                                    this.select("avatar").then(function() {
                                                        nodeObj["avatar"] = this.getDownloadUri();
                                                    });
                                                }
                                           });

                                           //nodeObj["avatar"] = this.attachment('avatar').getDownloadUri();
                                           nodes[this.getId()] = this.object;
                                        }