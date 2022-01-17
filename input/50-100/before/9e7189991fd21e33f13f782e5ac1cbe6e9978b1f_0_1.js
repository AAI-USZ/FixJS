function dataSaved (data)
{
  if (data.status == 'success')
  {
    loadData();
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