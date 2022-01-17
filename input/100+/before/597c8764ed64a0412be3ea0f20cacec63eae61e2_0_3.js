function() {

    this.navigate("", {replace : true});

      

    var currentCenter = this.mapView.map.getCenter();

    var self = this;



    if(this.isMobile())

      this.displayOnly('map_canvas');

    else

      this.displayOnly('map_canvas appinfo hand-phone');

    this.mapView.map.setCenter(currentCenter);



    //get latest feeditem

    if(!this.isMobile()){

      this.eventDispatcher.on('loadedFeed', function() {

        var element = _.first(self.feedItemCollection.toArray());

        var completeDescription = element.get('description');

        var shortDescription = completeDescription.substring(0, 110);

        var descriptionEnd = shortDescription.substring(80, 110);

        var endLastWord = descriptionEnd.lastIndexOf(" ");

        shortDescription = shortDescription.substring(0, 80 + endLastWord);

        shortDescription += '...';



        $('#latest_feed').html('<article>' + '<div id="latest-feed-headline">' + 

        '<div id="latest-feed-news" onclick="window.Trinkbrunnen.showRssFeed()">Wasser-News</div>' + 

        '<div id="latest-feed-date">' + element.escape("pubDate") + '</div>' + '</div>' + 

        '<div id="latest-feed-title"><a href="' + element.escape('link') + '" target="_blank">' + 

        element.escape("title") + '</a></div>' + '<div id="latest-feed-content">' + shortDescription 

        + '</div>' + '<a href="javascript:void(0)" onclick="window.Trinkbrunnen.showRssFeed()" '+

        'id="latest-feed-more">Mehr</a>' + '</article>');

        self.eventDispatcher.off('loadedFeed');



        $('#latest_feed').show();

      });

      if(this.feedItemCollection.timestamp < new Date().getTime() - 60 * 60 * 12) {

        this.feedItemCollection.reset();

        this.feedItemCollection.fetch({

          success : function() {

            self.feedItemCollection.timestamp = new Date().getTime();

            if(!self.canSlideArticle('left')) {

              $('.prev').css('background-image', 'url(assets/img/links_disabled.png)');

              self.eventDispatcher.trigger('loadedFeed');

            }

          },

          error : function() {

            self.showFailureMessage("Feed konnte nicht geladen werden!");

          },

          add : true

        });

      }

      else{

        self.eventDispatcher.trigger('loadedFeed');

      }

    }

  }