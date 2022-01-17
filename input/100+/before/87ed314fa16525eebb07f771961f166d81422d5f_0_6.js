function(donnees) {
		if (donnees.code == "ok") {
			if (idEntrepriseActuelle == Annuaire.infoEntrepriseCourante.description.id_entreprise) { // Si l'utilisateur est toujours sur la même entreprise, on met à jour son affichage :
				for (var i in Annuaire.infoEntrepriseCourante.contacts) {
					if (Annuaire.infoEntrepriseCourante.contacts[i].id_contact == id) {
						Annuaire.infoEntrepriseCourante.contacts.splice(i,1);
						var objSimulantReponseServeur = { entreprise : Annuaire.infoEntrepriseCourante};
						Annuaire.afficherInfoEntreprise(objSimulantReponseServeur);
						break;
					}
				}
			}
		}
		else {
			Annuaire.afficherErreur('Contact - Suppression : Une erreur est survenue ('+donnees.code+')' );
		}
	}