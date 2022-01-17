function(){
				var el = $(this);
				var seekid = el.data("seekid");
				C4.send("ACCEPT_SEEK "+C4.padId(seekid));
			}