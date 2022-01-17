function() {
    var clef = "treble";
    var containerDivId = "music_wysiwyg";
    var measures = 1;
    var numBeat = 4;
    var beatValue = 4;

    var container = Ava.Container({
                clef: clef,
                initNumOfMeasures: measures,
                numBeat: numBeat,
                beatValue: beatValue,
                containerDivId: containerDivId,
            });
    container.draw();
    container.toggleEditable();

    $("#ava-context-currDuration-value").html(Ava.Context.currentDuration());

    return container;
}