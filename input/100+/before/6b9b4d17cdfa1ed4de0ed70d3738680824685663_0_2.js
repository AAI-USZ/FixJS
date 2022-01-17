function() {

	/* Use this js doc for all application specific JS */
	
	// When the user votes, change the color of the selected option
	
	$('.boic_category li a.button').click(function(e) {
		e.preventDefault();
		$selected = $(this).text();
		$parent_li = $(this).parent('li');
		$throbber = $parent_li.find('h4 img');
		$throbber.show();
		//Remove all the options
		$options = $(this).parent('li').find('a.button, br').remove();
		$options.removeClass('blue').addClass('white');
		$(this).removeClass('white').addClass('blue');
		
		//Write in the new winner
		$parent_li.append('<p><em><span style="font-size:1.1em;">'+$selected+'</span></em> <a href="#" class="add_comment">Add Comment</a></p>');
		$parent_li.append('<div class="comment_area" style="display:none;"><textarea name="comment" rows="4" style="width:96%;"></textarea><p><a href="#" class="button blue save">Save</a> <a href="#" class="button white cancel">Cancel</a></p></div>');
		// Make it look like we're saving data
		setTimeout("$throbber.hide()", 1200);
	});
	
	// Show the comment section
	$('.add_comment').live('click',function(e) {
		e.preventDefault();
		$(this).parents('li').children('div').slideDown('slow')
		
	});
	
	// save/hide the comment section
	$('div.comment_area a').live('click', function(e) {
		e.preventDefault();
		if ($(this).hasClass('save')) {
			$(this).parents('li').find('h4 img').show();
		};
		$(this).parents('div').first().slideToggle();
		setTimeout("$throbber.hide()", 1200);
	});
	

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */
	
	var tabs = $('dl.tabs');
		tabsContent = $('ul.tabs-content')
	
	tabs.each(function(i) {
		//Get all tabs
		var tab = $(this).children('dd').children('a');
		tab.click(function(e) {
			
			//Get Location of tab's content
			var contentLocation = $(this).attr("href")
			contentLocation = contentLocation + "Tab";
			
			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {
			
				e.preventDefault();
			
				//Make Tab Active
				tab.removeClass('active');
				$(this).addClass('active');
				
				//Show Tab Content
				$(contentLocation).parent('.tabs-content').children('li').css({"display":"none"});
				$(contentLocation).css({"display":"block"});
				
			} 
		});
	});
	
	
	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */
	
	$('input, textarea').placeholder();
	
	
	/* DISABLED BUTTONS ------------- */
	/* Gives elements with a class of 'disabled' a return: false; */
	
	
}