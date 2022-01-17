function(s) {
            var ovTable = $("#overview-table");
            var studentName;
            var studentUsername;

            if (s.applied_to) {
                studentName = s.applied_to.realname;
                studentUsername = s.applied_to.username;
            } else {
                studentName = "";
                studentUsername = "";
            }

            ovTable.append($("<tr/>")
                .append($("<td/>").text(s.name))
                .append($("<td/>").append(
                    $("<a/>").text(s.professor.realname).attr("href", "#"+s.professor.username)))
                .append($("<td/>").append(
                    $("<a/>").text(studentName).attr("href", "#"+studentUsername))));
        }