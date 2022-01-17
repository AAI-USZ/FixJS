function afficherLibelle(/* string */ libelle, classesSup) {
	if (libelle == 'Pro') { return '<span title="Pro" class="label '+classesSup+'"><i class="icon-book"></i></span>' };
	if (libelle == 'Perso') { return '<span title="Perso" class="label '+classesSup+'"><i class="icon-home"></i></span>' };
	if (libelle == 'Bureau') { return '<span title="Bureau" class="label '+classesSup+'"><i class="icon-home"></i></span>' };
	if (libelle == 'Fixe') { return '<span title="Fixe" class="label '+classesSup+'"><i class="icon-home"></i></span>' };
	if (libelle == 'Mobile') { return '<span title="Mobile" class="label '+classesSup+'"><i class="icon-road"></i></span>' };
	return '<span title="'+libelle+'" class="label '+classesSup+'"><i class="icon-question-sign"></i></span>';
}