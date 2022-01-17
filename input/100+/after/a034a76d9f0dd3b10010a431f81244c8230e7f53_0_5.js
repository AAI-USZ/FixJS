function(s) {

            if (profile.username != s.professor.username)
                return;

            var tbody = $("#subject-selection-table");
            var tr = $("<tr/>").appendTo(tbody);

            s.updateSelectStudent = function(){
                var s = this;
                tr.empty();
                var infoTr = $("<tr/>")
                    .appendTo(tbody)
                    .addClass("hide");
                var infoTd = $("<td/>")
                    .appendTo(infoTr)
                    .attr("colspan", 2);

                $("<td/>").text(s.name).appendTo(tr);
                var td = $("<td/>").appendTo(tr);


                var unselectStudent = function(s) {
                    td.empty();
                    var p = $("<p/>").text("选择了这个课题的人数：").appendTo(td);
                    $("<b/>").text(s.selected_by.length).appendTo(p);
                }
                //
                // u: The student
                // s: The subject
                var selectStudent = function(u, s) {
                    td.empty();
                    var p = $("<p/>").text("已选择:").appendTo(td);
                    var a = $("<a/>").click(function(){
                        // post unselcect
                        var postdata = "subject=" + encodeURIComponent(s.id);
                        postJson({
                            url : "/approve",
                            data : postdata,
                            callback : function(obj) {
                                unselectStudent(s);
                            },
                            error : function(){
                            }
                        });
                    }).appendTo(p);
                    $("<b/>").text(u.realname).appendTo(a);
                    p = $("<p/>").text("其他选择了这个课题的人数：").appendTo(td);
                    $("<b/>").text(s.selected_by.length - 1).appendTo(p);
                }

                if (s.selected_by) {

                    if(!s.selected_by.length) {
                        infoTd.append("该项目尚未有学生选报");
                    }else{
                        infoTd.append("选择该课程的学生：");
                        $.each(s.selected_by, function(i, u){
                            var splitter = "、 ";

                            if (i != 0) {
                                infoTd.append(splitter);
                            }
                            var div = $("<div/>").appendTo(infoTd).css("display", "inline").addClass("resume");

                            var resume = $("<div/>").append("（").append(
                                $("<a/>").text("下载简历").attr("href", "/resume?student=" + u.username)
                                    .attr('target', '_blank'))
                                .append("）")
                                .css("display", "inline").hover(function(){ },
                                function(){
                                    resume.hide();
                                }).addClass('download-resume');

                            $("<a/>").text(u.realname)
                                .attr("href", "#")// + s.username
                                .appendTo(div)
                                .click(function(){
                                    var postdata = "subject=" + encodeURIComponent(s.id)
                                    + "&student=" + encodeURIComponent(u.username);
                                    postJson({
                                        url : "/approve",
                                        data : postdata,
                                        callback : function(obj) {
                                            if (obj.err) {
                                                alertFailure("#selectStudentAlert", obj.err);
                                            } else {
                                                selectStudent(u, s);
                                                alertSuccess("#selectStudentAlert", "选择成功");
                                            }
                                        },
                                        error : function(obj) {
                                            alertInternalError("#selectStudentAlert");
                                        }
                                    });

                                }).hover(function(){
                                        // hover in
                                        $('.download-resume').hide();
                                        resume.show();
                                    }, function(){
                                        // hover out
                                    }
                                );
                            resume.appendTo(div);
                        });
                        $('.download-resume').hide();
                    }
                }

                if (s.selected_by.length != 0 && s.applied_to){
                    selectStudent(s.applied_to, s);
                } else if (s.applied_to) {
                    var p = $("<p/>").text("已选择:").appendTo(td);
                    $("<b/>").text(s.applied_to.realname).appendTo(p);
                } else if (s.selected_by.length != 0) {
                    unselectStudent(s);
                } else {
                    var p = $("<p/>").text("无人报选").appendTo(td);

                }
            }

            tr.click(function(){
                tr.next().toggle("fast");
            });

            s.updateSelectStudent();

        }