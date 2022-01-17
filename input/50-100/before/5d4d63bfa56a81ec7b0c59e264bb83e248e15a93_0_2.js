function(a,b){
                var user = b;
                if (!$this.listeners.get(user.userid)) {
                  clearInterval(a.timer);
                  return;
                }
                var idletime = moment().diff(moment($this.listeners.get(user.userid).get('lastActivity')), 'seconds');
                $(a).find('div.idleTime').html(formatIdletime(idletime))
              }