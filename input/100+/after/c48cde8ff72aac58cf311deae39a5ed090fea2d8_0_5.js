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