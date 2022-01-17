function sendAsyncEvent(data, fn, format)
{
	if($.type(data) === 'string' && data.length > 0) {
		// Got serialized data
		data = data + '&app_mode=async&_txp_token=' + textpattern._txp_token;
	} else {
		data.app_mode = 'async';
		data._txp_token = textpattern._txp_token;
	}
	format = format || 'xml';
	$.post('index.php', data, fn, format);
}