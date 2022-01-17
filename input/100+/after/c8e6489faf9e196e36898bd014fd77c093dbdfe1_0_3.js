function(){

if($.browser.msie==true){
	alert("IE Browser in not supported!");
	$('#content').html("This site is not supported by Internet Explorer.<br>Install a browser actual: Firefox, Opera or Chrome.");
	return false;
}
	
	// System
	
	$.ajax({ type: "GET", url: "resources/system.xml", dataType: "xml",

	success: function(xml) {

	$(xml).find('xblog').each(function() {
		var siteName = $(this).find('siteName').text();
		var theme = $(this).find('theme').text();
		var subTitle = $(this).find('subTitle').text();
		$("#theme").attr("href", "themes/" + theme + ".css");
		$(siteName).appendTo('#header2');
		$(subTitle).appendTo('#subtitle');
	});
	},
	error: function() { alert("XBlog: Error generating system attributes!"); }
	});



	// Post Blog

	$("<h3>Blog Post:</h3>").appendTo('#postBlog');
	var i = 0;
	$.ajax({ type: "GET", url: "resources/post.xml", dataType: "xml",

	success: function(xml) {

	$(xml).find('post').each(function() {
		var linkID = 'link'+i;
		var postID = 'post'+i;
		var data = $(this).find('date').text();
		var title = $(this).find('title').text();
		var content = $(this).find('content').text();
		var link_markup = '<li>'+data+' <a href="#" id="'+linkID+'">'+title+'</a><br><div class="comment" id="'+postID+'">'+content+'<p><a href="#" id="close'+i+'">CLOSE</a></p></div></li>';

	$(link_markup).appendTo('#postBlog');
	$('#'+postID).hide();
	
	$('a#'+linkID).click(function(){
	  $('#'+postID).slideToggle('fast');
	});
	$('a#close'+i).click(function(){
	  $('#'+postID).slideUp('fast');
	});
	i++;
	});
	},
	error: function() { alert("XBlog: Error generating post blog!"); }
	});

// Menu management

	$.ajax({ type: "GET", url: "resources/menu.xml", dataType: "xml",

	success: function(xml) {

	$(xml).find('menu').each(function() {
		var menuID = $(this).find('id').text();
		var titolo = $(this).find('title').text();
		var url = $(this).find('url').text();
		var link_markup = '<td class="headitem"><a href="'+url+'" class="menu" id="'+menuID+'">'+titolo+'</a></td>';

		$(link_markup).appendTo('#menuBar');
	});    
	},
	error: function() { alert("XBlox: Error generating menu"); }
	});

}