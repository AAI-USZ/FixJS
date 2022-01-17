function (response) {
                    var userInfo = Ext.decode(response.responseText);
                    USER.uuid = userInfo.person.uuid;
                    localStorage.setItem('uuid', userInfo.person.uuid)
                }