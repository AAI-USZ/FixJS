function(){

                    var postdata = serializeObject({
                        student : activeUnselectStudent.username,
                        subject : s.id
                    });

                    postJson({
                        url : "/match",
                        data : postdata,
                        callback : function(obj) {
                            if (obj.err) {
                            } else {
                                //TODO: update status
                                li.hide();
                                activeUnselectStudent.unselectTr.insertAfter(lastUnselectTr);
                                lastUnselectTr = activeUnselectStudent.unselectTr;
                                activeUnselectStudent = null;
                                lastUnselectTr.hide();
                            }
                        },
                        error : function(obj) {
                        }
                    });

                }