function update_forum_cache() {
        try {
            PCi.forum.get(function (forumInfos) {
                localStorage["PCiForumLastCheck"] = JSON.stringify(forumInfos);
            });

            // S'il y a de nouveaux contenus, on met à jour le badge et on affiche des notifications
            var forum_infos = JSON.parse(localStorage["PCiForumLastCheck"]);
            if (forum_infos.messages.count > 0 || forum_infos.notifications.count > 0) {
                updateBadgeAndNotify("", true);
            }
        }
            // Si une erreur intervient, on la loggue
        catch (e) {
            console.log(new Date().toFR(true) + " - Erreur : " + e.message);
        }
    }