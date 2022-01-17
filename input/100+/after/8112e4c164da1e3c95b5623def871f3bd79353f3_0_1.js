function(e) {

          var errors;
          try {
            errors = JSON.parse(e.responseText);
          } catch (err) {
            errors = [ 'Malformed response from tileserver', 'Response: "' + e.responseText + '"', 'Parser error : ' + err.message ];
          }
          var msg = '';
          _.each(errors,function(ele,i){msg += ele + '<br/>';});
          $('.cartocss_editor span.errors p').html(msg);

          var errors_height = (errors.length * 16) + 23;
          $('.cartocss_editor').find('.outer_textarea').css({'bottom':errors_height+'px'});
          $('.cartocss_editor').addClass('error');

          // see https://github.com/Vizzuality/cartodb/issues/833
          if (refresh)
            me.refreshWax();
        }