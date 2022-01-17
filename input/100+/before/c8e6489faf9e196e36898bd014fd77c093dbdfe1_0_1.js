function() {
        var linkID = 'link'+i;//$(this).find('linkID').text();
	var postID = 'post'+i;//$(this).find('postID').text();
	var data = $(this).find('date').text();
        var titolo = $(this).find('title').text();
        var content = $(this).find('content').text();
        var link_markup = '<li>'+data+' <a href="#" id="'+linkID+'">'+titolo+'</a><br><div class="comment" id="'+postID+'">'+content+'<p><a href="#" id="close'+i+'">CLOSE</a></p></div></li>';

	$(link_markup).appendTo('#postBlog');
	$('#'+postID).hide();
	
	$('a#'+linkID).click(function(){
	  $('#'+postID).slideToggle('fast');
	});
	$('a#close'+i).click(function(){
	  $('#'+postID).slideUp('fast');
	});
	i++;
      }