function handleImageClick(e) {

	var cur = $(this)



	// switch classes...

	cur.parents().siblings().children(".image").removeClass("current-image")

	cur.siblings(".image").removeClass("current-image")



	cur.siblings().children(".image").removeClass("current-image")

	cur.parents().siblings(".ribbon").removeClass("current-ribbon")



	cur.addClass("current-image")

	cur.parents(".ribbon").addClass("current-ribbon")





	var container = cur.parents('.container')

	var field = cur.parents(".field")



	var image_offset = cur.offset()

	var field_offset = field.offset()



	// center the current image...

	field.css({

		left: field_offset.left - image_offset.left + (container.innerWidth() - cur.innerWidth())/2, 

		top: field_offset.top - image_offset.top + (container.innerHeight() - cur.innerHeight())/2 

	})





	// XXX do I need this???

	e.preventDefault();

}