function (response) {
                    var privilegesJson = Ext.decode(response.responseText);
                    //only adding necessary fields for localStorage
                    var privilegesArray = [];
                    for (i = 0; i < privilegesJson.privileges.length; i++) {
                        privilegesArray[i] = {
                            'name': privilegesJson.privileges[i].name,
                            'description': privilegesJson.privileges[i].description
                        };
                    }
                    for (i = 0; i < privilegesJson.roles.length; i++) {
                        if(privilegesJson.roles[i].name == 'Provider'){
                            localStorage.setItem('loggedInUser',privilegesJson.person.uuid)
                        }
                    }
                    localStorage.setItem("privileges", Ext.encode(privilegesArray));
                    this.loginSuccess();
                }