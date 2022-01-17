function selectBook(book_id){
  var request_str = "filter=" + $('#filter_str').get(0).value;

  loadingTasklist();

  $.ajax({
     type: "GET",
     cache: false,
     url: "books/" + book_id,
     data: request_str,
     dataType: "jsonp"
  });
}