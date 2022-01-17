function(Items) {

	Items.Collection = Backbone.Collection.extend({

		page : 0,
		totalItemsCount : 0,
		
		_views : [],
		target : $('#database-item-list'),
		
		base : function()
		{
			return zeega.app.url_prefix + "api/search?r_items=1&r_itemswithcollections=0&user=-1&site="+sessionStorage.getItem('siteid')+"&page="+ this.page
		},
		
		url: function()
		{
			var url = this.base();
			if( !_.isUndefined(this.search.query) ) url += '&q=' + this.search.query;
			if( !_.isUndefined(this.search.contentType) ) url += '&content=' + this.search.contentType;
			if( !_.isUndefined(this.search.collectionID) && this.search.collectionID != 'all' )
			{
			    url += '&collection=' + this.search.collectionID;
			    // hammering - collection filtering should not be done by user_id nor site_id
			    url = url.replace("&user=-1","");
			    url = url.replace("&site="+sessionStorage.getItem('siteid'),"");
			}
			return url;
		},
		
		search : {},

		initialize : function()
		{
			this.target.spin('small');
			if( itemsJSON )
			{
				//get bootstrapped data if it exists
				var itemsBS = jQuery.parseJSON(itemsJSON);
				this.totalItemsCount = itemsBS.items_count;
				this.reset( itemsBS.items );
				this.target.spin(false);
			}
			else
			{
				//if bootstrap doesn't exist, then default to a search
				console.log( 'items NOT bootstrapped. Do search. ')
				this.fetch();
			}
			
			this.renderCollection();
		},
		
		renderCollection : function()
		{
			var _this = this;
			_.each( _.toArray(this), function(itemModel){
				var itemView = new Items.Views.List({model:itemModel});
				_this._views.push( itemView );
				_this.target.append( itemView.render().el );
			})
		},
		
		refresh : function()
		{
			console.log('refresh start')
			var _this = this;
			this.target.fadeTo(1000,0.5).spin('small');
			this.fetch({
				success : function()
				{
					console.log('refresh success')
					_this.target.spin(false);
					_this.renderCollection();
				}
			})
		},
		
		setSearch : function(search, reset)
		{
			if(reset) this.search = search;
			else _.extend(this.search,search)
		},

		parse : function(response)
		{
			this.totalItemsCount = response.items_count;
			return response.items;
		}
	});

/*	
	Items.ViewCollection = Backbone.View.extend({

		el : $('#database-item-list'),

		initialize : function()
		{
			this.collection = new Items.Collection();
			this.collection.on('reset',this.reset,this);
			this._childViews = [];
			
			$(this.el).spin('small');
			this.render();
		},
		
		render : function()
		{
			console.log('items render')
			var _this = this;
			this._isRendered = true;
			
			if(this.collection.length)
			{
				_.each( _.toArray(this.collection), function(itemModel){
					var itemView = new Items.Views.List({model:itemModel});
					_this._childViews.push( itemView );
					$(_this.el).append( itemView.render().el );
				})
			}
			else
			{
				$(this.el).html('<li class="alert alert-error">No results :(</li>')
			}
			
			$(this.el).fadeTo(100,1);
			$(this.el).spin(false);
			return this;
		},
		
		reset : function()
		{
			if ( this._isRendered )
			{
				$(this.el).empty();
				this._childViews = [];
				this.render();
			}
		},
		
		getNextPage :function()
		{
			if(this.collectionFull != true)
			{
				console.log('add more!!!')
				var _this = this;
				this.collection.page++;
				this.collection.fetch({
					add:true,
					success: function(c)
					{
						_this._childViews = [];
						$(_this.el).empty();
						_this.render();
					
						if(_this.collection.totalItemsCount == _this.collection.length)
							_this.collectionFull = true;
					}
				});
			}
		},

		append : function(items)
		{
			items.each(this.add);
			items.bind('add',this.add)
			//this.render();

			insertPager( _.size(this._itemViews), Database.page );
		},
		
		search : function(search,reset)
		{
			var _this = this;
			$(this.el).fadeTo(1000,0.5);
			$(this.el).spin('small');
			
			this.collection.setSearch(search,reset);
			this.collection.fetch();
		},
		
		refresh : function()
		{
			console.log('item refresh', this.collection)
			var _this = this;
			$(this.el).fadeTo(1000,0.5);
			$(this.el).spin('small');
			
			this.collection.fetch({
				success : function()
				{
					console.log('items fetch success')
					_this.render();
				}
			});
		},
		
		getSearch : function(){ return this.collection.search }

	});
*/

}