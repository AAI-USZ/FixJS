function handle_event_message(e){
        var lineDiv = document.createElement('div');

        var timeSpan = document.createElement('span');
        var nickSpan = document.createElement('span');
        var msgSpan = document.createElement('span');

        var data = JSON.parse(e.data);

        timeSpan.innerHTML = data['time'] + ' ';
        timeSpan.className = 'time';

        nickSpan.innerHTML = data['nick'] + ': ';
        nickSpan.className = 'nick';

        msgSpan.innerHTML = data['message'] + ' ';
        msgSpan.className = 'msg';


        lineDiv.className = 'line';
        lineDiv.appendChild(timeSpan);
        lineDiv.appendChild(nickSpan);
        lineDiv.appendChild(msgSpan);

        $('#chat').append(lineDiv);

        //TODO: scroll the div to the bottom of the page when the content is larger
        //than the div
    }