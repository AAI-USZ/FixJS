function(tabs, inbox, bucket) {
        console.log("[Feeds.View] Init feeds past view");
        var self = this,
            limit = 10;

        //Init
        this.model      =  new Models.FeedsModel();
        this.pastDOM    =  new Feeds.FeedsPastDOM(bucket);
        this.presentDOM =  new Feeds.FeedsPresentDOM();
        this.server     =  new Feeds.FeedsServer(bucket);

         this.server.onReceiveFromTemplate('user')
            .await(bucket.models('user').putAsAction)
            .subscribe();

        Router.when('past/:project').chain(
            bucket.collections('feeds').resetAsAction,
            this.pastDOM.clearFeeds,
            this.server.closeStream('/story/:project/listen'),
            this.server.streamFeeds,
            tabs.dom.refreshNavigation,
            inbox.dom.refreshNavigation
        )
       .and(this.server.fetchLastFeeds)
       .and(this.server.fetchInbox);

        this.server.onReceive('/story/:project/listen')
            .map(this.model.asFeed)
            .await(
                bucket.collections('feeds').asFifo(limit)
               .and(
                   this.presentDOM.displayNewFeed(limit).then(
                       this.pastDOM.updateCounter
                       .and(inbox.dom.updateCounters)
                   )
               )
        ).subscribe();

        this.server.onReceive('/story/:project/inbox')
            .await(
                inbox.dom.initCounters
        ).subscribe();

        this.server.onReceive('/story/:project/last')
            .map(self.model.asFeed)
            .await(
                bucket.collections('feeds').asFifo(limit)
               .and(this.pastDOM.displayNewFeed(limit))
        ).subscribe();

        Router.when('past/:project/level/:level').chain(
             bucket.collections('feeds').resetAsAction,
             this.pastDOM.clearFeeds,
             this.server.fetchFeedsByLevel,
             this.pastDOM.displayFeedsPannel
         ).and(this.server.fetchInbox);

        this.server.onReceive('/story/:project/level/:level')
            .map(self.model.asFeed)
            .await(
                bucket.collections('feeds').asFifo(limit)
               .and(self.pastDOM.displayNewFeed(limit))
        ).subscribe();

        When(this.pastDOM.onNewCommentClick)
        .await(this.pastDOM.displayNewComment)
        .subscribe();

        When(this.pastDOM.onSubmitCommentClick)
        .map(this.pastDOM.newComment)
        .await(this.server.saveNewComment.then(this.pastDOM.displayComment))
        .subscribe();

        When(tabs.dom.onPastTabClick)
       .await(this.presentDOM.hideFeedsPannel.and(this.pastDOM.displayFeedsPannel))
       .subscribe();

        When(tabs.dom.onPresentTabClick)
       .await(this.pastDOM.hideFeedsPannel.and(this.presentDOM.displayFeedsPannel))
       .subscribe();
    }