function() {
                                           var nodeObj = this.object;
                                           if (nodeObj['title']) {
                                               nodeObj['name'] = nodeObj['title'];
                                           }
                                           nodeObj["avatar"] = this.attachment('avatar').getDownloadUri();
                                           nodes[this.getId()] = this.object;
                                        }