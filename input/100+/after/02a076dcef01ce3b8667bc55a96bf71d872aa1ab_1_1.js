function ( collections, router, views, models) { 

  router.AppRouter = Backbone.Router.extend({

    routes:{
        "":"list",
        "feedings/new":"newFeeding",
        "feedings/:id":"feedingDetails"
    },

    initialize:function () {
        $('#header').html(app.views.header.render().el);
    },

    list:function () {
        //we want to refetch the items.
        this.feedingList = collections.paginatedItems;
        var self = this;
    },

    feedingDetails:function (id) {
        this.feeding = this.feedingList.get(id);
        if (app.feedingView) app.feedingView.close();
        this.feedingView = new views.ItemView({model:this.feeding});
        $('#editbox').html(this.feedingView.render().el);
    },

    newFeeding:function () {
        if (app.feedingView) app.feedingView.close();
        app.feedingView = new views.ItemView({model:new models.Feeding()});
        $('#editbox').html(app.feedingView.render().el);
    }
  });
}