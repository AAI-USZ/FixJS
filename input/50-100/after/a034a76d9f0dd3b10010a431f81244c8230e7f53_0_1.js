function(obj) {
                        if (obj.err) {
                            alertFailure("#subjectFormAlert", obj.err);
                            $("#subjectFormAlert").goTo();
                        } else {
                            subject.id = obj.id;
                            alertSuccess("#subjectFormAlert", "成功增加课题");
                            $('#subject-form').hide("fast");

                            processSubject(subject);
                            //addToMySubject(subject);
                            // TODO Update the subject-table
                        }
                    }