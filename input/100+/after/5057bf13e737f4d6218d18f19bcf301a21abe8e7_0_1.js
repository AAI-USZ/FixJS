function( attributes )
		{
			_.defaults( this.get('attr'), this.default_attr );
			
			if( _.isUndefined(this.get('cover_image')) || this.get('cover_image') == '' )
				this.set('cover_image','../../../images/default_cover.png')
			
			//remove dupe data from the attributes
			this.unset('sequences',['silent']);
			this.unset('frames',['silent']);
			this.unset('layers',['silent']);
			
			this.createLayerCollection(attributes.layers);
			this.createFrameCollection(attributes.frames);
			this.createSequenceCollection( attributes.sequences );
			
			
			this.layers.on('add', this.onAddLayer, this);
			this.frames.on('add', this.onAddFrame, this);
			
			console.log('init PROJECT')
			console.log(this)
		}