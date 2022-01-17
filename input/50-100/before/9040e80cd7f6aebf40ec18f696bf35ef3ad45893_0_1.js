function(){
    $('#remove_book_in').modal('hide');

    loadingTasklist();

    var dummy_id = 0

    $.ajax({
      type: "DELETE",
      cache: false,
      url: "books/" + dummy_id,
      dataType: "jsonp"
    });
  }