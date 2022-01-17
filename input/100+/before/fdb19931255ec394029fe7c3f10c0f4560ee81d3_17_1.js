function(opts,r){if(opts.btn)$(opts.btn).done_working();if(opts.show_spinner)hide_loading();if(opts.freeze)unfreeze();if(wn.boot&&wn.boot.sid&&wn.get_cookie('sid')!=wn.boot.sid){if(!wn.app.logged_out){msgprint('Session Expired. Logging you out');wn.app.logout();}
return;}
if(r.server_messages)msgprint(r.server_messages)
if(r.exc){console.log(r.exc);};if(r['403']){wn.container.change_to('403');}
if(r.docs)LocalDB.sync(r.docs);}