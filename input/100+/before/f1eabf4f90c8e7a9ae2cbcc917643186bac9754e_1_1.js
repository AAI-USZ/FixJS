function checkSectionToOpen(newActusCount) {
// On définit la rubrique à ouvrir, et on l'active dans le menu
    // Par défaut, ou si le nombre d'actus / brèves à lire est > 0, on ouvre "home"
    if (!localStorage["lastRub"] || (newActusCount && parseInt(newActusCount) > 0)) localStorage["lastRub"] = "home";

    // S'il y a des contenus dans le forum, on ouvre "forum"
    else if (localStorage["PCiForumLastCheck"]) {
        var forum_infos = JSON.parse(localStorage["PCiForumLastCheck"]);
        if (forum_infos.messages.count > 0 || forum_infos.notifications.count > 0) localStorage["lastRub"] = "forum";
    }
    // Si la rubrique à afficher n'est pas "home", on sélectionne l'élément dédié dans le menu
    // On précise que la demande ne vient pas d'un évènement via "false"
    if (localStorage["lastRub"] != "home") change_menu_state(document.getElementById(localStorage["lastRub"]), false);
}