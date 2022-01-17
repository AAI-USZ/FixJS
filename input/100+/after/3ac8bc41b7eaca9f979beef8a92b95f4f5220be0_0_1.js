function(friends){
        $("#streamContent").empty();
        for (var i = 0; i < friends.length; i++) {
            var output='';
            output+='<ul data-role="listview" data-inset="true" id="listview-stream'+i+'"><li data-icon="false"><a href="#" data-transition="none">';
            output+='<img src="'+friends[i].picture_url+'" class="ui-li-thumb profile-stream"/>';
            output+='<p class="text-stream">'+friends[i].name.firstname+'</p>'
            output+='<p class="text-stream">'+friends[i].checkins[0].event.name+'</p>';
            output+='<p class="day-stream">'+friends[i].checkins[0].timestamp+'</p>';
            output+='<img src="'+friends[i].checkins[0].event.poster_url+'" class="poster-stream"/>';
            output+='</a></li></ul>';
            $('#streamContent').append(output);
            $('#listview-stream'+i).listview();
        }

    }