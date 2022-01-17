function() {

              $(this).find("div.guestArrow").hide();

              $(this).find('div.icons').css({opacity: 1});

              $(this).find('div.idleTime').html('')

              clearInterval(this.timer)

            }