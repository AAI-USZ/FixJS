function(donnees) {
		if (donnees.code == "ok") {
			if (idEntrepriseActuelle == Annuaire.infoEntrepriseCourante.description.id_entreprise) { // Si l'utilisateur est toujours sur la même entreprise, on met à jour son affichage :
				for (var i in Annuaire.infoEntrepriseCourante.commentaires) {
					if (Annuaire.infoEntrepriseCourante.commentaires[i].id_commentaire == id) {
						Annuaire.infoEntrepriseCourante.commentaires.splice(i,1);
						var objSimulantReponseServeur = { entreprise : Annuaire.infoEntrepriseCourante};
						Annuaire.afficherInfoEntreprise(objSimulantReponseServeur);
						$('#contacts').collapse('hide');
						$('#remarques').collapse('show');
						break;
					}
				}
			}
		}
		else {
			Annuaire.afficherErreur('Commentaire - Suppression : Une erreur est survenue ('+donnees.code+')' );
		}
	}