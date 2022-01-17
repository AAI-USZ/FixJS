function(donnees) {
			if (donnees.code == "ok") {
				if (donnees.id >= 0) {
					if (idEntrepriseActuelle == Annuaire.infoEntrepriseCourante.description.id_entreprise) { // Si l'utilisateur est toujours sur la même entreprise, on met à jour son affichage :
						nouveauCommentaire.id = donnees.id;
						if (typeof Annuaire.infoEntrepriseCourante.commentaires === "undefined") { Annuaire.infoEntrepriseCourante.commentaires = []; }
						nouveauCommentaire.contenu = encodeURIComponent(nouveauCommentaire.contenu);
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
			else {
				Annuaire.afficherErreur('Commentaire : Une erreur est survenue ('+donnees.code+')' );
			}
		}