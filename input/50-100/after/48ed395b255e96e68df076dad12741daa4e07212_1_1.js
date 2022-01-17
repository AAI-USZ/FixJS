function()
  {
    this._super();
    
    //Record a start event cookie (for analytics)
    if (!WDN.jQuery.cookies.get('UNL_Visitorchat_Start')) {
      //Set a cookie.
      date = new Date();
      WDN.jQuery.cookies.set('UNL_Visitorchat_Start', (Math.round(date.getTime()/1000)), {domain: '.unl.edu'});
      
      //Send analytics data
      _gaq.push(['wdn._setCustomVar',
                 1,                   
                 'WDN Chat',
                 'Yes',
                 2
              ]);
      
      //Mark as started
      WDN.analytics.callTrackEvent('WDN Chat', 'Started');
    }
  }