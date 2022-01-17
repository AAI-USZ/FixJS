function() {
                tr.empty(); // Clear this column
                tr.append($("<td/>").text(s.name)).addClass("subject-title")
                .append($("<td/>").append($("<a/>").text(s.professor.realname).attr("href", "#" + s.professor.username)
                        .click(function(){
                            // TODO Open the profile of the professor
                            return false;
                        })))
                        .addClass("subject-professor")
                .append($("<td/>").text($("#subject-form #subject-type1 button:nth-child("+s.type1+")").text())
                    .addClass("visible-desktop subject-type1"))
                .append($("<td/>").text($("#subject-form #subject-type2 button:nth-child("+s.type2+")").text())
                    .addClass("visible-desktop subject-type2"))
                .append($("<td/>").text($("#subject-form #subject-source button:nth-child("+s.source+")").text())
                    .addClass("visible-desktop subject-source"));

                selconTr.empty();
                var selcon = $("<p/>").appendTo(
                        ($("<td/>").attr("colspan", $("#subject-select-table").attr("extra-span"))
                            .append($("<h4/>").text("选课情况")))
                        .appendTo(selconTr));

                var statusbtn = $("<button/>").addClass('btn').attr("type","button");
                if (s.selected_by) {

                    statusbtn.text("报选课程").click(function(){
                        var button = $(this);
                        postJson({
                            url : "/select",
                            data : "subject=" + encodeURIComponent(s.id),
                            callback : function (obj) {
                                if (obj.err) {
                                    alertFailure("#selectSubjectAlert", obj.err);
                                } else {
                                    var origin = subjectDictionary[profile.selected];
                                    if (origin) {
                                        origin.selected_by = removeFromList(origin.selected_by, profile.username);
                                        origin.updateInfo();
                                    }

                                    profile.selected = s.id;

                                    s.selected_by.push({
                                        username : profile.username,
                                        realname : profile.realname
                                    });
                                    s.updateInfo();
                                }
                            },
                            error : function(){
                                alertInternalError("#selectStudentAlert");
                            }
                        });
                        return false;
                    });

                    if(!s.selected_by.length) {
                        selcon.append("该项目尚未有学生选报");
                    }else{
                        selcon.append("该项目已被以下学生选报");
                        var splitter = "： "
                        $.each(s.selected_by, function(i, t) {
                            selcon.append(splitter);
                            splitter = "、 ";
                            $("<a/>").text(t.realname)
                                     .attr("href", "#" + t.username)
                                .appendTo(selcon);
                            if(profile.username == t.username && profile.selected == s.id){
                                statusbtn.text("已报选");
                                statusbtn.addClass("btn-inverse");
                                statusbtn.click(function(){
                                    postJson({
                                        url : "/select",
                                        data : "",
                                        callback : function (obj) {
                                            if (obj.err) {
                                                alertFailure("#selectSubjectAlert", obj.err);
                                            } else {
                                                var origin = subjectDictionary[profile.selected];
                                                if (origin) {
                                                    origin.selected_by = removeFromList(origin.selected_by, profile.username);
                                                    origin.updateInfo();
                                                }
                                            }
                                        },
                                        error : function(){
                                            alertInternalError("#selectStudentAlert");
                                        }
                                    });

                                });
                                // TODO Change the action of statusbtn.click to
                                // unsubscribe to the project
                            }
                        });
                    }

                }

                if (s.applied_to) {

                    statusbtn.text("已确定")
                        .addClass("disabled").attr("disabled","disabled");

                    if(s.applied_to.username == profile.username) {
                        // I'm Applied
                        statusbtn.addClass("btn-success");
                    }

                    // TODO Handle the open of professor profile and student
                    // profile
                    selcon.text("该项目")
                        .append($("<a/>").text(s.professor.realname).attr("href", "#" + s.professor.username))
                        .append("导师选择了").append($("<a/>").text(s.applied_to.realname).attr("href", "#" + s.applied_to.username))
                        .append("完成此项目，本项目双选过程已完结");

                } else {

                }
                $("<td/>").append(statusbtn).addClass("subject-state").appendTo(tr);
                return this;
            }