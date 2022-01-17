function() {
    var type = $("#engagement-summary-type").val();
    var nRanges = 3;

    // TODO(benkomalo): hacking in a reference date until a backfill is done.
    // Get the last N ranges of the type
    //var today = new Date();
    var today = new Date(2012, 3, 22);
    var ranges = VideoStats.generateDateRanges(type, today, nRanges);

    var BASE_STAT_SERVER_URL = "http://107.21.23.204:27080/";
    var url = BASE_STAT_SERVER_URL + "report/user_video_distribution/_find?callback=?";
    var deferreds = [];
    // TODO(benkomalo): deal with phantom users!
    _.each(ranges, function(range) {
        var criteria = JSON.stringify({
            "start_dt": $.datepicker.formatDate("yy-mm-dd", range["start"]),
            "end_dt": $.datepicker.formatDate("yy-mm-dd", range["end"]),
            "registered": true
        });
        var params = {
            "criteria": criteria,
            "batch_size": 15000
        };
        // Asynchronously load each range. Note we don't need to use
        // the caching feature of VideoStats.getJson, since we need to
        // manually cache each range result.
        deferreds.push($.getJSON(
            url, params, function(data) {
                VideoStats.handleEngagementDataLoad(
                    range,
                    data["results"] || []);
            }));
    });

    $("#engagement-summary-table-container").text("Loading...");
    $.when.apply($, deferreds).done(function() {
        // All ranges finished loading - render.
        VideoStats.renderEnagementTables(ranges, type);
    });
}