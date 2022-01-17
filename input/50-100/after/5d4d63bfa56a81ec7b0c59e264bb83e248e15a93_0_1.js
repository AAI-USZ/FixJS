function() { 

        if ($(this).hasClass('active')) {

          if ($this.autoAwesome) {

            $this.autoAwesome=false;

            $(this).removeClass('auto');

          } 

          else {

            $this.autoAwesome=true; 

            $(this).addClass('auto');

          }

        } 

        else { 

          $('#downvotes').removeClass('active'); 

          $(this).addClass('active'); 

          tt.room.manager.callback('upvote'); 

        } 

      }