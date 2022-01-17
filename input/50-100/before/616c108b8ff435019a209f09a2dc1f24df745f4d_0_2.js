function toggleShowHide(projectId)
{
  var project = $('project' + projectId);
  var isClosed = project.className.include('closed');

  $$('table.list tr.' + projectId).each(function(e) {
    if (isClosed) {
      e.removeClassName('hide');
    } else {
      e.addClassName('hide');
    }
  })

  project.removeClassName('closed');
  project.removeClassName('open');
  project.addClassName(isClosed ? 'open' : 'closed');

  toggleOddEven();
}