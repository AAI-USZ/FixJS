function ( vcardTemplate ) {
		
		// Compile the template through underscore
		var template = _.template( vcardTemplate );

		var VCardBlock = block.AbstractBlock.extend({
			title: 'vCard',

			getSchema: function() {
				return {
					firstname: {
						type: 'string',
						label: 'First Name'
					},
					lastname: {
						type: 'string',
						label: 'Last Name'
					},
					url: {
						type: 'url',
						label: 'URL'
					},
					org: {
						type: 'string',
						label: 'Organization'
					},
					email: {
						type: 'email',
						label: 'E-Mail'
					}
				};
			},

			render: function() {
				return template(jQuery.extend(
					{
						url: '',
						org: '',
						email: '',
						firstname: '',
						lastname: ''
					}, this.attr()));
			}
		});
	}