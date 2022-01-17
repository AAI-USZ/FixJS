function switchCellToInput(event)
{
  var cell = $(this);

  if (cell.find('input').length == 0)
  {
    // Get current cel value and turn it into an input field
    var value = parseInt(cell.html(), 10);
    var width = cell.width();
    cell.html('<input type="text" value="' + value + '" />');
    var input = cell.find('input');
    input.width(width - 4);
    cell.width(width);

    // Add handler to save data
    input.on('blur keypress', saveData);

    input.select();
  }
}