function loadAndRenderExercise(nextUserExercise) {

        setUserExercise(nextUserExercise);
        exerciseId = userExercise.exerciseModel.name;
        exerciseName = userExercise.exerciseModel.displayName;
        exerciseFile = userExercise.exerciseModel.fileName;
        // TODO(eater): remove this once all of the exercises in the datastore have filename properties
        if (exerciseFile == null || exerciseFile == "") {
            exerciseFile = exerciseId + ".html";
        }

        function finishRender() {

            // Get all problems of this exercise type...
            var problems = exercises.filter(function() {
                return $.data(this, "rootName") === exerciseId;
            }).children(".problems").children();

            // ...and create a new problem bag with problems of our new exercise type.
            problemBag = makeProblemBag(problems, 10);

            // Update related videos
            Khan.relatedVideos.setVideos(userExercise.exerciseModel);

            // Make scratchpad persistent per-user
            if (user) {
                var lastScratchpad = window.localStorage["scratchpad:" + user];
                if (typeof lastScratchpad !== "undefined" && JSON.parse(lastScratchpad)) {
                    Khan.scratchpad.show();
                }
            }

            // Generate a new problem
            makeProblem();

        }

        if (isExerciseLoaded(exerciseId)) {
            finishRender();
        } else {
            startLoadingExercise(exerciseId, exerciseName, exerciseFile);

            $(Khan)
                .unbind("exerciseLoaded:" + exerciseId)
                .bind("exerciseLoaded:" + exerciseId, function() {
                    finishRender();
                });
        }

    }