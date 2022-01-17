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
		
	}