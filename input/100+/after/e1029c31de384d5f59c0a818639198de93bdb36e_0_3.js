function(e) {

            e.preventDefault();

            // don't do anything if the user clicked a second time quickly
            if ($("#issue form").css("display") === "none") return;

            var pretitle = exerciseName,
                type = $("input[name=issue-type]:checked").prop("id"),
                title = $("#issue-title").val(),
                path = exerciseFile + "?seed=" +
                    problemSeed + "&problem=" + problemID,
                pathlink = "[" + path + (exercise.data("name") != null && exercise.data("name") !== exerciseId ? " (" + exercise.data("name") + ")" : "") + "](http://sandcastle.khanacademy.org/media/castles/Khan:master/exercises/" + path + "&debug)",
                historyLink = "[Answer timeline](" + "http://sandcastle.khanacademy.org/media/castles/Khan:master/exercises/" + path + "&debug&activity=" + encodeURIComponent(JSON.stringify(userActivityLog)).replace(/\)/g, "\\)") + ")",
                agent = navigator.userAgent,
                mathjaxInfo = "MathJax is " + (typeof MathJax === "undefined" ? "NOT loaded" :
                    ("loaded, " + (MathJax.isReady ? "" : "NOT ") + "ready, queue length: " + MathJax.Hub.queue.queue.length)),
                sessionStorageInfo = (typeof sessionStorage === "undefined" || typeof sessionStorage.getItem === "undefined" ? "sessionStorage NOT enabled" : null),
                warningInfo = $("#warning-bar-content").text(),
                parts = [$("#issue-body").val() || null, pathlink, historyLink, "    " + JSON.stringify(guessLog), agent, sessionStorageInfo, mathjaxInfo, warningInfo, debugLogLog.join("\n")],
                body = $.grep(parts, function(e) { return e != null; }).join("\n\n");

            var mathjaxLoadFailures = $.map(MathJax.Ajax.loading, function(info, script) {
                if (info.status === -1) {
                    return [script + ": error"];
                } else {
                    return [];
                }
            }).join("\n");
            if (mathjaxLoadFailures.length > 0) {
                body += "\n\n" + mathjaxLoadFailures;
            }

            // flagging of browsers/os for issue labels. very primitive, but
            // hopefully sufficient.
            var agent_contains = function(sub) {
                    return agent.indexOf(sub) !== -1;
                },
                flags = {
                    ie8: agent_contains("MSIE 8.0"),
                    ie9: agent_contains("Trident/5.0"),
                    chrome: agent_contains("Chrome/"),
                    safari: !agent_contains("Chrome/") && agent_contains("Safari/"),
                    firefox: agent_contains("Firefox/"),
                    win7: agent_contains("Windows NT 6.1"),
                    vista: agent_contains("Windows NT 6.0"),
                    xp: agent_contains("Windows NT 5.1"),
                    leopard: agent_contains("OS X 10_5") || agent_contains("OS X 10.5"),
                    snowleo: agent_contains("OS X 10_6") || agent_contains("OS X 10.6"),
                    lion: agent_contains("OS X 10_7") || agent_contains("OS X 10.7"),
                    scratchpad: (/scratch\s*pad/i).test(body),
                    ipad: agent_contains("iPad")
                },
                labels = [];
            $.each(flags, function(k, v) {
                if (v) labels.push(k);
            });

            if (!type) {
                $("#issue-status").addClass("error")
                    .html("Please specify the issue type.").show();
                return;
            } else {
                labels.push(type.slice("issue-".length));

                var hintOrVideoMsg = "Please click the hint button above to see our solution, or watch a video for additional help.";
                var refreshOrBrowserMsg = "Please try a hard refresh (press Ctrl + Shift + R)" +
                        " or use Khan Academy from a different browser (such as Chrome or Firefox).";
                var suggestion = {
                    "issue-wrong-or-unclear": hintOrVideoMsg,
                    "issue-hard": hintOrVideoMsg,
                    "issue-not-showing": refreshOrBrowserMsg,
                    "issue-other": ""
                }[type];
            }

            if (title === "") {
                $("#issue-status").addClass("error")
                    .html("Please provide a valid title for the issue.").show();
                return;
            }

            var formElements = $("#issue input").add("#issue textarea");

            // disable the form elements while waiting for a server response
            formElements.attr("disabled", true);

            $("#issue-cancel").hide();
            $("#issue-throbber").show();

            var dataObj = {
                title: pretitle + " - " + title,
                body: body,
                labels: labels
            };

            // we try to post ot github without a cross-domain request, but if we're
            // just running the exercises locally, then we can't help it and need
            // to fall back to jsonp.
            $.ajax({

                url: (testMode ? "http://www.khanacademy.org/" : "/") + "githubpost",
                type: testMode ? "GET" : "POST",
                data: testMode ? {json: JSON.stringify(dataObj)} :
                    JSON.stringify(dataObj),
                contentType: testMode ? "application/x-www-form-urlencoded" : "application/json",
                dataType: testMode ? "jsonp" : "json",
                success: function(json) {

                    var data = json.data || json;

                    // hide the form
                    $("#issue form").hide();

                    // show status message
                    $("#issue-status").removeClass("error")
                        .html(issueSuccess(data.html_url, data.title, suggestion))
                        .show();

                    // reset the form elements
                    formElements.attr("disabled", false)
                        .not("input:submit").val("");

                    // replace throbber with the cancel button
                    $("#issue-cancel").show();
                    $("#issue-throbber").hide();

                },
                // note this won't actually work in local jsonp-mode
                error: function(json) {

                    // show status message
                    $("#issue-status").addClass("error")
                        .html(issueError).show();

                    // enable the inputs
                    formElements.attr("disabled", false);

                    // replace throbber with the cancel button
                    $("#issue-cancel").show();
                    $("#issue-throbber").hide();

                }
            });
        }