function authentication_init_complete(response) {
    Bum.instance_id = response.instance_id;
    Bum.csrf_token = response.csrf_token;
    Bum.init = true;
    console.log("Authenticated; instance_id: " + Bum.instance_id + " csrf_token: " + Bum.csrf_token);
    if (Reauth_El) {
        el = Reauth_El;
        Reauth_El = null;
	console.log("Since this is a re-auth, we need to bum something");
        bum_it(el);
    } else {
        Bum.find_links();
    }
}