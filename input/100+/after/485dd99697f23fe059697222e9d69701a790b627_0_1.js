function() {
					// Have some "flexibility" for what regards field names, it would be better to return the whole original DF
					// layout, but on a large amount of result which have many fields, there's a very high chance the browser can
					// choke on old systems or new ones even.

					// Search for useful fields, return first result. This is rather hacky, but jQuery is horrible when it comes to
					// matching st. using patterns. (TODO: Improve and return the full DF layout without choking the browser)
					var sDone;
					var bName;
					var bCountry;
					sDone = false; bName = $(this).find('field').filter(function (i) { if ($(this).attr("var").match(/(fn|[^n][^i][^c][^k]name)/i) && sDone != true) { sDone = true; return $(this) } }).children('value:first').text();
					sDone = false; bCountry = $(this).find('field').filter(function (i) { if ($(this).attr("var").match(/(ctry|country.*)/i) && sDone != true) { sDone = true; return $(this) } }).children('value:first').text();

					var bXID = $(this).find('field[var=jid] value:first').text();
					var dName = bName;
					
					// Override "undefined" value
					if(!bXID)
						bXID = '';
					if(!bName)
						bName = _e("Unknown name");
					if(!bCountry)
						bCountry = _e("Unknown country");
					
					// User hash
					var bHash = hex_md5(bXID);
					
					// HTML code
					var bHTML = '<div class="oneresult ' + target + '-oneresult ' + bHash + '">' + 
							'<div class="avatar-container">' + 
								'<img class="avatar" src="' + './img/others/default-avatar.png' + '" alt="" />' + 
							'</div>' + 
							'<div class="one-fn">' + bName + '</div>' + 
							'<div class="one-ctry">' + bCountry + '</div>' + 
							'<div class="one-jid">' + bXID + '</div>' + 
							'<div class="buttons-container">';
					
					// The buddy is not in our buddy list?
					if(!exists('#buddy-list .buddy[data-xid=' + escape(bXID) + ']'))
						bHTML += '<a href="#" class="one-add one-vjud one-button talk-images">' + _e("Add") + '</a>';
					
					// Chat button, if not in welcome/directory mode
					if(target == 'discovery')
						bHTML += '<a href="#" class="one-chat one-vjud one-button talk-images">' + _e("Chat") + '</a>';
					
					// Profile button, if not in discovery mode
					else
						bHTML += '<a href="#" class="one-profile one-vjud one-button talk-images">' + _e("Profile") + '</a>';
					
					// Close the HTML element
					bHTML += '</div></div>';
					
					$(bPath).append(bHTML);
					
					// Click events
					$(bPath + ' .' + bHash + ' a').click(function() {
						// Buddy add
						if($(this).is('.one-add')) {
							$(this).hide();
							
							addThisContact(bXID, dName);
						}
						
						// Buddy chat
						if($(this).is('.one-chat')) {
							if(target == 'discovery')
								closeDiscovery();
							
							checkChatCreate(bXID, 'chat', '', '', dName);
						}
						
						// Buddy profile
						if($(this).is('.one-profile'))
							openUserInfos(bXID);
						
						return false;
					});
					
					// Get the user's avatar
					if(bXID)
						getAvatar(bXID, 'cache', 'true', 'forget');
				}