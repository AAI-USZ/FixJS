function (conf, doc, cb, msg) {
                msg.pub("start", "core/issues-notes");
                var $ins = $(".issue, .note");
                if ($ins.length) {
                    $(doc).find("head link").first().before($("<style/>").text(css));
                    var issueNum = 0;
                    $ins.each(function (i, inno) {
                        var $inno = $(inno)
                        ,   isIssue = $inno.hasClass("issue")
                        ,   isInline = $inno.css("display") != "block"
                        ,   report = { inline: isInline, content: $inno.html() }
                        ;
                        report.type = isIssue ? "issue" : "note";
                        if (isIssue && !isInline) {
                            issueNum++;
                            report.number = issueNum;
                        }
                
                        // wrap
                        if (!isInline) {
                            var $div = $("<div class='" + report.type + "'></div>")
                            ,   $tit = $("<div class='" + report.type + "-title'><span></span></div>")
                            ;
                            $tit.find("span").text(isIssue ? "Issue " + issueNum : "Note");
                            report.title = $inno.attr("title");
                            if (report.title) {
                                $tit.append(doc.createTextNode(": " + report.title));
                                $inno.removeAttr("title");
                            }
                            $div.append($tit);
                            $div.append($inno.clone().removeClass(report.type));
                            $inno.replaceWith($div);
                        }
                        msg.pub(report.type, report);
                    });
                }
                msg.pub("end", "core/issues-notes");
                cb();
            }