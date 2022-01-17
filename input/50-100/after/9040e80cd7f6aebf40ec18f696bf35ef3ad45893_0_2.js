function newBook(book_name){
  var filter_param = "filter=" + $('#filter_str').get(0).value;
  var request_str = "book_name=" + book_name + "&" + filter_param;

  loadingTasklist();

  $.ajax({
     type: "POST",
     cache: false,
     url: "books",
     data: request_str,
     dataType: "jsonp"
  });
}