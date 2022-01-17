function(i, event) {
          event.status = 'running';
          _fire(event, $this);
          if (!event.isAjax) {
            _complete(event, $this);
          }
        }