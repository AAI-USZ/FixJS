function() {
      var ids= {};
      ids.corpusid = "4C1A0D9F-D548-491D-AEE5-19028ED85F2B";
      ids.sessionid = "1423B167-D728-4315-80DE-A10D28D8C4AE";
      ids.datalistid = "1C1F1187-329F-4473-BBC9-3B15D01D6A11";
      
      //all the replication etc happens in authView
      this.authView.loadSample(ids);
      
      this.searchTopView.loadSample();
    }