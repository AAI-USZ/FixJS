function clear_searches(){
    var confirm_delete = confirm("Are you sure you want to clear your search history?");
    if (confirm_delete===true)
    {
        $.get((this.basePath || '') + '/delete',
              null,
              function(data) {
                  $('#saved_searches').html(data);
              });
    }
}