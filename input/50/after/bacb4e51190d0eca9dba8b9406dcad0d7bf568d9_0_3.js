function (response) {
                    var userInfo = Ext.decode(response.responseText);
                    USER.uuid = userInfo.person.uuid;
                    console.log(userInfo);
                    localStorage.setItem('uuid', userInfo.person.uuid)
                }