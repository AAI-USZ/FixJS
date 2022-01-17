function () {
        $(this).get(0).disabled = true;
        adore.switchToPreviousPath();
        pathIDSpan.text((adore.getActivePathIndex() + 1).toString() + " of " + adore.getPathCount());
        $(this).get(0).disabled = false;
    }