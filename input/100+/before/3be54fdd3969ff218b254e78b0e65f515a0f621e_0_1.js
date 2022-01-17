function ballotFeedback(data) {
		this.option_id = data.option_id
		this.user_id = data.user_id
		this.id = data.id
		this.support = data.support
		this.comment = data.comment
		this.yourFeedback = data.user_id == current_user.id
		this.image = data.user.image
		this.url = data.user.url
		this.fb = data.user.fb
		this.name =  data.user.first_name+' '+data.user.last_name
		this.type = data.type
		this.updated = data.updated_at != data.created_at
		this.usefulness = ko.observable( data.useful.split(',').length - data.useless.split(',').length )

		var date = new Date(data.updated_at),
			time = date.toLocaleTimeString().slice(0,5)+'am',
			day = date.toLocaleDateString().split(', ')
			day.shift()
			day = day.join(', ')

		if( date.getHours() > 12 ) {
			time = (date.getHours()-12) +time.slice(2,5)+'pm'
		} else if ( date.getHours() == 12 ) time = time.slice(0,5)+'pm'

		this.time =  day+' '+time

		this.friend = ko.computed( function() { return yourLocation.friends().indexOf( this.user.fb ) !== -1 },data)
		return this
	}