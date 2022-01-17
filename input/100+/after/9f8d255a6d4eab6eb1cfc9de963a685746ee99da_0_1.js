function(){
		// get the repository info
		var url = '/rest/repository/' + $('#currentRepo').html() + '/';
		$.get(url, function(repoInfo){
			var userList = repoInfo.user_list;
			var readList = repoInfo.user_read_list;
			var writeList = repoInfo.user_write_list;
			var hasReadRight;
			var hasWriteRight;
			var textToInsert;

			var k,j;
			
			// for each user
			for(var i = 0; i < userList.length; i++){
				// check if user is in read list
				hasReadRight = false;
				// if user is "everyone"
				if (userList[i].username === "everyone"){
					// set read only permissions
					hasReadRight = true;
					hasWriteRight = false;
				} else {
				
					for(k = 0; k < readList.length; k++){
						// if the user is in the list
						if (readList[k].username === userList[i].username){
							// user has read rights
							hasReadRight = true;
						}
					}

					// check if user is in write list
					hasWriteRight = false;
					for(k = 0; k < writeList.length; k++){
						// if the user is in the list
						if (writeList[k].username === userList[i].username){
							// user has read rights
							hasWriteRight = true;
						}
					}
				}
				
				// display line about the user
				j = 0;
				textToInsert = [];
				textToInsert[j++] = '<tr class=' + userList[i].username + '>';
				textToInsert[j++] = '<td>' + userList[i].username + '</td>\n';
				// if user is everyone
				if(userList[i].username == 'everyone'){
					// read only permissions
					textToInsert[j++] = '<td><input class="" type="checkbox" checked="checked" disabled="disabled" /></td>\n';
					textToInsert[j++] = '<td><input class="" type="checkbox" disabled="disabled" /></td>\n';


				} else {
					if(hasReadRight === true)
						textToInsert[j++] = '<td><input class="readRepoUser permissionsUser" type="checkbox" checked="checked" /></td>\n';
					else
						textToInsert[j++] = '<td><input class="readRepoUser permissionsUser" type="checkbox" /></td>\n';
					
					
					if(hasWriteRight === true)
						textToInsert[j++] = '<td><input class="writeRepoUser permissionsUser" type="checkbox" checked="checked" /></td>\n';
					else
						textToInsert[j++] = '<td><input class="writeRepoUser permissionsUser" type="checkbox" /></td>\n';
				}
				
				textToInsert[j++] = '<td><!-- Icons -->';
				textToInsert[j++] = '<a class="deleteRepoUser" href="#" title="Delete"><img src="/static/images/icons/cross.png" alt="Delete" /></a>';
				textToInsert[j++] = '</td>';
				textToInsert[j++] = '</tr>\n';

				$('#repoUserList').append(textToInsert.join(''));
				
				
				
			}
			// register the new elements events
			bindRepoUserBehaviors();


		}, "json");


		/*
		var url = '/rest/repository/' + $('#currentRepo').html() + '/user/';
		$.get(url, function(repoUserList){
			$("#repoUserList").html('');
			var i = 0;
			//var j = 0
			var textToInsert = [];
		
			for(i; i < repoUserList.length; i++){
				// Get permissions for each user
				var url = '/rest/repository/' + $('#currentRepo').html() + '/user/' + repoUserList[i] + '/';
				$.ajax({
					url: url,
					context: repoUserList[i],
					type: "GET",
					dataType: "json",
					success: function(permissions){
						var j = 0;
						textToInsert[j++] = '<tr class=' + this + '>';
						textToInsert[j++] = '<td>' + this + '</td>\n';
						// if user is everyone
						if(this == 'everyone'){
							// read only permissions
							textToInsert[j++] = '<td><input class="" type="checkbox" checked="checked" disabled="disabled" /></td>\n';
							textToInsert[j++] = '<td><input class="" type="checkbox" disabled="disabled" /></td>\n';


						} else {
							if(permissions['read'] === true)
								textToInsert[j++] = '<td><input class="readRepoUser permissionsUser" type="checkbox" checked="checked" /></td>\n';
							else
								textToInsert[j++] = '<td><input class="readRepoUser permissionsUser" type="checkbox" /></td>\n';
							
							
							if(permissions['write'] === true)
								textToInsert[j++] = '<td><input class="writeRepoUser permissionsUser" type="checkbox" checked="checked" /></td>\n';
							else
								textToInsert[j++] = '<td><input class="writeRepoUser permissionsUser" type="checkbox" /></td>\n';
						}
						
						textToInsert[j++] = '<td><!-- Icons -->';
						textToInsert[j++] = '<a class="deleteRepoUser" href="#" title="Delete"><img src="/static/images/icons/cross.png" alt="Delete" /></a>';
						textToInsert[j++] = '</td>';
						textToInsert[j++] = '</tr>\n';

						$('#repoUserList').append(textToInsert.join(''));
						// register the new elements
						bindRepoUserBehaviors();
					},
					
				});
				
			}
			
			// if no user in the repo
			if ( repoUserList.length === 0){
				// print a nice message
				$('#repoUserList').append("<td>You have not added any user yet</td><td></td><td></td><td></td>");
			}
		}, "json");
		
		*/
	}