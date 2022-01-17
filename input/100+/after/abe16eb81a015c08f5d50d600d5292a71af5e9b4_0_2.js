function get_status() {
    $.ajax({url:'/player/',
        success:function (data, textStatus, jqXHR) {
            if (data.status) {
                $('#controls').show();
                $('#current').html(data.response.html);
                $('#status').html(data.response.PlaybackStatus.toLowerCase());
                $('#shuffle').html('shuffle: ' + (data.response.Shuffle?'yes':'no'));
                $('#repeat').html('repeat: ' + data.response.LoopStatus.toLowerCase());
                $('#volume').html('volume: '+ data.response.Volume*100 + '%');
            }
            else {
                $('#current').load('connection-error');
                $('#controls').hide();
            }
        }})
}