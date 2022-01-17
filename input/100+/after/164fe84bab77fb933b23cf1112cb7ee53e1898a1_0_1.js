function DrawPartition(mesures, svg, nb_cordes)
{
    var MaxWidth = 820; // Taille en pixels d'une ligne de la partition
    var left_marge = 60;
    var marge_mesure = 15;
    var file_mesures = new Array (); // La file qui nous sert à stocker toutes les mesures que l'on peut mettre sur une ligne
    var Yline = 30;
    var x = left_marge; // Curseur pour la position en longueur sur la ligne;
    var context = new Object();
    context["svg"] = svg;
    context["left_marge"] = 60;
    context["marge_mesure"] = 15;
    context["mesure_list"] = mesures;
    context["MaxWidth"] = 820;
    context["nb_cordes"] = nb_cordes;
    

    for (var j = 0; j < mesures.length; j++) // On itère sur les mesures
    {
        x += marge_mesure; // Afin de placer la première note de la mesure
        x = SetX(mesures[j], x, 0, Yline); // ERRROR :  la valeur de x modifié dans la fonction n'est pas modifié ici...
        if (x <= MaxWidth) // Encore de la place pour une mesure
        {
            file_mesures.push(j); // On enfile l'indice de la mesure qui rentre encore sur la ligne
        }
        else // La mesure ne rentre pas
        {
            if (mesures[j]._chord_list[0] != null) // A VERIFIER
            {
                var end_note = mesures[j]._chord_list[0]._note_list[0];
                var Xend = end_note._posX - marge_mesure; // Position de la fin de la derniere mesure qui rentre sur la ligne
                var coef = (MaxWidth  - Xend) / (Xend - left_marge ); // Permet de décaler la position de toutes les notes afin d'occuper tout l'espace restant
                Optimize(context,file_mesures, coef); // Permet de décaler toutes les positions en X des notes qui rentre sur une même ligne
                DrawOneLine(context,file_mesures, Yline); // On dessine la ligne entiere (rectangles de selection, lignes et mesures)
                file_mesures = []; // On nettoie la File afin de pouvoir assigner de nouvelles mesures
                j--; // Afin de repartir sur la mesure qui n'est pas traiter
                x = left_marge; // On repart sur une nouvel ligne
                Yline += 90;
            }
        }
    }
    if (mesures[mesures.length - 1]._chord_list[0] != null) // A VERIFIER
    {
        var end_note = mesures[mesures.length - 1]._chord_list[0]._note_list[0];
        var Xend = end_note._posX - marge_mesure; // Position de la fin de la derniere mesure qui rentre sur la ligne
        var coef = (MaxWidth  - Xend) / (Xend - left_marge ); // Permet de décaler la position de toutes les notes afin d'occuper tout l'espace restant
        Optimize(context,file_mesures, coef); // Permet de décaler toutes les positions en X des notes qui rentre sur une même ligne
        DrawOneLine(context,file_mesures, Yline); // On dessine la ligne entiere (rectangles de selection, lignes et mesures)
        file_mesures = []; // On nettoie la File afin de pouvoir assigner de nouvelles mesures
        j--; // Afin de repartir sur la mesure qui n'est pas traiter
        x = left_marge; // On repart sur une nouvel ligne
        Yline += 90;
    }
    return (Yline+90);
}