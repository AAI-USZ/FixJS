function (datas) {
        var $extract = $('#extract tbody');
        var loopCount = datas.length;
        moment.lang('fr');
        for (var i = 0; i < loopCount; i++) {
            var data = datas[i];
            var dateDemande = formatMoment(data.created_on);
            //var refDate = new Date(data.created_on);

            var refMoment = moment(data.created_on);
            //var refMoment = dateDemande;

            //var dateFirstPost = new Date (firstJournalDate(data));
            var momentFirstPost = setMoment(firstJournalDate(data));
            var momentAValider = setMoment(firstStatus(data, 'aValider'));
            var momentLivre = setMoment(firstStatus(data, 'livre'));
            var momentALivrer = setMoment(firstStatus(data, 'aLivrer'));
            var momentFerme = setMoment(firstStatus(data, 'ferme'));

            var dateFirstPost = formatMoment(firstJournalDate(data));
            var dateAValider = formatMoment(firstStatus(data, 'aValider'));
            var dateLivre = formatMoment(firstStatus(data, 'livre'));
            var dateALivrer = formatMoment(firstStatus(data, 'aLivrer'));
            var dateFerme = formatMoment(firstStatus(data, 'ferme'));

            //var delaiDemande = diffMoment(dateDemande, refDate);
            var delaiFirstPost = diffMoment(momentFirstPost, refMoment);
            var delaiAValider = diffMoment(momentAValider, refMoment);
            var delaiLivre = diffMoment(momentLivre, refMoment);
            var delaiALivrer = diffMoment(momentALivrer, refMoment);
            var delaiFerme = diffMoment(momentFerme, refMoment);

            var issueHtml = ich.issue({
                nomSousProjet: data.project.name,
                numTache: data.id,
                nomTache: data.subject,
                userDateDemande: data.author.name,
                userDateFirstPost: firstJournalUser(data),

                dateDemande: dateDemande,
                dateFirstPost: dateFirstPost,
                dateAValider: dateAValider,
                dateLivre: dateLivre,
                dateALivrer: dateALivrer,
                dateFerme: dateFerme,

                //delaiDemande: delaiDemande,
                delaiFirstPost: delaiFirstPost,
                delaiAValider: delaiAValider,
                delaiLivre: delaiLivre,
                delaiALivrer: delaiALivrer,
                delaiFerme: delaiFerme,
                time: sumTimeEntry(data)
            });
            $extract.append(issueHtml);
        }
        delete loopCount;
    }