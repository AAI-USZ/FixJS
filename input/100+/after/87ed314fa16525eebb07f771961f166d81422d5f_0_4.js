function(donnees) {
		if (donnees.code == "ok") {
			if (donnees.id >= 0) {
				if (idEntrepriseActuelle == Annuaire.infoEntrepriseCourante.description.id_entreprise) { // Si l'utilisateur est toujours sur la même entreprise, on met à jour son affichage :
					nouveauCommentaire.id_commentaire = donnees.id;
					if (typeof Annuaire.infoEntrepriseCourante.commentaires === "undefined") { Annuaire.infoEntrepriseCourante.commentaires = []; }
					nouveauCommentaire.contenu = decodeURIComponent(nouveauCommentaire.contenu);
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
		else if (donnees.code == Annuaire.Erreurs['SQL_INVALIDE']){
			Annuaire.afficherErreur('BDD - Une erreur est survenue. Si celle-ci persiste, merci de contacter un Admin.' );
		}
		else if (donnees.code == Annuaire.Erreurs['CHAMP_INVALIDE']){
			Annuaire.afficherErreur('Erreur - L\'opération demandée n\'a générée aucune modification. Êtes-vous bien passé par le formulaire adéquat ? Si l\'erreur persiste, merci de contacter un admin.' );
		}
		else {
			Annuaire.afficherErreur('Une erreur est survenue : '+donnees.code );
		}
	}