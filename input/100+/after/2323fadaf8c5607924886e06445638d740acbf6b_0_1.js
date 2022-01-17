function handleSubmit() {
            var pass = validator();

            // Stop if the user didn't enter a response
            // If multiple-answer, join all responses and check if that's empty
            // Remove commas left by joining nested arrays in case multiple-answer is nested

            if (checkIfAnswerEmpty()) {
                return false;
            } else {
                guessLog.push(validator.guess);
            }

            // Stop if the form is already disabled and we're waiting for a response.
            if ($("#answercontent input").not("#hint,#next-question-button").is(":disabled")) {
                return false;
            }

            $("#answercontent input").not("#check-answer-button, #hint")
                .attr("disabled", "disabled");
            $("#check-answer-results p").hide();

            var checkAnswerButton = $("#check-answer-button");

            // If incorrect, warn the user and help them in any way we can
            if (pass !== true) {
                checkAnswerButton
                    .effect("shake", {times: 3, distance: 5}, 80)
                    .val("Try Again");

                // Is this a message to be shown?
                if (typeof pass === "string") {
                    $("#check-answer-results .check-answer-message").html(pass).tmpl().show();
                }

                // Refocus text field so user can type a new answer
                if (lastFocusedSolutionInput != null) {
                    setTimeout(function() {
                        var focusInput = $(lastFocusedSolutionInput);

                        if (!focusInput.is(":disabled")) {
                            // focus should always work; hopefully select will work for text fields
                            focusInput.focus();
                            if (focusInput.is("input:text")) {
                                focusInput.select();
                            }
                        }
                    }, 1);
                }
            }

            if (pass === true) {
                // Problem has been completed but pending data request being
                // sent to server.
                $(Khan).trigger("problemDone");
            }

            // Save the problem results to the server
            var curTime = new Date().getTime();
            var data = buildAttemptData(pass, ++attempts, JSON.stringify(validator.guess), curTime);
            request("problems/" + problemNum + "/attempt", data, function() {

                // TODO: Save locally if offline
                $(Khan).trigger("attemptSaved");

            }, function(xhr) {

                if (xhr.readyState == 0) {
                    // Ignore errors caused by a broken pipe during page unload
                    // (browser navigating away during ajax request).
                    // See http://stackoverflow.com/questions/1370322/jquery-ajax-fires-error-callback-on-window-unload
                    return;
                }

                // Error during submit. Disable the page and ask users to
                // reload in an attempt to get updated data.

                // Alert any listeners of the error before reload
                $(Khan).trigger("attemptError", userExercise);

                // Hide the page so users don't continue
                $("#problem-and-answer").css("visibility", "hidden");

                // Warn user about problem, encourage to reload page
                warn(
                    "This page is out of date. You need to <a href='" + window.location.href +
                    "'>refresh</a>, but don't worry, you haven't lost progress. " +
                    "If you think this is a mistake, " +
                    "<a href='http://www.khanacademy.org/reportissue?type=Defect&issue_labels='>tell us</a>."
                );

            }, "attempt_hint_queue");

            if (pass === true) {
                // Correct answer, so show the next question button.
                $("#check-answer-button").hide();
                if (!testMode || Khan.query.test == null) {
                    $("#next-question-button")
                        .removeAttr("disabled")
                        .removeClass("buttonDisabled")
                        .show()
                        .focus();
                    $("#positive-reinforcement").show();
                }
            } else {
                // Wrong answer. Enable all the input elements
                $("#answercontent input").not("#hint")
                    .removeAttr("disabled");
            }

            // Remember when the last action was
            lastAction = curTime;

            $(Khan).trigger("checkAnswer", {
                pass: pass,
                // Determine if this attempt qualifies as fast completion
                fast: (typeof userExercise !== "undefined" && userExercise.secondsPerFastProblem >= data.time_taken)
            });

            return false;
        }