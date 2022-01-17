function() {
           // Prepare layout options.
      var options = {
        autoResize: true, // This will auto-update the layout when the browser window is resized.
        container: $('#main'), // Optional, used for some extra CSS styling
        offset: 2, // Optional, the distance between grid items
        itemWidth: 210 // Optional, the width of a grid item
      };
      
       // Get a reference to your grid items.
      var handler = $('#main li');
      
      // Call the layout function.
      handler.wookmark(options);
      
      // Capture clicks on grid items.
      $('#tiles li .comment_button').click(function(){
        // Randomize the height of the clicked item.
        var newHeight = $(this).parent().siblings("a").children("img").height() + 110;
        $(this).parent().parent().css('height', newHeight+'px');
        // Update the layout.
        handler.wookmark();
      });
        //sign in button
            $(".dropdown-toggle").click(function(e) {          
				e.preventDefault();
                $("#signin_menu").toggle();
				
            });
			
			$("#signin_menu").mouseup(function() {
				return false
			});
			$(document).mouseup(function(e) {
				if($(e.target).parent("a.dropdown-toggle").length==0) {
					
					$("#signin_menu").hide();
				}
			});

        //button on top of image
       $('ul#tiles a').mouseover(function(){
        $(this).prev().css('display','inline-block');
      });	
      $('ul#tiles a').mouseout(function(){
 
         $(this).prev().css('display','none');
      
     });
      
     $('.button_group').mouseout(function(){
      $(this).css('display','none');
   });
     $('.button_group').mouseover(function(){
      $(this).css('display','inline-block');
   });

   //comment list style

   $(".comment").filter(':even').css("background-color","#F2F2F2");
   $(".comment").mouseover(function(){
   $(this).addClass("comment_background");
});
   $(".comment").mouseout(function(){
   $(this).removeClass("comment_background");
});

  //comment button click
  $('.comment_button').click(function(){
   $(this).parent().siblings(".comment_div").css("display","block");
});
  $('.title_popover').popover('hide');




}