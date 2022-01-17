function (value) {
        var date,
            dateYMD,
            offSet;

        switch (Object.prototype.toString.call(value)) {
        case '[object String]':
            if (isNaN(value)) {
                date = value.split('T');
                dateYMD = date[0].split('-');

                // This is because JavaScript's Date object counts days/months from 0
                dateYMD[1] = dateYMD[1] - 1;
                date = dateYMD.concat(date[1].slice(0, 8).split(':'));

                if (value.charAt(19) === 'Z') {
                    // Get local time offset from user
                    offSet = (new Date(date[0], date[1], date[2]).getTimezoneOffset() / 60);
                    // Offest is the differnce of user's local to GMT
                    // Therefore BST will be GMT - -1
                    date[3] = parseInt(date[3], 10) - offSet;
                }

                return new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
            }
            // Else assume it's a number ...
            return convertToDate(parseInt(value, 10));
        case '[object Number]':
            if (value > 9999999999) {
                return new Date(value);
            }
            return new Date(value * 1000);
        case '[object Date]':
            return value;
        default:
            // Return current timedate
            return new Date();
        }
    }