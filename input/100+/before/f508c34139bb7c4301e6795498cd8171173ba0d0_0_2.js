function(data) {
        mutiny.running -= 1;
        mutiny.retry = 1;
        mutiny.render(data);
        $('#disconnected').hide();
      }