function() {
			var node = $( '<div/>', { id: 'parent' } );
			this.propertyEditTool = new window.wikibase.ui.PropertyEditTool( node );
			this.editableValue = new window.wikibase.ui.PropertyEditTool.EditableValue;

			var toolbar = this.propertyEditTool._buildSingleValueToolbar( this.editableValue );
			this.editableValue._init( node, toolbar );
			this.strings = {
				valid: [ 'test', 'test 2' ],
				invalid: [ '' ]
			};
			this.errors = [ // simulated error objects being returned from the API
				{ 'error':
					{
						'code': 'no-permissions',
						'info': 'The logged in user does not have sufficient rights'
					}
				},
				{ 'error':
					{
						'code': 'some-nonexistant-error-code',
						'info': 'This error code should not be defined.'
					}
				},
				{ 'error':
					{
						'code': 'client-error',
						'info': 'The connection to the client page failed.'
					}
				}
			];

			equal(
				this.editableValue._getToolbarParent().parent().attr( 'id' ),
				'parent',
				'parent node for toolbar exists'
			);

			equal(
				this.editableValue.getSubject()[0],
				node[0],
				'verified subject node'
			);

			ok(
				this.editableValue._interfaces.length == 1
					&& this.editableValue._interfaces[0] instanceof window.wikibase.ui.PropertyEditTool.EditableValue.Interface,
				'initialized one interface'
			);


			var self = this;

			this.editableValue.simulateApiFailure = function( error ) {
				if ( error === undefined ) {
					error = 0;
				}
				self.editableValue.queryApi = function( deferred, apiAction ) {
					deferred.reject( 'error', self.errors[ error ] ).promise();
				};
			};

			this.editableValue.simulateApiFailure();

			ok(
				this.editableValue.remove().isRejected(),
				'simulateApiFailure() we use for testing failures in the API works'
			);

			this.editableValue.simulateApiSuccess = function() {
				self.editableValue.queryApi = function( deferred, apiAction ) { // override AJAX API call
					deferred.resolve().promise();
				};
			};

			this.editableValue.simulateApiSuccess(); // initial state by default api actions in our tests are a success!

			ok(
				this.editableValue.save().isResolved(),
				'simulateApiSuccess() we use for testing success in the API works'
			);
		}