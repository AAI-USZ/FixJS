function(){
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
		}