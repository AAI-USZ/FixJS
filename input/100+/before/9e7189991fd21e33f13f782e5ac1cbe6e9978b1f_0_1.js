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

    // Show when the data was last updated
    $('#lastCheck').html(data.datestamp);
    $('#lastChange').html(data.filedate);
  
    // Put data into container
    $('#progressTableContainer').html(data.data);
  
    // Make table cells turn into input fields on click
    var cells = $('#progressTableContainer').find('td.value');
    cells.on('click', switchCellToInput);
  }
  else if (data.status == 'unchanged')
  {
    $('#lastCheck').html(data.datestamp );
  }
  else if (data.status == 'error')
  {
    $('#errorBox').html(data.data);
  }
  else
  {
    $('#errorBox').html('An unknown error occurred');
  }
}