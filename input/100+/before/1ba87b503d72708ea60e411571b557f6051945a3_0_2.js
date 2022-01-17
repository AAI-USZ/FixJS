function(sidebarid, contentid) {
      var self = this;
      if (this.firstLaunch) {
        // If first launch with a specific path, hijack the route
        // and go to table of content directly
        Backbone.history.navigate('/view', true);
        return;
      }

      // Put it in onDataLoaded in case data isn't loaded yet.
      self._onDataLoaded = function() {

        // Get the right data
        var rootModel = dataManager.getDataFromPath(sidebarid+'/'+contentid);

        // Get or create view
        var theview = uiManager.setContentView(rootModel, {
          container: 'content',
          id: rootModel.get('guid'),
          title: rootModel.get('name'),
          titleType: 'big',
          showDescription: true,
          scrollable: true
        });
        
        uiManager.setSelectedSidebarItem(rootModel.get('guid'));

        // Get index of item in collection
        // to determine the direction of the slide
        var curPaneIndex = rootModel.collection.indexOf(rootModel),
            direction = '';
        direction = (curPaneIndex < self.previousContentIndex)?'bottom':'top';

        // If we previously were deeper
        if(self.previousContentLevel > 2) {
          if(!theview.$el.hasClass('shown') && self.previousContentId == contentid)
            uiManager.slideContentPane(rootModel.get('guid'), {direction: 'right'});
          else if(!theview.$el.hasClass('shown') && self.previousContentId != contentid)
            uiManager.slideContentPane(rootModel.get('guid'), {direction: direction});
        }
        // If we land here normally
        else {
          if(!theview.$el.hasClass('shown')) {
            uiManager.slideContentPane(rootModel.get('guid'), {direction: direction});
          }
        }

        self.previousContentIndex = curPaneIndex;
        self.previousContentLevel = 2;
        self.previousContentId = contentid;
      };
      // If data is already loaded, trigger onDataLoaded.
      if (typeof dataManager.appTree !== undefined && dataManager.appTree) {
        self._onDataLoaded();
        self._onDataLoaded = null;
      }
    }