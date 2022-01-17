function (obj) {
                                if (obj.err) {
                                    alertFailure("#selectSubjectAlert", obj.err);
                                } else {
                                    var origin = subjectDictionary[profile.selected];
                                    origin.selected_by = subjectRemoveMyself(origin.selected_by, profile.username);

                                    origin.updateInfo();
                                    profile.selected = s.id;

                                    s.selected_by.push({
                                        username : profile.username,
                                        realname : profile.realname
                                    });
                                    s.updateInfo();
                                }
                            }