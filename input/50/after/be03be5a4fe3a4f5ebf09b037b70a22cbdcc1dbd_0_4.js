function(){
				var el = $(this);
				var seekid = el.data("seekid");
				C4.send("CANCEL_SEEK "+C4.padId(seekid));
			}