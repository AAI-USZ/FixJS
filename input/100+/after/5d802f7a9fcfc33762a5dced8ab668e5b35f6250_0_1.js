function(tag, addOptions, ready){
    var userActiveTimer, userIsActive = false, that = this;

    this.tag = tag; // Store the original tag used to set options

    var el = this.el = _V_.createElement("div"), // Div to contain video and controls
        options = this.options = {};

    // Set Options
    _V_.merge(options, _V_.options); // Copy Global Defaults
    _V_.merge(options, this.getVideoTagSettings()); // Override with Video Tag Options
    _V_.merge(options, addOptions); // Override/extend with options from setup call

    // Add callback to ready queue
    this.ready(ready);

    // Store controls setting, and then remove immediately so native controls don't flash.
    tag.removeAttribute("controls");

    // Poster will be handled by a manual <img>
    tag.removeAttribute("poster");

    // Make player findable on elements
    tag.player = el.player = this;

    // Make sure tag ID exists
    tag.id = tag.id || "vjs_video_" + _V_.guid++;

    // Give video tag properties to box
    // ID will now reference box, not the video tag
    this.id = el.id = tag.id;
    el.className = tag.className;

    // Make player easily findable by ID
    _V_.players[el.id] = this;

    // Make box use width/height of tag, or default 300x150
    // Enforce with CSS since width/height attrs don't work on divs
    this.width(options.width, true); // (true) Skip resize listener on load
    this.height(options.height, true);

    // Update tag id/class for use as HTML5 playback tech
    // Might think we should do this after embedding in container so .vjs-tech class
    // doesn't flash 100% width/height, but class only applies with .video-js parent
    tag.id += "_html5_api";
    tag.className = "vjs-tech";

    // Remove width/height attrs from tag so CSS can make it 100% width/height
    tag.removeAttribute("width");
    tag.removeAttribute("height");

    // Wrap video tag in div (el/box) container
    tag.parentNode.insertBefore(el, tag);
    el.appendChild(tag); // Breaks iPhone, fixed in HTML5 setup.

    // Empty video tag sources and tracks so the built-in player doesn't use them also.
    if (tag.hasChildNodes()) {
      var nrOfChildNodes = tag.childNodes.length;
      for (var i=0,j=tag.childNodes;i<nrOfChildNodes;i++) {
        if (j[0].nodeName.toLowerCase() == "source" || j[0].nodeName.toLowerCase() == "track") {
          tag.removeChild(j[0]);
        }
      }
    }

    // Cache for video property values.
    this.values = {};

    this.addClass("vjs-paused");

    this.on("ended", this.onEnded);
    this.on("play", this.onPlay);
    this.on("pause", this.onPause);
    this.on("progress", this.onProgress);
    this.on("error", this.onError);
    
    this.on("severeError", this.onSevereError);
    
    // When the API is ready, loop through the components and add to the player.
    if (options.controls) {
      this.ready(function(){
        this.initComponents();
      });
    }
    

    $(this.el).append($('<div class="vjs-controls-animation-reference"></div>'));
    
    $(this.el).parent().bind('mouseenter', function () {
      userIsActive = true;
      that.trigger('userActive');
    });
    
    $(this.el).parent().bind('mouseleave', function () {
      if (!state.isDragging) {
        clearTimeout(userActiveTimer);
        that.trigger('userInactive');
      }
    });
    
    $(this.el).parent().bind('mousemove click', function () {
      if (!userIsActive) {
        userIsActive = true;
        that.trigger('userActive');
      }
      clearTimeout(userActiveTimer);
      userActiveTimer = setTimeout(function() {
        userIsActive = false;
        that.trigger('userInactive');
      }, 10000);
    });
    
    this.ready(function () {
      new _V_.ProgressControl(this);
      new _V_.SeekBar(this);
      new _V_.ProgressControl(this, 'fullScreen');
      new _V_.SeekBar(this, 'fullScreen');
    });

    // Timed Comments
    this.normalTimedComments = {};
    this.fullScreenTimedComments = {};
    this.timedCommentsController;
    this.ready(function () {
      if (options.timedComments && options.timedComments.length > 0) {
        var player = this;
        $.each(options.timedComments, function (index, timedComment) {
          player.normalTimedComments[index] = new _V_.NormalTimedComment(player, timedComment, index);
          player.fullScreenTimedComments[index] = new _V_.FullScreenTimedComment(player, timedComment, index);
          new _V_.NormalTimedCommentDot(player, timedComment, index);
          new _V_.FullScreenTimedCommentDot(player, timedComment, index);
        });
        player.timedCommentsController = new _V_.TimedCommentsController(player);
      }
    });

    // Tooltips
    this.toolTipDelay = null;
    this.normalToolTips = {};
    this.fullScreenToolTips = {};
    this.ready(function () {
      var player = this;
      $.each(['play', 'comments', 'fullScreen'], function (index, name) {
        player.normalToolTips[name] = new _V_.NormalToolTip(player, { name: name });
        player.fullScreenToolTips[name] = new _V_.FullScreenToolTip(player, { name: name });
      });
    });
    
    if (this.options.videoViewTracker) {
      this.on('play',  this.options.videoViewTracker.start);
      this.on('pause', this.options.videoViewTracker.stop);
      this.on('ended', this.options.videoViewTracker.stop);
    }
    
    // Tracks defined in tracks.js
    this.textTracks = [];
    if (options.tracks && options.tracks.length > 0) {
      this.addTextTracks(options.tracks);
    }

    // If there are no sources when the player is initialized,
    // load the first supported playback technology.
    if (!options.sources || options.sources.length == 0) {
      for (var i=0,j=options.techOrder; i<j.length; i++) {
        var techName = j[i],
            tech = _V_[techName];

        // Check if the browser supports this technology
        if (tech.isSupported()) {
          this.loadTech(techName);
          break;
        }
      }
    } else {
      // Loop through playback technologies (HTML5, Flash) and check for support. Then load the best source.
      // A few assumptions here:
      //   All playback technologies respect preload false.
      this.src(options.sources);
    }
  }