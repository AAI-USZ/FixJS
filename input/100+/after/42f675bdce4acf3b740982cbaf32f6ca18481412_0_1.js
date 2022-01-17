function buildControls(wrapper, options) {
    // Insert a search field and button.  No forms, please
    var controls = $('<div class="buttonrow photoSelectorControls"></div>').css(
      $.fn.photoSelector.defaults.controlsCSS
    );
    var $searchInput = $('<input type="text" class="text" placeholder="Search" />').css(
      $.fn.photoSelector.defaults.formInputCSS
    );
    //$searchInput.attr('id', 'photoSelectorSearchField');
    $searchInput.attr('name', 'photoSelectorSearchField');
    if (typeof(options.defaultQuery) != 'undefined') {
      $searchInput.val(options.defaultQuery);
    };
    var $searchButton = $('<a href="#" class="button findbutton">Find Photos</a>').css(
      $.fn.photoSelector.defaults.formInputCSS
    );
    var $searchWrapper = $("<span></span>");
    $searchWrapper.append($searchInput).append($searchButton);
    
    var $sourceWrapper = $('<span class="urlselect inter"><strong>Source:</strong> </span>');

    // this branch is for backwards compatibility 
    // options.urls is used by legacy photoSelectors, but is now deprecated. 
    // use options.sources (see below) instead.
    if (typeof options != 'undefined' && typeof options.urls != 'undefined') {
      var urlSelect = $('<select class="select" style="margin: 0 auto"></select>');
      urlSelect.change(function() {
        $.fn.photoSelector.changeBaseUrl(wrapper, urlSelect.val());
      })
      var urls = options.urls || [];
      if (!options.skipLocal) {
        urls.push({
          title: "your hard drive",
          //url: '/photos/local_photo_fields?context=user'
          url: '/photos/local_photo_fields'
        })
      }
      $.each(urls, function() {
        if (this.url) {
          var title = this.title;
          var url = this.url;
        } else {
          var title = this;
          var url = this;
        }
        var option = $('<option value="'+url+'">'+title+'</option>');
        if (url === options.baseURL) $(option).attr('selected', 'selected');
        $(urlSelect).append(option);
      })
      $sourceWrapper.append(urlSelect);
    }

    // this branch is for options.sources (new style of photoselector)
    if (typeof options != 'undefined' && typeof options.sources != 'undefined') {

      // this is called when you change either the source <select> or context <select>
      function updateSource(sourceOptions){
        $searchWrapper.hide();
        var newSource = sources[currentSource]; 
        sourceOptions = (sourceOptions || {});
        sourceOptions['url'] = (sourceOptions.url || newSource.url);
        sourceOptions['object_id'] = (sourceOptions.object_id || false);
        if (typeof newSource.$contextWrapper == 'undefined') {
          // TODO: this is what happens when there isn't a $contextSelect for this source (i.e. only one available context)
          //sourceOptions['context'] = newSource.defaultContext;
        } else {
          sourceOptions['context'] = newSource.$contextWrapper.find('select').val();
          if (newSource.$contextWrapper.find("option:selected").data('searchable')) {
            // show search field
            $searchWrapper.show();
          } else {
        //    $searchWrapper.val('');
            $searchWrapper.hide();
          }
        }
        $.fn.photoSelector.changeBaseUrl(wrapper, sourceOptions['url'], sourceOptions['context'], sourceOptions['object_id']);
      }

      $searchWrapper.hide();
      var sources = options.sources || {};
      var currentSource = options.defaultSource;
      var $allContextWrappers = [];
      if (!options.skipLocal) { sources['local'] = {title: "Your computer", url: '/photos/local_photo_fields'}; }
      var $sourceSelect = $("<select class='select'></select>");
      var sourceIndex = 0; // used as index when iterating over sources below
      $.each(sources, function(sourceKey, sourceData){
        var $sourceOption = $("<option value='"+sourceKey+"'>"+sourceData.title+"</option>");
        $sourceSelect.append($sourceOption);
        var $contextWrapper = $("<span style='display:none'></span>");
        if (typeof options.defaultSource != 'undefined') { 
          if (options.defaultSource == sourceKey) { // if we've specified a default source, and this it, show the associated contextSelect
            $contextWrapper.css('display','inline-block');
            $sourceOption.attr('selected','selected');
            currentSource = sourceKey; 
          } 
        } else if (sourceIndex==0) { // if we haven't specified a default source but this is the first one, show the associated contextSelect
          currentSource = sourceKey; 
          $contextWrapper.css('display','inline-block');
        }
        sourceIndex += 1;
        sourceData.contexts = (sourceData.contexts || []);
        // create a sub-<select> menu for contexts, but only if this photo source has more than one possible context
        if (sourceData.contexts.length > 1) {
          var $contextSelect = $("<select class='select'></select>").change(updateSource);
          $.each(sourceData.contexts, function(i,context){
            var $contextOption = $("<option value='"+context[1]+"'>"+context[0]+"</option>");
            // if searchable=true in context options, search box will be visible when this context is selected
            // for example, if context is flickr public photos, we want to show the search box
            // e.g. ["Public photos", "public", {searchable:true}]
            var searchable = (context[2] && context[2].searchable);
            if (searchable) { $contextOption.data('searchable', true); } 
            if ((typeof options.defaultContext != 'undefined') && (options.defaultContext==context[1])) { // default context
              $contextOption.attr('selected','selected');
              if (searchable) { $searchWrapper.show(); }
            }
            $contextSelect.append($contextOption);
          });
          $contextWrapper.append($contextSelect);
        }
        sources[sourceKey].$contextWrapper = $contextWrapper;
        $allContextWrappers.push($contextWrapper);
      });


      $sourceSelect.change(function(){
        var sourceKey = $sourceSelect.val();
        var sourceData = sources[sourceKey];
        // show the associated context <select>, and hide all the other context <selects>
        $.each($allContextWrappers, function(i,c) { 
          if (sourceData.$contextWrapper && (sourceData.$contextWrapper==c)) {
            c.show();
          } else {
            c.hide(); 
          }
        });
        currentSource = sourceKey;
        updateSource();
      });

      $sourceWrapper.append($sourceSelect);
      $.each($allContextWrappers, function(i,c){ $sourceWrapper.append(c); });

    }

    $(".facebookAlbums .album", wrapper).live('click', function() {
      try {
        updateSource({
          url: '/facebook/album/'+$(this).data('aid'),
          object_id: $(this).closest('.facebookAlbums').data('friend_id')
          });
      } catch(e) {
        $.fn.photoSelector.changeBaseUrl(
          wrapper, 
          '/facebook/album/' + $(this).data('aid'), 
          'user', //contextSelect.val(), 
          $(this).closest('.facebookAlbums').data('friend_id'));
      }
      return false;
    })

    $(".facebookGroups .group", wrapper).live('click', function() {
      try {
        updateSource({
          url: '/facebook/group/',
          object_id: $(this).data('group_id')
          });
      } catch(e) {
        $.fn.photoSelector.changeBaseUrl(
          wrapper, 
          '/facebook/group/', 
          'group', //contextSelect.val(), 
          $(this).data('group_id'));
      }
      return false;
    })
  
    $('.back_to_albums').live('click', function(){
      try { updateSource({ object_id: $(this).data('friend_id') }); } 
      catch(e) {
        $.fn.photoSelector.changeBaseUrl(
          wrapper, 
          urlSelect.val(), 
          'user', //contextSelect.val(), 
          $(this).data('friend_id'));
      }
      return false;
    });

    $('.back_to_friends').live('click', function(){
      try { updateSource(); } 
      catch(e) { $.fn.photoSelector.changeBaseUrl(wrapper, urlSelect.val()); }
      return false;
    });

    $('.back_to_groups').live('click', function(){
      try { updateSource({ object_id: $(this).data('group_id') }); } 
      catch(e) {
        $.fn.photoSelector.changeBaseUrl(
          wrapper, 
          urlSelect.val(), 
          'groups', //contextSelect.val(), 
          $(this).data('group_id'));
      }
      return false;
    });

    // friend selector
    $('.friendSelector .friend').live('click', function(){
      try { updateSource({ object_id: $(this).data('friend_id') }); } 
      catch(e) {
        $.fn.photoSelector.changeBaseUrl(
          wrapper, 
          urlSelect.val(), 
          'user', // contextSelect.val(), 
          $(this).data('friend_id'));
      }
      return false;
    });

    
    // Append next & prev links
    var page = $('<input class="photoSelectorPage" type="hidden" value="1"/>');
    var prev = $('<a href="#" class="prevlink button">&laquo; Prev</a>').click(function(e) {
      var pagenum = parseInt($(wrapper).find('.photoSelectorPage').val());
      pagenum -= 1;
      if (pagenum < 1) pagenum = 1;
      var prevOpts = $.extend({}, $(wrapper).data('photoSelectorOptions'));
      prevOpts.urlParams = $.extend({}, prevOpts.urlParams, {page: pagenum});
      $.fn.photoSelector.queryPhotos(
        $searchInput.val(), 
        wrapper, 
        prevOpts);
      $(wrapper).find('.photoSelectorPage').val(pagenum);
      return false;
    });
    var next = $('<a href="#" class="nextlink button">Next &raquo;</a>').click(function(e) {
      var pagenum = parseInt($(wrapper).find('.photoSelectorPage').val());
      pagenum += 1;
      var nextOpts = $.extend({}, $(wrapper).data('photoSelectorOptions'));
      nextOpts.urlParams = $.extend({}, nextOpts.urlParams, {page: pagenum});
      $.fn.photoSelector.queryPhotos(
        $searchInput.val(), 
        wrapper, 
        nextOpts);
      $(wrapper).find('.photoSelectorPage').val(pagenum);
      return false;
    });
    
    $(controls).append($sourceWrapper);
    $(controls).append($searchWrapper, page, prev, next);
    $(controls).append($('<div></div>').css({
      height: 0, 
      visibility: 'hidden', 
      clear: 'both'})
    );
    
    $(wrapper).append(controls);
    
    if (options.baseURL.match(/local_photo/)) {
      $(wrapper).find('.photoSelectorControls .button, .photoSelectorControls .text').hide();
    }
    
    // Bind button clicks to search photos
    $searchButton.click(function(e) {
      $(wrapper).find('.photoSelectorPage').val(1);
      $.fn.photoSelector.queryPhotos($searchInput.val(), wrapper);
      return false;
    });
    
    // Bind ENTER in search field to search photos
    $searchInput.keypress(function(e) {
      if (e.which == 13) {
        // Catch exceptions to ensure false return and precent form submission
        try {
          $(wrapper).find('.photoSelectorPage').val(1);
          $.fn.photoSelector.queryPhotos($searchInput.val(), wrapper);
        }
        catch (e) {
          alert(e);
        }
        return false;
      };
    });
  }