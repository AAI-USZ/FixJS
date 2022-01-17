function(){
					actionTaken = true;
					counter[priority]--;
					redrawCounter(priority);
					delId = "#console_row_"+nr;
					$(delId).remove();
				}