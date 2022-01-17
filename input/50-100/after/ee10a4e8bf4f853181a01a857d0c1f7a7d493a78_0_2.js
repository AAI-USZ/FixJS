function (timestamp) {
        var date = new Date(timestamp * 1000);
        var result = date.getFullYear() + "-";
        if (date.getMonth() < 9)
            result += "0";
        result += (date.getMonth() + 1) + "-";
        if (date.getDate() < 10)
            result += "0";
        result += date.getDate();
        return result;
    }