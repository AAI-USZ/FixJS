function () {					// Show page contents depending on what link was clicked. 
		linkID = $(this).attr('id');
		$('.page').hide();	
		
		switch(linkID)
		{
		case 'usersNav':
		  $('#usersPage').show();
		  dscourse.imgUpload = 'user';
		  break;
		case 'coursesNav':
		  $('#coursesPage').show();
		  dscourse.imgUpload = 'course';
		  break;
		case 'discussionsNav':
		  $('#discussionsPage').show();
		  break;
		case 'profileNav':
		  var userid = $(this).attr('userid');
		  dscourse.UserProfile(userid);
		  $('#profilePage').show();
		  break;		  
		default:
		  $('#homePage').show();
		}
	}