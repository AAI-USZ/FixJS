function () {

    $.get('/player/', function (data, textStatus, jqXHR) {
        if (data.status) {
            $('#current').append(data.response.html);
        }
        else {
            $('#current').load('not-connected.html');
        }
    });

    $('#controls button').click(function(){
        $.get('/player/'+this.id, function (data, textStatus, jqXHR) {
        });
    });

}