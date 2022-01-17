function getDateNumber() {
        var now = dateToUse;
        var nowDate = String(now.getYear()+1900);
        var month = now.getMonth()+1;
        var day = now.getDate();
        if (month < 10) {
            nowDate += '0';
        }
        nowDate += month;
        if (day < 10) {
            nowDate += '0';
        }
        nowDate += day;
        return Number(nowDate);
    }