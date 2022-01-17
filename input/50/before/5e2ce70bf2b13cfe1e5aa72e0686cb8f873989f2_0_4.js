function(){
				var el = $(this);
				var seekid = el.data("seekid");
				C4.send("CANCEL_SEEK "+C4.padId(seekid));
				C4.add_handler(C4.cb_cancel_seek);
			}