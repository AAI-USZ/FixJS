function() { 
		// show the dialog
		$('#addRepoUserDialog').load('adduser/', function() {
			// make the list selectable
			$( "#addRepoUserList" ).selectable();
			
			// When a character is entered in the input form
			$("#filter-user").keyup(function(){
				// Retrieve the input field text and reset the count to zero
				var filter = $(this).val(), count = 0;
				
				// Loop through the comment list
				$("li.user-item").each(function(){
				
					// If the list item does not contain the text phrase fade it out
					if ($(this).text().search(new RegExp(filter, "i")) < 0) {
						$(this).fadeOut();
						
					// Show the list item if the phrase matches and increase the count by 1
					} else {
						$(this).show();
						count++;
					}
				});
				
				// Update the count
				var numberItems = count;
				//$("#filter-count").text("Number of Comments = "+count);
			});

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