function(ii, contact){
                                        if (contact.target === result["rep:userId"]) {
                                            connected = true;
                                            // if invited state set invited to true
                                            if(contact.details["sakai:state"] === "INVITED"){
                                                invited = true;
                                            } else if(contact.details["sakai:state"] === "PENDING"){
                                                pending = true;
                                            } else if(contact.details["sakai:state"] === "NONE"){
                                                none = true;
                                            }
                                        }
                                    }