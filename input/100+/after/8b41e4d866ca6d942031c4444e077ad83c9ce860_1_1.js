function(data) {
      players = data.players;
      var html = '<ul class="unstyled">';
      for (var player in players) {
        html += '<li class="clearfix shelf" data-player-id="' + player + '">';
        html += '<span class="pull-left">' + players[player].name + '</span>';
        if (players[player].score) {
          html += '<span class="pull-right end-round">' + players[player].score + '</span>';
        }
        html += '</li>';
      }
      html += '</ul>';
      $players.html(html);

      if (data.showResult) {
        $('body').addClass('results');
      } else {
        $('body').removeClass('results');
      }
    }