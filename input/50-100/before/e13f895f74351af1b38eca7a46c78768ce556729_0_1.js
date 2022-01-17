function()
		{
			html = 	'<div class="span3 author-photo dashboard-photo">'+
						'<div class="profile-image-wrapper">'+
							'<img src="<%= thumbnail_url %>" alt="author-photo" width="100%" height="100%" class="dashboard-profile-photo">'+
						'</div>'+
						'<div class="gradient" style="height:100%">'+
						'</div>'+
					
					'</div>'+
					
					'<div class="span8 author-bio" style="height:auto">'+
					
						'<div>'+
							
							'<h3 class="dashboard-name pull-left"><%= display_name%></h3>'+
							'<a class="btn btn-mini btn-inverse edit" href="." style="margin-top: 10px;margin-left: 8px;"><i class="icon-pencil icon-white"></i> edit</a>'+
							'<div class="btn-group save-data" >'+
									'<button class="btn btn-inverse btn-mini save hide" style="margin-top: 10px;margin-left:8px">save</button>'+
									'<button class="btn btn-mini cancel hide" style="margin-top: 10px">cancel</button>'+
							'</div>'+
							

							'<h6 style="clear:both">Authored 5 projects since joining in <%= join_date %></h6>'+
							'<div style="margin-bottom:20px">'+
								'<p class="card dashboard-bio"><%= bio %></p>'+
								'<div class="user-image-upload card hide"><label class="control-label" for="user-image-upload-file" style="display:inline">Update your profile picture</label><input id="user-image-upload-file" type="file" size="40" name="imagefile" class="pull-right"></input></div>'+
								'<div class="user-image-upload card hide"  style="clear:both"><label style="display:inline" class="control-label" for="user-image-upload-background">Update your background picture</label> <input id="user-image-upload-background" type="file" size="40" name="imagefile"  class="pull-right"></input></div>'+
								
								
							'</div>'+
						'</div>'+	
						'<div class="shadow" style="height:162px">'+
						'</div>'+
					
					'</div>'+
					'<div class="span3">'+
						'<a class="btn btn-info pull-right" href=".">Start a new project</a>'+
					 '</div>';
			
			return html;
		}