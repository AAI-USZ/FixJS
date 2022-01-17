function afficherInfoEntreprise(/* objet */ donnees) {
	// Sorry pour les pavés de cette fonction, dur de faire un compromis entre clarté JS et clarté HTML ...
	// Si quelqu'un veut refaire ça plus proprement, ca devrait pas être trop difficile.

	if (typeof donnees.entreprise === "undefined") { return; }
	Annuaire.infoEntrepriseCourante = donnees.entreprise;
	donnees = donnees.entreprise;
	if (typeof donnees === "undefined") { return; }
	
	// Génération des blocs intermédiaires (nécessitant des boucles) :
	var /* string */ tableauContacts = '';
	if ((typeof donnees.contacts === "undefined") || (donnees.contacts.length == 0)) {
		tableauContacts = 'Aucun contact. '+(Annuaire.droitModification?'<a data-toggle="modal" href="#modalUpdateContact" title="Ajouter Contact" class="btn  btn-mini btn-ajoutContact"><i class="icon-plus"></i></a>':'');
	} else {
		tableauContacts = '<table class="table table-stripped tablesorter"> \n'+
'										<thead>\n'+
'											<tr> \n'+
'												<th>Nom</th>\n'+
'												<th>Prénom</th>\n'+
'												<th>Poste</th> \n'+
'												<th>Email</th> \n'+
'												<th>Tel</th>\n'+
'												<th class="first">Lieu</th>\n'+
'												<th>Priorité</th>\n'+
'												<th>'+(Annuaire.droitModification?'<a data-toggle="modal" href="#modalUpdateContact" title="Ajouter Contact" class="btn  btn-mini btn-ajoutContact"><i class="icon-plus"></i></a>':'')+'</th>\n'+
'										</thead> \n'+
'										<tbody>\n';
		for (var /* int */ i in donnees.contacts) {
			// Nom + Prenom + Fonction
			tableauContacts += '			<tr> \n'+
	'												<td><strong>'+donnees.contacts[i].personne.nom+'</strong></td>\n'+
	'												<td>'+donnees.contacts[i].personne.prenom+'</td>\n'+
	'												<td><em>'+donnees.contacts[i].fonction+'</em></td> \n'+
	'												<td><table>';
			// Mails
			for (var /* int */ j in donnees.contacts[i].personne.mails) {
				tableauContacts += '<tr><td><a href="mailto:'+donnees.contacts[i].personne.mails[j][1]+'">'+donnees.contacts[i].personne.mails[j][1]+'</a></td><td>'+Annuaire.afficherLibelle(donnees.contacts[i].personne.mails[j][0], '')+'</td></tr>';
			}
			
			tableauContacts += '</table></td><td><table>\n';
			
			// Tel
			for (var /* int */ j in donnees.contacts[i].personne.telephones) {
				tableauContacts += '<tr><td>'+donnees.contacts[i].personne.telephones[j][1]+'</td><td>'+Annuaire.afficherLibelle(donnees.contacts[i].personne.telephones[j][0], '')+'</td></tr>';
			}
			// Lieu
			tableauContacts += '</table></td><td class="first"><span style="display: none;">'+donnees.contacts[i].ville.code_postal+'</span><a target="_blank" title="'+donnees.contacts[i].ville.code_postal+' - '+donnees.contacts[i].ville.libelle+', '+donnees.contacts[i].ville.pays+'" href="http://maps.google.com/maps?q='+donnees.contacts[i].ville.code_postal+'+'+donnees.contacts[i].ville.libelle+',+'+donnees.contacts[i].ville.pays+'"><i class="icon-map-marker"></i></a></td> ';
			// Remarque + Priorité
			tableauContacts += '</td><td><span href="#" title="'+donnees.contacts[i].commentaire+'" class="label label-'+Annuaire.traduireCouleur(donnees.contacts[i].priorite)+'">'+Annuaire.traduirePrioriteContactTexte(donnees.contacts[i].priorite)+'</span></td> ';
			
			// Bouton modif
			if (Annuaire.droitModification) { // Ajout des boutons de modifications d'un contact :
				tableauContacts += '												<td><a title="Editer Contact" id-contact='+donnees.contacts[i].id_contact+' data-toggle="modal" href="#modalUpdateContact" class="btn  btn-mini btn-modifContact"><i class="icon-pencil"></i></a><a title="Supprimer Contact" id-contact='+donnees.contacts[i].id_contact+' class="btn btn-danger btn-mini btnSupprContact"><i class="icon-remove"></i></a></td>\n'
			}
			tableauContacts += '											</tr>';
		}
		
		tableauContacts += '</tbody></table> \n';
	}
	
	var /* string */ tableauRelations = '';
	
	if (typeof donnees.relations !== "undefined") {
		var /* string */ tableauParrainage = '';
		var /* string */ tableauRIF = '';
		var /* string */ tableauStages = '';
		var /* string */ tableauEntretiens = '';
		
		tableauRelations = '<table class="table table-stripped tablesorter"><tbody>';
		
		// Parrainage
		if ((typeof donnees.relations.parrainage !== "undefined") || (donnees.relations.parrainage.length == 0)) { // Aucun parrainage avec
			tableauParrainage = '<tr><th>Parrainage</th><td>/</td><td><span class="label label-default">Jamais</span></td></tr> ';
		} else {
			tableauParrainage = '<tr><th rowspan='+donnees.relations.parrainage.length+'>Parrainage</th><td>Promo '+donnees.relations.parrainage[0].annee+'</td><td><span class="label label-'+Annuaire.traduireCouleur(donnees.relations.parrainage[0].couleur)+'">'+donnees.relations.parrainage[0].commentaire+'</span></td></tr>';
			for (var /* int */ i = 1; i < donnees.relations.parrainage.length; i++) {
				tableauParrainage += '<tr><td>Promo '+donnees.relations.parrainage[i].annee+'</td><td><span class="label label-'+Annuaire.traduireCouleur(donnees.relations.parrainage[i].couleur)+'">'+donnees.relations.parrainage[i].commentaire+'</span></td></tr>';
			}
		}
		
		// RIF
		if ((typeof donnees.relations.rif === "undefined") || (donnees.relations.rif.length == 0)) {
			tableauRIF = '<tr><th>RIF</th><td>/</td><td><span class="label label-default">Jamais</span></td></tr> ';
		} else {
			tableauRIF = '<tr><th rowspan='+donnees.relations.rif.length+'>RIF</th><td>'+donnees.relations.rif[0].annee+'</td><td><span class="label label-'+Annuaire.traduireCouleur(donnees.relations.rif[0].couleur)+'">'+donnees.relations.rif[0].commentaire+'</span></td></tr>';
			for (var /* int */ i = 1; i < donnees.relations.rif.length; i++) {
				tableauRIF += '<tr><td>'+donnees.relations.rif[i].annee+'</td><td><span class="label label-'+Annuaire.traduireCouleur(donnees.relations.rif[i].couleur)+'">'+donnees.relations.rif[i].commentaire+'</span></td></tr>';
			}
		}	
		
		// Stages
		if ((typeof donnees.relations.stages === "undefined") || (donnees.relations.stages.length == 0)) {
			tableauStages = '<tr><th>Stages</th><td>/</td><td><span class="label label-default">Jamais</span></td></tr> ';
		} else {
			tableauStages = '<tr><th rowspan='+donnees.relations.stages.length+'>Stages</th><td>'+donnees.relations.stages[0].annee+'</td><td><span class="label label-'+Annuaire.traduireCouleur(1)+'">'+donnees.relations.stages[0].nbSujets+' sujets</span></td></tr>';
			for (var /* int */ i = 1; i < donnees.relations.stages.length; i++) {
				tableauStages += '<tr><td>'+donnees.relations.stages[i].annee+'</td><td><span class="label label-'+Annuaire.traduireCouleur(1)+'">'+donnees.relations.stages[i].nbSujets+' sujets</span></td></tr>';
			}
		}
		
		// Entretiens
		if ((typeof donnees.relations.entretiens === "undefined") || (donnees.relations.entretiens.length == 0)) {
			tableauEntretiens = '<tr><th>Entretien</th><td>/</td><td><span class="label label-default">Jamais</span></td></tr> ';
		} else {
			tableauEntretiens = '<tr><th rowspan='+donnees.relations.entretiens.length+'>Entretiens</th><td>'+donnees.relations.entretiens[0].annee+'</td><td><span class="label label-'+Annuaire.traduireCouleur(1)+'">'+donnees.relations.entretiens[0].nbSessions+' sessions</span></td></tr>';
			for (var /* int */ i = 1; i < donnees.relations.entretiens.length; i++) {
				tableauEntretiens += '<tr><td>'+donnees.relations.entretiens[i].annee+'</td><td><span class="label label-'+Annuaire.traduireCouleur(1)+'">'+donnees.relations.entretiens[i].nbSessions+' sessions</span></td></tr>';
			}
		}
		
		tableauRelations += tableauParrainage+'\n'+
'							'+tableauRIF+'\n'+
'							'+tableauStages+'\n'+
'							'+tableauEntretiens+'\n'+'</tbody></table>';
	} else {
		tableauRelations = 'Aucune relation.';
	}

	var /* string */ tableauCommentaires = '';
	if (typeof donnees.commentaires === "undefined") {
		tableauCommentaires = 'Aucun commentaire. <a data-toggle="modal" href="#modalAjoutCommentaire" title="Ajouter Commentaire" class="btn  btn-mini"><i class="icon-plus"></i></a>';
	} else {
		tableauCommentaires = '<table class="table table-stripped tablesorter">\n'+
'										<thead>\n'+
'											<tr> \n'+
'												<th class="first"></th>\n'+
'												<th>Auteur</th>\n'+
'												<th class="first">Poste</th>\n'+
'												<th>Date</th>\n'+
'												<th>Commentaires</th>\n'+
'												<th>'+(Annuaire.droitModification?'<a data-toggle="modal" href="#modalAjoutCommentaire" title="Ajouter Commentaire" class="btn  btn-mini btn-ajoutCommentaire"><i class="icon-plus"></i></a>':'')+'</th></thead> \n'+
'										<tbody>';

		for (var /* int */ i in donnees.commentaires) {
			tableauCommentaires += '<tr> \n'+
'												<td class="first"><span style="display: none;">'+donnees.commentaires[i].categorie+'</span>'+Annuaire.traduireCategorieCommentaire(donnees.commentaires[i].categorie)+'</td> \n'+
'												<td>'+donnees.commentaires[i].personne.prenom +' '+donnees.commentaires[i].personne.nom+'</td> \n'+
'												<td><small>'+Annuaire.traduireRole(donnees.commentaires[i].personne.role)+'</small></td> \n'+
'												<td>'+donnees.commentaires[i].timestamp +'</td>\n'+
'												<td>'+donnees.commentaires[i].contenu +'</td>';
			// Bouton modif
			if (Annuaire.droitModification) { // Ajout des boutons de supression d'un comm' :
				tableauCommentaires += '												<td><a title="Supprimer Commentaire" id-commentaire='+donnees.commentaires[i].id_commentaire+' class="btn btn-danger btn-mini btnSupprCommentaire"><i class="icon-remove"></i></a></td>\n';
			}
			tableauCommentaires += '</tr>';
		}

		tableauEntretiens = '</tbody></table>';
	}
	
	var btnModifEntreprise = '';
	if (Annuaire.droitModification) { // Ajout des boutons de modifications d'un contact :
		btnModifEntreprise += '<a title="Editer Entreprise" data-toggle="modal" href="#modalUpdateEntreprise" class="btn  btn-mini btn-modifEntreprise"><i class="icon-pencil" ></i></a>';
	}
	
	// Génération du bloc entier :
	var content = '<h1>'+donnees.description.nom+' <small>'+donnees.description.secteur+'&#09;'+btnModifEntreprise+'</small></h1>';
	if( donnees.description.description ) {
		content +=
'							<p>'+donnees.description.description+'</p> \n';
	}
	content +=
'							\n'+
'							<div class="accordion" id="accordion2">\n'+
'								<div class="accordion-group">\n'+
'								<div class="accordion-heading">\n'+
'								<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#contacts"> \n'+
'								<h2>Contacts</h2> \n'+
'								</a>\n'+
'							</div>\n'+
'							<div id="contacts" class="accordion-body collapse in"> \n'+
'								<div class="accordion-inner">\n'+
'									 '+tableauContacts+'\n'+
'								</div>\n'+
'							</div>\n'+
'							</div>\n'+
'							<div class="accordion-group"> \n'+
'							<div class="accordion-heading">\n'+
'								<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#relations">\n'+
'								<h2>Relations</h2>\n'+
'								</a>\n'+
'							</div>\n'+
'							<div id="relations" class="accordion-body collapse">\n'+
'								<div class="accordion-inner">\n'+
'									 '+tableauRelations+'\n'+
'								</div>\n'+
'							</div>\n'+
'							</div>\n'+
'							<div class="accordion-group"> \n'+
'							<div class="accordion-heading">\n'+
'								<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#remarques">\n'+
'								<h2>Remarques</h2>\n'+
'								</a>\n'+
'							</div>\n'+
'							<div id="remarques" class="accordion-body collapse">\n'+
'								<div class="accordion-inner">\n'+
'									'+tableauCommentaires+' \n'+
'								</div>\n'+
'							</div>\n'+
'							</div>\n'+
'						</div> ';

	$(".module .hero-unit").html( content );

	// Possibilité de trier les tables :
	$("#contacts table").tablesorter({ 
        headers: { 
            
            7: { 
                // On désactive le tri sur la dernière colonne (celle des boutons) 
                sorter: false 
            } 
        } 
    }); 
	$("#remarques table").tablesorter({ 
        headers: { 
            
            5: { 
                // On désactive le tri sur la dernière colonne (celle des boutons) 
                sorter: false 
            } 
        }, 
		sortList: [[3,1]]
    });
	$("#relations table").tablesorter(); 
	$("#commentaires table").tablesorter(); 
	
	// Ajout de l'étape de confirmation à certaines actions :
	$('.btnSupprContact').click( function(event) {
		if (event.target.children.length == 0)
			{ event.target = event.target.parentNode; } // On a cliqué sur l'icone et non sur le bouton, du coup on remonte au bouton.
		var idContact = parseInt(event.target.getAttribute('id-contact'));
		Annuaire.confirmerAction('Êtes-vous sûr de vouloir supprimer ce contact ?', '', function(id) { Annuaire.supprimerContact(id); }, idContact);
	});

	$('.btnSupprCommentaire').click( function(event) {
		if (event.target.children.length == 0)
			{ event.target = event.target.parentNode; } // On a cliqué sur l'icone et non sur le bouton, du coup on remonte au bouton.
		var idCommentaire = parseInt(event.target.getAttribute('id-commentaire'));
		Annuaire.confirmerAction('Êtes-vous sûr de vouloir supprimer ce commentaire ?', '', function(id) { Annuaire.supprimerCommentaire(id); }, idCommentaire);
	});	
	// Préremplissage du formulaire de modification/ajout d'un contact :
	$('.btn-modifContact').click(function(event){Annuaire.preremplirFormulaireUpdateContact(event)});
	$('.btn-ajoutContact').click(Annuaire.preremplirFormulaireUpdateContactId);
	// Préremplissage du formulaire de modification de l'entreprise :
	$('.btn-modifEntreprise').click(function(event){Annuaire.preremplirFormulaireModifEntreprise(event)});
}