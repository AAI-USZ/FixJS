function(map_id, map_options) {

//console.log(map_options);

    //  Создание коллекции геообъектов
    group = new ymaps.GeoObjectCollection();
    groups[map_options.map_delta] = group;

    // Создание карты и настройка ее параметров
    var map = showMap(map_options, groups);

    // Если карта создана - вывести на нее геообъекты
    if (map) {

      // Ссылка на контейнер для списка объектов
      var menuContainer = $('#YMapsID-links-' + map_options.map_id);

      // -== ВЫВОД МЕТОК ==-
      // Если на карте есть метки - вывести их
      if (map_options.placemarks) {

        // Вывод меток из массива на карту
        $.each(map_options.placemarks, function(id, pm) {
          // Создание на карте геообъекта с координатами заданной метки
          createPlacemark(map, map_options, id, pm, menuContainer);
        });

      }

      // -== ВЫВОД ЛИНИЙ ==-
      // Если на карте есть линии - вывести их
      if (map_options.lines) {

        // Создание на карте линии с заданными координатами вершин
        $.each(map_options.lines, function(id, pl) {
          createPolyline(map, map_options, id, pl);
        });

      }

      // -== ВЫВОД МНОГОУГОЛЬНИКА ==-
      // Если на карте есть многоугольники - вывести их
      if (map_options.polygones) {

        // Создание на карте многоугольника с заданными координатами вершин
        $.each(map_options.polygones, function(id, pg) {
          createPolygon(map, map_options, id, pg);
        });

      }

      // Обработчик для кнопки удаления геообъекта в форме редактирования
      $(map_options.delete_id).click(function() {

        // Смена указателя мыши
        if (map_options.can_add > 0) map.cursors.push('pointer');

        groups[map_options.map_delta].removeAll();
        $(map_options.lat_id).val('');
        $(map_options.lng_id).val('');

        return false;
      });

      // Обработчик для смены иконки в соотв. поле формы редактирования
      $(map_options.icon_id).change(function() {

        groups[map_options.map_delta].each(function(obj) {
          obj.options.set({ preset: $(map_options.icon_id).val() });
        });

      });

      // Обработчик для кнопки геокодирования в соотв. поле формы редактирования
      $(map_options.addr_id + '.form-submit').click(map, function() {

        // Получение заданного адреса из соотв. поля
        var adr = $(map_options.addr_id + '.form-text').val();

        $('#geocoder-result-' + map_options.map_delta).prepend().html('Выполняется запрос к серверу...');

        // Запрос геокодера на получение координат для заданного адреса
        $.get('/unimaps/gc_ajax/' + adr, function(data) {

          if (data[0]) {

            var lat = parseFloat(data[0].lat);
            var lng = parseFloat(data[0].lng);
            $(map_options.lat_id).val(lat);
            $(map_options.lng_id).val(lng);

            $('#geocoder-result-' + map_options.map_delta).prepend().html('<span class="geocoder-found">Найден объект: ' + data[0].text + '</span>');

            // Если на карте УЖЕ имеется геообъект
            if ($(map_options.lat_id).val() == '' && $(map_options.lat_id).val() == '') {
              // Изменение координат геообъекта на полученные из геокодера
              groups[map_options.map_delta].each(function(obj) {
                obj.geometry.setCoordinates([lat, lng]);
              });
            }
            // Иначе создать геообъект по координатам геокодера
            else newGeoObject(map, map_options, groups, lat, lng);

            // Изменение координат центра карты на полученные из геокодера
            map.panTo(
              // Координаты нового центра карты
              [lat, lng], {
              // При перемещении плавно изменять масштаб карты
              flying: true
              }
            );

          }
          else $('#geocoder-result-' + map_options.map_delta).prepend().html('<p class="geocoder-error">Заданный объект НЕ найден!</p>');

        }, 'json');

        return false;

      });

    }

  }