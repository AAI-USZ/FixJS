function() {
  deleteDashboard($(this).parent().attr('id'));
  clearDashboards();
  setTimeout(renderDashboards, 200);
  return false;
}