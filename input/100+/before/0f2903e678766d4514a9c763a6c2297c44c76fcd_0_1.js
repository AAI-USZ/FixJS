function (data, boxen) {
        if (!(data['data'])) {
            return false;
        }
        for (box in boxen) {
            if (!!data.data[box]) {
                if (parseFloat(boxen[box].val()).toFixed(4) != parseFloat (data.data[box]).toFixed(4)) {
                    boxen[box].val(data.data[box]).not(':animated').effect ('highlight', {}, 1500);
                }
            }
        }
        // DEMs lapse
        $('input#SiteCoarseFineLapseCorrection').val ( (((data['pmip2'] - data['worldclim']) / 1000) * 6.4).toFixed(4) );
        // Site lapse
        var siteAlt = $('input#SiteElevation').val ();
        if (isNaN (siteAlt) || siteAlt === '' || siteAlt === undefined || !$('input:checkbox#SiteLapseCorrect').is(':checked')) {
            $('input#SiteFineKnownLapseCorrection').val ('');
        }
        else {
            $('input#SiteFineKnownLapseCorrection').val ( (((data['worldclim'] - siteAlt) / 1000) * 6.4).toFixed(4) );
        }
    }