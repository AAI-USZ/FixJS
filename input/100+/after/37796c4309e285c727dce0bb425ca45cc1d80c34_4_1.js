function(event) {
        if (!firstPoint) {
          firstPoint = new ymaps.Placemark(event.get('coordPosition'), {}, {
            balloonCloseButton: true,
            preset: 'twirl#carIcon'
          });
          Map.map.geoObjects.add(firstPoint);
        }
        else if (!secondPoint) {
          var first = firstPoint.geometry.getCoordinates();
          Map.map.geoObjects.remove(firstPoint);
          secondPoint = event.get('coordPosition');
          writeRoute(first, secondPoint, null);
        }
        else {
          alert(Drupal.t('The route is already on this map'));
        }
      }