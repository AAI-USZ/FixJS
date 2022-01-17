function positionSuggestedWords(fillGapTextContainer) {


        var gapElements = $(fillGapTextContainer + ' .gapText .gapElement');

        $(gapElements).each(function () {

            var textFieldValue = $(this).children('input').val();
            var matchingGapWords = fillGapTextContainer + ">.gapWords>.gapWordsList>.gapWord[word='" + textFieldValue + "']";


            if (textFieldValue != "" && $(matchingGapWords).length > 0) {

                var draggableId = getNotYetDraggedGapWordId(matchingGapWords);
                var dropTargetId = $(this).attr('id');

                putDraggableIntoDroppable(draggableId, dropTargetId);
                highlight($(this));
                droppedItems[dropTargetId] = draggableId;
            }
        });
    }