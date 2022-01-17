function(){

                    var stu = activeUnselectStudent;

                    var postdata = serializeObject({
                        student : stu.username,
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
                                stu.unselectTr.insertAfter(lastUnselectTr);
                                lastUnselectTr = stu.unselectTr;
                                activeUnselectStudent = null;
                                lastUnselectTr.hide();
                            }
                        },
                        error : function(obj) {
                        }
                    });

                }