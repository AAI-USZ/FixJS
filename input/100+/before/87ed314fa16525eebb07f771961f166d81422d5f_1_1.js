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
	$("#formUpdateEntreprise").validate();
	$("#btnValiderUpdateEntreprise").click( function() {
		Annuaire.updaterEntreprise();
	});
	
	$("#formUpdateContact").validate();
	$('#formUpdateContactPrioriteDefaut').attr('selected', true);
	$("#btnValiderUpdateContact").click( function() {
		Annuaire.updaterContact();
	});
	
	$("#formAjoutCommentaire").validate();
	$('#formAjoutCommentaireCategorie1').attr('checked', true);
	$("#btnValiderAjoutCommentaire").click( function() {
		Annuaire.ajouterCommentaire();
	});
	
	// Reset du formulaire d'entreprise :
	$('#formUpdateEntreprise .reset').click( function () {resetForm($('#formUpdateEntreprise')); $('#formUpdateEntrepriseDescription').val(''); $('#formUpdateEntrepriseId').val(0);});
	
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
	$('.liste_entreprises').css('height', (window.innerHeight - 180)+'px');
	
	// Initialisation de l'objet Annuaire :
	Annuaire.droitModification = ($("#inputModif").val()==1)?true:false;
	if (Annuaire.droitModification) { $('#formOptionsEdition').attr('checked', true); }
	
}