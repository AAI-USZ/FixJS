function (ind, agency) {
        var tr = create('tr');

        // name
        var url = agency.url;

        // TODO: catch non-urls.

        // this will catch https as well
        if (url.slice(0, 4) != 'http')
            url = 'http://' + url;

        var name = create('td').append(
            create('a')
                .attr('href', url)
                // use .text to prevent potential HTML entities in DB from causing issues
                .text(agency.name)
        );
        tr.append(name);

        // metro
        tr.append(create('td').text(agency.metro));

        // ridership
        tr.append(create('td').text(DataController.formatNumber(agency.ridership)));
        
        // passenger miles
        tr.append(create('td').text(DataController.formatNumber(agency.passengerMiles)));

        // population
        tr.append(create('td').text(DataController.formatNumber(agency.population)));

        // google transit (TODO: icons)
        tr.append(create('td').html(agency.googleGtfs ? 
                                    '<span class="ui-icon ui-icon-check"></span>' : ''));
        
        // public gtfs
        tr.append(create('td').html(agency.publicGtfs ? 
                                    '<span class="ui-icon ui-icon-check"></span>' : ''));

        $('tbody#data').append(tr);
        
    }