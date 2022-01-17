function DrawSelectRect (context, file, Yline)
{
    var x = context.left_marge;
    var height = 70;
    var lastnote = null; //Derniere note d'une mesure
    for (var i = 0; i < file.length; ++i)
    {
        var mesure = context.mesure_list[file[i]]; //On recupere la mesure situé a l'index File[i]
        var chordlist = mesure._chord_list //La liste de chords dans l'objet list
        for (var j=0; j < chordlist.length ; ++j)
        {
                var cur_note = chordlist[j]._note_list[0]; //Cette note represente l'ensemble de l'accord
                if (lastnote != null) //On dessine la derniere note de la mesure precedente
                {
                        var tmpX = cur_note._posX - context.marge_mesure; //15 represente la marge entre la premiere note d'une mesure et la barre de celle-ci
                        context.svg.rect(x,Yline - 10,tmpX - x,height, {id:"n_"+file[i-1]+"_"+j, fill:"white", stroke:"white"});  //file[i-1] est le numero de la mesure qui servira pour l'id du noeud
                        lastnote = null;
                        x = tmpX;
                }
                if (chordlist[j+1] != null) //Si on est pas sur la derniere note
                {
                        var next_note = chordlist[j+1]._note_list[0]; //Cette note represente l'ensemble de l'accord
                        var distance = next_note._posX - cur_note._posX;
                        context.svg.rect(x,Yline - 10,distance/2 + (cur_note._posX - x),height, {id:"n_"+file[i]+"_"+j, fill:"white", stroke:"white"});
                        x = cur_note._posX + distance/2;
                }
                else
                {
                        lastnote = cur_note;
                }
        }
    }
    if (lastnote != null)
    {
        var number_mesure = file[file.length-1];
        var mesure = context.mesure_list[number_mesure]; //On recupere la mesure situé a l'index File[i]
        var chordlist = mesure._chord_list //La liste de chords dans l'objet list
        context.svg.rect(x,Yline - 10,lastnote._posX - x + context.MaxWidth - lastnote._posX,height, {id:number_mesure+"_"+chordlist.length-1, fill:"white", stroke:"white"});
    }
}