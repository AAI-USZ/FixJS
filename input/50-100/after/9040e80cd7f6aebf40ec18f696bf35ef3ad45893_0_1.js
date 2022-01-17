function(){
    $('#remove_book_in').modal('hide');

    loadingTasklist();

    var dummy_id = 0
    var request_str = "filter=" + $('#filter_str').get(0).value;
    $.ajax({
      type: "DELETE",
      cache: false,
      url: "books/" + dummy_id,
      data: request_str,
      dataType: "jsonp"
    });
  }