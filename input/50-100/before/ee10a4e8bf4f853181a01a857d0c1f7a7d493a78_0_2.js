function (timestamp) {
        var date = new Date(timestamp * 1000);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }