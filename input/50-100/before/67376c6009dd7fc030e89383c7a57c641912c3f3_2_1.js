function(obj)
	{
		if(obj.item.get('layer_type') == 'Image')
		{
			console.log(obj)
			console.log( 'we can make something out of this' )
			$('#sequence-cover-image').css('background-image' , 'url("'+ obj.item.get('uri') +'")' );
			console.log(this)
			this.project.set({'cover_image':obj.item.get('uri')})
			
		}
	}