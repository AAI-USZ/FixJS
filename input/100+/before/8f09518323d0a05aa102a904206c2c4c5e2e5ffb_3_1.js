function(feedItemModel) {

      var completeDescription = feedItemModel.get('description');

      var shortDescription = completeDescription.substring(0, 90);

      var descriptionEnd = shortDescription.substring(60, 90);

      var endLastWord = descriptionEnd.lastIndexOf(" ");

      shortDescription = shortDescription.substring(0, 60 + endLastWord);

      shortDescription += '...';



      $('#rss').append('<article>' + '<h3 class="feed-title"><a href="' + 

      feedItemModel.escape('link') + '">' + feedItemModel.escape("title") + 

      '</a></h3>' + '<p class="feed-date">' + feedItemModel.escape("pubDate") + 

      '</p>' + '<p class="feed-content">' + feedItemModel.get('image') + 

      shortDescription + '</p>' + '<a href="' + feedItemModel.escape('link') + 

      '" class="feed-more">Mehr</a>' + '</article>');

    }