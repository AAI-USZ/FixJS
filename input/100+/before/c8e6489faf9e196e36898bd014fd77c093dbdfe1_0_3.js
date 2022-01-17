function(){

  if($.browser.msie==true){
    alert("IE Browser in not supported!");
    $('#content').html("This site is not supported by Internet Explorer.<br>Install a browser actual: Firefox, Opera or Chrome.");
    return false;
  }
  $("<h3>Blog Post:</h3>").appendTo('#postBlog');
  var i = 0;
  $.ajax({ type: "GET", url: "resources/post.xml", dataType: "xml",
     
    success: function(xml) {
       
      $(xml).find('post').each(function() {
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
      });    
    },
    error: function(request, error, tipo_errore) { alert(error+': '+ tipo_errore); }
  });

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
    error: function(request, error, tipo_errore) { alert(error+': '+ tipo_errore); }
  });


/*
$(".menu").click(function(){
	a = $(this).attr("id");
	page = $(this).attr("href");
	alert(a);
	alert(page);


});
  */
//$('#content').text(content);
  

}