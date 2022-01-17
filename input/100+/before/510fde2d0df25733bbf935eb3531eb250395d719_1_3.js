function() {
      console.log('handleSettingSave...');
      
      var mr = parseInt(panels.settings.find("#max-num-results").val());
  	  var ct = $("#audio-cluster-type").attr('checked') ? 'Audio' : '3D';
      
      if(constants.queryOptions.maxNumResults === mr &&
			   constants.queryOptions.clusterType   === ct){
        return;
      }  
	          
      set('queryOptions.maxNumResults', mr);
  	  set('queryOptions.clusterType', ct);
      
      var settings = {"maxResults" :  mr , "clusterType" : ct};
      profile.set('settings',settings,sendNotifyMessage);
  	  
      //Notify the user that their action has been successful -- close the panel
      panels.hide(constants.slideDownAnimationTime);
    }