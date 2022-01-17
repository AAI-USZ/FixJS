function onBuildFixed(buildEvent) {
            var message = (buildEvent.state.failedBuildsCount == 0) ?
                'All builds are green !' :
                buildEvent.message;
            var notification = {
                message: message,
                details: buildEvent.details,
                url: buildEvent.url,
                backgroundColor: '#D00'
            };
            showNotification(notification);
            updateBadge(buildEvent.state);
        }