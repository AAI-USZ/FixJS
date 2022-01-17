function(data) {

            if (data.latitude === "0" && data.longitude === "0") {
                // Probably an invalid IP address... skip
                return;
            }

            var color = problemlog.correct ? "79A94E" : "FE7569";
            markers.push(makeMarker(color, {
                position: new google.maps.LatLng(data.latitude, data.longitude),
                map: map,
                animation: google.maps.Animation.DROP
            }));

            $("#stats-text")
                .append(attemptTemplate(_.extend(problemlog, {
                    color: color,
                    answer: problemlog.attempts[0],
                    exerciseDisplayName: getExerciseName(problemlog.exercise)
                })))
                .scrollTop($("#stats-text")[0].scrollHeight);

            if (markers.length > MAX_MARKERS_ON_SCREEN) {
                var marker = markers.shift();
                marker.setMap(null);  // Remove this marker from map
            }

        }