function() {
         var add_my_book_buttons, add_to_library_button, tr, book_author, book_title;
         add_my_book_buttons = $('img[src="'+html_attributes.add_my_book_search_string+'"]');
         add_my_book_buttons.each(function(){
            var _this = this;
            tr = $(_this).parents('tr');
            book_author = $(tr).find(html_attributes.book_title_search_string).html();
            book_title = $(tr).find(html_attributes.book_author_search_string).html();
            add_to_library_button = $('<a href="javascript:;" class="addToLibrary" style="'+styles.add_to_library+'">add to library</a>');
            add_to_library_button.click(function(){
               
               chrome.extension.sendRequest({
                  action: 'open_library',
                  url : createLibraryUrl({library_url : library_url, book_author : book_author, book_title : book_title})
               });
               
            });
            $(_this).parent().before(add_to_library_button);
         });

      }