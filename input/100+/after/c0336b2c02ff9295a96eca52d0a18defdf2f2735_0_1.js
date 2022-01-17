function(data) {
				var messages = data.messages;
				for (var i=0; i<messages.length; i++) {
					addLine(messages[i]);
					latestNum = Math.max(latestNum, messages[i]['id']);
				}
				if (typeof data.counter!=="undefined") {
					userCounter = data.counter;
				}
				if (typeof data.online!=="undefined") {
					// Reload user lists.
					$("#online > li, #away > li").appendTo(holdingList);
					for (var i=0; i<data.online.length; i++) {
						var currentUser = data.online[i];
						if (currentUser.counter==userCounter) {
							// Set self-related things here.
							user.group = currentUser.group;
						}
						// Get or create a list item.
						var listItem = $(holdingList).find('#user'+currentUser.counter);
						if (listItem.length==0) {
							var listItem = $('<li />').attr('id', 'user'+currentUser.counter);
							listItem.click(showActionList);
						}
						listItem.css('color', '#'+currentUser.color).text(currentUser.name);
						if (listItem.data().group!=currentUser.group) {
							listItem.removeClass('mod').removeClass('silent');
							if (currentUser.group=='mod') {
								listItem.addClass('mod').attr('title', 'Moderator');
							} else if (currentUser.group=='silent') {
								listItem.addClass('silent').attr('title', 'Silent');
							}
						}
						if (currentUser.counter==userCounter) {

							listItem.addClass('self').append(' (you)');
						}
						listItem.removeData().data(currentUser).appendTo('#'+currentUser.state);
						if (actionListUser==listItem) {
							listItem.click();
						}
					}
					$(holdingList).empty();
				}
				if (typeof hidden!=="undefined" && document[hidden]==true) {
					document.title = "New message - "+ORIGINAL_TITLE;
				}
			}