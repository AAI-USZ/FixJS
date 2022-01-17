function() {
      console.log('handleSettingSave...');
      
      var mr = parseInt(panels.settings.find("#max-num-results").val());
  	  var ct = $("#audio-cluster-type").attr('checked') ? 'Audio' : '3D';
  	  
	  var nc = parseInt(panels.settings.find("#num-clusters").val()) ;
	  var tm = panels.settings.find("#trans-method option:selected").val() ;
      
      if(constants.queryOptions.maxNumResults === mr &&
   	     constants.queryOptions.clusterType   === ct &&
   	     constants.queryOptions.cluster0      === nc &&
   	     constants.queryOptions.trans         === tm ){
        return;
      }  
	          
      set('queryOptions.maxNumResults', mr);
  	  set('queryOptions.clusterType', ct);
  	  set('queryOptions.cluster0', nc);
  	  set('queryOptions.trans', tm) ;
      
      var settings = {"maxResults" :  mr , "clusterType" : ct, 
	      "numClusters" : nc ,  "transMethod" : tm 
	  };
	  
      profile.set('settings',settings,sendNotifyMessage);
  	  
      //Notify the user that their action has been successful -- close the panel
      panels.hide(constants.slideDownAnimationTime);
    }