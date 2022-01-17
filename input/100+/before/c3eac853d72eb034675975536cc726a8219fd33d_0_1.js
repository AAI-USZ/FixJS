function() {
                var subject = {
                    name : $('#subject-form input[name="name"]').val(),
                    desc : $('#subject-form textarea[name="desc"]').val(),
                    type1 : $('#subject-form div[name="type1"] .active').attr("name"),
                    type2 : $('#subject-form div[name="type2"] .active').attr("name"),
                    source : $('#subject-form div[name="source"] .active').attr("name"),
                };

                if(!validateForm(subject)) {
                    return;
                }

                var postdata = serializeObject(subject);

                subject.professor = {
                    username : profile.username,
                    realname : profile.realname
                };

                postJson({
                    url : "/add",
                    data : postdata,
                    callback : function(obj) {
                        if (obj.err) {
                            alertFailure("#subjectFormAlert", obj.err);
                            $("#subjectFormAlert").goTo();
                        } else {
                            subject.id = obj.id;
                            alertSuccess("#subjectFormAlert", "成功增加课题");
                            $('#subject-form').hide("fast");

                            addToMySubject(subject);
                            // TODO Update the subject-table
                        }
                    },
                    error : function() {
                        alertInternalError("#subjectFormAlert");
                        $("#subjectFormAlert").goTo();
                    }
                });
            }