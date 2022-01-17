function() {
      
     
      
  	  //Apply settings stored in current profile to general settings form
  	  var settings = profile.get('settings');

  	  if(settings) {
  	    var data = JSON.parse(settings);
  	    if(data.maxResults) {
          set('queryOptions.maxNumResults', data.maxResults);
        }
        if(data.clusterType) {
          set('queryOptions.clusterType', data.clusterType);
        }
        if ( data.numClusters ) {
			set('queryOptions.clusters0', data.numClusters);
		}

		if ( data.transMethod ) {
			set('queryOptions.trans', data.transMethod);
		}
  	  }
     
  	  //Initialize the form with the default values
      $("#max-num-results").val(constants.queryOptions.maxNumResults);
      if(constants.queryOptions.clusterType === '3D') {
        $("#audio-cluster-type").parent().removeClass('checked');
        $("#audio-cluster-type").attr('checked', false);
      } else {
        $("#audio-cluster-type").parent().addClass('checked');
        $("#audio-cluster-type").attr('checked', true);
      }
      
      $("#num-clusters").val(constants.queryOptions.clusters0);
      $("#trans-method option[value=" + constants.queryOptions.trans + "]").attr('selected','selected');
    }