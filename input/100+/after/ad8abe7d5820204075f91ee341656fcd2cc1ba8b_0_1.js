function(){
  
  window.Streamer = Backbone.Model.extend({
    defaults: function() {
      return {
        name: "",
        stream: "",
        service: "",
        viewers: 0,
        online: false
      };
    },
    
    initialize: function() {
      // console.log('streamer initialize');
      if (!this.get("name")) {
        this.set({"name": this.defaults.name});
      }
    },
    
    toggle: function() {
      this.save({online: !this.get('online'), viewers: 0});
    },
    
    clear: function() {
      this.destroy();
    }
  });
  
  var StreamerList = Backbone.Collection.extend({
    model: Streamer,
    localStorage: new Store("streamers-backbone"),
    online: function() {
      return new Backbone.Collection(this.filter(function(streamer){ return streamer.get('online'); }));
    },
    offline: function() {
      return new Backbone.Collection(this.filter(function(streamer){ return !streamer.get('online'); }));
    }
  });
  
  var StreamerView = Backbone.View.extend({
    tagName: "li",
    template: _.template($('#streamer-template').html()),
    events: {
      "click .toggle"     : "toggleOnline",
      "dblclick .view"    : "edit",
      "click a.remove"    : "clear",
      "click .sync"       : "syncStream",
      "click .close"      : "close",
      "click .save"       : "save"
    },
    
    initialize: function() {
      _.bindAll(this, 'syncStream');
      // console.log('streamerview intialize');
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
      this.model.bind('change:online', this.unrender, this);
      this.toggle_unrender = false || this.options.toggle_unrender;
    },
    
    render: function() {
      // console.log('streamerview render');
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('online', this.model.get('online'));
      this.$el.toggleClass('offline', !this.model.get('online'));
      this.inputName = this.$('.editName');
      this.inputViewers = this.$('.editViewers');
      this.inputStream = this.$('.editStream');
      this.inputService = this.$('.editService');
      this.closeButton = this.$('.close');
      this.saveButton = this.$('.save');
      return this;
    },
    
    toggleOnline: function() {
      this.model.toggle();
    },
    
    edit: function() {
      this.$el.addClass("editing");
      this.inputName.focus();
    },
    
    close: function() {
      this.$el.removeClass("editing");
    },
    
    save: function() {
      var name_value = this.inputName.val();
      var viewer_value = this.inputViewers.val() || 0;
      var stream_value = this.inputStream.val();
      var service_value = this.inputService.val();
      var online_value = (viewer_value > 0) ? true : false
      
      if (!name_value) this.clear();
      
      this.model.save({
        name: name_value,
        viewers: viewer_value,
        stream: stream_value,
        service: service_value,
        online: online_value
      });
      
      this.close();
    },
    
    syncStream: function() {
      if(this.model.get('service') == 'twitch') {
        this.syncTwitch();
      }
      else if(this.model.get('service') == 'own3d') {
        this.syncOwn3d();
      }
    },
    
    syncTwitch: function() {
      var self = this;
      console.log('sync');
      var pageUrl = 'http://api.justin.tv/api/stream/list.json?jsonp=syncStreamer&channel=' + this.model.get('stream');
      
      $.ajax({
        url: pageUrl,
        dataType: "jsonp",
        jsonpCallback: 'syncStreamer',
        success: function(data) {
          console.log('ajax success');
          var count = data[0].channel_count;
          self.inputViewers.val(count);
        },
        error: function(error) {
          console.log('ajax error');
          self.inputViewers.val(0);
        }
      });
    },
    
    syncOwn3d: function() {
      console.log('sync own3d');
      var self = this;
      
      var pageUrl = 'http://api.own3d.tv/liveCheck.php?live_id='+ this.model.get('stream');
      var yqlUrl = "http://query.yahooapis.com/v1/public/yql?"+
                      "q=select%20*%20from%20xml%20where%20url%3D%22"+
                      encodeURIComponent(pageUrl)+
                      "%22&format=json&callback=syncStreamer";
                      
      $.ajax({
        url: yqlUrl,
        dataType: 'jsonp',
        jsonpCallback: 'syncStreamer',
        success: function(data) {
          console.log('ajax success');
          var count = data.query.results.own3dReply.liveEvent.liveViewers;
          var isLive = data.query.results.own3dReply.liveEvent.isLive;
          if(isLive) {
            self.inputViewers.val(count);
          }
        },
        error: function(error) {
          console.log('ajax error');
        }
      });
    },
    
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },
    
    clear: function() {
      console.log('clear streamer');
      this.model.clear();
    },
    
    unrender: function() {
      if (this.toggle_unrender) {
        console.log('unrender');
        this.remove();
      }
    },
    
    favorite: function() {
      this.$el.addClass("favorite");
    }
  });
  
  var StreamerGroupView = Backbone.View.extend({
    tagName: 'section',
    className: 'group',
    template: _.template($('#streamer-group').html()),
    events: {
      "click    .toggle-group"    : "toggleGroup"
    },
    
    initialize: function() {
      // console.log('streamer group initialize');
      _.bindAll(this, 'addStreamer', 'addAllStreamers', 'render');

      this.title = this.options.title;
      this.header = this.$('.header');
      this.count = this.$('.count');
      this.toggle = this.$('.toggle-group');
      this.list = this.$('ul.list');

      this.collection.bind('add', this.addStreamer);
      this.collection.bind('reset', this.addAllStreamers);
      //this.collection.bind('all', this.render);
    },
    
    render: function() {
      // console.log('streamer group render');
      var streamer_count = this.collection.length;
      
      $(this.el).html(this.template({title: this.title}));
      
      this.$(".count").html(streamer_count);
      
      this.collection.each(this.addStreamer);
      return this;
    },
    
    addStreamer: function(streamer) {
      // console.log('add streamer none');
      var view_all = new StreamerView({model: streamer});
      this.$('ul').append(view_all.render().el);
    },
    
    addAllStreamers: function() {
      // console.log('add all');
      this.collection.each(this.addStreamer);
    },
    
    toggleGroup: function() {
      this.$el.toggleClass("collapsed");
    }
  });
  
  var FilteredStreamerGroupView = StreamerGroupView.extend({
    initialize: function() {
      _.bindAll(this, 'addStreamer', 'render');
      
      this.collection.bind('change:online', this.addStreamer);
      
      this.online = this.options.online;
      
      StreamerGroupView.prototype.initialize.apply(this, this.options);
    },
    
    render: function() {
      var streamer_count = (this.online === true ? this.collection.online() 
      : this.collection.offline()).length;
      
      $(this.el).html(this.template({title: this.title}));
      
      this.$(".count").html(streamer_count);
      
      this.collection.each(this.addStreamer);
      
      return this;
    },
    
    addStreamer: function(streamer) {
      if(this.online === streamer.get('online')) {
        var view = new StreamerView({model: streamer, toggle_unrender: true});
        this.$('ul').append(view.render().el);
      }
    }
  });
  
  var ExploreStreamerView = StreamerView.extend({
    events: {
      'click .toggle' : 'toggleLibrary'
    },
    
    render: function() {
      // console.log('explore streamerview render');
      this.$el.html(this.template(this.model.toJSON()));
      
      if(window.library.where({'stream': this.model.get('stream')}).length > 0) {
        this.$el.toggleClass('favorite', true);
        this.$('.toggle').prop('checked', true);
      }
      
      return this;
    },
    
    toggleLibrary: function(e) {
      console.log('toggle library:' + this.model.get('name'));
      libraryStreamers = window.library.where({'stream': this.model.get('stream')});
      console.log(libraryStreamers.length);
      if(libraryStreamers.length == 0) {
        if(this.$('.toggle').prop('checked')) {
          console.log('must be a new stream add to library');
          window.library.create({
            'name': this.model.get('name'),
            'stream': this.model.get('stream'),
            'viewers': this.model.get('viewers'),
            'online': true
          });
        }
      } else {
        var self = this;
        console.log('stream already exist');
        if(!this.$('.toggle').prop('checked')) {
          console.log('remove me from library');
          // Why does collection.remove not save results on reload?
          _.each(libraryStreamers, function(streamer) {
            streamer.destroy();
          });
        }
      }
    }
  });
  
  var ExploreStreamerGroupView = StreamerGroupView.extend({    
    addStreamer: function(streamer) {
      var view_all = new ExploreStreamerView({model: streamer});
      this.$('ul').append(view_all.render().el);
    }
  });
  
  
  
  var Playlist = Backbone.Collection.extend({
    model: Streamer
  });
  
  window.Player = Backbone.Model.extend({
    defaults: {
      'currentStreamerIndex': 0,
      'state':  'stop'
    },
    initialize: function() {
      this.playlist = new Playlist();
    },
    play: function() {
      
    },
    stop: function() {
      
    },
    isPlaying: function() {
      
    },
    isStopped: function() {
      
    },
    currentStream: function() {
      
    }
  });
  
  var PlaylistStreamerView = Backbone.View.extend({
    tagName: 'li',
    className: 'streamer',
    template: ''
  });
  
  var PlaylistView = Backbone.View.extend({
    tagName: 'section',
    className: 'playlist',
    template: _.template($('#playlist-template').html()),
    
    events: {
      'click .play' : '',
      'click .pause': '',
      'click .next' : '',
      'click .prev' : '',
    },
    
    initialize: function() {
      this.player = this.options.player;
      this.collection = this.options.collection;
      
      this.collection.bind('reset', this.render);
      this.collection.bind('add', this.renderStreamer);
    },
    
    render: function() {
      $(this.el).html(this.template(this.player.toJSON()));
      this.collection.each(this.renderStreamer);
      
      return this;
    },
    
    renderStreamer: function() {
      var view = new PlaylistStreamerView({
        model: streamer,
        player: this.player,
        playlist: this.collection
      });
      
      this.$("ul").append(view.render().el);
    }
  });
  
  window.ExploreList = Backbone.Collection.extend({
    model: Streamer,
    
    comparator: function(streamer) {
      return -streamer.get('viewers');
    }
  });
  
  var ExploreView = Backbone.View.extend({
    template: _.template($('#explore-template').html()),
    events: {
      'click .update' : 'updateStreamers',
      'click .library': 'navLibrary'
    },
    
    initialize: function() {
      _.bindAll(this, 'render', 'updateTwitch', 'updateOwn3d', 'updateStreamers');
      
      this.collection.bind('reset', this.render);
      
      this.updateStreamers();
    },
    
    render: function() {
      $(this.el).html(this.template({}));
      
      var all_view = new ExploreStreamerGroupView({ id: 'group-explore', collection: this.collection, title: 'League of Legends', filter: '' });
      this.$('#main').append(all_view.render().el);
      
      return this;
    },
    
    updateStreamers: function() {
      this.collection.reset();
      this.updateTwitch();
      this.updateOwn3d();
    },
    
    updateTwitch: function() {
      var self = this;
      console.log('update streamers');
      var pageUrl = 'http://api.justin.tv/api/stream/list.json?meta_game=League%20of%20Legends&limit=10&jsonp=syncStreamer';
      
      $.ajax({
        url: pageUrl,
        dataType: "jsonp",
        jsonpCallback: 'syncStreamer',
        success: function(data) {
          console.log('ajax success');
          $.each(data, function(index, streamer) {
            var name = streamer.channel.title;
            var stream = streamer.channel.login;
            var viewers = streamer.channel_count;
            var service = 'twitch';
            
            // console.log(name+' '+stream+' '+viewers+' '+service);
            self.collection.add({
              name: name,
              stream: stream,
              service: service,
              viewers: viewers
            });
          });
          
          self.collection.sort();
        },
        error: function(error) {
          console.log('ajax error');
        }
      });
    },
    
    updateOwn3d: function() {
      var self = this;
      
      var pageUrl = 'http://api.own3d.tv/live?game=lol&limit=10';
      var yqlUrl = "http://query.yahooapis.com/v1/public/yql?"+
                      "q=select%20*%20from%20xml%20where%20url%3D%22"+
                      encodeURIComponent(pageUrl)+
                      "%22&format=json&callback=syncStreamer2";
                      
      $.ajax({
        url: yqlUrl,
        dataType: 'jsonp',
        jsonpCallback: 'syncStreamer2',
        success: function(data) {
          console.log('own3d ajax success');
          $.each(data.query.results.rss.channel.item, function(index, stream) {
            var viewers = stream.misc.viewers;
            var name = stream.credit;
            var stream = stream.link.replace('http://www.own3d.tv/live/', '');
            var service ='own3d';
            
            // console.log(name+' '+stream+' '+viewers+' '+service);
            self.collection.add({
              name: name,
              stream: stream,
              service: service,
              viewers: viewers
            });
          });
          
          self.collection.sort();
        },
        error: function(error) {
          console.log('own3d ajax error');
        }
      });
    },
    
    navLibrary: function(e) {
      window.App.navigate('', {trigger: true});
    }
  });
  
  var LibraryView = Backbone.View.extend({
    template: _.template($("#library-template").html()),
    statsTemplate: _.template($('#stats-template').html()),
    events: {
      "keypress #new-streamer"    : "createOnEnter",
      'click a.explore'           : "navExplore"
    },
    
    initialize: function() {
      // console.log('libraryview intialize');
      _.bindAll(this, 'render');
      this.collection.bind('reset', this.render);
      
      this.footer = this.$('footer');
      this.main = $('#main');
      this.group_all = $('#group-all');
      
      //this.all_streamers = new StreamerGroupView({ el: this.$('#group-all'), collection: this.collection, filter: '' });
      //this.offline_streamers = new FilteredStreamerGroupView({ el: this.$('#group-offline'), collection: this.collection, filter: 'offline', online: false });
      //this.online_streamers = new FilteredStreamerGroupView({ el: this.$('#group-online'), collection: this.collection, filter: 'online', online: true });
      
    },
    
    render: function() {
      $(this.el).html(this.template({}));
      var all_view = new StreamerGroupView({ id: 'group-all', collection: this.collection, title: 'All', filter: '' });
      this.$('#main').append(all_view.render().el);
      
      var online_view = new FilteredStreamerGroupView({ id: 'group-online', collection: this.collection, title: 'Online', filter: 'online', online: true });
      this.$('#main').append(online_view.render().el);
      
      var offline_view = new FilteredStreamerGroupView({ id: 'group-offline', collection: this.collection, title: 'Offline', filter: 'offline', online: false });
      this.$('#main').append(offline_view.render().el);
      
      return this;
    },
    
    createOnEnter: function(e) {
      $input = this.$('#new-streamer');
      
      if (e.keyCode != 13) return;
      if (!$input.val()) return;
      
      this.collection.create({name: $input.val()});
      $input.val('');
    },
    
    navExplore: function(e) {
      window.App.navigate('explore', {trigger: true});
    }

  });
  
  window.library = new StreamerList;
  window.exploreLibrary = new ExploreList;
  
  window.StreamerApp = Backbone.Router.extend({
    routes: {
      ''        : 'home',
      'explore' : 'explore'
    },
    
    initialize: function() {
      this.libraryView = new LibraryView({
        collection: window.library
      });
      
      this.exploreView = new ExploreView({
        collection: window.exploreLibrary
      });
      
      window.library.fetch();
    },
    
    home: function() {
      $("#lolapp").empty();
      //$("#lolapp").append(this.playlistView.render().el);
      $("#lolapp").append(this.libraryView.render().el);
    },
    
    
    explore: function() {
      $("#lolapp").empty();
      $("#lolapp").append(this.exploreView.render().el);
    },
    
    blank: function() {
      $("#lolapp").empty();
      $("#lolapp").text('blank');
    }
  });
  
}