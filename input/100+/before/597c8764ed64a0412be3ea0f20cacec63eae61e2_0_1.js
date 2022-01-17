function() {

    this.loadingView = new LoadingView;

    this.mapModel = new MapModel;

    this.feedModel = new FeedModel;

    this.userLocationModel = new UserLocationModel;

    this.markerCollection = new MarkerCollection;

    this.markerCollection.url = 'db/elements.php';

    this.feedItemCollection = new FeedItemCollection;

    this.feedItemCollection.url = 'rss.php';



    this.mapView = new MapView({

      model : this.mapModel

    });

    this.feedView = new FeedView;

    this.infoView = new InfoView;

    this.mapTypeView = new MapTypeView;

    this.addressView = new AddressView;



    this.addressView.mapView = this.mapView;

    this.mapTypeView.mapView = this.mapView;



    this.eventDispatcher = {};

    _.extend(this.eventDispatcher, Backbone.Events);



    if(!this.isMobile()) {

      var self = this;

      $('#search_close_button, #failure_close_button').click(function() {

        $('#address').hide();

        $('#failure').hide();

      });

      $('#activatemap').mousedown(function() {

        self.scrollMap();

      });

      $('#prev').click(function() {

        self.slideArticleToLeft();

      });

      $('#next').click(function() {

        self.slideArticleToRight();

      })

    }

  }