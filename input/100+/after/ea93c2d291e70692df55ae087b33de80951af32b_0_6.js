function init() {

  // Параметры карты и меток, переданные из модуля
  var options = Drupal.settings.yandex_maps;

  var groups = new Array();

  // Если задано НЕСКОЛЬКО карт - инициализировать КАЖДУЮ из них
  if (options) $.each(options, function(map_id, map_options) {

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

  });




  /*
  **  Список используемых функций
  */

  // Создание карты и настройка ее параметров
  function showMap(options, groups) {

    // Занесение координат меток в массив
    var points = new Array();
    if (options.placemarks) $.each(options.placemarks, function(id, p) {
      points.push([parseFloat(p.lat), parseFloat(p.lng)]);
    });

    // Если в массиве не более одной метки
    if (points.length <= 1) {
      // Если в массиве всего одна метка - центрировать карту по ней
      // иначе центрировать по дефолтным координатам
      var center = (points.length == 1) ? points.pop() : [options.latitude, options.longitude];
      var map = new ymaps.Map("YMapsID-" + options.map_id, {
        // Центр карты
        center: center,
        // Коэффициент масштабирования
        zoom: options.map_zoom
      });
    }
    // Если в массиве несколько меток - центрировать карту по набору меток
    else if (points.length > 1) {
      var map = new ymaps.Map("YMapsID-" + options.map_id,
        // Центрирование карты по имеющимся меткам
        ymaps.util.bounds.getCenterAndZoom(
          // Список меток
          points,
          // Размеры карты
          [options.map_width, options.map_height],
          null,
          true
        )
      );
    }

    // Ползунок изменения масштаба карты
    if (options.zoom == 'BASE') map.controls.add('zoomControl'/*, { top: 75, left: 5 }*/);
    // Мини-ползунок изменения масштаба карты
    else if (options.zoom == 'SMALL') map.controls.add('smallZoomControl'/*, { right: 5, top: 75 }*/);

    // Мини-карта
    if (options.minimap) map.controls.add(new ymaps.control.MiniMap(/*{ type: 'yandex#publicMap' }, { position: { right: 15, bottom: 15 }, size: [256, 180] }*/));

    // Поисковая форма
    if (options.search) {
      searchControl = new ymaps.control.SearchControl(/*{ provider: 'yandex#map' }*/);
      map.controls.add(searchControl/*, { left: '40px', top: '10px' }*/);
    }

    // Панель пробок
    if (options.traffic) map.controls.add(new ymaps.control.TrafficControl(/*state*/));

    // Масштабная линейка
    if (options.scaleline) map.controls.add('scaleLine');

    // Включение изменения масштаба колесиком мыши
    if (options.scrollzoom) map.behaviors.enable("scrollZoom");
    else if (map.behaviors.isEnabled("scrollZoom")) map.behaviors.disable("scrollZoom");

    // Настройка изменения масштаба двойным кликом мыши
    if (options.dblclickzoom) map.behaviors.enable("dblClickZoom");
    else if (map.behaviors.isEnabled("dblClickZoom")) map.behaviors.disable("dblClickZoom");

    // Настройка режима перетаксивания карты
    if (options.drag) map.behaviors.enable("drag");
    else if (map.behaviors.isEnabled("drag")) map.behaviors.disable("drag");

    // Настройка изменения масштаба при помощи MultiTouch
    if (options.multitouch) map.behaviors.enable("multiTouch");
    else map.behaviors.disable("multiTouch");

    // Стандартный набор кнопок
    if (options.maptools) map.controls.add('mapTools');

    // Список типов карт
    if (options.typecontrol) map.controls.add(new ymaps.control.TypeSelector());

    // Установка типа карты по умолчанию
    // Обычная карта
    if (options.map_type == 'MAP') { map.setType('yandex#map') }
    // Спутник
    else if (options.map_type == 'SATELLITE') map.setType('yandex#satellite');
    // Гибрид
    else if (options.map_type == 'HYBRID') map.setType('yandex#hybrid');
    // Народная карта
    else if (options.map_type == 'PMAP') map.setType('yandex#publicMap');
    // Народная карта (гибрид)
    else if (options.map_type == 'PHYBRID') map.setType('yandex#publicMapHybrid');

    // Добавление масштаба карты в форму
    unimaps_set_location_fields([0, 0], map.getZoom(), map.getType(), options);

    // Добавление типа карты в форму
    unimaps_set_location_fields([0, 0], map.getZoom(), map.getType(), options);

    // При изменении масштаба карты изменять его значение в соотв. поле
    // формы редактирования ноды 
    map.events.add('boundschange', function(e) {
      // Добавление масштаба карты в форму
      unimaps_set_location_fields([0, 0], map.getZoom(), map.getType(), options);
    }, options, map);

    // При изменении типа карты изменять его значение в соотв. поле
    // формы редактирования ноды
    map.events.add('typechange', function(e) {

      // Добавление типа карты в форму
      unimaps_set_location_fields([0, 0], map.getZoom(), map.getType(), options);
    }, options, map);

    // Включение возможности добавления геообъектов кликом по карте
    if (options.add) clickMap(map, groups, options);

    return map;
  }

  // Создание на карте геообъекта с координатами заданной метки
  function createPlacemark(map, options, id, pm, menuContainer) {

    var placemark = new ymaps.Placemark(
        // Координаты объекта
        [parseFloat(pm.lat), parseFloat(pm.lng)],
    {   // список данных (properties) геообъекта
    },
    {   // список опций (options) геообъекта
        // При открытии балуна скрывать иконку
        hideIconOnBallon: true
    });

    // Разрешение на перетаскивание метки
    placemark.options.set({ draggable: pm.drag });

    // Если у метки есть заголовок - добавить его объекту
    if (pm.title && pm.title != '<p></p>') {
      // Название метки
//      placemark.properties.set({ iconContent: pm.title });
      // Содержимое всплывающей подсказки
      placemark.properties.set({ hintContent: pm.title });
    }
    else placemark.options.set({ cursor: 'grab' });

    // Содержимое балуна
    if (pm.descr && pm.descr != '<p></p>') placemark.properties.set({ balloonContent: pm.descr });

    // Если задан пользовательский стиль метки - применить его
    if (pm.cust_icon) {
     // Адрес картинки иконки
     placemark.options.set({ iconImageHref: pm.cust_icon });
     // Размер картинки иконки
//       placemark.options.set({ iconImageSize: [40, 40] });
     // Смещение картинки иконки
     placemark.options.set({ iconImageOffset: [-9, -29] });
    }
    // иначе если задан один из стандартных стилей - применить его
    else if (pm.yandex_icon) {
      placemark.options.set({ preset: pm.yandex_icon });
    }

    // Перетаскивание меток разрешено ?
    if (pm.drag) {

      // Изменение координат метки в полях ноды по окончанию перетаксивании метки
      placemark.events.add('dragend', function(e) {
        // Сохранение координат метки при ее перетаскивании
        unimaps_set_location_fields(this.geometry.getCoordinates(), map.getZoom(), map.getType(), options);
      }, placemark, map);
    }

    if (options.list) { addToList(pm, map, placemark, menuContainer) }

    // Добавление геообъекта в коллекцию
    groups[options.map_delta].add(placemark);

    // Добавление геообъекта на карту
    map.geoObjects.add(groups[options.map_delta]);

    // Если на карте только одна метка - открыть для нее балун
    if (groups[options.map_delta].length == 1 && pm.title && pm.title != '<p></p>') placemark.balloon.open();

  }

  // Вставка координат геообъекта в поля формы редактирования
  function unimaps_set_location_fields(coords, zoom, type, options) {
    // широта геообъекта
    var lat = parseFloat(coords[0]);
    // долгота геообъекта
    var lng = parseFloat(coords[1]);

    // передача координат геообъекта в соотв. поля формы редактирования
    if (lat && lat != 0) $(options.lat_id).val(lat);
    if (lng && lng != 0) $(options.lng_id).val(lng);

    // передача масштаба карты в соотв. поле формы редактирования
    if ($(options.zoom_id).val() && zoom) $(options.zoom_id).val(zoom);

    // передача типа карты в соотв. поле формы редактирования
    if (type == 'yandex#map') type = 'MAP';
    if (type == 'yandex#satellite') type = 'SATELLITE';
    if (type == 'yandex#hybrid') type = 'HYBRID';
    if (type == 'yandex#publicMap') type = 'PMAP';
    if (type == 'yandex#publicMapHybrid') type = 'PHYBRID';
    if ($(options.type_id).val() && type) $(options.type_id).val(type);
  }

  // Создание на карте линии с заданными координатами вершин
  function createPolyline(map, options, id, pl) {

    var points = new Array();
    if (pl) $.each(pl.points, function(id, p) {
      points.push([parseFloat(p.lat), parseFloat(p.lng)]);
    });

    var polyline = new ymaps.Polyline(
            // Координаты вершин ломаной
            points
        , {}, {
            // Отключение кнопки закрытия балуна
            balloonCloseButton: true,
         }
    );

   // содержимое всплывающей подсказки
   if (pl.ym_pl_name) polyline.properties.set({ hintContent: pl.ym_pl_name });

   // содержимое балуна
   if (pl.ym_pl_descr) polyline.properties.set({ balloonContent: pl.ym_pl_descr });

   // стиль линии
   if (pl.ym_pl_type) polyline.options.set({ strokeStyle: pl.ym_pl_type });

   // ширина линии
   if (pl.ym_pl_width) polyline.options.set({ strokeWidth: pl.ym_pl_width });

   // прозрачность линии
   if (pl.ym_pl_opacity) polyline.options.set({ strokeOpacity: pl.ym_pl_opacity });

   // цвет линии
   if (pl.ym_pl_color) polyline.options.set({ strokeColor: pl.ym_pl_color });

   // разрешено ли перетаскивание
   polyline.options.set({ draggable: parseInt(pl.ym_pl_drag) });

   // Добавление геообъекта в коллекцию
   groups[options.map_delta].add(polyline);

   // Добавление линии на карту
   map.geoObjects.add(groups[options.map_delta]);

   // если разрешено редактирование - включить режим редактирования линии
   if (pl.ym_pl_edit) polyline.editor.startEditing();

   // разрешено ли редактирование
   if (pl.ym_pl_edit) {
     // при изменении геометрии линии формируется массив из координат ее вершин
     polyline.events.add('geometrychange', function (event) {
       saveGeometry(polyline.geometry.getCoordinates(), options);
     }, options);
   }

  }

  // Создание на карте многоугольника с заданными координатами вершин
  function createPolygon(map, options, id, pg) {

    var points = new Array();
    if (pg) $.each(pg.points, function(id, p) {
      points.push([parseFloat(p.lat), parseFloat(p.lng)]);
    });

    var polygon = new ymaps.Polygon(
            // Координаты вершин ломаной
            [points]
        , {}, {
            // Отключение кнопки закрытия балуна
            balloonCloseButton: true,
         }
    );

   // содержимое всплывающей подсказки
   if (pg.ym_pg_name) polygon.properties.set({ hintContent: pg.ym_pg_name });

   // содержимое балуна
   if (pg.ym_pg_descr) polygon.properties.set({ balloonContent: pg.ym_pg_descr });

   // стиль границы
   if (pg.ym_pg_style) polygon.options.set({ strokeStyle: pg.ym_pg_style });

   // ширина границы
   if (pg.ym_pg_width) polygon.options.set({ strokeWidth: pg.ym_pg_width });

   // прозрачность
   if (pg.ym_pg_opacity) polygon.options.set({ strokeOpacity: pg.ym_pg_opacity });

   // цвет границы
   if (pg.ym_pg_color) polygon.options.set({ strokeColor: pg.ym_pg_color });

   // используется ли заливка
   polygon.options.set({ fill: pg.ym_pg_fill });

   // цвет заливки
   if (pg.ym_pg_fillcolor) polygon.options.set({ fillColor: pg.ym_pg_fillcolor });

   // разрешено ли перетаскивание
   polygon.options.set({ draggable: pg.ym_pg_drag });

   // Добавление геообъекта в коллекцию
   groups[options.map_delta].add(polygon);

   // Добавление многоугольника на карту
   map.geoObjects.add(groups[options.map_delta]);

   // если разрешено редактирование - включить режим редактирования линии
   if (pg.ym_pg_edit) polygon.editor.startEditing();

   // разрешено ли редактирование
   if (pg.ym_pg_edit) {
     // при изменении геометрии линии формируется массив из координат ее вершин
     polygon.events.add('geometrychange', function (event) {
       saveGeometry(polygon.geometry.getCoordinates(), options);
     }, options);
   }


  }

  // Создание списка ссылок на метки
  function addToList(pm, map, placemark, menuContainer) {

    // Создаем ссылку, обернутую в тег <p> для более приятного визуального восприятия
    $('<li><a href="#">' + placemark.properties.get('hintContent') + '</a></li>')

      .find('a')
      // Создаем обработчик по щелчку на ссылке
      .bind('click', function() {

        // Подчеркиваем все ссылки
        menuContainer.find('a').css('text-decoration', 'underline');

        // Кроме той, на которую щелкнули
        $(this).css('text-decoration', 'none');

        // Перемещаем карту
        map.panTo(
          // Координаты нового центра карты
          [placemark.geometry.getCoordinates()],
          // При перемещении плавно изменять масштаб карты
          { flying: true }
        );

        // Если у выбранной метки имеется содержимое балуна - открыть его
        if (placemark.properties.get('balloonContent') != undefined) placemark.balloon.open();
        return false;
      })
     .end()

     // Добавляем в список ссылок созданный элемент
     .appendTo(menuContainer);
  }


  // Создание геообъекта при клике по карте
  function clickMap(map, groups, options) {

    // Количество меток, разрешенных для добавления
    var can_add = options.can_add;

    // Количество созданных меток
    var points = groups[options.map_delta].getLength();

    // Смена указателя мыши
    if (can_add > 0) map.cursors.push('pointer');

    // Создание слушателя щелчков по карте
    map.events.add('click', function(e) {

      // Можно создать только одну метку
      if ((groups[options.map_delta].getLength() - points) < can_add) {

        // Определение координат точки клика
        coords = e.get('coordPosition');

        // Вставка координат гееобъекта и масштаба карты в поля
        // формы редактирования
        unimaps_set_location_fields(coords, map.getZoom(), '', options);

//        newPlacemark(map, options, groups, coords[0], coords[1]);
        newGeoObject(map, options, groups, coords[0], coords[1]);

        // Добавление метки в группу
        map.geoObjects.add(groups[options.map_delta]);

        // Если добавлять метки нельзя - восстановление указатель мыши
        if ((groups[options.map_delta].getLength() - points) == can_add) map.cursors.push('grab');
      }

    });

  }

  // установка на карту точки с заданными координатами
  function newGeoObject(map, options, groups, lat, lng) {

    // Удаление с карты всех имеющихся меток
    groups[options.map_delta].removeAll();

    // Формирование параметров создаваемого геообъекта
    if (options.map_style == 'placemarks') {

      pm = {
        lat: lat,
        lng: lng,
        drag: true,
        title: options.add_title,
        descr: options.add_descr,
        // использовать иконку Яндекс.Карт для метки, заданную в соотв. поле
        yandex_icon: ($(options.icon_id).val()) ? $(options.icon_id).val() : options.add_icon,
        // использовать пользовательскую иконку метки, заданную в соотв. поле
        cust_icon: ($(options.cust_icon_id).val()) ? $(options.cust_icon_id).val() : options.add_cust_icon,
      }
      createPlacemark(map, options, 0, pm);
    }
    else if (options.map_style == 'lines') {

      coords = { 0: { lat: lat, lng: lng } };

      pm = {
        points: coords,
        ym_pl_name: options.lines[0].ym_pl_name,
        ym_pl_descr: options.lines[0].ym_pl_descr,
        ym_pl_edit: options.lines[0].ym_pl_edit,
        ym_pl_type: options.lines[0].ym_pl_type,
        ym_pl_drag: options.lines[0].ym_pl_drag,
        ym_pl_opacity: options.lines[0].ym_pl_opacity,
        ym_pl_width: options.lines[0].ym_pl_width,
        ym_pl_color: options.lines[0].ym_pl_color,
      }
      createPolyline(map, options, 0, pm);
    }
    else if (options.map_style == 'polygones') {

      coords = { 0: { lat: lat, lng: lng } };

      pm = {
        points: coords,
        ym_pg_name: options.polygones[0].ym_pg_name,
        ym_pg_descr: options.polygones[0].ym_pg_descr,
        ym_pg_edit: options.polygones[0].ym_pg_edit,
        ym_pg_style: options.polygones[0].ym_pg_style,
        ym_pg_drag: options.polygones[0].ym_pg_drag,
        ym_pg_opacity: options.polygones[0].ym_pg_opacity,
        ym_pg_width: options.polygones[0].ym_pg_width,
        ym_pg_color: options.polygones[0].ym_pg_color,
        ym_pg_fill: options.polygones[0].ym_pg_fill,
        ym_pg_fillcolor: options.polygones[0].ym_pg_fillcolor,
      }
      createPolygon(map, options, 0, pm);
    }

  }

  function saveGeometry(coords, options) {
    $(options.points_id).val(stringify(coords));

    function stringify(coords) {
      var res = '';
      if ($.isArray(coords)) {
        res = '[';
        for (var i = 0, l = coords.length; i < l; i++) {
          if (i > 0) res += ',';
          res += stringify(coords[i]);
        }
        res += ']';
      }
      else if (typeof coords == 'number') {
        res = coords.toPrecision(6);
      }
      else if (coords.toString) res = coords.toString();

      return res;
    }
  }

}