function() {

    var currentCenter = this.mapView.map.getCenter();

    this.navigate("", {

      trigger : true

    });



    if(this.isMobile()){

      this.displayOnly('map_canvas header-navigation');

    }

    else{

      if($('#map-wrap').css('top') == '250px') {

        this.scrollMap();

      }

      this.displayOnly('map_canvas appinfo hand-phone header-navigation');

    }

    this.mapView.map.setCenter(currentCenter);

    

    var self = this;

    //get latest feeditem

    if(!this.isMobile()) {

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

        '<div><div id="latest-feed-title"><a href="' + element.escape('link') + '" target="_blank">' + element.escape("title") + 

        '</a></div>' + '<div onclick="window.Trinkbrunnen.showRssFeed()" id="latest-feed-more">Mehr</div></div>' + '</article>');

        self.eventDispatcher.off('loadedFeed');



        $('#latest_feed').show();

      });

      if(this.feedItemCollection.timestamp < new Date().getTime() - 60 * 60 * 12) {

        this.feedItemCollection.reset();

        this.feedItemCollection.fetch({

          success : function() {

            self.feedItemCollection.timestamp = new Date().getTime();

            self.eventDispatcher.trigger('loadedFeed');

          },

          error : function() {

            if(self.isMobile()){

              alert("Feed konnte nicht geladen werden!");

            }

            else{

              //TODO: Think about a failure message place, when map is not scrolled up

              //self.showFailureMessage("Feed konnte nicht geladen werden!");

            }

          },

          add : true

        });

      } else {

        self.eventDispatcher.trigger('loadedFeed');

      }

    }

  }