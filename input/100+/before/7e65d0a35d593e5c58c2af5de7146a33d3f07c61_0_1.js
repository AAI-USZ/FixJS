function updateBookListsJson( book_infos ){
  var header = '<li><a id="new_book" href="#">New Book</a></li>' + 
               '<li><a id="remove_book" href="#">Remove Current Book</a></li>' +
               '<li class="divider"></li>'; 

  var lists = '';
  for(var i = 0; i < book_infos.length; i++ ){ 
    lists += '<li id="book_list_' + book_infos[i].id + '">' +
                 '<a href="#" onclick="selectBook(' + book_infos[i].id + ');">' + book_infos[i].name +
                   '<table style="float:right" class="book-counts">' +
                     '<tr>' +
                       '<td><div class="counts todo_h" >' + book_infos[i].todo_h + '</div></td>' +
                       '<td><div class="counts todo"   >' + book_infos[i].todo_m + '</div></td>' +
                       '<td><div class="counts todo_l" >' + book_infos[i].todo_l + '</div></td>' +
                       '<td><div class="counts doing"  >' + book_infos[i].doing  + '</div></td>' +
                       '<td><div class="counts waiting">' + book_infos[i].waiting + '</div></td>' +
                       '<td><div class="counts done"   >' + book_infos[i].done    + '</div></td>' +
                     '</tr>' +
                   '</table>' +
                 '</a>' +
               '</li>';
  }

  $('#book_list').empty();
  $('#book_list').append(header + lists);

  initNewBookAction();
  initRemoveBookAction();
}