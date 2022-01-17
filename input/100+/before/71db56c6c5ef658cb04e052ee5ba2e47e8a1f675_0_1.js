function() {
      Utils.debug("APP init: " + this.el);

//      var userToBePassedAround = new User();
     
      
      // Create five corpus views
      this.corpusEditLeftSideView = new CorpusEditView({
        model : this.model.get("corpus")
      });
      this.corpusEditLeftSideView.format = "leftSide";
      
      this.corpusReadLeftSideView = new CorpusReadView({
        model : this.model.get("corpus")
      });
      this.corpusReadLeftSideView.format = "leftSide";

      this.corpusEditEmbeddedView = new CorpusEditView({
        model : this.model.get("corpus")
      });
      this.corpusEditEmbeddedView.format = "centreWell";
      
      this.corpusReadEmbeddedView = new CorpusReadView({
        model : this.model.get("corpus")
      });
      this.corpusReadEmbeddedView.format = "centreWell";
      
      this.corpusEditFullscreenView = new CorpusEditView({
        model : this.model.get("corpus")
      });
      this.corpusEditFullscreenView.format = "fullscreen";
      
      this.corpusReadFullscreenView = new CorpusReadView({
        model : this.model.get("corpus")
      });
      this.corpusReadFullscreenView.format = "fullscreen";
      
      /*
       * Set up four session views
       */ 
      this.sessionEditLeftSideView = new SessionEditView({
        model : this.model.get("currentSession")
      });
      this.sessionEditLeftSideView.format = "leftSide";
      this.sessionReadLeftSideView = new SessionReadView({
        model : this.model.get("currentSession")
      });
      this.sessionReadLeftSideView.format = "leftSide";
      this.sessionEditEmbeddedView = new SessionEditView({
        model : this.model.get("currentSession")
      });
      this.sessionEditEmbeddedView.format = "embedded";
      this.sessionReadEmbeddedView = new SessionReadView({
        model : this.model.get("currentSession")
      });
      this.sessionReadEmbeddedView.format = "embedded";
      this.sessionEditFullscreenView = new SessionEditView({
        model : this.model.get("currentSession")
      });
      this.sessionEditFullscreenView.format = "fullscreen";
      this.sessionReadFullscreenView = new SessionReadView({
        model : this.model.get("currentSession")
      });
      this.sessionReadFullscreenView.format = "fullscreen";
      this.sessionModalView = new SessionEditView({
        model : this.model.get("currentSession")
      });
      this.sessionModalView.format = "modal";
      
      // Create an AuthenticationEditView
      this.authView = new AuthenticationEditView({
        model : this.model.get("authentication")
      });
      
      /* 
       * Set up the five user views
       */
      this.fullScreenEditUserView = new UserEditView({
        model : this.model.get("authentication").get("userPrivate")
      });
      this.fullScreenEditUserView.format = "fullscreen";
      
      this.fullScreenReadUserView = new UserReadView({
        model : this.model.get("authentication").get("userPrivate")
      });
      this.fullScreenReadUserView.format = "fullscreen";

      this.modalEditUserView = new UserEditView({
        model : this.model.get("authentication").get("userPrivate")
      });
      this.modalEditUserView.format = "modal";
      
      this.modalReadUserView = new UserReadView({
        model : this.model.get("authentication").get("userPrivate")
      });
      this.modalReadUserView.format = "modal";

      
      // Create the embedded and fullscreen DatumContainerEditView
      var datumsToBePassedAround = new Datums();
      this.datumsView = new DatumContainerEditView({
        model : datumsToBePassedAround
      });
      this.datumsReadView = new DatumContainerReadView({
        model : datumsToBePassedAround
      });
      
      /*
       * Set up the six data list views
       */
      var dataListToBePassedAround = this.model.get("currentDataList") || new DataList();
      var datumsCollectionToBePassedAround = new Datums();
      
      this.dataListEditMiddleView = new DataListEditView({
        model : dataListToBePassedAround,
        datumCollection : datumsCollectionToBePassedAround 
      }); 
      this.dataListEditMiddleView.format = "centreWell";
      
      this.dataListReadMiddleView = new DataListEditView({
        model : dataListToBePassedAround,
        datumCollection : datumsCollectionToBePassedAround 
      }); 
      this.dataListReadMiddleView.format = "centreWell";
      
      this.dataListEditLeftSideView = new DataListEditView({
        model : dataListToBePassedAround,
        datumCollection : datumsCollectionToBePassedAround 
      }); 
      this.dataListEditLeftSideView.format = "leftSide";
   
      this.dataListEditFullscreenView = new DataListEditView({
        model : this.dataListEditLeftSideView.model,
        datumCollection : datumsCollectionToBePassedAround 
      });  
      this.dataListEditFullscreenView.format = "fullscreen";

      this.dataListReadLeftSideView = new DataListReadView({
        model :  this.dataListEditLeftSideView.model,
        datumCollection : datumsCollectionToBePassedAround 
      });  
      this.dataListReadLeftSideView.format = "leftSide";
   
      this.dataListReadFullscreenView = new DataListReadView({
        model :  this.dataListEditLeftSideView.model,
        datumCollection : datumsCollectionToBePassedAround 
      });  
      this.dataListReadFullscreenView.format = "fullscreen";
      
      /*
       *  Create search views
       */
      this.searchTopView = new SearchEditView({
        model : new Search()
      });
      this.searchTopView.format = "top";
      
      var searchToBePassedAround = new Search();
      this.searchFullscreenView = new SearchEditView({
        model : searchToBePassedAround
      });
      this.searchFullscreenView.format = "fullscreen";
      
      this.searchEmbeddedView = new SearchEditView({
        model : searchToBePassedAround
      });
      this.searchEmbeddedView.format = "centreWell";
      
      // Create a UserPreferenceEditView
      this.userPreferenceView = new UserPreferenceEditView({
        model : this.authView.model.get("userPrivate").get("prefs")
      });
      
      // Create an ActivityFeedView
      this.activityFeedView = new ActivityFeedView({
        model : new ActivityFeed()
      }); 
      // Create an InsertUnicodesView
      this.insertUnicodeView = new InsertUnicodesView({
        model : this.authView.model.get("userPrivate").get("prefs").get("unicodes")
      }); 

      // Create a HotKeyEditView
      this.hotkeyEditView = new HotKeyEditView({
        model : this.authView.model.get("userPrivate").get("hotkeys")
      });   
      
      // Create an ExportREadView
      this.exportView = new ExportReadView({
        model : new Export()
      });

     
      
      // Create an ImportEditView
      this.importView = new ImportEditView({
        model : new Import()
      });

      // Create and initialize a Terminal
      this.term = new Terminal('terminal');
      this.term.initFS(false, 1024 * 1024);
      
      
      // Set up a timeout event every 10sec
      _.bindAll(this, "saveScreen");
      window.setInterval(this.saveScreen, 10000);     
    }