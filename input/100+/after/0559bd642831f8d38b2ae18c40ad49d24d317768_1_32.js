function(hvlist){
        if (typeof(hvlist[0]) != 'undefined') {
          if ( select.children('option[value='+hvlist[0].host.oid+']').size() < 1 ) {
            select_foot.before( hv_to_option(hvlist[0]) );
          }
          select.val( hvlist[0].host.oid ).change();
          select.show().attr('disabled',false);
          resultbox.hide().attr('disabled',true);
          $(e).hide().attr('disabled',true);
        }
      }