function(timeFormat, timeString, options) {
    
    //########################################################################
	// pattern for standard and localized AM/PM markers
	//########################################################################
    var getPatternAmpm = function(amNames, pmNames) {
        var markers = [];
        if (amNames)
            $.merge(markers, amNames);
        if (pmNames)
            $.merge(markers, pmNames);
        markers = $.map(markers, function(val) { return val.replace(/[.*+?|()\[\]{}\\]/g, '\\$&'); });
        return '(' + markers.join('|') + ')?';
    }
    
    //########################################################################
	// figure out position of time elements.. cause js cant do named captures
	//########################################################################
    var getFormatPositions = function( timeFormat ) {
        var finds = timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|t{1,2}|z)/g),
            orders = { h: -1, m: -1, s: -1, l: -1, t: -1, z: -1 };

        if (finds)
            for (var i = 0; i < finds.length; i++)
                if (orders[finds[i].toString().charAt(0)] == -1)
                    orders[finds[i].toString().charAt(0)] = i + 1;

        return orders;
    }    
    
    var o = extendRemove(extendRemove({}, $.timepicker._defaults), options || {});
    
    var regstr = '^' + timeFormat.toString()
            .replace(/h{1,2}/ig, '(\\d?\\d)')
            .replace(/m{1,2}/ig, '(\\d?\\d)')
            .replace(/s{1,2}/ig, '(\\d?\\d)')
            .replace(/l{1}/ig, '(\\d?\\d?\\d)')
            .replace(/t{1,2}/ig, getPatternAmpm(o.amNames, o.pmNames))
            .replace(/z{1}/ig, '(z|[-+]\\d\\d:?\\d\\d)?')
            .replace(/\s/g, '\\s?') + o.timeSuffix + '$',
        order = getFormatPositions(timeFormat),
        ampm = '',
        treg;

    treg = timeString.match(new RegExp(regstr, 'i'));

    var resTime = {hour: 0, minute: 0, second: 0, millisec: 0};
    
    if (treg) {
        if (order.t !== -1) {
            if (treg[order.t] === undefined || treg[order.t].length === 0) {
                ampm = '';
                resTime.ampm = '';
            } else {
                ampm = $.inArray(treg[order.t], o.amNames) !== -1 ? 'AM' : 'PM';
                resTime.ampm = o[ampm == 'AM' ? 'amNames' : 'pmNames'][0];
            }
        }

        if (order.h !== -1) {
            if (ampm == 'AM' && treg[order.h] == '12')
                resTime.hour = 0; // 12am = 0 hour
            else if (ampm == 'PM' && treg[order.h] != '12')
                resTime.hour = parseInt(treg[order.h],10) + 12; // 12pm = 12 hour, any other pm = hour + 12
            else resTime.hour = Number(treg[order.h]);
        }

        if (order.m !== -1) resTime.minute = Number(treg[order.m]);
        if (order.s !== -1) resTime.second = Number(treg[order.s]);
        if (order.l !== -1) resTime.millisec = Number(treg[order.l]);
        if (order.z !== -1 && treg[order.z] !== undefined) {
            var tz = treg[order.z].toUpperCase();
            switch (tz.length) {
            case 1:	// Z
                tz = o.timezoneIso8601 ? 'Z' : '+0000';
                break;
            case 5:	// +hhmm
                if (o.timezoneIso8601)
                    tz = tz.substring(1) == '0000'
                       ? 'Z'
                       : tz.substring(0, 3) + ':' + tz.substring(3);
                break;
            case 6:	// +hh:mm
                if (!o.timezoneIso8601)
                    tz = tz == 'Z' || tz.substring(1) == '00:00'
                       ? '+0000'
                       : tz.replace(/:/, '');
                else if (tz.substring(1) == '00:00')
                    tz = 'Z';
                break;
            }
            resTime.timezone = tz;
        }

        return resTime;

    }
    return null;
}