function(ev, val){
                var num = parseInt($("#entity_participants_count").text(), 10);
                var newNum = num + val;
                $("#entity_participants_count").text(newNum);
                if (newNum === 1) {
                    $("#entity_participants_text").text(sakai.api.i18n.getValueForKey("PARTICIPANT_LC", "entity"));
                } else {
                    $("#entity_participants_text").text(sakai.api.i18n.getValueForKey("PARTICIPANTS_LC", "entity"));
                }
            }