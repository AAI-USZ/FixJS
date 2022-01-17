function(e) {

          if ( e.responseText ) {
            var errors = JSON.parse(e.responseText);
            var msg = '';
            _.each(errors,function(ele,i){msg += ele + '<br/>';});
            $('.cartocss_editor span.errors p').html(msg);

            var errors_height = (errors.length * 16) + 23;
            $('.cartocss_editor').find('.outer_textarea').css({'bottom':errors_height+'px'});
            $('.cartocss_editor').addClass('error');
          }
          // else it could be a cross-domain issue.
          // TODO: how to deal with it ?

          // see https://github.com/Vizzuality/cartodb/issues/833
          if (refresh)
            me.refreshWax();
        }