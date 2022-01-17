function (issue) {
        var $extract = $('#extract tbody');
        //var loopCount = datas.length;
        moment.lang('fr');
        var dateDemande = formatMoment(issue.created_on);
        //var refDate = new Date(issue.created_on);

        //var refMoment = moment(issue.created_on);
        //var refMoment = dateDemande;

        /*
         *var momentFirstPost = setMoment(firstJournalDate(issue));
         *var momentAValider = setMoment(firstStatus(issue, 'aValider'));
         *var momentLivre = setMoment(firstStatus(issue, 'livre'));
         *var momentALivrer = setMoment(firstStatus(issue, 'aLivrer'));
         *var momentFerme = setMoment(firstStatus(issue, 'ferme'));
         */

        /*
         *var dateFirstPost = formatMoment(firstJournalDate(issue));
         *var dateAValider = formatMoment(firstStatus(issue, 'aValider'));
         *var dateLivre = formatMoment(firstStatus(issue, 'livre'));
         *var dateALivrer = formatMoment(firstStatus(issue, 'aLivrer'));
         *var dateFerme = formatMoment(firstStatus(issue, 'ferme'));
         */

        /*
         *if (dateFirstPost != dateFirstPostServ ||
         *    dateAValider  != dateAValiderServ ||
         *    dateLivre     != dateLivreServ ||
         *    dateALivrer   != dateALivrerServ ||
         *    dateFerme     != dateFermeServ) {
         *    console.log("issue error : ", issue.id, issue);
         *}
         */

        /*
         *var delaiFirstPost = diffMoment(momentFirstPost, refMoment);
         *var delaiAValider = diffMoment(momentAValider, refMoment);
         *var delaiLivre = diffMoment(momentLivre, refMoment);
         *var delaiALivrer = diffMoment(momentALivrer, refMoment);
         *var delaiFerme = diffMoment(momentFerme, refMoment);
         */

        var dateFirstPostServ = issue.stats.dateFirstPost ? formatMoment(issue.stats.dateFirstPost): '';
        var dateAValiderServ = issue.stats.dateAValider ? formatMoment(issue.stats.dateAValider): '';
        var dateLivreServ = issue.stats.dateLivre ? formatMoment(issue.stats.dateLivre): '';
        var dateALivrerServ = issue.stats.dateALivrer ? formatMoment(issue.stats.dateALivrer): '';
        var dateFermeServ = issue.stats.dateFerme ? formatMoment(issue.stats.dateFerme): '';

        //var delaiFirstPostServ = issue.stats.delaiFirstPost ? Math.round( moment.duration(issue.stats.delaiFirstPost).asHours() * 100 ) / 100 : null;
        var delaiFirstPostServ = issue.stats.delaiFirstPost;
        var delaiFirstPostServJourOuvre = issue.stats.delaiFirstPostJourOuvre;
        //var delaiAValiderServ = issue.stats.delaiAValider ? Math.round( moment.duration(issue.stats.delaiAValider).asHours() * 100 ) / 100 : null;
        var delaiAValiderServ = issue.stats.delaiAValider;
        var delaiAValiderServJourOuvre = issue.stats.delaiAValiderJourOuvre;
        //var delaiLivreServ = issue.stats.delaiLivre ? Math.round( moment.duration(issue.stats.delaiLivre).asHours() * 100 ) / 100 : null;
        var delaiLivreServ = issue.stats.delaiLivre;
        var delaiLivreServJourOuvre = issue.stats.delaiLivreJourOuvre;
        //var delaiALivrerServ = issue.stats.delaiALivrer ? Math.round( moment.duration(issue.stats.delaiALivrer).asHours() * 100 ) / 100 : null;
        var delaiALivrerServ = issue.stats.delaiALivrer;
        var delaiALivrerServJourOuvre = issue.stats.delaiALivrerJourOuvre;
        //var delaiFermeServ = issue.stats.delaiFerme ? Math.round( moment.duration(issue.stats.delaiFerme).asHours() * 100 ) / 100 : null;
        var delaiFermeServ = issue.stats.delaiFerme;
        var delaiFermeServJourOuvre = issue.stats.delaiFermeJourOuvre;

        /*
         *console.log("delaiFirstPostServ : ", delaiFirstPostServ);
         *console.log("delaiFirstPost : ", delaiFirstPost);
         *console.log("issue.stats.delaiFerme : ", issue.stats.delaiFerme);
         *console.log("momentFerme : ", firstStatus(issue, 'ferme'));
         */

        /*
         *if (dateFirstPost != dateFirstPostServ ||
         *    dateAValider  != dateAValiderServ ||
         *    dateLivre     != dateLivreServ ||
         *    dateALivrer   != dateALivrerServ ||
         *    dateFerme     != dateFermeServ) {
         *    console.error("issue error : ", issue.id, issue);
         *    console.log("dateFirstPost : ", dateFirstPost, "dateFirstPostServ : ", dateFirstPostServ);
         *    console.log("dateAValider : ", dateAValider, "dateAValiderServ : ", dateAValiderServ);
         *    console.log("dateLivre : ", dateLivre, "dateLivreServ : ", dateLivreServ);
         *    console.log("dateALivrer : ", dateALivrer, "dateALivrerServ : ", dateALivrerServ);
         *    console.log("dateFerme : ", dateFerme, "dateFermeServ : ", dateFermeServ);
         *}
         */

/*
 *        if (dateFirstPost != dateFirstPostServ) {
 *            console.error("issue error : ", issue.id, issue);
 *            console.log("dateFirstPost : ", dateFirstPost, "dateFirstPostServ : ", dateFirstPostServ);
 *        }
 *
 *        if ( dateAValider  != dateAValiderServ) {
 *            console.error("issue error : ", issue.id, issue);
 *            console.log("dateAValider : ", dateAValider, "dateAValiderServ : ", dateAValiderServ);
 *        }
 *
 *        if (dateLivre     != dateLivreServ) {
 *            console.error("issue error : ", issue.id, issue);
 *            console.log("dateLivre : ", dateLivre, "dateLivreServ : ", dateLivreServ);
 *        }
 *
 *        if (dateALivrer   != dateALivrerServ) {
 *            console.error("issue error : ", issue.id, issue);
 *            console.log("dateALivrer : ", dateALivrer, "dateALivrerServ : ", dateALivrerServ);
 *        }
 *
 *        if (dateFerme     != dateFermeServ) {
 *            console.error("issue error : ", issue.id, issue);
 *            console.log("dateFerme : ", dateFerme, "dateFermeServ : ", dateFermeServ);
 *        }
 *
 *        if (delaiFirstPost != delaiFirstPostServ) {
 *            console.error("issue error : ", issue.id, issue);
 *            console.log("delaiFirstPost : ", delaiFirstPost, "delaiFirstPostServ : ", delaiFirstPostServ);
 *        }
 *
 *        if ( delaiAValider  != delaiAValiderServ) {
 *            console.error("issue error : ", issue.id, issue);
 *            console.log("delaiAValider : ", delaiAValider, "delaiAValiderServ : ", delaiAValiderServ);
 *        }
 *
 *        if (delaiLivre     != delaiLivreServ) {
 *            console.error("issue error : ", issue.id, issue);
 *            console.log("delaiLivre : ", delaiLivre, "delaiLivreServ : ", delaiLivreServ);
 *        }
 *
 *        if (delaiALivrer   != delaiALivrerServ) {
 *            console.error("issue error : ", issue.id, issue);
 *            console.log("delaiALivrer : ", delaiALivrer, "delaiALivrerServ : ", delaiALivrerServ);
 *        }
 *
 *        if (delaiFerme     != delaiFermeServ) {
 *            console.error("issue error : ", issue.id, issue);
 *            console.log("delaiFerme : ", delaiFerme, "delaiFermeServ : ", delaiFermeServ);
 *        }
 */

        var issueHtml = ich.issue({
            nomSousProjet: issue.project.name,
            numTache: issue.id,
            nomTache: issue.subject,
            dateDemande: dateDemande,
            userDateDemande: issue.author.name,

/*
 *            userDateFirstPost: firstJournalUser(issue),
 *            dateFirstPost: dateFirstPost,
 *            dateAValider: dateAValider,
 *            dateLivre: dateLivre,
 *            dateALivrer: dateALivrer,
 *            dateFerme: dateFerme,
 *
 *            delaiFirstPost: delaiFirstPost,
 *            delaiAValider: delaiAValider,
 *            delaiLivre: delaiLivre,
 *            delaiALivrer: delaiALivrer,
 *            delaiFerme: delaiFerme,
 */

            userDateFirstPostServ: issue.stats.userFirstPost,
            dateFirstPostServ: dateFirstPostServ,
            dateAValiderServ: dateAValiderServ,
            dateLivreServ: dateLivreServ,
            dateALivrerServ: dateALivrerServ,
            dateFermeServ: dateFermeServ,

            /*
             *delaiFirstPostServ: issue.stats.delaiFirstPost ? Math.round( moment.duration(issue.stats.delaiFirstPost).asHours() * 100 ) / 100 : null,
             *delaiAValiderServ: issue.stats.delaiAValider ? Math.round( moment.duration(issue.stats.delaiAValider).asHours() * 100 ) / 100 : null,
             *delaiLivreServ: issue.stats.delaiLivre ? Math.round( moment.duration(issue.stats.delaiLivre).asHours() * 100 ) / 100 : null,
             *delaiALivrerServ: issue.stats.delaiALivrer ? Math.round( moment.duration(issue.stats.delaiALivrer).asHours() * 100 ) / 100 : null,
             *delaiFermeServ: issue.stats.delaiFerme ? Math.round( moment.duration(issue.stats.delaiFerme).asHours() * 100 ) / 100 : null,
             */

            delaiFirstPostServ: delaiFirstPostServ,
            delaiAValiderServ: delaiAValiderServ,
            delaiLivreServ: delaiLivreServ,
            delaiALivrerServ: delaiALivrerServ,
            delaiFermeServ: delaiFermeServ,

            delaiFirstPostServJourOuvre: delaiFirstPostServJourOuvre,
            delaiFirstPostServJourOuvre: delaiFirstPostServJourOuvre,
            delaiAValiderServJourOuvre: delaiAValiderServJourOuvre,
            delaiLivreServJourOuvre: delaiLivreServJourOuvre,
            delaiALivrerServJourOuvre: delaiALivrerServJourOuvre,
            delaiFermeServJourOuvre: delaiFermeServJourOuvre,

            time: sumTimeEntry(issue)
        });
        if (delaiFirstPostServJourOuvre === 0) {
            $(issueHtml).addClass('excluded');
        }
        if (dateFirstPostServ === dateFermeServ) {
            //console.log("directClose : ", issue.id, issue);
            $(issueHtml).addClass('excluded directClose');
        }
        $extract.append($(issueHtml));
    }