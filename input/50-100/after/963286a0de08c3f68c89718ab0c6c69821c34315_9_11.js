function lists_update_annotations(id,user,customer,project,activity)
{
  lists_user_annotations[id] = user;
  lists_customer_annotations[id] = customer;
  lists_project_annotations[id] = project;
  lists_activity_annotations[id] = activity;

  if ($('.menu li#exttab_'+id).hasClass('act'))
    lists_write_annotations();
}