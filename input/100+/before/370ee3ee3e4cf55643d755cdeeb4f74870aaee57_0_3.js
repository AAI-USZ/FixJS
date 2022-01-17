function loadSection(section) {

    $('.main-section').hide();
    $('#' + section).show();

    if(section == 'navegue' && sectionLoaded[section] == false) {    // prepare data and filters

        $.getJSON('constatacoes.json.php?data=geral', function(data) {
            irregularidadesData = data;
        });
        // prepare tipos data
        $.getJSON('constatacoes.json.php?data=tipo', function(data) {
            eduamazonia.tipo = data;

            // setup dropdown
            $.each(eduamazonia.tipo, function(i, tipo) {
                $('select.tipo').append('<option value="' + tipo.tipo + '">' + tipo.tipo + '</option>');
            });
            jQuery('select.tipo').chosen().trigger('liszt:updated');
        });
        // prepare programas data
        $.getJSON('constatacoes.json.php?data=programa', function(data) {
            eduamazonia.programa = data;

            // setup dropdown
            $.each(eduamazonia.programa, function(i, programa) {
                $('select.programa').append('<option value="' + programa.programa + '">' + programa.programa_desc + '</option>');
            });
            jQuery('select.programa').chosen().trigger('liszt:updated');
        });
        // prepare cidades data
        $.getJSON('constatacoes.json.php?data=cidade', function(data) {
            eduamazonia.cidade = data;

            // setup dropdown
            $.each(eduamazonia.cidade, function(i, cidade) {
                $('select.cidade').append('<option value="' + cidade.cidade + '">' + cidade.cidade + ' - ' + cidade.estado + '</option>');
            });
            jQuery('select.cidade').chosen().trigger('liszt:updated');

            // setup marker layer
            var pointLayer = mmg().factory(markerFactory).url('cidades.geojson', function(feat, l) {
                mmg_interaction(l);
            });
            filter_map.addLayer(pointLayer);
        });
        // select change event
        $('select').chosen({allow_single_deselect:true}).change(function() {

            $('select.filter').each(function() {
                var filterValue = $(this).find('option:selected').val();
                var filterKey = $(this).data('type');
                selectedFilters[filterKey] = filterValue;
            });

            // navigate map if city
            if($(this).hasClass('cidade')) {
                var markerId = $(this).find('option:selected').val();
                if(markerId) {
                    var lat = $(this).find('option:selected').data('lat');
                    var lon = $(this).find('option:selected').data('lon');
                    navigateFilter(lat, lon, 8, markerId);
                } else {
                    navigateFilter(-2, -57, 4);
                }
            }
            theMagic(selectedFilters);
        });

        // filter map

        var filter_map;
        var tilejson_filters = {
            tilejson: '1.0.0',
            scheme: 'xyz',
            tiles: [
                'http://maps.cardume.art.br/v2/eduamazonia_marcador/{z}/{x}/{y}.png'
            ],
            formatter: function(options, data) {
                return data
            }
        }

        filter_map = new MM.Map('filter_map', new wax.mm.connector(tilejson_filters), null);
        filter_map.setCenterZoom(new MM.Location(-56,-5),4);

        wax.mm.zoomer(filter_map).appendTo(filter_map.parent);
        wax.mm.interaction()
            .map(filter_map)
            .tilejson(tilejson);

        var filter_map_ea = easey().map(filter_map).easing('easeInOut');

        var minZoom = 4;
        var maxZoom = 8;
        var topLeft = new MM.Location(6, -77);
        var bottomRight = new MM.Location(-15, -43);

        filter_map.setZoomRange(minZoom,maxZoom);

        filter_map.coordLimits = [
            filter_map.locationCoordinate(topLeft).zoomTo(minZoom),
            filter_map.locationCoordinate(bottomRight).zoomTo(maxZoom)
        ];

        layer.tileLimits = [
            filter_map.locationCoordinate(topLeft).zoomTo(minZoom),
            filter_map.locationCoordinate(bottomRight).zoomTo(maxZoom)
        ];

        sectionLoaded[section] = true;

        function markerFactory(feature) {
            var d = document.createElement('div');
            d.className = 'cidade-marker';
            // $(d).data('cidade', feature.id);
            $(d)
                .attr('data-cidade', feature.id)
                .data('lat', feature.properties.geo_latitude)
                .data('lon', feature.properties.geo_longitude)
                .append('<span class="cidade-tip">' + feature.id + ' - ' + feature.properties.estado + '</span>');
            $('option[value="' + feature.id + '"]')
                .data('lat', feature.properties.geo_latitude)
                .data('lon', feature.properties.geo_longitude);
            return d;
        }

        $('.cidade-marker').live('click', function() {
            var lat = $(this).data('lat');
            var lon = $(this).data('lon');
            var markerId = $(this).data('cidade');
            navigateFilter(lat, lon, 8, markerId);

            $('select.cidade option').attr('selected', false);
            $('select.cidade option[value="' + markerId + '"]').attr('selected', true);
            $('select.cidade').chosen().trigger('liszt:updated').change();
        });

        function navigateFilter(lat, lon, zoom, markerId) {
            easey().map(filter_map)
                .to(filter_map.locationCoordinate({lat: lat, lon: lon})
                .zoomTo(zoom))
                .run(2000);

            $('.cidade-marker').removeClass('active');
            if(markerId)
                $('.cidade-marker[data-cidade="'+markerId+'"]').addClass('active');
        }
    }
}