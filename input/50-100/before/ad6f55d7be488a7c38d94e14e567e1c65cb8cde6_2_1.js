function bummer_init() {
    var profile_link = $('.headerTinymanPhoto').attr('id');
    var parts = profile_link.split('_');
    var id = parts[3];
    if (id) {
	Current_FBUID = id;
	Port.postMessage({ type: 'access_token_request', id: Current_FBUID });
    }
}