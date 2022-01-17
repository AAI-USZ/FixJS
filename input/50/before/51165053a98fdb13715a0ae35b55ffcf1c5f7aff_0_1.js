function(){
      if(!base.has('testPageView')){ base.set('testPageView', new homePageView); }
      base.get('testPageView').render();
      this.switchPage('testPage');
    }