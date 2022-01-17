function(d) {
            // add cancel button
            var $this  = this;
            var cancel = $('<li class="cancel-button-container"><input class="grp_button" type="submit" name="_cancel" value="Cancel" style="background-color:#444;font-color:#2B8AAB;background:-moz-linear-gradient(center top, #666, #444) repeat scroll 0 0 transparent;border:none;"></li>')
            cancel.find('input').bind('click.adminToolbar', function() {
                $self.closeActiveFrame();
                return false;
            })
            cancel.find('input').hover(
                function(){
                    $(this).css('background', '-moz-linear-gradient(center top, #E3E3E3, #D6D6D6) repeat scroll 0 0 transparent')
                },
                function(){
                    $(this).css('background', '-moz-linear-gradient(center top, #666, #444) repeat scroll 0 0 transparent')
                }
            );
            if (d.find('#changelist').get(0)) {
               var changelist = true;
               if (!d.find('#submit').find('.submit-row').get(0)) {
                   d.find('#submit').append('<ul class="submit-row" />');
               }
            }

            d.bind('keydown', function(e) {
                if (e.keyCode == 27) {
                    $self.closeActiveFrame();
                    return false;
                }
            })

            d.find('#header, #breadcrumbs').remove().end()
             .find('body').css({paddingTop: 0}).end()
             //.find('.module.footer')
             .find('.grp-submit-row')
                 .css({
                      '-moz-border-radius': '0 0 4px 4px',
                      '-webkit-border-radius': '0 0 4px 4px',
                      'border-radius': '0 0 4px 4px'
                  })
                 .find('ul').append(cancel).end()
                 .find('input[name="_continue"]').bind('click', function() {
                     $self.states.active_frame.addClass('saving continue')
                     $self.states.active_frame.parent().addClass('saving continue')
                     
                 }).end()
                 .find('input[name="_save"]').bind('click', function() {
                     $self.states.active_frame.addClass('saving')
                     $self.states.active_frame.parent().addClass('saving')
                 }).end()
                 .find('.delete-link').bind('click', function() {
                     $self.states.active_frame.addClass('deleting')
                 }).end()
                 .find('input[name="_addanother"]').parent().hide().end().end()
             .end();
        }