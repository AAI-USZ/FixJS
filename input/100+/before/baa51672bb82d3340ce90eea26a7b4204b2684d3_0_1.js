function(d) {
            // add cancel button
            var $this  = this;
            var cancel = $('<li class="cancel-button-container"><a class="cancel-link" href="#">Cancel</a></li>')
            cancel.find('a').bind('click.adminToolbar', function() {
                $self.closeActiveFrame();
                return false;
            })
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
             .find('.module.footer')
                 .css({
                      '-moz-border-radius': '0 0 4px 4px',
                      '-webkit-border-radius': '0 0 4px 4px',
                      'border-radius': '0 0 4px 4px'
                  })
                 .find('.submit-row').append(cancel).end()
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