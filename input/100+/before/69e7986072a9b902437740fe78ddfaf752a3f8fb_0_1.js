function playlistQueues_playlistQueuesDestroy(playlistQueueId) {
    // remove deleted playlist_queue
    $("#playlist_queues #" + playlistQueueId).remove();

    // update row numbers, since a middle row could have been deleted
    $("#playlist_queues tbody tr").each(function() {
        $this = $(this)
        var row = $this[0].rowIndex;
        $this.find("td.row_number").html(row);
    });

    playlistQueues_renderTableEmptyMessage();
}