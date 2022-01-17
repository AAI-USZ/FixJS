function(obj) {
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
                        }