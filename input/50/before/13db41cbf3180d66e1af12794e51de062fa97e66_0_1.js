function(){
    Ti.UI.setBackgroundColor('#000');
    
    var tabGroup = Ti.UI.createTabGroup();
    
    var tab1 = app.ui.createRssTab('VOA', 'http://learningenglish.voanews.com/rss/?count=50');
    //var tab2 = app.ui.createRssTab('Q&A', 'http://developer.appcelerator.com/questions/feed/newest');
    
    tabGroup.addTab(tab1);
    return tabGroup;
  }