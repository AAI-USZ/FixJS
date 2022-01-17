function afficherInfoEntreprise(/* objet */ donnees) {

	// Gestion des erreurs :
	if (donnees.code == Annuaire.Erreurs.AJAX_INVALIDE) {
		Annuaire.afficherErreur( "AJAX - Requête invalide. Êtes-vous sûr d'avoir utilisé le formulaire ? Si le problème persiste, contactez un Admin." );
	}
	else if (donnees.code == Annuaire.Erreurs.SQL_INVALIDE) {
		Annuaire.afficherErreur( "BDD - Requête invalide. Si le problème persiste, contactez un Admin." );
	}

	if (typeof donnees.entreprise === "undefined") { Annuaire.afficherErreur( "Désolé, cette entreprise n'est pas en BDD." ); return; }
	Annuaire.infoEntrepriseCourante = donnees.entreprise;
	donnees = donnees.entreprise;
	if (typeof donnees === "undefined") { Annuaire.afficherErreur( "Désolé, cette entreprise n'est pas en BDD." ); return; }
	
	// Génération du html par templating :
	donnees.droitModification = Annuaire.droitModification;
	$(".module .hero-unit").html( Annuaire.templates['InfoEntreprise'](donnees) );

	// Possibilité de trier les tables :
	$("#contacts table").tablesorter({ 
        headers: { 
            
            7: { 
                // On désactive le tri sur la dernière colonne (celle des boutons) 
                sorter: false 
            } 
        } 
    }); 
	$("#remarques table").tablesorter({ 
        headers: { 
            
            5: { 
                // On désactive le tri sur la dernière colonne (celle des boutons) 
                sorter: false 
            } 
        }, 
		sortList: [[3,1]]
    });
	$("#relations table").tablesorter(); 
	$("#commentaires table").tablesorter(); 
	
	// Ajout de l'étape de confirmation à certaines actions :
	$('.btnSupprContact').click( function(event) {
		if (event.target.children.length == 0)
			{ event.target = event.target.parentNode; } // On a cliqué sur l'icone et non sur le bouton, du coup on remonte au bouton.
		var idContact = parseInt(event.target.getAttribute('id-contact'));
		Annuaire.confirmerAction('Êtes-vous sûr de vouloir supprimer ce contact ?', '', function(id) { Annuaire.supprimerContact(id); }, idContact);
	});

	$('.btnSupprCommentaire').click( function(event) {
		if (event.target.children.length == 0)
			{ event.target = event.target.parentNode; } // On a cliqué sur l'icone et non sur le bouton, du coup on remonte au bouton.
		var idCommentaire = parseInt(event.target.getAttribute('id-commentaire'));
		Annuaire.confirmerAction('Êtes-vous sûr de vouloir supprimer ce commentaire ?', '', function(id) { Annuaire.supprimerCommentaire(id); }, idCommentaire);
	});	
	// Préremplissage du formulaire de modification/ajout d'un contact :
	$('.btn-modifContact').click(function(event){Annuaire.preremplirFormulaireUpdateContact(event)});
	$('.btn-ajoutContact').click(Annuaire.preremplirFormulaireUpdateContactId);
	// Préremplissage du formulaire de modification de l'entreprise :
	$('.btn-modifEntreprise').click(function(event){Annuaire.preremplirFormulaireModifEntreprise(event)});
	
	// Popover :
	$("a[rel=popover], span[rel=popover]").popover();
	$("span[rel=popover]").popover();
}