function initCollectionsAddedBox(group){
			var url = base_url+"/view_part/collectionStat/index/?sort=dateCreated&group="+group;		
			var sort= 'dateCreated';
			function loadCollectionStat(sort,group){//load Institution Page Stat
				$.ajax({
		  			type:"GET",   
		  			url:url,   
		  				success:function(msg){
		  					if(msg!=''){
		  						$('#addedRightBox').html();
		  						$('#addedRightBox').html(msg);
		  					}else{
		  						$('#addedRightBox').css('display','none');
		  					}
		  				},
		  				error:function(msg){
		  					//$('#debug').append('doSearch error: '+msg+'<br/>');
		  				}
		  			});
			}	
			loadCollectionStat(sort,group);		
	}