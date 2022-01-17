function (i, inno) {
                        var $inno = $(inno)
                        ,   isIssue = $inno.hasClass("issue")
                        ,   isInline = $inno.css("display") != "block"
                        ,   dataNum = $inno.attr("data-number")
                        ,   report = { inline: isInline, content: $inno.html() }
                        ;
                        report.type = isIssue ? "issue" : "note";
                        if (isIssue && !isInline && !hasDataNum) {
                            issueNum++;
                            report.number = issueNum;
                        }
                        else if (dataNum) {
                            report.number = dataNum;
                        }
                
                        // wrap
                        if (!isInline) {
                            var $div = $("<div class='" + report.type + "'></div>")
                            ,   $tit = $("<div class='" + report.type + "-title'><span></span></div>")
                            ,   text = isIssue ? "Issue" : "Note"
                            ;
                            if (isIssue) {
                                if (hasDataNum) {
                                    if (dataNum) {
                                      text += " " + dataNum;
                                      // Set issueBase to cause issue to be linked to the external issue tracker
                                      if (conf.issueBase) {
                                        $tit.find("span").wrap($("<a href='" + conf.issueBase + dataNum + "'/>"))
                                      }
                                    }
                                }
                                else {
                                    text += " " + issueNum;
                                }
                            }
                            $tit.find("span").text(text);
                            report.title = $inno.attr("title");
                            if (report.title) {
                                $tit.append(doc.createTextNode(": " + report.title));
                                $inno.removeAttr("title");
                            }
                            $div.append($tit);
                            $div.append($inno.clone().removeClass(report.type).removeAttr('data-number'));
                            $inno.replaceWith($div);
                        }
                        msg.pub(report.type, report);
                    }