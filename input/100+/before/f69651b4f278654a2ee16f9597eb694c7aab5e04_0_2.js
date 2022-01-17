function (ind, agency) {
        var tr = create('tr');

        // alternate classes
        tr.addClass(ind % 2 ? 'tblRowEven' : 'tblRowOdd');

        // name
        var url = agency.url;

        // TODO: catch non-urls.

        // this will catch https as well
        if (url.slice(0, 4) != 'http')
            url = 'http://' + url;

        var name = create('td').addClass('tblColOdd').append(
            create('a')
                .attr('href', url)
                // use .text to prevent potential HTML entities in DB from causing issues
                .text(agency.name)
        );
        tr.append(name);

        // metro
        var metro = create('td').addClass('tblColEven');
        var metroLink = create('a')
            .attr('href', '#')
            .text(agency.metro)
            .data('lat', agency.lat)
            .data('lon', agency.lon)
            .click(function (e) {
                e.preventDefault();
                
                var a = $(this);
                // switch to the map tab
                $('#mapTabToggle').click();
                
                // we need to wait until the click has propagated before doing this
                setTimeout(function () {
                    instance.mapController.zoomTo(a.data('lat'), a.data('lon'), 10);
                }, 1000);
            });

        metro.append(metroLink).appendTo(tr);

        // ridership
        tr.append(create('td').text(DataController.formatNumber(agency.ridership))
                      .addClass('tblColOdd'));
        
        // passenger miles
        tr.append(create('td').text(DataController.formatNumber(agency.passengerMiles))
                      .addClass('tblColEven'));

        // population
        tr.append(create('td').text(DataController.formatNumber(agency.population))
                      .addClass('tblColOdd'));

        // google transit (TODO: icons)
        tr.append(create('td').html(agency.googleGtfs ? 
                                    '<span class="ui-icon ui-icon-check">Yes</span>' : 
                                    '<span class="ui-icon ui-icon-blank">No</span>')
                      .addClass('tblColEven'));
        
        // public gtfs
        tr.append(create('td').html(agency.publicGtfs ? 
                                    '<span class="ui-icon ui-icon-check">Yes</span>' :
                                    '<span class="ui-icon ui-icon-blank">No</span>')
                      .addClass('tblColOdd'));

        $('tbody#data').append(tr);
        
    }