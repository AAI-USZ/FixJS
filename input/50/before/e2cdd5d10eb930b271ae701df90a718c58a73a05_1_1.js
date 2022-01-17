function(xhr, textStatus, thrownError){
                        // SAKIII-1736 - IE will interpret the 204 returned by the server as a
                        // status code 1223, which will cause the error clause to activate
                        if (xhr.status === 1223) {
                            ret = false;
                        } else {
                            ret = true;
                        }
                        if (callback){
                            callback(ret);
                        }
                    }