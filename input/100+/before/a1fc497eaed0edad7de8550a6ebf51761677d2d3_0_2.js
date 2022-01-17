function() { 
		// show the dialog
		$('#addRepoUserDialog').load('adduser/', function() {
			// make the list selectable
			$( "#addRepoUserList" ).selectable();

		});
		$('#addRepoUserDialog').dialog({
			title: 'Add user',
			buttons: {
				// add the users to the repo
				Add: function() {
					var selectedUsers = [];
					
					$( ".ui-selected", this ).each(function() {
						// add each user to the repository
						// retrieve the current repository name
						var url = '/rest/repository/' + $('#currentRepo').html() + '/user/' + $(this).text() + '/';
						$.post(url, function(data) {
							showMessage("success", "Changes successfully saved");
						}).error(function(error) {
							showMessage("error", error.responseText);
						});
						
					});
					
					refreshRepoUserList();
					
					
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
	}