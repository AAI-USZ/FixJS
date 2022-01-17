function(cible, resultat) {
        var e=0;
        for (e=0; e<cible.length; e++) {
            resultat.push({terme: cible[e].text});
            this.miseAPlatTaxo(cible[e].children, resultat);
        }
    }