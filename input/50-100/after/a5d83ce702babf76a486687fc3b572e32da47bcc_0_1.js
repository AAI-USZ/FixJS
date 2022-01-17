function( newAttr, silent )
		{
			var _this = this;
			this.set( 'attr' , _.extend( this.get('attr'), newAttr ) );
			if( !silent )
			{
				this.save({},{
					success : function(){ _this.trigger('update') }
				});
			}
		}