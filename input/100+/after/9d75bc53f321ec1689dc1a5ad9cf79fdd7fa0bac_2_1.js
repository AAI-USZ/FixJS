function(){
                                var principalName = this.getName();

                                var name = this.getFirstName() ? this.getFirstName() : "";

                                if (this.getLastName()) {
                                    if (name) {
                                        name += " "
                                    }
                                    name += this.getLastName();
                                }

                                var userObj = {
                                    "name" : principalName,
                                    "fullName": name,
                                    "email": this.getEmail()
                                    //"avatar" : this.attachment('avatar').getDownloadUri()
                                }

                                    this.listAttachments(true).then(function() {
                                        if (this.map["avatar"]) {
                                            this.select("avatar").then(function() {
                                                userObj["avatar"] = this.getDownloadUri();
                                            });
                                        }
                                    });

                                nodes[principalName] = userObj;
                                userNames.push(principalName);
                            }