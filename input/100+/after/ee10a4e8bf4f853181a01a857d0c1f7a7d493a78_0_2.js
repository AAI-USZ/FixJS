function (timestamp) {
        var date = new Date(timestamp * 1000);
        var result = "";
        if (date.getHours() < 10)
            result += "0";
        result += date.getHours() + ":"
        if (date.getMinutes() < 10)
            result += "0";
        result += date.getMinutes() + ":"
        if (date.getSeconds() < 10)
            result += "0";
        result += date.getSeconds();
        return result;
    }