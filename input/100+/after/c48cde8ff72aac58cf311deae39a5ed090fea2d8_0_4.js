function createPolyline(map, options, id, pl) {

//console.log(pl);

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