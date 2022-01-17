function (data, boxen) {
        if (!(data['data'])) {
            return false;
        }
        for (box in boxen) {
            if (data.data[box] === 0) {
                if (parseFloat(boxen[box].val()).toFixed(3) != parseFloat (data.data[box]).toFixed(3)) {
                    boxen[box].val(data.data[box].toFixed(3)).not(':animated').effect ('highlight', {}, 1500);
                }
            }
            else if (!!data.data[box]) {
                if (parseFloat(boxen[box].val()).toFixed(3) != parseFloat (data.data[box]).toFixed(3)) {
                    boxen[box].val(data.data[box].toFixed(3)).not(':animated').effect ('highlight', {}, 1500);
                }
            }
        }
        // DEMs lapse
        var cflc = (((data.data['pmip2'] - data.data['worldclim']) / 1000) * 6.4).toFixed(4);
        $('input#SiteCoarseFineLapseCorrection').val ((isNaN(cflc)) ? '' : cflc);
        // Site lapse
        var siteAlt = $('input#SiteElevation').val ();
        if (isNaN (siteAlt) || siteAlt === '' || siteAlt === undefined || !$('input:checkbox#SiteLapseCorrect').is(':checked')) {
            $('input#SiteFineKnownLapseCorrection').val ('');
        }
        else {
            $('input#SiteFineKnownLapseCorrection').val ( (((data.data['worldclim'] - siteAlt) / 1000) * 6.4).toFixed(4) );
        }
    }