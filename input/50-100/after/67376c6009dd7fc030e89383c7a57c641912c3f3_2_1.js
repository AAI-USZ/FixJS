function(obj)
	{
		if(obj.item.get('layer_type') == 'Image')
		{
			$('#sequence-cover-image').css('background-image' , 'url("'+ obj.item.get('uri') +'")' );
			this.project.save({'cover_image':obj.item.get('uri')})
		}
	}