function(r,rt) {
    if(r.message == 1) {
      refresh_field('group_or_ledger');
      cur_frm.cscript.hide_unhide_group_ledger(cur_frm.get_doc());
    }
  }