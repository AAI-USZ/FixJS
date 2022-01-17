function(){
            var _this = this;
            tr = $(_this).parents('tr');
            book_author = $(tr).find(html_attributes.book_title_search_string).html();
            book_title = $(tr).find(html_attributes.book_author_search_string).html();
            add_to_library_button = $('<a href="javascript:;" class="addToLibrary" style="'+styles.add_to_library+'">add to library</a>');
            library_url = createLibraryUrl({library_url : library_url, book_author : book_author, book_title : book_title});
            add_to_library_button.click(function(){
               
               chrome.extension.sendRequest({
                  action: 'open_library',
                  url : library_url
               });
               
            });
            $(_this).parent().before(add_to_library_button);
         }