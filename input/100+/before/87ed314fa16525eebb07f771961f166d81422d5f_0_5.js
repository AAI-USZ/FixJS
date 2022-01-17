function ajouterCommentaire() {
	
	// Vérification du formulaire :
	if ($("#formAjoutCommentaire").validate()) {
	
		/* int */ var idEntrepriseActuelle = Annuaire.infoEntrepriseCourante.description.id_entreprise;
		
		// Envoi :
		var categorie = $('#formAjoutCommentaire .formAjoutCommentaireCateg:checked');
		var /* objet */ nouveauCommentaire = {
			'id_entreprise': idEntrepriseActuelle,
			'contenu' : encodeURIComponent($('#formAjoutCommentaireContenu').val()),
			'categorie' : parseInt(categorie.val())
		};
		var /* objet */ requete = $.ajax({
			url: "./annuaire/ajax/ajoutCommentaire.cible.php",
			type: "POST",
			data: nouveauCommentaire,
			dataType: "json"
		});
		
		// RAZ du form :
		$('#modalAjoutCommentaire').modal('hide');
		resetForm($('#formAjoutCommentaire'));
		$('#formAjoutCommentaireContenu').val('');
		$('#formAjoutCommentaireCategorie1').attr('checked', true);

		requete.done(function(donnees) {
			if (donnees.code == "ok") {
				if (donnees.id >= 0) {
					if (idEntrepriseActuelle == Annuaire.infoEntrepriseCourante.description.id_entreprise) { // Si l'utilisateur est toujours sur la même entreprise, on met à jour son affichage :
						nouveauCommentaire.id = donnees.id;
						if (typeof Annuaire.infoEntrepriseCourante.commentaires === "undefined") { Annuaire.infoEntrepriseCourante.commentaires = []; }
						nouveauCommentaire.contenu = encodeURIComponent(nouveauCommentaire.contenu);
						nouveauCommentaire.personne = Annuaire.utilisateur.personne;
						nouveauCommentaire.timestamp = new Date();
						nouveauCommentaire.timestamp = nouveauCommentaire.timestamp.format('yyyy-mm-dd hh:mm:ss');
						Annuaire.infoEntrepriseCourante.commentaires.push(nouveauCommentaire);
						var objSimulantReponseServeur = { entreprise : Annuaire.infoEntrepriseCourante};
						Annuaire.afficherInfoEntreprise(objSimulantReponseServeur);
						$('#contacts').collapse('hide');
						$('#remarques').collapse('show');
					}
				}
				else {
					Annuaire.afficherErreur('Commentaire : Une erreur est survenue (id = '+donnees.id+')' );
				}
			}
			else {
				Annuaire.afficherErreur('Commentaire : Une erreur est survenue ('+donnees.code+')' );
			}
		});
		requete.fail(function(jqXHR, textStatus) {
			Annuaire.afficherErreur('Commentaire : Une erreur est survenue ('+textStatus+')' );
		});
		
		
		
	}
}