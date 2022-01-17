function dataSaved (data)
{
  if (data.status == 'success')
  {
    message('success', data.data);
    loadData();
  }
  else if (data.status == 'error')
  {
    message('errors', data.data);
  }
  else
  {
    message('error', 'An unknown error occurred');
  }
}