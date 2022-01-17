function() {
	
	// Si il y a une ancre dans l'url, et qu'il s'agit du nom d'une entreprise de la liste, on l'affiche direct :
	var ancre = location.hash.substring(location.hash.indexOf("#")+1);
	if (ancre != '') {
		for (var i in Annuaire.listeEntreprises) {
			if (ancre ==  Annuaire.listeEntreprises[i][1]) {
				Annuaire.chercherInfoEntreprise(Annuaire.listeEntreprises[i][0], Annuaire.afficherInfoEntreprise);
				break;
			}
		}
	}
	
	// Activation / Désactivation du mode Edition :
	$('#formOptions .checkbox input').change( function () {
		Annuaire.droitModification = $('#formOptionsEdition').is(':checked');
		Annuaire.afficherListeEntreprises();
		var objSimulantReponseServeur = { entreprise : Annuaire.infoEntrepriseCourante};
		Annuaire.afficherInfoEntreprise(objSimulantReponseServeur);
		if (Annuaire.droitModification) {
			$('#boutonAjoutEntrepriseListe').html('<button id="boutonAjoutEntrepriseListe" title="Ajouter Entreprise" data-toggle="modal" href="#modalUpdateEntreprise" class="btn  btn-mini editionEntreprise" type=""><i class="icon-plus"></i></button>');
		} else {
			$('#boutonAjoutEntrepriseListe').children().remove();
		}
		
	});
	
	// Mise en place d'une validation des formulaires :
	
	// -- Update/Création Entreprise
	var validatorEntreprise = new FormValidator('formUpdateEntreprise', [{
		name: 'formUpdateEntrepriseNom',
		display: 'Nom',    
		rules: 'required|callback_validate_entreprise'
	}, {
		name: 'formUpdateEntrepriseSecteur',
		display: 'Secteur', 
		rules: 'required|alpha_dash'
	}, {
		name: 'formUpdateEntrepriseDescription',
		display: 'Description', 
		rules: 'required'
	}], function(errors, event) {
		$('#formUpdateEntreprise .error').html('');
		if (errors.length > 0) {
			for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
				$('label[for="'+errors[i].id+'"] .error').html('<a href="#" rel="tooltip" title="'+errors[i].message+'"><span class="label label-important"><i class="icon-comment icon-white"></i></span></a>');
			}	
		}
		else {
			Annuaire.updaterEntreprise();
		}
	});
	// ---- Ajout d'une condition spéciale à la validation du form pur le nom de l'entreprise :
	validatorEntreprise.registerCallback('validate_entreprise', function(value) {
		// S'il s'agit de l'ajout d'une nouvelle entreprise ou de la modification du nom d'une entreprise existante, on vérifie que ce nom n'est pas déja pris.
		
		/* int */ var idEntreprise = $('#formUpdateEntrepriseId').val();
		
		/* bool */ var nomModifie = false;
		if (idEntreprise != 0) {
			for (var /* int */ i in Annuaire.listeEntreprises) {
				if (Annuaire.listeEntreprises[i][0] == idEntreprise) {
					if (Annuaire.listeEntreprises[i][1] != value) {
						nomModifie = true;
					}
					break;
				}
			}
		}
		
		var nomNonPris = true;
		if ((idEntreprise == 0) || nomModifie) {
			nomNonPris = false;
			var /* objet */ requete = $.ajax({
				url: "./annuaire/ajax/existEntreprise.cible.php",
				type: "POST",
				async: false,
				data: {name : value},
				dataType: "json",
				success : function(donnees) {
					nomNonPris = !donnees.answer;
				},
				error :  function() {
				}
			});
		}
		
		return nomNonPris;
	}).setMessage('validate_entreprise', 'Cette entreprise existe déja en BDD.');
	
	// ---- Désactivation de l'envoi au serveur :
	$('#formUpdateEntreprise').submit(function() {
		return false; 
	});
	
	// ---- Autocomplétion sur le champ Secteur :
	$('#formUpdateEntrepriseSecteur').typeahead({
		source: Annuaire.listeSecteurs
	});
	
	// ---- Autofocus sur le 1er champ à l'affichage du formulaire :
	$('#modalUpdateEntreprise').on('shown', function (e) {
		$('#formUpdateEntrepriseNom').focus();
	})
	
	// -- Update/Création Contact :
	var validatorContact = new FormValidator('formUpdateContact', [{
		name: 'formUpdateContactNom',
		display: 'Nom',    
		rules: 'required|callback_validate_nom'
	}, {
		name: 'formUpdateContactPrenom',
		display: 'Prénom', 
		rules: 'required|callback_validate_nom'
	}, {
		name: 'formUpdateContactPoste',
		display: 'Poste', 
		rules: 'required'
	}, {
		name: 'formUpdateContactTel',
		display: 'Tel', 
		rules: ''
	}, {
		name: 'formUpdateContactEmail',
		display: 'Email', 
		rules: 'valid_email'
	}], function(errors, event) {
		$('#formUpdateContact .error').html('');
		if (errors.length > 0) {
			for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
				if ((errors[i].id == "formUpdateContactPrenom") || (errors[i].id == "formUpdateContactNom")) {
					$('label[for="formUpdateContactNom"] .error').html('<a href="#" rel="tooltip" title="Les champs Nom & Prénom sont requis."><span class="label label-important"><i class="icon-comment icon-white"></i></span></a>');
				}
				else {
					$('label[for="'+errors[i].id+'"] .error').html('<a href="#" rel="tooltip" title="'+errors[i].message+'"><span class="label label-important"><i class="icon-comment icon-white"></i></span></a>');				
				}
			}	
		}
		else {
			Annuaire.updaterContact();
		}
	});
	
	// ---- Modification du message d'erreur pour simplifier l'affichage :
	validatorContact.registerCallback('validate_nom', function(value) {
		return (value != '');
	}).setMessage('validate_nom', 'Les champs Nom & Prénom sont requis.');
	
	// ---- Désactivation de l'envoi au serveur :
	$('#formUpdateContact').submit(function() {
		return false;
	});
	
	// ---- Préselection de champs :
	$('#formUpdateContactPrioriteDefaut').attr('selected', true);
	
	// ---- Autocomplétion sur le champ Poste :
	$('#formUpdateContactPoste').typeahead({
		source: Annuaire.listePostes
	});
	
	// ---- Autofocus sur le 1er champ à l'affichage du formulaire :
	$('#modalUpdateContact').on('shown', function (e) {
		$('#formUpdateContactNom').focus();
	})
	

	// -- Update/Création Comm'
	var validatorCommentaire = new FormValidator('formAjoutCommentaire', [{
		name: 'formAjoutCommentaireContenu',
		display: 'Contenu',    
		rules: 'required'
	}], function(errors, event) {
		$('#formAjoutCommentaire .error').html('');
		if (errors.length > 0) {
			for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
				$('label[for="'+errors[i].id+'"] .error').html('<a href="#" rel="tooltip" title="'+errors[i].message+'"><span class="label label-important"><i class="icon-comment icon-white"></i></span></a>');
			}	
		}
		else {
			Annuaire.ajouterCommentaire();
		}
	});
	
	// ---- Préselection de champs :
	$('#formAjoutCommentaireCategorie1').attr('checked', true);
	
	// ---- Désactivation de l'envoi au serveur :
	$('#formAjoutCommentaire').submit(function() {
		return false;
	});
	
	// ---- Autofocus sur le 1er champ à l'affichage du formulaire :
	$('#modalAjoutCommentaire').on('shown', function (e) {
		$('#formAjoutCommentaireContenu').focus();
	})
	
	// -- Recherche Contact :
	
	// ---- Association à la fonction JS de traitement & Désactivation de l'envoi au serveur :
	$('#formSearchContact').submit(function() {
		var contentInput = $('#formSearchContactKeywords').val();
		if(contentInput == null || typeof contentInput === "undefined" || contentInput == '') {
			// Form vide
		}
		else {
			Annuaire.chercherContacts()
		}
		return false;
	});
	
	// ---- Autofocus sur le champ à l'affichage du formulaire :
	$('#recherche-tab').on('shown', function (e) {
		$('#formSearchContactKeywords').focus();
	})
	
	// ---- Activation/Désactivation du bouton submit :
	$('#formSearchContactKeywords').bind('change keyup', function() {
		var contentInput = $('#formSearchContactKeywords').val();
		if(contentInput == null || typeof contentInput === "undefined" || contentInput == '') {
			$('#formSearchContactSubmit').attr('disabled', 'disabled');
		}
		else {
			$('#formSearchContactSubmit').removeAttr('disabled');
		}
	});
	$('#formSearchContactSubmit').attr('disabled', 'disabled');
	
	// ---- Aide pour la recherche :
	$("#formSearchContactHelp").popover({content: $('#rechercheHelp').html()});
	
	
	// Reset du formulaire d'entreprise :
	$('#formUpdateEntreprise .reset').click( function () {resetForm($('#formUpdateEntreprise')); $('#formUpdateEntrepriseDescription').val(''); $('#formUpdateEntrepriseId').val(0);});
	$('#modalUpdateEntreprise').on('hidden', function () {
		$('.type-action').text("Ajout d'une entreprise");
		$('#formUpdateEntreprise .error').html('');
    })
	
	// Reset total du formulaire de contact :
	$('#formUpdateContact a[type="reset"]').click(Annuaire.resetFormContact);
	$('#modalUpdateContact a[data-dismiss="modal"]').click(Annuaire.resetFormContact);	
	
	// Reset du formulaire de commentaire :
	$('#formAjoutCommentaire .reset').click( function () {
		resetForm($('#formAjoutCommentaire')); $('#formAjoutCommentaireContenu').val(''); $('#formAjoutCommentaireCategorie1').attr('checked', true);});
	
	
	// Mise en page - Ajout/Supression de champs pour des mails/telephones supplémentaires dans les formulaires :
	$('#formUpdateContactTel').focusout(function(event) { Annuaire.activerBoutonAjoutEntree(event, 'formUpdateContactTelAjout', 'Bureau', '');});
	$('#formUpdateContactTel').mouseout(function(event) { Annuaire.activerBoutonAjoutEntree(event, 'formUpdateContactTelAjout', 'Bureau', '');});
	$('#formUpdateContactEmail').focusout(function(event) { Annuaire.activerBoutonAjoutEntree(event, 'formUpdateContactEmailAjout', 'Pro', '');});
	$('#formUpdateContactEmail').mouseout(function(event) { Annuaire.activerBoutonAjoutEntree(event, 'formUpdateContactEmailAjout', 'Pro', '');});
	
	// Mise en page - Dimensionnement de la liste selon la hauteur disponible sur la page.
	$('#liste').css('height', (window.innerHeight - 290)+'px');
	$('#recherche').css('height', (window.innerHeight - 290)+'px');
	
	// Initialisation de l'objet Annuaire :
	Annuaire.droitModification = ($("#inputModif").val()==1)?true:false;
	if (Annuaire.droitModification) { $('#formOptionsEdition').attr('checked', true); }
	Annuaire.initialiserTemplates();
	
	Annuaire.afficherListeEntreprises();
	
}