function () {
  this.unblock();
  Photos.remove({}); 
  console.log("wipe'd data");
  console.log("Fetching data from Flickr...");

  var flickrParams = {
    tagmode: "any",
    format: "json"
  };

  if (typeof searchTerm == "string") {
    flickrParams.tags = searchTerm
  };
  var result = Meteor.http.call("GET", "http://api.flickr.com/services/feeds/photos_public.gne?&lang=en-us&format=json&jsoncallback=?",
                                {params: flickrParams});
  if (result.statusCode === 200) {
    console.log("Result.statusCode: " + result.statusCode)
    resultJSON = eval(result.content);
    //console.log(resultJSON.items)
     for (photoIndex in resultJSON.items) {
      photo = resultJSON.items[photoIndex]
      if (Photos.findOne({url:photo.link}) == null) {
        photo.url = photo.link;
        photo.date = Date.now();
        Photos.insert(photo);
      }
     }
   }
  return false;
}