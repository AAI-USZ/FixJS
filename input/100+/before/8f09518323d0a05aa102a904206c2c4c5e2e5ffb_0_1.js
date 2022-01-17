function(data){

    var feedItems = new Array();

   

    for(idx in data){

      var description = data[idx].description;

      //Extracting image tag if exists

      var image = "";

      if(description.charAt(0) == "<"){

        var lastImageLetter = description.indexOf(">");

        image = description.slice(0, lastImageLetter+1);

        description = description.replace(image, "");

        if(description.charAt(0) == " "){

          description = description.substring(1,description.length);

        }

        else if(description.substring(0, 6) == '&nbsp;'){

          description = description.substring(6,description.length);

        }

      }

      

      //Remove not nessecary part (date, location) on the beginning of description

      if(description.indexOf("(") != -1 && description.indexOf(")") != -1){

        var firstDateLetter = description.indexOf("(");

        var lastDateLetter = description.indexOf(")");

        

        if(description[lastDateLetter+1] = " ")

          var replacePart = description.slice(firstDateLetter, lastDateLetter+1);

        else

          var replacePart = description.slice(firstDateLetter, lastDateLetter);

          

        description = description.replace(replacePart, "");

      }

      

      var feedItemModel = new FeedItemModel({

        title: data[idx].title, 

        link: data[idx].link,

        pubDate: $.format.date(data[idx].pubDate, 'dd. MMMM yyyy'),

        image: image,

        description: description

      });

      feedItems.push(feedItemModel);

    }

    return feedItems;

  }