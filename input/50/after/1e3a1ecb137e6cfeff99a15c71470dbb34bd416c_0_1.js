function initBookList(){
  $.ajax({
     type: "GET",
     cache: false,
     url: "/books/get_book_lists",
     dataType: "jsonp"
  });
}