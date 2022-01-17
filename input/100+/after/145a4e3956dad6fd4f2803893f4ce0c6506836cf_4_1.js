function(){
			var menuStatus = false;
			
			
			// Show menu
			$("a.showMenu").click(function(){
				if(menuStatus != true){				
				$(".ui-page-active").animate({
					marginLeft: "165px",
				  }, 300, function(){menuStatus = true;});
				  return false;
				  } else {
					$(".ui-page-active").animate({
					marginLeft: "0px",
				  }, 300, function(){menuStatus = false;});
					return false;
				  }
			});
			
			//Slide on page after menu has been actived (swipe to left from anywhere)
			$('#menu, .pages').live("swipeleft", function(){
				if (menuStatus){	
				$(".ui-page-active").animate({
					marginLeft: "0px",
				  }, 300, function(){menuStatus = false;});
				  }
			});
			
			//Slide on header to get menu
			$('.headers').live("swiperight", function(){
				if (!menuStatus){	
				$(".ui-page-active").animate({
					marginLeft: "165px",
				  }, 300, function(){menuStatus = true;});
				  }
			});
			
			$('div[data-role="page"]').live('pagebeforeshow',function(event, ui){
				menuStatus = false;
				$(".pages").css("margin-left","0");
			});
			
			// Menu behaviour
			$("#menu li a").click(function(){
				var p = $(this).parent();
				if($(p).hasClass('active')){
					$("#menu li").removeClass('active');
				} else {
					$("#menu li").removeClass('active');
					$(p).addClass('active');
				}
			});
		
			// Tabs 
			$('div[data-role="navbar"] a').live('click', function () {
				$(this).addClass('ui-btn-active');
				$('div.content_div').hide();
				$('div#' + $(this).attr('data-href')).show();
			});
	}