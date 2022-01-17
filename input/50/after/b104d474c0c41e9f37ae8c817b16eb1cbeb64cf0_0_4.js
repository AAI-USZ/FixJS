function(value){
				if (null != value) {
					progressbar.progressbar({ value: value });
				} else {
					dialog.dialog('destroy');
				}
			}