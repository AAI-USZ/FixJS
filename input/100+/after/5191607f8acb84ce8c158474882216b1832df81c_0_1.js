function initWidgets(containerID) {

        var fillGapTextContainer = '.fillGapTextContainer[id=' + containerID + ']';
        var gapWords = fillGapTextContainer + '>.gapWords>.gapWordsList>.gapWord';

        //hide gap textField
        $(fillGapTextContainer + ' .gapText .gapElement .gapField').hide();

        // set up drop zone
        $(fillGapTextContainer + ' .gapText .gapElement').addClass("dropZone");
        for (i = 0; i <= 20; i++) {
            $(fillGapTextContainer + ' .gapText .gapElement').append("&nbsp;");
        }

        // make elements draggable and droppable
        $(gapWords).draggable({containment:fillGapTextContainer, stack:".gapWord"});
        $(fillGapTextContainer + ' .gapText .gapElement').droppable();

        positionSuggestedWords(fillGapTextContainer);
    }