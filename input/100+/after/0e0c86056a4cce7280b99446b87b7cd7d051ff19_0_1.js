function(data) {

            var color = problemlog.correct ? "79A94E" : "FE7569";

            // Only draw map marker if we got back lat lng and it's not (0, 0)
            if (+data.latitude || +data.longitude) {

                markers.push(makeMarker(color, {
                    position: new google.maps.LatLng(data.latitude,
                        data.longitude),
                    map: map,
                    animation: google.maps.Animation.DROP
                }));

                if (markers.length > MAX_MARKERS_ON_SCREEN) {
                    var marker = markers.shift();
                    marker.setMap(null);  // Remove this marker from map
                }

            }

            var answer = problemlog.attempts[0];
            if (problemlog.countAttempts > 0 && problemlog.countHints === 0) {
                try {
                    // Try to parse out text from attempt contents, which may be
                    // a number as a string, HTML, an array, or who knows what
                    // TODO(david): Parse MathJax
                    answer = JSON.parse(answer);
                    answer = $(answer).text() || answer;
                } catch (e) {}
            } else {
                if (problemlog.countHints > 0) {
                    answer = "using hints";
                } else {
                    answer = "[see console]";
                    console.log(problemlog);
                }
            }

            $("#stats-text")
                .append(attemptTemplate(_.extend(problemlog, {
                    color: color,
                    answer: answer,
                    exerciseDisplayName: getExerciseName(problemlog.exercise)
                })))
                .scrollTop($("#stats-text")[0].scrollHeight);

        }