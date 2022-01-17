function getAffiliates(role_id, callback) {
	var url = S3.Ap.concat('/pr/role/' + role_id + '.s3json?show_ids=true');
	$.getJSON(url, callback);
}