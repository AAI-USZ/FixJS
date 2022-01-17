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

                                s.updateInfo();
                                s.updateOverview();
                                s.updateSelectStudent();
                                s.updateMySubject();
                                //getSubjectDetail();
                                alertSuccess("#subjectFormAlert", "更新成功");
                                $("#subject-form .legend").text("编辑课题：" + p.text());
                            }
                        }