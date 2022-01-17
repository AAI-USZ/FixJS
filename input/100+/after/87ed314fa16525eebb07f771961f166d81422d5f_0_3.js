function updaterContact() {

	var idEntrepriseActuelle = Annuaire.infoEntrepriseCourante.description.id_entreprise;
	
	// Récupération de données complexes :
	var /* array */ tels = [];
	$('#formUpdateContactTelGroup ul').children().each(function(){
		tels.push([$(this).find('.labelVal').attr('title'), $(this).find('.val').text()]);
	});
	if ($('#formUpdateContactTel').val() != '') { tels.push([encodeURIComponent($('#formUpdateContactTelLabel option:selected').val()), encodeURIComponent($('#formUpdateContactTel').val())]); }
	
	var /* array */ emails = [];
	$('#formUpdateContactEmailGroup ul').children().each(function(){
		emails.push([$(this).find('.labelVal').attr('title'), $(this).find('.val').text()]);
	});
	if ($('#formUpdateContactEmail').val() != '') { emails.push([encodeURIComponent($('#formUpdateContactEmailLabel option:selected').val()), encodeURIComponent($('#formUpdateContactEmail').val())]); }
	
	// Envoi :
	var /* objet */ nouveauContact = {
		id_contact: parseInt($('#formUpdateContactId').val()),
		id_entreprise: parseInt($('#formUpdateContactEntrepriseId').val()),
		fonction : encodeURIComponent($('#formUpdateContactPoste').val()),
		personne : {
			id : parseInt($('#formUpdateContactPersonneId').val()),
			nom : encodeURIComponent($('#formUpdateContactNom').val()),
			prenom : encodeURIComponent($('#formUpdateContactPrenom').val()),
			mails : emails,
			telephones : tels
		},
		ville : {
			code_postal : encodeURIComponent($('#formUpdateContactVilleCodePostal').val()),
			libelle : encodeURIComponent($('#formUpdateContactVilleLibelle').val()),
			pays : encodeURIComponent($('#formUpdateContactVillePays').val()),
		},
		commentaire : encodeURIComponent($('#formUpdateContactCom').val()),
		priorite : parseInt($('#formUpdateContactPriorite').val()),
	};
	var /* objet */ requete = $.ajax({
		url: "./annuaire/ajax/updateContact.cible.php",
		type: "POST",
		data: nouveauContact,
		dataType: "json"
	});
	
	// Ajout du poste à la liste si nouveau.
	if ($.inArray($('#formUpdateContactPoste').val(), Annuaire.listePostes) == -1) {
		Annuaire.listePostes.push($('#formUpdateContactPoste').val());
		$('#formUpdateContactPoste').typeahead({
			source: Annuaire.listePostes
		});
	}
	
	$('#modalUpdateContact').modal('hide');
	Annuaire.resetFormContact();

	requete.done(function(donnees) {
		if (donnees.code == "ok") {
			var idNouvContact = parseInt(donnees.id);
			if ((idNouvContact >= 0) && (idEntrepriseActuelle == Annuaire.infoEntrepriseCourante.description.id_entreprise)) { // Si l'utilisateur est toujours sur la même entreprise, on met à jour son affichage :
			
				nouveauContact.personne.id = donnees.id_personne;
				if (typeof Annuaire.infoEntrepriseCourante.contacts === "undefined") { Annuaire.infoEntrepriseCourante.contacts = []; }					
				nouveauContact.fonction = decodeURIComponent(nouveauContact.fonction);
				nouveauContact.personne.nom = decodeURIComponent(nouveauContact.personne.nom);
				nouveauContact.personne.prenom = decodeURIComponent(nouveauContact.personne.prenom);
				for (var i in nouveauContact.personne.mails) {
					nouveauContact.personne.mails[i][0] = decodeURIComponent(nouveauContact.personne.mails[i][0]);
					nouveauContact.personne.mails[i][1] = decodeURIComponent(nouveauContact.personne.mails[i][1]);
				}
				for (var i in nouveauContact.personne.telephones) {
					nouveauContact.personne.telephones[i][0] = decodeURIComponent(nouveauContact.personne.telephones[i][0]);
					nouveauContact.personne.telephones[i][1] = decodeURIComponent(nouveauContact.personne.telephones[i][1]);
				}
				nouveauContact.ville.code_postal = decodeURIComponent(nouveauContact.ville.code_postal);
				nouveauContact.ville.libelle = decodeURIComponent(nouveauContact.ville.libelle);
				nouveauContact.ville.pays = decodeURIComponent(nouveauContact.ville.pays);
				nouveauContact.commentaire = decodeURIComponent(nouveauContact.commentaire);

				// On met à jour l'ancien contact ou ajoute le nouveau :
				if (idNouvContact == 0) {
					for (var i in Annuaire.infoEntrepriseCourante.contacts) {
						if (Annuaire.infoEntrepriseCourante.contacts[i].id_contact == nouveauContact.id_contact) {
							Annuaire.infoEntrepriseCourante.contacts[i] = nouveauContact;
							break;
						}
					}
					
				}
				else {
					nouveauContact.id_contact = donnees.id;
					Annuaire.infoEntrepriseCourante.contacts.push(nouveauContact);
				}

				var objSimulantReponseServeur = { entreprise : Annuaire.infoEntrepriseCourante};
				Annuaire.afficherInfoEntreprise(objSimulantReponseServeur);
			}
			
			if (donnees.id > 0) { // Ajout d'un contact :
				// On demande si l'utilisateur veut en ajouter tout de suite d'autres :
				Annuaire.confirmerAction('Contact ajouté !<br/> Voulez-vous en ajouter d\'autres tout de suite ?', 'alert-success', function(id) {
					$('#formUpdateContactEntrepriseId').val(id);
					$('#modalUpdateContact').modal('show');
				}, donnees.id);
			}
			else if (donnees.id == 0) { // Edition d'un contact :
			
			}
			else {
				Annuaire.afficherErreur('Contact - Une erreur est survenue (id = '+donnees.id+')' );
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
		Annuaire.afficherErreur('Contact - Une erreur est survenue ('+textStatus+')' );
	});
}