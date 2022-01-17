function(booksInfo) {
       for (id in booksInfo) {
          var book = booksInfo[id];
          var isbn = book.bib_key.substring(5);
          
          $("."+isbn).each(function() {
              var a = document.createElement("a");
              a.href = book.info_url;
				      if (typeof(book.thumbnail_url) != "undefined") {
	               	var img = document.createElement("img");
	                img.src = book.thumbnail_url;
					        $(this).append(img);
                  var re = /^openlibrary-thumbnail-preview/;
                  if ( re.exec($(this).attr("id")) ) {
                      $(this).append(
                        '<div style="margin-bottom:5px; margin-top:-5px;font-size:9px">' +
                        '<a href="' + 
                        book.info_url + 
                        '">Preview</a></div>' 
                      );
                  }
		     		} else {
				    	var message = document.createElement("span");
					    $(message).attr("class","no-image");
					    $(message).html(NO_OL_JACKET);
					    $(this).append(message);
				    }
        });
      }
    }