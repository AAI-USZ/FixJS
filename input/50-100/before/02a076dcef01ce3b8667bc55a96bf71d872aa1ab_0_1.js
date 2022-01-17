function ( models ) {
  models.Feeding = Backbone.Model.extend({
    idAttribute: "_id",
    defaults:{
          "_id": null,
          "date": new Date(),
          "side":"",
          "time":"",
          "excrement":"P",
          "remarks":""
    },

		// the URL (or base URL) for the service
		url: '../api/feedings'
  });

}