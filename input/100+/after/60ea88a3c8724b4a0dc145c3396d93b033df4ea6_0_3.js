function(){
		$('a[name="duplicateBuild"]').each(function(i, domEle){
			$(domEle).click(function(){
				var task_id = $(domEle).attr("id").split("-");
				$.get('getbuild',
					{"task_id": task_id[1]},
					function(data){
						buildObj = $.parseJSON(data);
						$('#popView-repos').val(buildObj['repos']);
						$('#popView-branch').val(buildObj['branch']); 
						$('#popView-version').val(buildObj['version']); 
						$('#popView-author').val(buildObj['author']);
						$('#popView-package_list').val(buildObj['package_list']);

						//Set selectAction as editBuild
						$('#popView-selectAction').val('duplicateBuild');

						//Update the popup view title and build ID
						$('#popView-title').text('Duplicate build -- Task ID ' + task_id[1]);

						$('#popView-selectBuildID').val(task_id[1]);
					}
				);
			});	
		});

		$('a[name="editBuild"]').each(function(i, domEle){
			$(domEle).click(function(){
				var task_id = $(domEle).attr("id").split("-");
				$.get('getbuild',
					{"task_id": task_id[1]},
					function(data){
						buildObj = $.parseJSON(data);
						$('#popView-repos').val(buildObj['repos']);
						$('#popView-branch').val(buildObj['branch']); 
						$('#popView-version').val(buildObj['version']); 
						$('#popView-author').val(buildObj['author']);
						$('#popView-package_list').val(buildObj['package_list']);
						
						//Set selectAction as editBuild
						$('#popView-selectAction').val('editBuild');

						//Update the popup view title and build ID
						$('#popView-title').text('Edit build -- Task ID ' + task_id[1]);
						$('#popView-selectBuildID').val(task_id[1]);
					}
				);
			});	
		});
	
		$('#popView-Save').click(function(){
			//Check form validate firstly
			if (! $('#actionBuildForm').valid()){
				return false;
			}

			if ($('#popView-selectAction').val() == 'duplicateBuild') {
				$.post('add', 

					{
					 "repos": $('#popView-repos').val(),
					 "branch": $('#popView-branch').val(), 
					 "version": $('#popView-version').val(), 
					 "package_list": $('#popView-package_list').val(),
					 "author": $('#popView-author').val()
					 },

					 function(data){
						$("#popupViewBuild").modal("hide");
						location.reload();
					 }
				);
			} else if ($('#popView-selectAction').val() == 'editBuild'){
				$.post('updatebuild', 

					{
					 "task_id": $('#popView-selectBuildID').val(), 
					 "repos": $('#popView-repos').val(),
					 "branch": $('#popView-branch').val(), 
					 "version": $('#popView-version').val(), 
					 "package_list": $('#popView-package_list').val(),
					 "author": $('#popView-author').val()
					 },

					 function(data){
						$("#popupViewBuild").modal("hide");

						location.reload();
					 }
				);
			}
		});

		$('#mailToAdmin').click(function(){
				$('#popView-MailFrom').val(""),
				$('#popView-MailSubject').val("");
				$('#popView-MailMessage').val("");
		});

		$('#popView-Send').click( function(){
			if ($('#popView-sendMailForm').valid()) {
				$.post('sendmail',
					{
						"from_address": $('#popView-MailFrom').val(),
						"to": $('#popView-MailTo').val(),
						"subject": $('#popView-MailSubject').val(),
						"message": $('#popView-MailMessage').val()
					},
					function(data){
						$("#popupViewMail").modal("hide");
					}
				);
			}
		});
		
	}