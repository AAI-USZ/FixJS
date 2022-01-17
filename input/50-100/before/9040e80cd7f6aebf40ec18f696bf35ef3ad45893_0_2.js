function newBook(book_name){
  var request_str = "book_name=" + book_name;

  loadingTasklist();

  $.ajax({
     type: "POST",
     cache: false,
     url: "books",
     data: request_str,
     dataType: "jsonp"
  });
}