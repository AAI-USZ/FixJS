function() {										// Wait for everything to load. 

	
	/************ Navigations  ******************/
	showHome();
	
	var linkID;	
	$('.nav > li > a').live('click', function () {					// Show page contents depending on what link was clicked. 
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
	});
		
	$('#homeNav').live('click', function () {						// Home link
			showHome();
	});

	$('.showProfile').live('click', function () {						// Home link
			$('.page').hide();
			var userid = $(this).attr('userid');
		  dscourse.UserProfile(userid);
		  $('#profilePage').show();
		  $('html, body').animate({scrollTop:0});			// The page scrolls to the top to see the notification

	});    
	
	$('.courseLink').live('click', function () {						// Home link
		$('.page').hide();
		var courseid = $(this).attr('courseid');
		dscourse.getCourse(courseid);
		$('#coursePage').show();
		$('html, body').animate({scrollTop:0});			// The page scrolls to the top to see the notification

	});

	$('.discussionLink').live('click', function () {						// Home link
		var discID = $(this).attr('discID');
		dscourse.SingleDiscussion(discID);
		$('.page').hide();
		$('#footerFixed').hide();
		$('#discussionWrap').show();
		$('html, body').animate({scrollTop:0});			// The page scrolls to the top to see the notification

	});
	
		
	function showHome(){
		$('.page').hide();			
		$('#homePage').show();
	}


	/************ Discussions  ******************/

	$('#discussionForm').hide();
	$('#addDiscussionView').addClass('linkGrey');

	$("#discussionStartDate").datepicker({ dateFormat: "yy-mm-dd" });			// Date picker jquery ui initialize for the date fields
	$("#discussionEndDate").datepicker({ dateFormat: "yy-mm-dd" });

	$("#courseStartDate").datepicker({ dateFormat: "yy-mm-dd" });			// Date picker jquery ui initialize for the date fields
	$("#courseEndDate").datepicker({ dateFormat: "yy-mm-dd" });			// Date picker jquery ui initialize for the date fields


		$("#commentWrap").draggable();


		$('#quickButtons').button();
}