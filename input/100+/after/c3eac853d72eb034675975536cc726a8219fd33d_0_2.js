function() {

                    var subject = {
                        id : s.id,
                        name : $('#subject-form input[name="name"]').val(),
                        desc : $('#subject-form textarea[name="desc"]').val(),
                        type1 : $('#subject-form div[name="type1"] .active').attr("name"),
                        type2 : $('#subject-form div[name="type2"] .active').attr("name"),
                        source : $('#subject-form div[name="source"] .active').attr("name")
                    };

                    if(!validateForm(subject)) {
                        return;
                    }

                    var postdata = serializeObject(subject);
                    postJson({
                        url : "/modify",
                        data : postdata,
                        callback : function(obj) {
                            if (obj.err) {
                                alertFailure("#subjectFormAlert", obj.err);
                                $("#subjectFormAlert").goTo();
                            } else {
                                s.name = subject.name;
                                s.desc = subject.desc;
                                s.type1 = subject.type1;
                                s.type2 = subject.type2;
                                s.source = subject.source;
                                //getSubjectDetail();
                                alertSuccess("#subjectFormAlert", "更新成功");
                            }
                        },
                        error : function() {
                            alertInternalError("#subjectFormAlert");
                            $("#subjectFormAlert").goTo();
                        }
                    });
                }