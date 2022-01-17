function selectBook(book_id){
  var request_str = "book_id=" + book_id;

  loadingTasklist();

  $.ajax({
     type: "GET",
     cache: false,
     url: "books/" + book_id,
     dataType: "jsonp"
  });
}