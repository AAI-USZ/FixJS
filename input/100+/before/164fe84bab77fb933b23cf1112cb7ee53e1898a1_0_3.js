function DrawNotes(context, file, yLine)
{
	for (var i = 0; i < file.length; i++)
	{
                var measure = context.mesure_list[[file[i]]];
                var chords = measure._chord_list;
                if (chords != null && chords[0] != null)
                {
                        var chord = chords[0];
                        if (chord._note_list != null)
                        {
                            var note = chord._note_list[0];
                            var mes = file[i];
                            mes++;
                            context.svg.text(note._posX - context.marge_mesure - 2, yLine - 5, ""+mes+"", {stroke: "red", "font-size": "10px"});
                            context.svg.line(note._posX -context.marge_mesure, yLine, note._posX - context.marge_mesure, yLine + (context.nb_cordes * 10) - 10,{stroke:"black"});
                        }
                    }
                    for (var j = 0; j < chords.length; j++)
                    {
                                var notes = chords[j]._note_list;
                                        for (var k = 0; k < notes.length; k++)
                                        {
                                            var note2 = notes[k];

                                            if (note2._fret_technical != null)
                                            {
                                                if (note2._fret_technical.length == 1)
                                                {
                                                    context.svg.rect(note2._posX,(note2._string_technical - 1)*10+yLine  - 5, 5.5, 11, {fill:"white"});
                                                }
                                                else
                                                {
                                                        context.svg.rect(note2._posX,(note2._string_technical - 1)*10+yLine  - 5, 11, 11, {fill:"white"});
                                                }
                                                    context.svg.text(note2._posX, (note2._string_technical * 10) + yLine - 6, ""+note2._fret_technical+"", {stroke: "black", "font-size": "11px"});
                                            }
                                            else
                                            {
                                               
                                                if (note2._string_technical != null)
                                               {
                                                    context.svg.rect(note2._posX ,(note2._string_technical - 1) *10 + yLine - 5, 5.5, 11, {fill:"white"});
                                                    context.svg.text(note2._posX, (note2._string_technical * 10) + yLine - 6, "X", {stroke: "black", "font-size": "11px"});
                                               }
                                               else
                                              {
                                                       context.svg.rect(note2._posX , 9 + yLine, 11, 5.5, {fill:"black"});
                                              }
                                            }
                                            /*  if (note2._fret_technical != null)
                                            {
                                                svg.text(note2._posX, (note2._string_technical * 10) + yLine - 6, ""+note2._fret_technical+"", {stroke: "blue", "font-size": "11px"});
                                            }
                                            else
                                            {
                                                svg.text(note2._posX, (note2._string_technical * 10) + yLine - 7, "X", {stroke: "blue", "font-size": "11px"});
                                            }*/
                                        // SVGText(note.X, (note.string * 10) + yLine, note.fret);
                                        }
                        }
	}
         context.svg.line(820, yLine, context.MaxWidth, yLine +  (context.nb_cordes * 10) - 10, {stroke:"black"});
}