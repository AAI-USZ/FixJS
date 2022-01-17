function handleStartedPlaying(event) {
        lastPlayer = event.source;
        changeIcon(icons.pause);
        unIdle();
        if (event.data.info) {
            changeTitle(htmlDecode (event.data.info[5] + ' - ' + event.data.info[6])  + ' (' + htmlDecode(event.data.info[4]) +')' );
        }
        startMonitorPlayer();
    }