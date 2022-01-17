function(){

  // Media Model
  // ----------

  // Basic **Media** model
  var Media = Backbone.Model.extend({

    // Use Instagram Sync extension
    sync:Backbone.InstagramSync
  });

  // Media Collection
  // ---------------

  // The collection of media (images)
  var MediaList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Media,
    
    // path to current users media feed
    url:'users/self/feed',
  
    // Use Instagram Sync extension
    sync:Backbone.InstagramSync

  });

  // Create a collection of Images.
  var Images = new MediaList;

  // Media View
  // --------------

  // The DOM element for an image...
  var MediaView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single media item.
    template: _.template($('#media-template').html()),

    // render the media image
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#instagramapp"),
    

    // Our template for the count at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // At initialization we bind to the relevant events on the `Media`
    // collection. 
    initialize: function() {
    
      this.footer     = this.$('footer');
      this.main       = $('#main');
      this.login_btn  = $('#login-btn')
      
      Images.bind('all', this.render, this);
      Images.bind('reset', this.addAll, this);

      // Check if we have an access token      
      var access_token = this._getHashVars('access_token');
      
      if(access_token) {
        // hide the login button
        this.login_btn.hide()
        
        // set the access token
        Backbone.InstagramSync.access_token = access_token;
        
        // fetch the images from instagram
        Images.fetch();
      }
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      if (Images.length) {
        this.main.show();
        this.footer.show();
        this.login.hide();
        this.footer.html(this.statsTemplate({count: Images.length}));
      }
    },
    
    addOne: function(media) {
      var view = new MediaView({model: media});
      this.$("#media-list").append(view.render().el);
    },

    // Add all items in the **Media** collection at once.
    addAll: function() {
      Images.each(this.addOne);
    },
    
    _getHashVars: function(key) {
      var vars = {};
      var parts = window.location.href.replace(/[#&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
      });
      return vars[key];
    }


  });


  var App = new AppView;


}