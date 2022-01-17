function () {
        $("#nextPathButton").prop("disabled", true)
        adore.switchToNextPath();
        pathIDSpan.text((adore.getActivePathIndex() + 1).toString() + " of " + adore.getPathCount());
        $("#nextPathButton").prop("disabled", false);
    }