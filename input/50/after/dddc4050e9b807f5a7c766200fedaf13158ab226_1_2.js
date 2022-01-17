function kLoadData(force)
{
	if (force)
		kForceRefresh = true;

	$.ajax({
	    'url': '/api/videos',
	    'dataType': 'json',
	    'success': kOnData,
	    'error': kFatal
	});
}