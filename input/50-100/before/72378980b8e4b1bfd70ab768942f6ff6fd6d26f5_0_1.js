function (idx, file) {
            if (!_.isUndefined(processableFiles[idx + 1])) {
                processableFiles[idx + 1]();
            } else {
                processFinished();
            }
        }