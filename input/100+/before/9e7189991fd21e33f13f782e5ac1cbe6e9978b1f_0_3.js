function saveData(event)
{
  if (typeof event.keyCode == 'undefined' || event.keyCode == 13)
  {
    // Get new data from cell
    //console.log(this, event);
    var input = $(this);
    var value = parseInt(input.val(), 10);

    // If data is valid number, send it to the data handler
    if (!isNaN(value))
    {
      var id = input.parent().attr('id').split('-');
      $.post('data.php', {"action":"set", "data":{"id":id, "value":value}}, dataSaved);
    }

    // Update view back to normal
    input.parent().html(value);
  }
}