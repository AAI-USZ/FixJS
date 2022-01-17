function() {
	//Page index de matériel
	$('#t_informations').click(function() {
		$('#informations').toggle('fast');
		toogleChevron('#i_informations');
	});
	$('#t_suivis').click(function() {
		$('#suivis').toggle('fast');
		toogleChevron('#i_suivis');
	});
	$('#t_emprunts').click(function() {
		$('#emprunts').toggle('fast');
		toogleChevron('#i_emprunts');
	});
	
	//Page find de matériel
	$('#t_filter').click(function() {
		$('#filter').toggle('fast');
		toogleChevron('#i_filter');
	});
	$('#t_result').click(function() {
		$('#result').toggle('fast');
		toogleChevron('#i_result');
	});
}