function buildAttemptData(pass, attemptNum, attemptContent, curTime) {
            var timeTaken = Math.round((curTime - lastAction) / 1000);

            if (attemptContent !== "hint") {
                userActivityLog.push([pass ? "correct-activity" : "incorrect-activity", attemptContent, timeTaken]);
            } else {
                userActivityLog.push(["hint-activity", "0", timeTaken]);
            }

            return {
                // The user answered correctly
                complete: pass === true ? 1 : 0,

                // The user used a hint
                count_hints: hintsUsed,

                // How long it took them to complete the problem
                time_taken: timeTaken,

                // How many times the problem was attempted
                attempt_number: attemptNum,

                // The answer the user gave
                // TODO: Get the real provided answer
                attempt_content: attemptContent,

                // A hash representing the exercise
                // TODO: Populate this from somewhere
                sha1: typeof userExercise !== "undefined" ? userExercise.exerciseModel.sha1 : exerciseId,

                // The seed that was used for generating the problem
                seed: problemSeed,

                // The seed that was used for generating the problem
                problem_type: problemID,

                // What mode we're in
                mode: !testMode && Exercises.mode,

                // Whether we are currently working on a topic, as opposed to an exercise
                topic_mode: (!testMode && Exercises.mode != "review" && !Exercises.practiceMode) ? 1 : 0,

                // Request camelCasing in returned response
                casing: "camel",

                // The current card data
                card: !testMode && JSON.stringify(Exercises.currentCard),

                // Unique ID of the cached stack
                stack_uid: !testMode && Exercises.completeStack.getUid(),

                // The current topic, if any
                topic_id: !testMode && Exercises.topic && Exercises.topic.id,

                // How many cards the user has already done
                cards_done: !testMode && Exercises.completeStack.length,

                // How many cards the user has left to do
                cards_left: !testMode && (Exercises.incompleteStack.length - 1),

                //Get Custom Stack Id if it exists
                custom_stack_id: !testMode && Exercises.completeStack.getCustomStackID()
            };
        }