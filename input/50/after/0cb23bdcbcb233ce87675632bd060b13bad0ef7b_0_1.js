function() {
					if($.trim(upload_frame.text()) !== "") {
						alert(upload_frame.text());
					}
					else {
						$("#manage_tab_button").click();
					}
					upload_frame.detach();
				}