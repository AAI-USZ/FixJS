function () {
            // begin loading project path
            var result = testWindow.brackets.test.ProjectManager.openProject(path);
            result.done(function () {
                isReady = true;
            });
        }