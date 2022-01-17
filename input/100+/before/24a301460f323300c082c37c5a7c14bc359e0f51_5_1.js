function () {					// Show page contents depending on what link was clicked. 
		linkID = $(this).attr('id');
		$('.page').hide();	
		
		switch(linkID)
		{
		case 'usersNav':
		  $('#usersPage').show();
		  break;
		case 'coursesNav':
		  $('#coursesPage').show();
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