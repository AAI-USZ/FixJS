function () {
		expect(1)
		var mixee = {}
		Observer(mixee)
		mixee.on("sub-a", function() {
			ok( true )
		})
		mixee.publish( "sub-a" )
		mixee = null
	}