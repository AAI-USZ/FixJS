function updateBadgeAndNotify(newActus, sendNotif) {

        // On définit les variables utiles
        var appName = "PC INpact Toolkit for Chrome™";
        var colorRed = [255, 0, 0, 255];
        var colorGreen = [46, 139, 87, 255];
        var colorBlue = [31, 126, 170, 255];

        // On récupère le nombre de nouvelles actualités à lire
        var count = newActusCount.get();

        // S'il est positif et que l'on n'est pas dans la phase de 1st check
        // On met à jour le badge au niveau des actualités et on affiche les notifications
        if (count > 0 && sessionStorage["firstCheck"] === "true") {
            set_badge(sessionStorage[newActusCount.localVarName], appName, colorRed);

            // On affiche une notification pour chaque actualité repérée
            for (var key in newActus) {
                if (sendNotif) notify_txt("", "Nouvelle actualité", newActus[key].Title);
            }
        }
        // S'il n'y a pas de nouvelles actus, on regarde du côté du forum
        else {

            // On récupère les infos du forum dans le cache
            var forum_infos = JSON.parse(localStorage["PCiForumLastCheck"]);

            // S'il y a de nouveaux contenus, on met à jour le badge et on affiche des notifications
            if (forum_infos.messages && forum_infos.notifications && (forum_infos.messages.count > 0 || forum_infos.notifications.count > 0)) {

                var forumNotificationText = "Vous avez de nouvelles notifications sur le forum";
                set_badge("!", forumNotificationText, colorGreen);
                if (sendNotif) notify_txt("", forumNotificationText, "");
            }
            // Sinon, on remet le badge dans son état initial
            else set_badge("", appName, colorBlue);
        }
    }