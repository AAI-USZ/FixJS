function (sMetaName, bAsElement) {

        $L('182 looking for meta tag ' + sMetaName);

        var el, i, aMeta = document.getElementsByTagName('meta');

        $L('43 ' + $LANG.dump(aMeta) + ' total metas: ' + aMeta.length);

        if (!aMeta) {

            $L('45 no meta tags in document', 'error');

            return false;

        }



        for (i = 0; i < aMeta.length; i += 1) {

            if (aMeta[i].name && (aMeta[i].name === sMetaName)

                && aMeta[i].content) {

                if (bAsElement) {

                    el = aMeta[i];

                    $L('213 meta tag element ' + el);



                    return el;

                }



                return aMeta[i].content;

            }

        }



        return false;

    }