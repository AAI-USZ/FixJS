function preremplirFormulaireModifEntreprise(event) {
	if (typeof Annuaire.infoEntrepriseCourante.description !== "undefined") {
		$('#formUpdateEntrepriseId').val(Annuaire.infoEntrepriseCourante.description.id_entreprise);
		$('#formUpdateEntrepriseNom').val(Annuaire.infoEntrepriseCourante.description.nom);
		$('#formUpdateEntrepriseSecteur').val(Annuaire.infoEntrepriseCourante.description.secteur);
		$('#formUpdateEntrepriseDescription').val(Annuaire.infoEntrepriseCourante.description.description);
	}
}