function updaterEntreprise() {
	// Vérification du formulaire :
	var /* string */ nomEntr = $('#formUpdateEntrepriseNom').val();
		
	/* int */ var idEntrepriseActuelle = -1
	if ($('#formUpdateEntrepriseId').val() != "0") {
		idEntrepriseActuelle = Annuaire.infoEntrepriseCourante.description.id_entreprise;
	}
	
	// Envoi :
	var description = {id_entreprise: parseInt($('#formUpdateEntrepriseId').val()), nom : encodeURIComponent(nomEntr), secteur: encodeURIComponent($('#formUpdateEntrepriseSecteur').val()), description: encodeURIComponent($('#formUpdateEntrepriseDescription').val())};
	var /* objet */ requete = $.ajax({
		url: "./annuaire/ajax/updateEntreprise.cible.php",
		type: "POST",
		data: description,
		dataType: "json"
	});
	
	// Ajout du secteur à la liste si nouveau.
	if ($.inArray($('#formUpdateEntrepriseSecteur').val(), Annuaire.listeSecteurs) == -1) {
		Annuaire.listeSecteurs.push($('#formUpdateEntrepriseSecteur').val());
		$('#formUpdateEntrepriseSecteur').typeahead({
			source: Annuaire.listeSecteurs
		});
	}
	
	// RAZ du form :
	$('#modalUpdateEntreprise').modal('hide');
	resetForm($('#formUpdateEntreprise'));
	$('#formUpdateEntrepriseDescription').val('');
	$('#formUpdateEntrepriseId').val(0);

	requete.done(function(donnees) {
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
	});
	requete.fail(function(jqXHR, textStatus) {
		Annuaire.afficherErreur('Entreprise - Une erreur est survenue ('+textStatus+')' );
	});
}