function SetX(mesure, x, coef, posY)
{
    
    var deltaMin = search_min_note(mesure._chord_list); // On recherche la note qui a le temps le plus petit
            if (deltaMin == 0)
            {
                writeInConsole ("Bite");
            }
    (is_wrong_value(deltaMin));
    var chords = mesure._chord_list;
    for (var i = 0; i < chords.length; i++, posY)
    {
        var chord = chords[i];
        if (chord != null)
        {
            if (chord._note_list != null)
            {
                for (var j = 0; j < chord._note_list.length; j++)
                {
                    var note = chord._note_list[j];
                    note._posX = x;
                    if (posY != null)
                    {
                        note._posY = posY;
                    }
                }
                var note = chord._note_list[0];
                x += getPixelLentgh (note, deltaMin, coef);
            }
        }
    }
    return x;
}