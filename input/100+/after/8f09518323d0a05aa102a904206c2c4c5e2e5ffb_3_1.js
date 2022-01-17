function(){

    alert(this.feedItemCollection.size() + " feed items 2 ");

    _.each(this.feedItemCollection.toArray(), function(feedItemModel) {

      alert('first item ');

      var completeDescription = feedItemModel.get('description');

      var shortDescription = completeDescription.substring(0, 90);

      var descriptionEnd = shortDescription.substring(60, 90);

      var endLastWord = descriptionEnd.lastIndexOf(" ");

      shortDescription = shortDescription.substring(0, 60 + endLastWord);

      shortDescription += '...';

      

      alert('first item: ' + shortDescription);

      return;



      $('#rss').append('<article>' + '<h3 class="feed-title"><a href="' + 

      feedItemModel.escape('link') + '">' + feedItemModel.escape("title") + 

      '</a></h3>' + '<p class="feed-date">' + feedItemModel.escape("pubDate") + 

      '</p>' + '<p class="feed-content">' + feedItemModel.get('image') + 

      shortDescription + '</p>' + '<a href="' + feedItemModel.escape('link') + 

      '" class="feed-more">Mehr</a>' + '</article>');

    });

    this.scaleImages();

    

    var self = this;

    var checkState = window.setInterval(function(){

      if(self.checkLoadingImages()){

        self.scaleImages();

        window.clearInterval(checkState);

      }

      else{

        self.scaleImages();

      }

    }, 300);

  }