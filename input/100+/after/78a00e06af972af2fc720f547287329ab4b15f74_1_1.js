function() {
		
		if($("#" + this.id + "_endpoint_list .endpoint").size() < 1){
			var id = this.id;
			$('.img_loading').css("display", "block");
			$("#" + this.id + "_endpoint_list").load("/get_resource?rest=" + this.path + "&id=" + id, null, function(){
				Docs.toggleEndpointListForResource(id);
				$('.img_loading').css("display", "none");
			});	
		}else{
			Docs.toggleEndpointListForResource(this.id)		
		}
		
		
		
	}