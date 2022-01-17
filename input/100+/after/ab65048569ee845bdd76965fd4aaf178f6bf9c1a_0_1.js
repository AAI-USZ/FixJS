function() {
  var _snaps = J.GetNamespace('J.Apps.Snaps');
  
  _snaps.Collection = function(ui, album) {
    this.kCommentPanelWidth = 300;
  
    this._ui = ui;
  
    // Full width of the panel containing the photos - used
    // to calculate scroll offset
    this._fullWidth = 0;
    
    // Height of the photo container - used to scale the photos
    // so the fit nicely within it
    this._fullHeight = 0;
    
    // True if we are displaying the photos as a strip
    this._isStrip = false;
    
    // Veil used to hide UI ugliness
    this._veil = this._ui.find('.sn-veil');
    this._veilVisible = true;

    this._loadingPhotosMsg = this._ui.find('.sn-loading-photos');
    this._noPhotosMsg = this._ui.find('.sn-no-photos');


    this._modeChooser = this._ui.find('.sn-mode-chooser');



    this._goHomeButton = this._ui.find('.sn-go-home');
    this._toggleFriendsButton = this._ui.find('.sn-show-friends');

    this._photosHolder = this._ui.find('.sn-photos');
    if (this._photosHolder.length === 0) {
      console.warn('Could not find photos holder');
    }
    

    this._photosStrip = this._ui.find('.sn-photos-strip');
    if (this._photosStrip.length === 0) {
      console.warn('Could not find photos strip');
    }
    

    // Will be the jQuery containing the loaded photos
    this._photos = [];
    
      

    this._progressMessage = $('#sn-progress-message');

    this._album = (album || new J.Facebook.Album())
    ko.applyBindings(this._album.ViewModel, this._ui[0]);

    this._ui.on('click', '.sn-album-tag', {}, jQuery.proxy(this, '_tagClick'));
    this._ui.on('click', '.sn-show-usr-photos', {}, jQuery.proxy(this, '_showUsrPhotosClick'));
    this._ui.on('click', '.sn-show-grid', {}, jQuery.proxy(this, 'ShowAsGrid'));
    this._ui.on('click', '.sn-show-strip', {}, jQuery.proxy(this, 'ShowAsStrip'));

    this._photosHolder.on('click', '.sn-photo', {}, jQuery.proxy(this, '_photoClick'));
    this._photosHolder.on('click', '.sn-photo .sn-comment-close', {}, jQuery.proxy(this, '_hidePhotoComments'));
    this._photosHolder.on('click', '.sn-photo .sn-comment-count', {}, jQuery.proxy(this, '_showPhotoCommentsClick'));

    this._goHomeButton.click(jQuery.proxy(this, '_goHomeClick'));
    
    this._fullScreen = false;

    // Assume we are fullscreen if the snaps ui is the body tag of the HTML page
    // TODO: This is rubbish - do this properly
    this._fullScreen = this._ui.length > 0 && this._ui[0].tagName.toUpperCase() === 'BODY';
    if (this._fullScreen === true) {
      $(window).hashchange(jQuery.proxy(this, '_idChange'));
    }
    
    J.Notifications.Subscribe('j.facebook.*', jQuery.proxy(this, '_fbListener'));
    
    // Whatever is setting this is _really_ annoying me
    window.name = "";
  };
  

  _snaps.Collection.prototype = {
    _fbListener : function(k, s, d){ 
      switch(k) {
        case 'j.facebook.statusmessage':
          this._progressMessage.text(d).show();
          this._progressMessage.css({ 'display' : 'block' });
          break;

        case 'j.facebook.gotprofile':
          var id = window.location.hash;
          if (id && id.length > 0) {
            id = id.substring(1);
            this._album.LoadUserPhotos(id);
          } else {
            this._album.LoadProfilePhotos();
          }
            
          break;

        case 'j.facebook.notloggedin':
          this._progressMessage.css({'display' : 'none'});
          break;

        case 'j.facebook.will_load_user_photos':
          if (J.IsArray(d)) {
            if (this._current_usr_id !== d[0]) {
              this._current_usr_id = d[0];
              
              if (this._fullScreen)
                window.location.hash = this._current_usr_id;
 
             if (this._current_usr_id !== J.Facebook.Instance.UserId) {
                // Showing someone else's photos...
                this._goHomeButton.show();
              } else {
                // Showing our own photos...
                this._goHomeButton.hide();
              }
            }
          } else {
            console.warn('Data is not an array when loading user photos');
          }
          break;
          
        case 'j.facebook.will_load_photos':
          this._loadingPhotosMsg.show();
          break;

        case 'j.facebook.did_load_photos':
          this._loadingPhotosMsg.hide();
          if (!(d.length))
            this._noPhotosMsg.show();
          else
            this._noPhotosMsg.hide();
          
          if (this._veilVisible) {
            this._veil.hide();
            this._veilVisible = false;
          }
          break;

        case 'j.facebook.loggedout':
          this.Reset();
          break;

        default:
          break;
      }
    },

    _goHomeClick : function(e) {
      this._album.LoadProfilePhotos(J.Facebook.Instance._viewModel.profile());
    },
    
    _idChange : function() {
      var id = window.location.hash;
      
      if (id && id.length > 0) {
        id = id.substring(1);
      } else {
        id = J.Facebook.Instance.UserId;
      }
      
      this.ShowAsGrid();
      if (id && id.length > 0)
        this._album.LoadUserPhotos(id);
      else
        this._album.Clear();
    },

    _showPhotoComments : function(photo_el) {
      var scrollDelta = (this.kCommentPanelWidth / 2);
      var new_strip_width = this._photosStrip.width() + this.kCommentPanelWidth;
      this._photosStrip.width(new_strip_width);

      // += in jQuery.animate seems to chop off 2 pixels for
      // reasons I don't have the strength to find
      var new_width = photo_el.outerWidth() + this.kCommentPanelWidth;
//      photo_el.animate({ 'width' : "+=" + (this.kCommentPanelWidth + 2) }).addClass('sn-comments-visible');
      photo_el.animate({ 'width' : new_width }).addClass('sn-comments-visible');      
      this._photosHolder.animate({ scrollLeft : "+=" + scrollDelta });
      
    },
    
    _hidePhotoComments : function(e) {
      var photo_el = $(e.currentTarget).parents('.sn-photo:first');
        
      var scrollDelta = (this.kCommentPanelWidth / 2);
      var new_strip_width = this._photosStrip.width() - this.kCommentPanelWidth;
      this._photosStrip.width(new_strip_width);

      // += in jQuery.animate seems to chop off 2 pixels for
      // reasons I don't have the strength to find
      var new_width = photo_el.outerWidth() - this.kCommentPanelWidth;

//      photo_el.animate({ width : "-=" + (this.kCommentPanelWidth + 2) }).removeClass('sn-comments-visible');
      photo_el.animate({ 'width' : new_width }).removeClass('sn-comments-visible');
      this._photosHolder.animate({ scrollLeft : "-=" + scrollDelta });

      
      // Don't let the _photoClick handler handle this event (otherwise it will just
      // re-open the comments)
      return false;
    },
    
    _showPhotoCommentsClick : function(e) {
      var photo_el = $(e.currentTarget).parents('.sn-photo:first');
      if (this._isStrip === false) {
        var that = this;
        this.SelectPhoto(photo_el, function() { that._showPhotoComments(photo_el); });
      } else {
        this._showPhotoComments(photo_el);
      }
      
      return false;
    },

    
    _photoClick : function(e) {
      var photo_el = $(e.currentTarget);
      
      if (this._isStrip) {
        if (photo_el.hasClass('sn-comments-visible') === false) {
          this._showPhotoComments(photo_el);
        }
      } else {
        this.SelectPhoto(photo_el);
      }
    },

    _showUsrPhotosClick : function(e) {
      var el = $(e.currentTarget);
      var id = el.attr('data-fb-id');
      if (!id) {
        console.warn('Could not get FB id from show use trigger');
        return;
      }
      
      this._album.Clear();
      this.ShowAsGrid();
      
      var name = el.attr('data-fb-name') || "";
      this._album.LoadUserPhotos(id, name);
    },
    
    
    _tagClick :function(e) {
      var tag_el = $(e.currentTarget);
      var idx = parseInt(tag_el.attr('data-idx'));
      if (idx === NaN) {
        console.warn("Could not find index on clicked tag");
        return;
      }
      
      if (this._album._tagging._tags) {
        var tag = this._album._tagging._tags()[idx];
        if (J.IsArray(tag.items))
        {
          // Just take the first item for now...
          if (tag.items.length > 0) {
            var item = tag.items[0];
            if (item.hasOwnProperty('id')) {
              var photo_el = this._photosHolder.find(".sn-photo[data-fb-id='"+item.id+"']");
              if (this._isStrip)
                this._scrollToPhoto(photo_el);
              else
                this.SelectPhoto(photo_el);
            } else {
              console.warn('Item did not have an ID when clicking tag');
            }
          } else {
            console.warn('Tag does not have any items associated with it on click');
          }
        } else {
          console.warn('Tag items does not seem to be an array');
        }
      } else {
        console.warn('Cannot find tag collection on tag click');
      }
    },
    

    _reflowStrip : function() {
      var container_height = this._photosHolder.height() - 8;

      var scale = 1;
      var target_width, target_height;
      var cumulative_width = 0;
      var photos = this._photosStrip.children('.sn-photo');
      var e;
      photos.each(function(i, raw_el) {
        e = $(raw_el);
        target_width = parseInt(e.attr('data-width'));
        target_height = parseInt(e.attr('data-height'));
        
        if (target_width === NaN || target_height === NaN)
          return;
          
        if (target_height > container_height) {
          scale = container_height / target_height;
          target_height = Math.floor(target_height * scale);
          target_width = Math.floor(target_width * scale);
        }
        
        e.css({ 'top' : ((container_height / 2) - Math.floor((target_height / 2))) + 'px' });
        e.width(target_width);
        e.height(target_height);
        
        cumulative_width += target_width;
      });
      
      this._photosStrip.width(cumulative_width + (8 * photos.length));
    },


    _scrollToPhoto: function(photo, callback) {
      var curr_scroll_left = this._photosHolder.scrollLeft() - this._ui.offset().left;

      var scroll_to = (photo.offset().left + curr_scroll_left) - ((this._photosHolder.width() / 2) - (photo.width() / 2));

      if (J.IsFunction(callback))
        this._photosHolder.animate({ scrollLeft : scroll_to }, callback);
      else
        this._photosHolder.animate({ scrollLeft : scroll_to });
    },
    

    ShowAsStrip : function() {
      this._reflowStrip();
      this._isStrip = true;
      this._ui.removeClass('sn-grid-mode').addClass('sn-strip-mode');
    },
    
    SelectPhoto : function(focussed_photo, callback) {
      this.ShowAsStrip();
      this._scrollToPhoto(focussed_photo, callback);
    },

    ShowAsGrid : function() {
      var photos = this._photosHolder.find('.sn-photo');
      photos.filter('.sn-comments-visible').removeClass('sn-comments-visible');
      var l = photos.length;
      for (var ctr = 0; ctr < l; ++ctr) {
        photos[ctr].style.width = null;
        photos[ctr].style.height = null;
        photos[ctr].style.top = null;
      }
      
      this._photosStrip.css({ width : 'auto' });
      this._isStrip = false;
      this._ui.removeClass('sn-strip-mode').addClass('sn-grid-mode');
    },

    Reset : function() {
      this._album.Clear();
      this.ShowAsGrid();
    }

  };
}