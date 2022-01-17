function (index) {
          var playerNumber = $(this).attr("playerNumber");
          var rider = $(this);
          var $rider = angular.element(this).scope();

          // hit test - if the player is attempting to play their hand onto this
          if ((cursor.pageX > rider.offset().left && // left edge
              cursor.pageX < rider.offset().left + rider.width()) && // right edge
              (cursor.pageY > rider.offset().top && // top edge
              cursor.pageY < rider.offset().top + rider.height())) { // bottom edge

            // TODO: account for invalidated plays
            game.playCard(playerNumber);
            // TODO: why do i have to apply here? i'm calling a method on the service...
            $rider.$apply();
          }
        }