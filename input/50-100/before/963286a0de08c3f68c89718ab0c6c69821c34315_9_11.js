function lists_update_annotations(id,usr,knd,pct,evt)
{
  lists_ann_usr[id] = usr;
  lists_ann_knd[id] = knd;
  lists_ann_pct[id] = pct;
  lists_ann_evt[id] = evt;

  if ($('.menu li#exttab_'+id).hasClass('act'))
    lists_write_annotations();
}