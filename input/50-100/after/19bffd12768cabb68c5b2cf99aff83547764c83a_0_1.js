function () {
        previousPathButton.attr("disabled", "disabled");
        adore.switchToPreviousPath(function () {
            previousPathButton.removeAttr("disabled");
        });
        pathIDSpan.text((adore.getActivePathIndex() + 1).toString() + " of " + adore.getPathCount());
    }