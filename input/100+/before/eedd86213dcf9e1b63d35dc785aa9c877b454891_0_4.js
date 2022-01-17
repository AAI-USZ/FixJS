function () {
  return {
    restrict: "A",
    link: function ($scope, element, attrs) {
      $(document).bind('mousemove', function (event) {
        $('#hand').offset({
          left: (event.pageX - ($('#hand').width() / 2.0)),
          top: (event.pageY - ($('#hand').height() / 2.0))
        });
      })
      .bind('mouseup', function (cursor) {
        $('.rider').each(function (index) {
          var playerNumber = $(this).attr("playerNumber");
          var rider = $(this);
          var $rider = angular.element(this).scope();

          // hit test - if the player is attempting to play their hand onto this
          if ((cursor.pageX > rider.offset().left && // left edge
              cursor.pageX < rider.offset().left + rider.width()) && // right edge
              (cursor.pageY > rider.offset().top && // top edge
              cursor.pageY < rider.offset().top + rider.height())) { // bottom edge


            // TODO: account for invalidated plays
            $rider.playCard(playerNumber);
          }
        });
      });
    }
  };
}