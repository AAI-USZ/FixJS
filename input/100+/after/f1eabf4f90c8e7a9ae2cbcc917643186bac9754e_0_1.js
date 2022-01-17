function update_forum_cache() {
        try {
            PCi.forum.get(function (forumInfos) {
                localStorage["PCiForumLastCheck"] = JSON.stringify(forumInfos);
            });

            // On récupère l'objet dans une variable
            var forum_infos = JSON.parse(localStorage["PCiForumLastCheck"]);

            // Si l'on a récupéré des informations depuis le forum et que des messages sont présents, on lance une mise à jour du badge
            if (forum_infos.messages && forum_infos.notifications && (forum_infos.messages.count > 0 || forum_infos.notifications.count > 0))
                updateBadgeAndNotify("", true);
        }
            // Si une erreur intervient, on la loggue
        catch (e) {
            console.log(new Date().toFR(true) + " - Erreur : " + e.message);
        }
    }