function facebook_init_complete() {
    var data = { 'access_token': Bum.access_token };
    console.log("Facebook init is complete; authenticating");
    $.post(Bummer_Api_Server + '/api/fuckers/fb_authenticate', data, authentication_init_complete);
}