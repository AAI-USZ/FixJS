function huntsel(x) {
	$('activity').innerHTML = '';
		$('students').innerHTML = '';
	if (x != 'null') {
		var hunt = hunts[x];
		ajax("what=activities&id=" + hunt['id'], PHP_FOLDER_LOCATION + 'user_retreive.php', create_activity_obj);

	} else {
		
		feed = {};
		activities = [];
	}
}