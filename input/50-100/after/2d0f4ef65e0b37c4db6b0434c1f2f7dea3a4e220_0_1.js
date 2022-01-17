function (data) {
	   var items = [];
        $.each(data, function(i, item) {
            items.push('<li>' + item.artist_name + ' - ' + item.name + '  <a href=\'#\' onclick="return removeItemFromQueue(\'' + item.queue_id + '\')">Remove</a>' + '</li>');
        });
         $("#queue").empty();
        $('#queue').append(items.join(''));
    }