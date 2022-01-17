function (e) {

        var distanceToMove = $(this).width() - header.width();

        var timeToTakeMoving = 30 * distanceToMove; //Just a feel good value, scales as the text gets longer so takes the same time.

        $(this).animate({ marginLeft: "-" + distanceToMove + "px" }, timeToTakeMoving);

    }