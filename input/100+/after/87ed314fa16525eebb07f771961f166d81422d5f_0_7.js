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