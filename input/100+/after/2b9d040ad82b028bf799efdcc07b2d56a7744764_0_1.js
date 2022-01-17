function(){
//================================== Helpers ==================================
// Add a cutom click event to specific element of a view
// The default click event is not useful since it can't distinguish between 
// a drag click and a single click
  function addFmClick(view, selector, callback) {
    view.events = view.events || {};
    var x, y;
    view.events['mousedown ' + selector] = function(e) {
      x = e.screenX;
      y = e.screenY;
    };
    view.events['mouseup ' + selector] = function(e) {
      if (x == e.screenX && y == e.screenY)
        callback.call(this, e);
    };
    view.$el.on('fmClick', selector, function(e) {
      callback.call(view, e);
    });
  }
//================================== Tag's model ==============================
  var Tag = Backbone.Model.extend({
    initialize: function() {
      if(!this.get('name'))
        this.set('name', this._getDefaultName());
    },
    // Validate data before set and save
    // if anything wrong, return something;
    // otherwise nothing returned
    validate: function(attrs) {
      if(attrs.name && !this._isNameValid(attrs.name))
        return 'tag name is not valid';
    },
    // Validate the name of a tag
    _isNameValid: function(name) {
      return !this.collection || 
             (this.collection && !this.collection.isNameExisting(name))
    },
    // Get a default name for a new tag
    _getDefaultName: function() {        
      var defaultName = '新建文件夹',
          index = 0,
          name = defaultName;
      // Make sure this tag name is unique
      if(this.collection) {
        while( this.collection.isNameExisting(name) ) {
          ++ index;
          name = defaultName + index;
        }
      }
      else
        alert('null collection');
      return name;
    }
  });
  var TagList = Backbone.Collection.extend({
    model: Tag,
    url: '/tags',
    isNameExisting: function(name) {
      name = name.toLowerCase();
      var res = this.find(function(tag) {
        return tag.get('name').toLowerCase() == name;
      });
      return (res != undefined);
    },
    // Sort tag list by a to z
    comparator: function(tag) {
      return tag.get('name');
    }
  });
//=============================== Metadata's model ============================
  var Metadata = Backbone.Model.extend({
    defaults: function() {
      return {
        docid: 'null',
        progress: -1,
        color: 'grey'
      };
    },
    setStar: function(starred) {
      if(starred)
        this.attachTag('__starred');
      else
        this.detachTag('__starred');
    },
    attachTag: function(tagName) {
      var tags  = this.get('tags').splice(0),
          pos   = tags.indexOf(tagName);
      // Push new tag if not exists
      if (pos < 0) tags.push(tagName); 
      // Update model
      this.set('tags', tags);
      // Ajax
      this._syncTag('POST', tagName, this.get('id'));
    },
    detachTag: function(tagName) {
      var tags  = this.get('tags').splice(0),
          pos   = tags.indexOf(tagName);
      // Delete the tag if exists
      if(pos >= 0) tags.splice(pos, 1);
      // Update model
      this.set('tags', tags);
      // Ajax
      this._syncTag('DELETE', tagName, this.get('id'));
    },
    _syncTag: function(method, tagName, metadata_id) { 
      var params = {
        url: '/metadata/' + metadata_id + '/tags/' + 
            ( method=='DELETE' ? tagName : ''),
        type: method,
        contentType: 'application/json',
        data: JSON.stringify({
          name: tagName,
          metadata_id: metadata_id
        }),
        dataType: 'json',
        processData: false
      },  options = {};
      $.ajax(_.extend(params, options));
    },
    setColor: function(color) {
      console.debug(this.get('tags').join());
      var tags  = this.get('tags').splice(0), // clone the array
          pos   = this._getColorTagPos(tags),
          colorTag  = '__color_' + color;
      // Switch color
      if(pos < 0) {
        // Add color tag
        tags.push(colorTag);
        // Sync with server
        this._syncTag('POST', colorTag, this.get('id'));
      }
      else {
        // Sync with server
        this._syncTag('POST', colorTag, this.get('id'));
        this._syncTag('DELETE', tags[pos], this.get('id'));
        // Replace old color in model
        tags[pos] = colorTag;
      }
      console.debug('setColor(' + color + ')');
      window.metadata = this;
      // Update model
      this.set('tags', tags);
    },
    getColor: function() {
      var tags  = this.get('tags'),
          pos   = this._getColorTagPos(tags),
          colorTagName = pos >= 0 ? tags[pos] : null, 
          prefix = '__color_',
          color = !!colorTagName ? colorTagName.substring(prefix.length) :
                                  'grey';
      console.debug('getColor() == ' + color );
      return color;
    },
    _getColorTagPos: function(tags) {
      var prefix  = '__color_',
          pos     = -1;
      _.find(tags, function(tagName, index) {
        console.debug('tag:'+tagName+';index='+index);
        if(tagName.indexOf(prefix) == 0) {
          pos = index;
          console.debug('return true');
          return true;
        }
        console.debug('return false');
        return false;
      }) ;
      console.debug('__getColorTagPos() == ' + pos);
      return pos;
    },
    // Custom sync function that handles tags update differently
    sync: function(method, model, options) {
      Backbone.sync.call(this, method, model, options);
    }
  });
  var MetadataList = Backbone.Collection.extend({
    model: Metadata,
    url: '/metadata'
  });
//=============================== Title's View ================================ 
  var TitleView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      this.titles = this.options.titles;

      addFmClick(this, 'a.ml20',  this.viewPaper);
      addFmClick(this, '.star',   this.clickLeftBtn);
      addFmClick(this, '.tag-color',  this.clickColor);

      this.model.on('change', this.render, this);
      
      this.model.on('remove', function() {
        this.remove();
        // Instead calling destroy, we just call save
        // because it is removed already. 
        //We don't want to remove it twice.
        // The first time is not synced.
        this.model.save();
        // Call resize so that iScroller works correctly
        this.titles.folder.resize();
      }, this);
    },
    events: {
    // 'longTap .title': 'viewPaper'
    },
    template: _.template($('#title-template').html()),
    render: function() {
      console.debug('title render');
      // Clear element
      this.$el.empty(); 
      // Get model
      var json = this.model.toJSON();
      if(json.tags.indexOf('__starred') < 0)
        json.yellow_or_white = 'white';
      else
        json.yellow_or_white = 'yellow';
      json.color = this.model.getColor();
      // New element
      this.$el.append(this.template(json));
      return this;
    },
    viewPaper: function() {
  //    alert('viewPaper: this is ' + this);
      var id = this.model.get('docid');
      window.open('/fulltext/' + id, '_newtab_'+id);
    },
    clickLeftBtn: function(e) {
      if(editor.opened)
        return this.clickBin(e);
      else
        return this.clickStar(e);
    },
    clickBin: function(e) {
      var del = e.data ? e.data.del : undefined ; 
      if(del == undefined) {
        this.$el.hasClass('clicked') ?
          del = false :
          del = true ;
      }
      if(del == true) {
        this.$el.addClass('clicked');
        editor.papers.add(this.model);
      }
      else {
        this.$el.removeClass('clicked');
        editor.papers.remove(this.model, {silent: true});
        editor.render();
      }
    },
    clickStar: function(e) {
      var $t      = $(e.target),
          starred = $t.hasClass('star-yellow')  ? true  : 
                    $t.hasClass('star-white')   ? false : null,
          metadata_id = $t.parent().data('id'),
          metadata  = manager.metadataList.get(metadata_id);
      metadata.setStar(!starred);
    },
    clickColor: function(e) {
      var $t      = $(e.target),
          color   = $t.data('color'),
          nextColor   = this.nextColor(color),
          metadata_id = $t.parent().data('id'),
          metadata  = manager.metadataList.get(metadata_id);
      console.debug('clickColor');
      metadata.setColor(nextColor);
    },
    nextColor: function(color) {
      return color == 'grey'  ? 'green' :
             color == 'green' ? 'blue'  :
             color == 'blue'  ? 'red'   :   'grey';
    }
  });
  var TitlesView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function() {
      this.folder = this.options.folder;
      this.collection.bind('add', this.addOne, this);
      this.collection.bind('reset', this.addAll, this);
    },
    addOne: function(model, that, options) {
      var json = model.toJSON();
      var folderName = this.folder.getName();
      if(json.tags.indexOf(folderName) >= 0) {
        var titleView = new TitleView({model: model, titles: this}),
            newEl     = titleView.render().el;
        if(options != undefined && options.at == 0)
          this.$el.prepend(newEl);
        else 
          this.$el.append(newEl);
      }
      //this.folder.trigger('resize');
      //$('.papers > ul').height(48+48+recentPapers.size()*48);
    },
    addAll: function() {
      this.$el.empty();
      this.collection.each(this.addOne, this);
      this.folder.resize();
    } 
  });
//=============================== Folder's view ===============================
  var FolderView = Backbone.View.extend({
    tagName: 'li',
    className: 'folder one-column',
    events: {
      'click .box-del': function() {
        this.$el.toggleClass('clicked');
        var del = this.$el.hasClass('clicked');
        this.$('.star').trigger('fmClick', {
          del: del
        });
        if(del) 
          editor.folders.add(this.model);
        else {
          editor.folders.remove(this.model, {silent: true});
          editor.render();
        }
      }
    },
    template: _.template($('#folder-template').html()),
    initialize: function() {
      this.id       = this.model.id || this.model.cid;
      // View to display titles in this folder
      this.titles   = new TitlesView({
                              collection: this.collection,//MetadataList
                              folder: this });
      // Handle upload event
      this.uploader = new Uploader(this);
      //
      this.model.on('remove', function() {
        this.remove();
        // Instead calling destroy, we just call save
        // because it is removed already. 
        //We don't want to remove it twice.
        // The first time is not synced.
        this.model.save();
        var items = manager.folders.items,
            pos   = items.indexOf(this);
        if(pos >= 0)
          items.splice(pos, 1);
        manager.folders.resize();
      }, this);
    },
    getName: function() {
      return this.model.get('name');
    },
    render: function() {
      var that = this;
      // render folder dom
      var json      = this.model.toJSON();
      // For newly added folder, id can be undefined
      json.id = this.id;
      this.$el.html(this.template(json));
      this.$('.recent-box > div').on('blur', function(e) {
        var t = e.target;
        t.className = 'to-be-undraggable';
        t.removeAttribute('contentEditable');
        if( that.model.set('name', t.innerHTML) ) {
          that.model.save();
        }
      });
      // append titles to this folder
      var $titles   = this.titles.render().$el;
      this.$el.find('.titles').append($titles);
      // iscroll
      var scrollerEle = this.$el.find('.papers')[0];
      this.scroller = new iScroll(scrollerEle,{
        hideScrollbar: true,
        fadeScrollbar: true,
        lockDirection:true,
        overflowHidden: false,
        vScrollbar: true,
        useTransition: true,
        //momentum: false,
        overflowHidden: false
      });
      //setTimeout(200, function(){alert(200)});
      //
//      this.uploader.init();
      return this;
    },
    resize: function() {
      // height of window
      var maxContentH = $(window).height() - 84 - 56,
      // height of content in folder
          size = this.$el.find('.papers .titles > ul > li').length,
          folderContentH = 48+size*46;
      // pick the 
      //console.debug(folderContentH);
      this.$el.find('.papers').height(
          maxContentH < folderContentH? maxContentH : folderContentH);
      this.scroller.refresh();
    }
  });
  var FoldersView = Backbone.View.extend({
    el: '.folders-wrapper',
    optimalSize: 450,       /* optimal size for one folder */
    mode: 'normal',
    initialize: function() {
      var that = this;
      this.metadataList = this.options.metadataList;
      this.collection.bind('add', this.addFolder, this);
      this.collection.bind('reset', this.resetFolders, this);
      this.items = new Array();

      var lastW, lastH;
      $(window).resize(function() { 
        var w = $(window).width(),
            h = $(window).height();
        if(lastW != w || lastH != h) {
          lastW = w;
          lastH = h;
          that.resize(); 
        }
      });

      addFmClick(this, '.add-tag > a',  this.newFolder);
    },
    newFolder: function() {
//      var newFolderModel = new Tag({}, {collection: this.collection});
      this.collection.create({}, {beforeLast: true});
      this.resize();
    },
    addFolder: function(model, that, options) {
      // Some tags are not intended to be used as folders
      // The name of invisible tags are prefixed with '__' 
      // e.g. __starred
      if (model.get('name').indexOf('__') == 0)
        return;
      // Add a new folder given its model
      var folder = new FolderView({
        model:      model,
        collection: this.metadataList,
      });
      // render & insert new folder before '+'
      folder.render().$el.insertBefore(this.$el.find('.add-folder'));
      folder.uploader.init();
      // add / new
      if(options.beforeLast && this.items.length > 0) {
        var last = this.items[this.items.length-1];
        this.items[this.items.length-1] = folder;
        this.items.push(last);
      }
      else {
        this.items.push(folder);
      }
    },
    resetFolders: function() {
      this.items.length = 0;  // empty the array
      this.collection.each(this.addFolder, this);
      this.items.push({$el: this.$el.find('.add-folder'), resize: function() {}});
      this.resize();
    },
    resize: function(e) {
      var wrapperWidth  = this.$el.width(),
          numFolders    = this._getNumFolders() + 1,
          numFoldersPerScreen = Math.round(wrapperWidth / this.optimalSize),
          folderMargin  = 0,
          folderWidth   = ( wrapperWidth - 2 * folderMargin * numFolders ) / numFoldersPerScreen;
      $('.one-column').css({
        width: folderWidth + 'px', 
      });
      this.$el.find('.folders').css({
//        padding: ,
        width: (folderWidth + 2 * folderMargin) * numFolders + 'px' 
      });
      _.forEach(this.items, function(item) { item.resize(); });
      this.N   = numFolders;
      this.n = numFoldersPerScreen;
      this.w  = folderWidth;
      this.W = wrapperWidth;
      if(manager.scroller)  {
        manager.scroller.refresh();
        this.updateOpacity(manager.scroller.x);
      }
    },
    // Get the number of folders
    //   This function ignore tags that are not intended to be used as folder
    _getNumFolders: function() {
      var count = 0;
      this.collection.forEach(function(tag) {
        // If the name of tag doesn't start with '__', count increases
        if(tag.get('name').indexOf('__') != 0)
          ++count;
      });
      return count;
    },
    updateOpacity: function(x) {
      var that = this;
      _.forEach(that.items, function(item, index) {
        // width of a item
        var w = that.w,
          // width of container    
          W = that.W - w,
          // left of this item shifted by x
          l = index * that.w + x,
          // percentage of overflow
          // p = 0      => no overflow          => opacity = 1
          // 0 < p < 1  => partial overflow     => opacity = 1-p
          // p > 1      => completed overflow   => opacity = 0
          p = (l < 0) ? -l/w : 
              (l > W) ? (l-W)/w : 0,
          o = (p < 1) ? (1 - p) : 0,
          q = 0.2,
          o = q + (1-q)*o;
        //console.debug(['x', x, 'w', w, 'W', W, 'l', l, 'p', p].join(','));
        item.$el.css('opacity', o + '' );
      });
    }
  });
//================================ Ajax Uploader ==============================
  function Uploader(folder) {
    var id      = folder.id;
    // folder view that this uploader belongs to
    this.folder = folder;
    // plupload do the real work
    window.uploader = this.uploader = new plupload.Uploader({
        runtimes : 'html5,flash,html4',
        browse_button : 'uploader-' + id,
        //drop_element: 'papers-'+id,
        container: 'papers-'+id,
        max_file_size : '10mb',
        url : '/metadata?tag='+folder.getName(),
        flash_swf_url : 'plupload/plupload.flash.swf',
        filters : [
            {title : "PDF files", extensions : "pdf"}
        ]
    });  
  }
  // Extend Events object
  _.extend(Uploader.prototype, Backbone.Events, {
    // Init 
    init : function() {
      var that = this;
      that.uploader.init();
      uploader.bind('FilesAdded', function(up, files) {
        $.each(files, function(i, file) {
          manager.metadataList.unshift({
            id: file.id,
            title: file.name,
            progress: 0,
            yellow_or_white: 'yellow',
            colorid: 1,
            tags:[that.folder.getName()]
          });
          that.folder.resize();
          that.uploader.start();
        });
      });
      uploader.bind('UploadProgress', function(up, file) {
        console.debug([file.id, file.percent].join(','));
        var metadata = manager.metadataList.get(file.id);
        metadata.set('progress', Math.round(file.percent) );
        metadata.change();
      });
      uploader.bind('FileUploaded', function(up, file, result) {
        var response = JSON.parse(result.response),
            metadata = manager.metadataList.get(file.id);
        window.response =response;
        metadata.set('progress', -1 );
        metadata.set('id', response.id);
        metadata.set('docid', response.docid);
        metadata.set('title', response.title);
        metadata.change();
      });
    },
  }); 
//=============================== Manager's view ==============================
  var Manager = Backbone.View.extend({
    el: '#my-folders',
    initialize: function() {
      var that = this;
      // models
      this.tagList = new TagList();
      this.metadataList = new MetadataList();
      // debug
      window.metadataList = this.metadataList;
      // init sub views
      this.folders = new FoldersView({
        collection: this.tagList, 
        metadataList: this.metadataList
      });
      // fetch 
      this.tagList.fetch({
        success: function() {
          this.metadataList.fetch({
            success: function() {
              var target = null;
    //          that.tagList.length
              //debug
              that.scroller = new iScroll('my-folders-wrapper',{
                vScroll:false,
                fadeScrollbar:true,
                hideScrollbar:true,
                lockDirection:true,
                hScrollbar: true,
                bounce: true,
                bounceLock: true,
                useTransition: true,
                snap: 'li',
                snapThreshold: 100, 
                //momentum: false,
                overflowHidden: false,
                onPos: function(step) {
    //              console.debug('onPos');

                 that.folders.updateOpacity(that.scroller.x);
                },
                //force2D: true,
                //  return true means drag is disabled
                //  return false means drag is enabled
                onBeforeScrollStart: function(e) {
                  var t = e.target;
                                    //
                                    //
                  console.debug('onBeforeSCrollstart()');
                  window.t1= target; window.t2 =t;
                  if (target && target != t) {
                    target.className = 'to-be-undraggable';
                    target.removeAttribute('contentEditable');
                    $(target).blur();
                    target = null;
                   // $(window).focus();
                    return false;
                  }
                  // First click 
                  //  'to-be-undraggable' --> 'undraggable'
                  //  response to drag
                  if(t.className == 'to-be-undraggable') {
                    t.className = 'undraggable';
                    t.contentEditable = 'true';

                    setTimeout(function() {
                      if(t.className != 'double-clicked') {
                        t.className = 'to-be-undraggable';
                        t.removeAttribute('contentEditable');
                      }
                    }, 250);
                    e.preventDefault();
                    return false;
                  }
                  // Second click within 250ms after first click
                  //  default behaviour of a content-editable element
                  else if(t.className == 'undraggable') {
                    target = t;
                    t.className = 'double-clicked';
                    t.contentEditable = 'true';
                    return true;
                  }
                  else if(t.className == 'double-clicked') {
                    window.target = target;
                    return true;
                  }
                  else {
                    e.preventDefault();
                    return false;
                  }
                }
             });
            }
          });
        }
      });
      // Search bar
      $('.my-search input[type=search]').on('search', function(e) {
        var keywords = e.target.value;
        that.metadataList.url = '/metadata?keywords=' + keywords;
        that.metadataList.fetch();
      });
    },
    render: function() {
    }
  });
//=========================== Friend Model & View ============================+
  var Friend = Backbone.Model.extend({
  });
  var FriendList = Backbone.Collection.extend({
    model: Friend,
    url: '/friends'
  });
  var FriendView = Backbone.View.extend({
    tagName: 'li',
    className: 'friend',
    template: _.template($("#friend-template").html()),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
  var FriendsView = Backbone.View.extend({
    el: ".friends > .wrapper > ul",
    events: {
    },
    initialize: function() {
      this.collection.bind('add',    this.addOne, this);
      this.collection.bind('reset',  this.addAll, this);
    },
    addOne: function(friend) {
      var view = new FriendView({model: friend});
      $('.friends > .wrapper > ul').append(view.render().el);
    },
    addAll: function() {
      this.collection.each(this.addOne);
    }
  });
//==============================MyInfoView====================================
  var MyInfoView = Backbone.View.extend({
    el: ".my-info",
    initialize: function() {
      this.friends  = this.options.friends;
      this.papers   = this.options.papers;

      this.friends.on('reset',  this.render,  this);
      this.papers .on('reset',  this.render,  this)
                  .on('add',    this.render,  this)
                  .on('remove', this.render,  this);
    },
    template: _.template($('#my-info-template').html()),
    render: function() {
      var json = {
        friendsNum: this.friends.size(),
        papersNum:  this.papers.size()
      };
      this.$el.html(this.template(json));
    }
  });
//==============================Deleting Mode==================================
  var Drawer = Backbone.View.extend({
    el: ".drawer",
    opened: false,
    initialize: function() {
      var that = this;
      // Open drawer
      $('.topbar .setting').click(function() {
        that.opened ? that.close() : that.open();
      });
      // Click edit button
      this.initButton('.edit', function() {
        editor.open();
        that.close();
      });
      // Click logout button
      this.initButton('.logout', function() {
          $.ajax({
                url:"/signout",
                type: "delete",
                success: function() {
                    location.href = "/";
                }
            });
      });
    },
    initButton: function(selector, callback) {
      this.$(selector).click(callback);
    },
    open: function() {
      this.opened = true;
      this.$el.addClass('open');
    },
    close: function() {
      this.opened = false;
      this.$el.removeClass('open');
    }
  });
  var Editor = Backbone.View.extend({
    el: '.edit-topbar',
    opened: false,
    template: _.template($('#delete-info-template').html()),
    folders: new TagList(),
    papers: new MetadataList(),
    initialize: function() {
      var that = this;
      that.$('.del-cancel').click(function() {
        that.close();
      });
      that.$('.del-confirm').click(function() {
        manager.metadataList.remove(that.papers.models);
//        that.papers.models.forEach(function(metadata) {
//          metadata.destroy();
        //});
        manager.tagList.remove(that.folders.models);
        that.close();
      });
      // Listen to event that updates counter
      this.folders.bind('add',    this.render, this)
                  .bind('remove', this.render, this)
                  .bind('reset',  this.render, this);
      this.papers .bind('add',    this.render, this)
                  .bind('remove', this.render, this)
                  .bind('reset',  this.render, this);
    },
    papersNum: 0,
    foldersNum: 0,
    render: function() {
      var json = {
        papersNum: this.papers.size(),
        foldersNum: this.folders.size()
      };
      this.$('p').html(this.template(json));
      return this.$el;
    },
    open: function() {
      // Remember the status
      this.opened = true;
      // Reset collections
      this.folders.reset();
      this.papers.reset();
      // Render element
      this.render();
      // Show UI of editor
      this.$el.addClass('show');
      // Show folders in edit mode
      manager.folders.$el.addClass('deletable');
    },
    close: function() {
      // Remember the status
      this.opened = false;
      // Hide UI of editor
      this.$el.removeClass('show');
      // Show folders in normal mode
      manager.folders.$el.removeClass('deletable');
    }
  });
//=============================================================================
  var manager = new Manager();
  window.manager = manager;
  var myFriends = new FriendList(); 
  var friendsView = new FriendsView({collection: myFriends});
  var myinfoView = new MyInfoView({
    friends: myFriends, 
    papers: manager.metadataList
  });
  var drawer = new Drawer();
  var editor = new Editor();
  friendsView.render();
  myinfoView.render();
  myFriends.fetch();
}