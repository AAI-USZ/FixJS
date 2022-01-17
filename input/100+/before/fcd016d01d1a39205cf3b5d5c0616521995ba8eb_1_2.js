function() {
    // TODO(benkomalo): consolidate this with the server info in
    // daily-ex-stats.js (maybe abstract to a data fetcher)
    var BASE_STAT_SERVER_URL = "http://184.73.72.110:27080/";

    var url = BASE_STAT_SERVER_URL +
            "report/daily_video_stats/_find?callback=?";
    var datestamp = $("#daily-video-date").val();
    var userCategory = $("#user-category").val();
    var criteria = JSON.stringify({
        "date_str": datestamp,
        "ucat": userCategory
    });
    var sort = JSON.stringify({
        "-seconds_watched": 1
    });
    var params = {
        // JSON query
        "criteria": criteria,
        "batch_size": 15000,
        "sort": sort
    };

    $("#individual-video-summary-container").text("Loading...");
    AjaxCache.getJson(url, params, VideoStats.handleDataLoadForDay);
}