function dateDiff(a, b, format) {
    var milliseconds = toDate(a) - toDate(b);
    var days = milliseconds / 86400000;
    var hours = milliseconds / 3600000;
    var weeks = milliseconds / 604800000;
    var months = milliseconds / 2628000000;
    var years = milliseconds / 31557600000;
    if (format == "h") {
        return Math.round(hours);
    }
    if (format == "d") {
        return Math.round(days);
    }
    if (format == "w") {
        return Math.round(weeks);
    }
    if (format == "m") {
        return Math.round(months);
    }
    if (format == "y") {
        return Math.round(years);
    }
}