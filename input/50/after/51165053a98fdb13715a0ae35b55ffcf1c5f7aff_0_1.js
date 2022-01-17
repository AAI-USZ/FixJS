function(){
      if(!base.has('testPageView')){ base.set('testPageView', new testPageView); }
      base.get('testPageView').render();
      this.switchPage('testPage');
    }