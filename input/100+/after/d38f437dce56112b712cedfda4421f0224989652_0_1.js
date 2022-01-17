function(i, u){
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
                    }