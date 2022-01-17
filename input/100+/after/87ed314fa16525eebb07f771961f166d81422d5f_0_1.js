function(donnees) {
		if (donnees.code == "ok") {
			if (donnees.id > 0) { // Ajout d'une entreprise :
				Annuaire.insererEntrepriseDansListe({id_entreprise: donnees.id, nom: nomEntr});
				Annuaire.afficherListeEntreprises();
				description.nom = decodeURIComponent(description.nom );
				description.secteur = decodeURIComponent(description.secteur );
				description.description = decodeURIComponent(description.description );
				container = {'description' : description};
				Annuaire.infoEntrepriseCourante = container;
				var objSimulantReponseServeur = { entreprise : Annuaire.infoEntrepriseCourante};
				Annuaire.afficherInfoEntreprise(objSimulantReponseServeur);
				// On demande si l'utilisateur veut ajouter tout de suite des contacts :
				Annuaire.confirmerAction('Entreprise ajoutée !<br/> Voulez-vous ajouter des contacts tout de suite ?', 'alert-success', function(id) {
					$('#formUpdateContactEntrepriseId').val(id);
					$('#modalUpdateContact').modal('show');
				}, donnees.id);
			}
			else if (donnees.id == 0) { // Edition d'une entreprise :
				Annuaire.confirmerAction('Entreprise éditée !<br/> Voulez-vous également ajouter de nouveaux contacts ?', 'alert-success', function(id) {
					$('#formUpdateContactEntrepriseId').val(id);
					$('#modalUpdateContact').modal('show');
				}, Annuaire.infoEntrepriseCourante.description.id_entreprise);
				
				if (idEntrepriseActuelle == Annuaire.infoEntrepriseCourante.description.id_entreprise) {
					description.nom = decodeURIComponent(description.nom );
					description.secteur = decodeURIComponent(description.secteur );
					description.description = decodeURIComponent(description.description );
					Annuaire.infoEntrepriseCourante.description = description;
					var objSimulantReponseServeur = { entreprise : Annuaire.infoEntrepriseCourante};
					Annuaire.afficherInfoEntreprise(objSimulantReponseServeur);
				}
				// Si MAJ du nom, ca met à jour la liste ...
				Annuaire.retirerEntrepriseDeListe(description.id_entreprise);
				Annuaire.insererEntrepriseDansListe({id_entreprise: description.id, nom: nomEntr});
				Annuaire.afficherListeEntreprises(); // Si MAJ du nom, ca met à jour la liste ...
			}
			else {
				Annuaire.afficherErreur('Entreprise - Une erreur est survenue (id = '+donnees.id+')' );
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