function(data) {
        if (/[0-9a-z]{40}/i.test(data) || /[0-9]{4}\-[0-9]{2}\-[0-9]{2}/.test(data)) {
            return data;
        }

        var parsedNumber = parseFloat(data, 10),
            x, x1, x2;

        if (!isNaN(parsedNumber)) {
            /* Format the dumber: commas as thousand separator and max three digits after the decimal separator */
            parsedNumber = parsedNumber.toString();
            x = parsedNumber.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? ',' + x[1].substring(0, 3) : '';
            var rgx = /(\d+)(\d{3})/;
            
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + '.' + '$2');
            }

            return x1 + x2;
        }

        return data;
    }