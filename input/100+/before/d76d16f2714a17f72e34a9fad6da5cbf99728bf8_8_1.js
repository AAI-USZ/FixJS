function(){
  "use strict";

  var mongoose = require("mongoose");

  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId,
      Mixed    = Schema.Types.Mixed;

  var Order = new Schema({
    meetup_id: String,
    items: Mixed,
    itemsString: String,
    person: String,
    price: Number
  });

  var Meetup = new Schema({
    meetup_id: String,
    name: String,
    event_url: String,
    rid: Number,
    hostEmail: String,
    address: Mixed,
    time: Mixed
  });

  exports.Order  = mongoose.model("Order", Order);
  exports.Meetup = mongoose.model("Meetup", Meetup);
}