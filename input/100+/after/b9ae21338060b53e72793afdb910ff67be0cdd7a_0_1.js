function(item) {

                /// @export "increment-position"
                position += 1;
                position_id = "#position-" + position

                /// @export "find-previous-position"
                previous_position = -1;
                for (var i = 0; i < 9; i++) {
                    var dict = window.previous_data[i];
                    previous_position += 1;
                    if (dict['keyword'] == item['keyword']) {
                        break;
                    }
                }

                var instructions = "";
                if (position == 0) {
                    instructions = "to vote ";
                }
                instructions = instructions += "say '" + item["keyword"] + "' or press " + item["number"];
                $(position_id).html(item['title'] + " (" + item["votes"] + " votes) " + '<span class="instructions">' + instructions +  '</span>');
                $(position_id).attr("keyword", item["keyword"]);

                console.log("Previous vote count for " + item["title"] + " was " + window.previous_data[i]["votes"]);
                console.log("Current count for " + item["title"] + " is " + results_json["votes"]);

                var direction;
                if (position > previous_position) {
                    direction = "down";
                } else if (position < previous_position) {
                    direction = "up";
                } else if (window.previous_data[i]["votes"] > results_json["votes"]) {
                    direction = "unchanged"
                } else if (window.previous_data[i]["votes"] == results_json["votes"]) {
                    direction = "none";
                } else {
                    throw "stop";
                }

                $(position_id).attr("class", direction);
                total_votes = total_votes + item["votes"]
            }