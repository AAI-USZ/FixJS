function (container, storageId, feedUrl, options) {
        var feed;

        feed = new google.feeds.Feed(feedUrl);

        if (options.numEntries) {
            feed.setNumEntries(options.numEntries);
        }

        feed.load(function (result) {
            var i,
            thisEntry,
            dateTime,
            dateObject,
            hours,
            minutes,
            designation,
            content = {};

            if (! result.error) {
                content = {
                    "feed": this.feed
                };
                for (i = 0; i < content.feed.entries.length; i = i + 1) {
                    thisEntry = content.feed.entries[i];
                    dateTime = {};
                    dateObject = new Date(thisEntry.publishedDate);
                    dateTime.date = dateObject.toLocaleDateString();
                    if (options.showTime) {
                        minutes = dateObject.getMinutes();
                        if (minutes < 10) {
                            minutes = "0" + minutes;
                        }
                        hours = dateObject.getHours();
                        designation = hours < 12 ? 'AM' : 'PM';
                        if (hours > 12) {
                            hours = hours - 12;
                        }
                        if (hours === 0) {
                            hours = 12;
                        }

                        dateTime.time = hours + ':' +
                        minutes + ' ' +
                        designation;
                    }
                    thisEntry.dateTime = dateTime;
                }
                if (Modernizr.localstorage) {
                    window.localStorage.setItem(storageId, JSON.stringify(content));
                }
            } else {
                content = ucsf.news.loadFromStorage(storageId);
            }
            container.innerHTML = options.template.render(content);
        });
    }