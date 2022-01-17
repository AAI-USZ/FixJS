function(booksInfo) {
    for (id in booksInfo) {
       var book = booksInfo[id];
       var isbn = id.substring(5);
       $("."+isbn).each(function() {
       var is_opacdetail = /openlibrary-thumbnail-preview/.exec($(this).attr("id"));
           var a = document.createElement("a");
           a.href = booksInfo.url;
           if (book.cover) {
               var img = document.createElement("img");
               if (is_opacdetail) {
        img.src = book.cover.medium;
        $(this).append(img);
                $(this).append(
                       '<div class="results_summary">' + '<a href="' + book.url + '">Preview</a></div>'
                   );
               } else {
            img.src = book.cover.small;
            $(this).append(img);
        }
           } else {
               var message =  document.createElement("span");
               $(message).attr("class","no-image");
               $(message).html(NO_OL_JACKET);
               $(this).append(message);
           }
       });
   }
 }