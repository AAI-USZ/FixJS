function filterToMostRecent(items) {
  // Keep track of the latest result for each object ID
  var latest = {};

  // Loop through all the items
  for (var i=0; i < items.length; i++) {
    var item = items[i];
    var parcelId = item.parcel_id;
    
    // console.log("testing========");
    // console.log(item);
    // console.log("--");
    // console.log(latest);
    // console.log("----");
    
    if (latest[parcelId] == undefined){
      // If there isn't a most recent result yet, just add it
      latest[parcelId] = item;
    } else {
      // We need to check if this result is newer than the latest one
      var oldDate = new Date(latest[parcelId].created);
      var newDate = new Date(item.created);
      if (oldDate.getTime() < newDate.getTime()) {
        latest[parcelId] = item;
      };
    };
  };
  
  // Covert the keyed array to a plain ol' list
  var latest_list = [];
  for (var key in latest) {
    latest_list.push(latest[key]);
  };
  return latest_list;
}