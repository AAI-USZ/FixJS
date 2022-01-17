function(){
				var el = $(this);
				var seekid = el.data("seekid");
				C4.send("ACCEPT_SEEK "+C4.padId(seekid));
				C4.add_handler(C4.cb_new_game);
			}