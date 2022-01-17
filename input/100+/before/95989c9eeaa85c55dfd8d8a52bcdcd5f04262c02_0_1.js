function (params)
  {
    params = params || {};
	var map = this;
    var mapData = WorldMap.maps[params.map];

    this.container = params.container;

    this.defaultWidth = mapData.width;
    this.defaultHeight = mapData.height;

    this.color = params.color;
    this.hoverColor = params.hoverColor;
    this.setBackgroundColor(params.backgroundColor);

    this.width = params.container.width();
    this.height = params.container.height();

    this.resize();

    jQuery(window).resize(function ()
    {
      map.width = params.container.width();
      map.height = params.container.height();
      map.resize();
      map.canvas.setSize(map.width, map.height);
      map.applyTransform();
    });

    this.canvas = new VectorCanvas(this.width, this.height, params);
    params.container.append(this.canvas.canvas);

    this.makeDraggable();

    this.rootGroup = this.canvas.createGroup(true);

    this.index = WorldMap.mapIndex;
    this.label = jQuery('<div/>').addClass('jqvmap-label').appendTo(jQuery('body'));

    if(params.enableZoom)
    {
      jQuery('<div/>').addClass('jqvmap-zoomin').text('+').appendTo(params.container);
      jQuery('<div/>').addClass('jqvmap-zoomout').html('&#x2212;').appendTo(params.container);
    }
	
	map.countries = [];
	
    for (var key in mapData.pathes)
    {
      var path = this.canvas.createPath({
        path: mapData.pathes[key].path
      });
	  
      path.setFill(this.color);
      path.id = 'jqvmap' + map.index + '_' + key;
      map.countries[key] = path;
	  
      jQuery(this.rootGroup).append(path);

      path.setAttribute('class', 'jqvmap-region');

      if(params.selectedRegion !== null)
      {
        if(key.toLowerCase() == params.selectedRegion.toLowerCase())
        {
          path.setFill(params.selectedColor);
        }
      }
    }

    jQuery(params.container).delegate(this.canvas.mode == 'svg' ? 'path' : 'shape', 'mouseover mouseout', function (e){
      var path = e.target,
      code = e.target.id.split('_').pop(),
      labelShowEvent = $.Event('labelShow.jqvmap'),
      regionMouseOverEvent = $.Event('regionMouseOver.jqvmap');

      if (e.type == 'mouseover')
      {
        jQuery(params.container).trigger(regionMouseOverEvent, [code, mapData.pathes[code].name]);
        if (!regionMouseOverEvent.isDefaultPrevented())
        {
          if (params.hoverOpacity)
          {
            path.setOpacity(params.hoverOpacity);
          }
          else if (params.hoverColor)
          {
            path.currentFillColor = path.getFill() + '';
            path.setFill(params.hoverColor);
          }
        }
        if(params.showTooltip)
        {
          map.label.text(mapData.pathes[code].name);
          jQuery(params.container).trigger(labelShowEvent, [map.label, code]);

          if (!labelShowEvent.isDefaultPrevented())
          {
            map.label.show();
            map.labelWidth = map.label.width();
            map.labelHeight = map.label.height();
          }
        }
      }
      else
      {
        path.setOpacity(1);
        if (path.currentFillColor)
        {
          path.setFill(path.currentFillColor);
        }

        map.label.hide();
        jQuery(params.container).trigger('regionMouseOut.jqvmap', [code, mapData.pathes[code].name]);
      }
    });

    jQuery(params.container).delegate(this.canvas.mode == 'svg' ? 'path' : 'shape', 'click', function (e){

	  for (var key in mapData.pathes)
      {
		map.countries[key].currentFillColor = map.countries[key].getOriginalFill();
        map.countries[key].setFill(map.countries[key].getOriginalFill());
      }

      var path = e.target;
      var code = e.target.id.split('_').pop();

      jQuery(params.container).trigger('regionClick.jqvmap', [code, mapData.pathes[code].name]);

	  path.currentFillColor = params.selectedColor;
      path.setFill(params.selectedColor);

    });

    if(params.showTooltip)
    {
      params.container.mousemove(function (e){
        if (map.label.is(':visible'))
        {
          map.label.css({
            left: e.pageX - 15 - map.labelWidth,
            top: e.pageY - 15 - map.labelHeight
          });
        }
      });
    }

    this.setColors(params.colors);

    this.canvas.canvas.appendChild(this.rootGroup);

    this.applyTransform();

    this.colorScale = new ColorScale(params.scaleColors, params.normalizeFunction, params.valueMin, params.valueMax);

    if (params.values)
    {
      this.values = params.values;
      this.setValues(params.values);
    }

    this.bindZoomButtons();

    WorldMap.mapIndex++;
  }