function (request, status) {
    if (status == "completed" || status == "announced" ||
        status == "closed-out" || status == "deleted") {
        return '<a href="' + WMStats.Globals.WORKLOAD_SUMMARY_URL_PREFIX + 
                encodeURIComponent(request) + '" target="_blank">' + status + '</a>';
    } else {
        return status;
    }
}