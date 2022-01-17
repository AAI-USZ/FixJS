function authentication_init_complete(response) {
    Bum.instance_id = response.instance_id;
    Bum.csrf_token = response.csrf_token;
    Bum.init = true;
    if (Reauth_El) {
        el = Reauth_El;
        Reauth_El = null;
        bum_it(el);
    } else {
        Bum.find_links();
    }
}