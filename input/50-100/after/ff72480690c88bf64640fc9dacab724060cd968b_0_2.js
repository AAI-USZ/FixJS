function playlistQueues_playlistQueuesDestroy(playlistQueueId) {
    // since there are multiple ways to get to this method, need to make sure
    // the Playlist Queue is still in the table - it could have already been removed
    var playlistQueue = $("#playlist_queues tbody #id" + playlistQueueId);
    if (playlistQueue.length > 0) {
        // remove deleted playlist_queue
        playlistQueue.remove();

        // update row numbers, since a middle row could have been deleted
        $("#playlist_queues tbody tr").each(function() {
            $this = $(this)
            var row = $this[0].rowIndex;
            $this.find("td.row_number").html(row);
        });

        playlistQueues_renderTableEmptyMessage();
    }
}