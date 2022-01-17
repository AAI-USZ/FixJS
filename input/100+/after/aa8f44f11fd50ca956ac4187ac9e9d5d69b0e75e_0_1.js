function dataLoaded(data)
{
  // Clear error box if needed
  $('#errorBox').html('&nbsp;');

  // Parse JSON (if needed)
  data = ($.parseJSON(data)) ? $.parseJSON(data) : data;

  if (data.status == 'success')
  {
    // Update data timestamp
    lastDataTimestamp = data.filetime;
  
    // Put data into container
    $('#progressTableContainer').html(data.data);
  
    // Make table cells turn into input fields on click
    var cells = $('#progressTableContainer').find('td.value');
    cells.on('click', switchCellToInput);
  }
  else if (data.status == 'unchanged')
  {
  
  }
  else if (data.status == 'error')
  {
    $('#errorBox').html(data.data);
  }
}