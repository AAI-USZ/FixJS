function(data) {

          if (data[0]) {

            var lat = parseFloat(data[0].lat);
            var lng = parseFloat(data[0].lng);
            $(map_options.lat_id).val(lat);
            $(map_options.lng_id).val(lng);

            $('#geocoder-result-' + map_options.map_delta).prepend().html('<p class="geocoder-found">Найден объект: ' + data[0].text + '</p>');

            // Изменение координат центра карты на полученные из геокодера
            map.panTo(
              // Координаты нового центра карты
              [lat, lng], {
              // При перемещении плавно изменять масштаб карты
              flying: true
              }
            );

            // Если на карте УЖЕ имеется геообъект
            if ($(map_options.lat_id).val() == '' && $(map_options.lat_id).val() == '')  {
              // Изменение координат геообъекта на полученные из геокодера
              groups[map_options.map_delta].each(function(obj) {
                obj.geometry.setCoordinates([lat, lng]);
              });
            }
            // Иначе созать геообъект по координатам геокодера
            else newPlacemark(map, map_options, groups, lat, lng);

          }
          else $('#geocoder-result-' + map_options.map_delta).prepend().html('<p class="geocoder-error">Заданный объект НЕ найден!</p>');

        }