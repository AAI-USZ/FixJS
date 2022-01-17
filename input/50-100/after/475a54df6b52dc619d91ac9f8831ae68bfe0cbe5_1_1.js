function (data, status) {
			
			if(typeof data != "object"){
				location = location.protocol + "//" + location.host + "?returnUrl=" + location.pathname;
				return;
			}

			$("#goal-name-" + goalId).text(newName);
			$("#goal-cancel-button-" + goalId).click();
		}