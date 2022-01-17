function()
    {

        var that = this;

        google.maps.Polygon.prototype.getProperty = function(name)
        {
            if (name == 'area')
            {
                return google.maps.geometry.spherical.computeArea(this.getPaths());
            }
            if (name == 'density')
            {
                return this.getProperty('peoples') / this.getArea();
            }

            return that.options.globalData.features[this.id].properties[name];
        };

        google.maps.Polygon.prototype.setColor = function(color)
        {
            this.setOptions({
                strokeColor: color,
                fillColor: color
            });
        };

        google.maps.Polygon.prototype.getProperties = function()
        {
            return that.options.globalData.features[this.id].properties;
        };

        google.maps.Polygon.prototype.setProperty = function(key, val)
        {
            that.options.globalData.features[this.id].properties[key] = val;
        };

        // Create the Google Map…
        that.map = new google.maps.Map(this.element[0], {
            zoom: 15,
            center: new google.maps.LatLng(51.149633, 71.466837),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        that.drawPolygons(that.options.globalData);
        that.squares[1] = new Composite();

        for (var i in that.polygons)
        {
            that.squares[that.polygons[i].getProperty('square_id')].add(that.polygons[i]);
        }

        $('#navigation ul a').click(function()
        {
            var state = {},
                url = $(this).attr('href').replace(/^#/, '');
            state['metric'] = url;
            state['type'] = $(this).closest('ul').data('type');
            $.bbq.pushState(state);
            return false;
        });

        $('#formula_save').click(function()
        {
            var btn = $(this);
            btn.text('......');
            $.post('/region/saveFormula', {
                metric: that.currentMetric,
                formula: $('#formula').val()
            }, function()
            {
                that.colorize();
                btn.text('Сохранить');
            });
            $('#metric_form').modal('hide');
            return false;
        });
        $('#form').submit(function()
        {
            return false;
        });
        $('#data_save').click(function()
        {
            var btn = $(this);
            btn.text('......');
            $.post('/region/saveData', $('#data_save_form form').serialize(), function(globalData)
            {

                for (var i in globalData.features)
                {
                    that.polygons[i].setProperties(globalData.features[i]);
                }
                that.colorize();
                btn.text('Сохранить');
            }, 'json');
            $('#data_save_form').modal('hide');
            return false;
        });
        $('.dropdown-toggle').dropdown();
        $(window).bind('hashchange', function(e)
        {
            var url = $.param.fragment();
            that.currentMetric = $.bbq.getState('metric', true) || 'peoples';
            $('#formula').val(that.options.globalData.metrics[that.currentMetric].formula);
            $('#formula_min').val(that.options.globalData.metrics[that.currentMetric].min);
            $('#formula_norma').val(that.options.globalData.metrics[that.currentMetric].norma);
            $('#formula_max').val(that.options.globalData.metrics[that.currentMetric].max);

            $('#navigation .active').removeClass('active');
            $('#navigation a[href=#' + that.currentMetric + ']').parent().addClass('active').parent().parent().addClass('active');

            that.colorize();
        });

        $(window).trigger('hashchange');
    }