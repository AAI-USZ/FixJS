function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var message = JSON.parse(req.responseText);

				switch (message.type) {
					case "groupStatus":
						var groupEl      = document.getElementById("group-" + message.groupID)
							, completeEl   = groupEl.querySelector(".progress .complete")
							, processingEl = groupEl.querySelector(".progress .processing")
							;

						completeEl.style.width = (message.complete/message.total*100).toString() + "%";
						processingEl.style.width = (message.processing/message.total*100).toString() + "%";
						break;
				}
			} else {
				setTimeout(subscribeGroups, 3000);
			}
		}
	}