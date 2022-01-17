function () {
  this.unblock();
  //Call all APIs
  console.log("Getting all API Data");
  Meteor.call("getFlickrData");
  Meteor.call("getInstagramData");
  Meteor.call("get500pxData");
  Meteor.call("getFoursquareData");
  return false;
}