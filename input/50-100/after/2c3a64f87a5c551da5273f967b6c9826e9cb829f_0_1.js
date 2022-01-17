function playlistQueues_renderTableRow(playlistQueueId, playlist) {
    // adding a row to the playlist_queues table, so remove the "empty table" message if it exists
    $("#playlist_queues tbody tr.empty_row").remove();

    var rowCount = $("#playlist_queues tbody tr").length;
    $("#playlist_queues tbody").append("<tr id=\"id" + playlistQueueId +"\"><td class=\"row_number\">" + (rowCount + 1) + "</td><td class=\"playlist_name\">" + playlist.name + "</td><td class=\"playlist_length\">" + playlist.songs.length + "</td><td>" + playlistQueues_renderActions(playlistQueueId) + "</td></tr>");
}