function playlistQueues_playlistQueuesDestroy(playlistQueueId) {
    var a = $("#playlist_queues");
    var b = $("table#playlist_queues");
    var c = $("#playlist_queues tr");
    var d = $("table#playlist_queues tr");
    var e = $("#playlist_queues #id" + playlistQueueId);
    var f = $("table#playlist_queues #id" + playlistQueueId);
    var g = $("#playlist_queues tr#id" + playlistQueueId);
    var h = $("table#playlist_queues tr#id" + playlistQueueId);
    var i = $("table#playlist_queues tbody tr#id" + playlistQueueId);


    // remove deleted playlist_queue
    $("#playlist_queues #id" + playlistQueueId).remove();

    // update row numbers, since a middle row could have been deleted
    $("#playlist_queues tbody tr").each(function() {
        $this = $(this)
        var row = $this[0].rowIndex;
        $this.find("td.row_number").html(row);
    });

    playlistQueues_renderTableEmptyMessage();
}