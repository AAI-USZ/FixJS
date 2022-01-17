function (id) {
    $.ajax({
        url: 'api/ntdagencies/agency',
        data: {id: id},
        dataType: 'json',
        success: function (agency) {
            $('.tabButton').fadeOut();

            $('#agencyName').text(agency.name);

            $('#agencyDownload').attr('href', 'api/ntdagencies/agency/' + agency.id);

            $('#agencyUrl').html('<a href="http://' + DataController.validUrl(agency.url) + '">' + 
                                 agency.url + '</a>');
            $('#agencyNtdId').text(agency.ntdId);
            $('#agencyRidership').text(DataController.formatNumber(agency.ridership));
            $('#agencyPassengerMiles').text(DataController.formatNumber(agency.passengerMiles));
            $('#agencyPopulation').text(DataController.formatNumber(agency.population));
            
            // and the feeds
            $('.feedFields').remove();
            $.each(agency.feeds, function (ind, feed) {
                // color-code the feed by expiration status
                var status;
                var now = new Date();
                var later = new Date();
                var expires = new Date(Date.parse(feed.expires));
                // if it expires in under 2 months
                later.setMonth(later.getMonth() + 2);
                if (expires < now)
                    status = 'feedExpired';
                else if (expires < later)
                    status = 'feedToExpire';
                else
                    // just black, don't use red and green together.
                    status = 'feedOk';

                var expireText = ['January', 'February', 'March', 'April', 'May', 'June',
                                  'July', 'August', 'September', 'October', 'November', 
                                  'December'][expires.getMonth()] + ' ' + expires.getDate() +
                    ', ' + expires.getFullYear();

                $('#agencyFeeds').append(
                    '<li class="feedFields"><table>' +
                        '<tr>' +
                          '<th>Agency Name</th>' +
                          '<td>' + feed.agencyName + '</td>' +
                        '</tr>' +
                        '<tr>' +
                          '<th>Agency URL</th>' +
                          '<td><a href="' + DataController.validUrl(feed.agencyUrl) + '">' + 
                             feed.agencyUrl + '</a></td>' +
                        '</tr>' +
                        '<tr>' +
                          '<th>Feed Base URL</th>' +
                          '<td><a href="' + DataController.validUrl(feed.feedBaseUrl) + '">' + 
                             feed.feedBaseUrl + '</a></td>' +
                        '</tr>' +
                        '<tr>' +
                          '<th>Expires on</th>' +
                          '<td class="' + status + '">' + expireText + '</td>' +
                        '</tr>' +
                        '<tr>' +
                          '<th>Official</th>' +
                          '<td>' + (feed.official ? 'Yes' : 'No') + '</td>' +
                        '</tr>' +
                     '</table></li>'
                );
            });

            if (agency.feeds.length == 0)
                $('#agencyFeeds')
                    .append('<span class="feedFields">No public GTFS feed available.</span>');


            $('#tabs').hide();
            $('#agencyInfo').show('drop');
        }
    });
}