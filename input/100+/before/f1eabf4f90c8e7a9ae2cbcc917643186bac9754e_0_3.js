function () {

    'use strict';

    // Si ce n'est pas déjà fait, on nettoie le LocalStorage de l'ancienne version de l'extension
    if (!localStorage["clearLSDone"] || localStorage["clearLSDone"] != "true")
    {
        localStorage.clear();
        localStorage["clearLSDone"] = "true";

        setDefaultValues();

        // Si le LS n'était pas vide, on notifie l'utilisateur qu'il s'agissait d'une mise à jour qui s'est bien déroulée
        if (localStorage.length != 0)
            notify_txt("", "", "La mise à jour depuis l'ancienne version de l'extension s'est bien déroulée");
    }

    setDefaultValues();

    // On indique que l'extension est lancée
    PCi.tools.logMessage("Extension lancée", false);

    // On lance la gestion de la recherche via l'Omnibox
    ChromeOmniListen();
    PCi.tools.logMessage("Gestion de l'Omnibox : OK", false);

    // On met en place la communication entre la page de background et le popup
    ListenFromPopup();
    PCi.tools.logMessage("Mise en place de la communication background / popup : OK", false);

    // On met en place l'analyse des requêtes pour détecter les login / logout
    // On sépare les deux parce que la méthodologie n'est pas la même
    chrome.webRequest.onResponseStarted.addListener(function () {
        update_user_cache();
        PCi.tools.logMessage("Connexion de l'utilisateur");
    }, {urls:["http://www.pcinpact.com/Account/ConnectLogOn*"]});

    chrome.webRequest.onBeforeRedirect.addListener(function () {
        update_user_cache();
        PCi.tools.logMessage("Déconnexion de l'utilisateur");
    }, {urls:["http://www.pcinpact.com/Account/LogOff*"]});

    PCi.tools.logMessage("Mise en place de l'analyse du Login / Logout : OK", false);

    // On met en cache les données des actualités et des utilisateurs
    // On lance une répétiton toutes les minutes
    check_and_get_actus();
    setInterval(check_and_get_actus, 60 * 1000);

    UpdateBPCache();
    setInterval(UpdateBPCache, 30 * 60 * 1000);

    update_forum_cache();
    setInterval(update_forum_cache, 60 * 1000);

    update_user_cache();
    setInterval(update_user_cache, 10 * 60 * 1000);

    PCi.tools.logMessage("Gestion des caches : OK", false);

    // On indique lorsque le premier check a été effectué
    if (!sessionStorage["firstCheck"]) sessionStorage["firstCheck"] = "true";

    // L'objet de gestion du nombre de nouvelles actualités
    var newActusCount = {
        localVarName:"newActusCount",

        get:function () {
            // On déclare un compteur
            var countNew = 0;

            // Si un compteur avait déjà été créé, on récupère sa valeur
            if (sessionStorage[newActusCount.localVarName]) countNew = parseInt(sessionStorage[newActusCount.localVarName]);

            PCi.tools.logMessage("Nouvelles actus : " + countNew);
            return countNew;
        },

        inc:function (newActus) {
            var countNew = newActusCount.get(), countFinal;

            // On incrémente le compteur et on l'enregistre
            countFinal = parseInt(countNew) + newActus.length;
            sessionStorage[newActusCount.localVarName] = countFinal;

            PCi.tools.logMessage("Compteur : " + countFinal);
        }

    };

    // La fonction qui indique les valeurs par défaut
    function setDefaultValues() {
        localStorage["notifCheck"] = 1;
        localStorage["notifDelay"] = 10;
        localStorage["PCiEnableLog"] = 1;
    }

    // La fonction qui déclare les réponses aux requêtes qui peuvent être envoyées par le popup
    function ListenFromPopup() {

        chrome.extension.onRequest.addListener(
            function (request, sender, sendResponse) {
                switch (request.message) {
                    case "ask_news_cache":
                        sendResponse(JSON.parse(localStorage["PCiActusLastCheck"]));
                        break;

                    case "ask_user_cache":
                        sendResponse(JSON.parse(localStorage["PCiUserInfos"]));
                        break;

                    case "ask_forum_cache":
                        sendResponse(JSON.parse(localStorage["PCiForumLastCheck"]));
                        break;

                    case "ask_bp_cache":
                        sendResponse(JSON.parse(localStorage["PdNBonsPlansLastCheck"]));
                        break;

                    case "clearNewActusCount":
                        sessionStorage[newActusCount.localVarName] = 0;
                        updateBadgeAndNotify("", false);
                        break;

                    case "getNewActusCount":
                        sendResponse(newActusCount.get());
                        break;
                }
            });
    }

    // La fonction qui récupère des actualités
    function check_and_get_actus() {

        // On récupère les nouvelles actualités
        // Au passage, cela met en cache le JSON d'actualités
        var newActus = PCi.actus.check();

        // S'il y a de nouvelles actualités et que l'on n'est pas au premier lancement
        // On incrémente le compteur et on met à jour le badge
        if (sessionStorage["firstCheck"] === "true" && newActus.List.length > 0) {
            newActusCount.inc(newActus.List);
            updateBadgeAndNotify(newActus.List, true);
        }
    }

    // La fonction qui met en cache les informations des bons plans
    function UpdateBPCache() {
        PdN.getBonsPlans(function (listeBonsPlans) {
            localStorage["PdNBonsPlansLastCheck"] = JSON.stringify(listeBonsPlans);
        });
    }

    // La fonction qui met en cache les informations du forum
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

    // La fonction qui met en cache les informations de l'utilisateur
    function update_user_cache() {
        var user_infos = PCi.user.getInfos();
        localStorage["PCiUserInfos"] = JSON.stringify(user_infos);

        // Si l'utilisateur est Premium, on stocke le QR_Code dans le localStorage
        if (user_infos.IsPremium) {
            PCi.tools.urlToLocalBlob(user_infos.PremiumInfo.UrlQr, function (data) {
                localStorage["qrCodeBlob"] = data;
            });
        }
        // Si l'utilisateur n'est pas Premium et qu'un QR Code est stocké, on l'efface
        else if (localStorage["qrCodeBlob"]) localStorage.removeItem("qrCodeBlob");
    }

    // La fonction qui gère la mise à jour du badge et les notifications
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
            if (forum_infos.messages.count > 0 || forum_infos.notifications.count > 0) {

                var forumNotificationText = "Vous avez de nouvelles notifications sur le forum";
                set_badge("!", forumNotificationText, colorGreen);
                if (sendNotif) notify_txt("", forumNotificationText, "");
            }
            // Sinon, on remet le badge dans son état initial
            else set_badge("", appName, colorBlue);
        }
    }

}