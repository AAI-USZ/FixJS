function registerEventHandlers(containerID) {

        var fillGapTextContainer = '.fillGapTextContainer[id=' + containerID + ']';
        var gapElements = $(fillGapTextContainer + '>.gapText>.gapElement');
        var gapWords = $(fillGapTextContainer + '>.gapWords>.gapWordsList>.gapWord');

        gapElements.bind("dropover", function (event, ui) {
            onDropOver($(this), ui.draggable);
        });

        gapElements.bind("dropout", function (event, ui) {
            onDropOut($(this), ui.draggable);
        });

        gapWords.bind("dragstop", function () {
            onDragStop($(this));
        })
    }