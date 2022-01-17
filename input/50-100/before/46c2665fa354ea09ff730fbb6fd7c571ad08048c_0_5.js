function(time) {
    var date = exports.stringToDate(time);
    if (!date || !date.getTime) return "";
    var aa = "AM", hours = date.getHours();
    hours >= 12 && (aa = "PM", hours -= 12), hours == 0 && (hours = "12");
    var minutes = date.getMinutes();
    return minutes < 10 && (minutes = "0" + minutes), hours + ":" + minutes + " " + aa;
}