function () {
        if ($(this).attr('providerId') && $(this).attr('providerId') != "") {
            if (!providerMap.hasOwnProperty($(this).attr('providerId'))) {
                providerMap[$(this).attr('providerId')] = providerColorCodes[colorPos];
                colorPos = (colorPos + 1) % 10;
            }
        }
    }