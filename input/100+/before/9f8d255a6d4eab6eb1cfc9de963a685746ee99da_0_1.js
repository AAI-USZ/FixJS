function(){
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
	}