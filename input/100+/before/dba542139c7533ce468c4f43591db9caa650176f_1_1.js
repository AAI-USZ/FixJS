function(){
               
               chrome.extension.sendRequest({
                  action: 'open_library',
                  url : createLibraryUrl({library_url : library_url, book_author : book_author, book_title : book_title})
               });
               
            }