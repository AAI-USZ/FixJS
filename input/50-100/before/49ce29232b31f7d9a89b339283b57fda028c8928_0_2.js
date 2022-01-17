function (event) {
        if ($scope.getMyHand()) {
          $('#hand').offset({
            left: (event.pageX - ($('#hand').width() / 2.0)),
            top: (event.pageY - ($('#hand').height() / 2.0))
          });
        }
      }