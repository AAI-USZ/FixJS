function() {
	$('.tag').click(function(event) {
    var oldtagslist = $('#tag_list').val();
    var newtagslist = oldtagslist + ' ' + $(event.target).text().trim();
    $('#tag_list').val(newtagslist);
  });

  $('#deleteItem-dialog').dialog({
    autoOpen: false,
    width: 400,
    modal: true,
    resizable: false,
    buttons: {
      "OK": function() {
        document.deleteItem.submit();
      },
      "Cancel": function() {
        $(this).dialog("close");
      }
    }
  });
  
  $('#error-dialog').dialog({
    autoOpen: false,
    width: 400,
    model: true, 
    resizable: false,
    buttons: {
      "OK": function() {
        $(this).dialog("close");
      }
    }  
  });

	$('form#deleteItem').submit(function(e){
    e.preventDefault();     
    var nbrtodelete = $("input#number_to_delete").val();
    var itemSpan = $("#text-"+nbrtodelete);
    if (itemSpan.length == 0) {
      $("div#error-text").html(nbrtodelete+": Number does not exist."); 
      $('#error-dialog').dialog('open');      
    } else {
      $("span#dialog-number strong").html(nbrtodelete);
      var itemText = $("#text-"+nbrtodelete).html();
      $("div#dialog-text").html(itemText.substring(0,350));  
      $('#deleteItem-dialog').dialog('open');      
    }
  });
 	
}