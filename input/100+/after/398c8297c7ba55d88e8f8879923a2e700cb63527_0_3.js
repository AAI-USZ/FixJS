function(results, status) {
            console.log (results, status);
            if (status == google.maps.ElevationStatus.OK) {
                // Retrieve the first result
                if (results[0]) {
                    $.smoothScroll ({
                        //scrollElement: $('#bg2'),
                        scrollTarget: $('input#SiteElevation')
                            .val(results[0].elevation.toFixed(4))
                            .data ('changedAuto', true)
                            .effect ('highlight', {}, 3000),
                        offset: -85
                    });
                    $('#SiteElevationCitationText').html ('Source: <em style="max-width: 5em;">' + $('#SiteElevationSource').val('Google (' + results[0].resolution.toFixed(1) + 'm res.)').val() + '</em>');
                }
                else {
                    alert("No results found");
                    return false;
                }
            }
            else {
                alert("Elevation service failed due to: " + status);
                return false;
            }
        }