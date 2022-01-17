function ballotFeedback(data) {
		this.option_id = data.option_id
		this.user_id = data.user_id
		this.id = data.id
		this.support = data.support
		this.comment = data.comment
		var user = typeof inits.user != 'undefined' ? inits.user.id : current_user.id
		this.yourFeedback = data.user_id == user
		this.image = data.user.image
		this.url = data.user.profile
		this.fb = data.user.fb
		this.name =  data.user.first_name+' '+data.user.last_name
		this.type = data.type
		this.updated = data.updated_at != data.created_at
		var useless = data.useless || '', useful = data.useful || ''
		useless = useless.split(',').length + ( data.useless.length > 0 ? 1 : 0 )
		useful = useful.split(',').length +  ( data.useful.length > 0 ? 1 : 0 )
		this.usefulness = ko.observable( useful - useless )

		var date = new Date(data.updated_at),
			time = date.toLocaleTimeString().slice(0,5)+'am',
			day = date.toLocaleDateString().split(', ')
			day.shift()
			day = day.join(', ')

		if( date.getHours() > 12 ) {
			time = (date.getHours()-12) +time.slice(2,5)+'pm'
		} else if ( date.getHours() == 12 ) time = time.slice(0,5)+'pm'

		this.time =  day+' '+time

		this.friend = ko.computed( function() { 
			var friends = typeof yourLocation != 'undefined' ? yourLocation.friends() : []
			return friends.indexOf( this.user.fb ) !== -1
		},data)
		return this
	}