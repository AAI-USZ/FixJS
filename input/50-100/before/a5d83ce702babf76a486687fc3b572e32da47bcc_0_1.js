function( newAttr, silent )
		{
			var _this = this;
			_.extend( this.get('attr'), newAttr );
			if( !silent )
			{
				this.save({},{
					success : function(){ _this.trigger('update') }
				});
			}
		}