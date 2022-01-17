function facebook_init_complete() {
    var data = { 'access_token': Bum.access_token };
    $.post(Bummer_Api_Server + '/api/fuckers/fb_authenticate', data, authentication_init_complete);
}