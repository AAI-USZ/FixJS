function (place) {
                if (!!wc.local.map.map) {
                    wc.local.map.info.close();
                }
                $([
                    $('input#SiteName').val(place.placeTitle),
                    $('input#SiteLatDec').val(place.lat),
                    $('input#SiteLonDec').val(place.lng),
                    $('textarea#SiteDescription').val(place.summary + '\n(elevation: '+place.elevation+'m)'),
                    $('input#SiteElevation').val(place.elevation.trim()).data ('changedAuto', true)
                ]).effect ('highlight', {}, 3000);
                
                $('#SiteElevationCitationText').html ('Source: <em>' + $('#SiteElevationSource').val('Wikipedia').val() + '</em>');
                $('.rgsClearResultsButton').click();
                if (!!wc.local.map.map) {
                    wc.local.map.fromBoxen ();
                    $.smoothScroll ({
                        scrollElement: $('#bg2'),
                        scrollTarget: $('#SiteName'),
                        offset: -85
                    });
                }
                else {
                    wc.demLookup();
                }
            }