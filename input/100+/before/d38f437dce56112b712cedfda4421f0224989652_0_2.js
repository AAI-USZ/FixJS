function(s) {

            if (profile.username != s.professor.username)
                return;

            var tbody = $("#subject-selection-table");
            var tr = $("<tr/>").appendTo(tbody);
            var infoTr = $("<tr/>")
                .appendTo(tbody)
                .addClass("hide");
            var infoTd = $("<td/>")
                .appendTo(infoTr)
                .attr("colspan", 255);

            tr.click(function(){
                tr.next().toggle("fast");
            });

            $("<td/>").text(s.name).appendTo(tr);
            var td = $("<td/>").appendTo(tr);

            if (s.selected_by) {
                infoTd.append("选择该课程的学生：");
                $.each(s.selected_by, function(i, u){
                    var splitter = "、 ";

                    if (i != 0) {
                        infoTd.append(splitter);
                    }

                    $("<a/>").text(u.realname)
                        .attr("href", "#")// + s.username)
                        .appendTo(infoTd)
                        .click(function(){
                            var postdata = "subject=" + encodeURIComponent(s.id)
                            + "&student=" + encodeURIComponent(u.username);
                            postJson({
                                url : "/approve",
                                data : postdata,
                                callback : function(obj) {
                                    if (obj.err) {
                                        // TODO
                                    } else {
                                        td.empty();
                                        var p = $("<p/>").text("已选择:").appendTo(td);
                                        $("<b/>").text(u.realname).appendTo(p);
                                        p = $("<p/>").text("其他选择了这个课题的人数：").appendTo(td);
                                        $("<b/>").text(s.selected_by.length - 1).appendTo(p);
                                    }
                                },
                                error : function(obj) {
                                }
                            });

                        });;
                });
            }

            if (s.selected_by.length != 0 && s.applied_to){
                var p = $("<p/>").text("已选择:").appendTo(td);
                $("<b/>").text(s.applied_to.realname).appendTo(p);
                p = $("<p/>").text("其他选择了这个课题的人数：").appendTo(td);
                $("<b/>").text(s.selected_by.length - 1).appendTo(p);
            } else if (s.applied_to) {
                var p = $("<p/>").text("已选择:").appendTo(td);
                $("<b/>").text(s.applied_to.realname).appendTo(p);
            } else if (s.selected_by.length != 0) {
                var p = $("<p/>").text("选择了这个课题的人数：").appendTo(td);
                $("<b/>").text(s.selected_by.length).appendTo(p);
            } else {
                var p = $("<p/>").text("无人报选");

            }
        }