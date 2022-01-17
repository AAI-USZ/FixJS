function () {
        nextPathButton.attr("disabled", "disabled");
        adore.switchToNextPath(function () {
            nextPathButton.removeAttr("disabled");
        });
        pathIDSpan.text((adore.getActivePathIndex() + 1).toString() + " of " + adore.getPathCount());
    }