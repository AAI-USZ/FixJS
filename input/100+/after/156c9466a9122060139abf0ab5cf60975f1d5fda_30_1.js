function (groupid, value) {
            var participantCount = parseInt($("#searchgroups_result_participant_count_" + groupid).text(), 10);
            participantCount = participantCount + value;
            $("#searchgroups_result_participant_count_" + groupid).text(participantCount);
            if (participantCount === 1) {
                $("#searchgroups_text_participant_" + groupid).text(sakai.api.i18n.getValueForKey("PARTICIPANT_LC"));
            } else {
                $("#searchgroups_text_participant_" + groupid).text(sakai.api.i18n.getValueForKey("PARTICIPANTS_LC"));
            }
            $("#searchgroups_result_participant_link_" + groupid).attr("title", $.trim($("#searchgroups_result_participant_link_" + groupid).text()));
        }