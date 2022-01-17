function(element, options) {

			var Listable, isCollection, ListCollection, SearchView, ListView, ItemView, ItemModel, TitleModel, TitleView, EmptyView, LoadingView,
				that = this;

			this.$element = $(element);

			this.options = Sushi.extend({}, this.options, options);

			this.source = (typeof this.options.source === 'string') ? JSON.parse(this.options.source) : this.options.source;
			this.uses = (typeof this.options.uses === 'string') ? JSON.parse(options.uses) : this.options.uses;

			// Type inferring
			isCollection = this.source instanceof Collection;

			if (!isCollection && !utils.isArray(this.source)) {
				throw new SushiError('source must be a Sushi Collection or a simple array')
			}

			ItemModel = this.options.item.Model || new Sushi.Class( Model, {
				constructor: function(attributes, options) {
					ItemModel.Super.call(this, attributes, options);
				},

				defaults: {
					title: 'Title',
					description: 'Description',
					image: null,
					link: null
				}
			});

			TitleModel = new Sushi.Class( Model, {
				constructor: function(attributes, options) {
					TitleModel.Super.call(this, attributes, options);
				},

				defaults: {
					content: 'Title'
				}
			});

			ListCollection = Sushi.Class( Collection, {
				constructor: function(models, options) {
					ListCollection.Super.call(this, models, options);
				},

				model: ItemModel
			});

			this.TitleView = TitleView = new Sushi.Class( View, {
				constructor: function(options) {
					TitleView.Super.call(this, options);
					this._configure(options || {});
				},

				tagName: 'div',

				template: (typeof that.options.title.template === 'string') ? template.compile(that.options.title.template) : that.options.title.template,

				className: 'listable-header',

				initialize: function(options) {
					this.data = options.data;
				},

				render: function() {
					this.$el.html(this.template(this.data));
					return this;
				}
			});

			this.EmptyView = EmptyView = new Sushi.Class( View, {
				constructor: function(options) {
					EmptyView.Super.call(this, options);
				},

				tagName: 'li',

				template: (typeof that.options.empty.template === 'string') ? template.compile(that.options.empty.template) : that.options.empty.template,

				className: 'listable-item empty',

				initialize: function(options) {
					this.data = options && options.data || {};
				},

				render: function() {
					this.$el.html( this.template(this.data) );
					return this;
				}
			});

			this.SearchView = SearchView = new Sushi.Class( View, {
				constructor: function(options) {
					SearchView.Super.call(this, options);
				},

				tagName: 'div',

				template: (typeof that.options.search.template === 'string') ? template.compile(that.options.search.template) : that.options.search.template,

				className: 'listable-search',

				events: {
					'keyup input': 'search',
					'change input': 'search'
				},

				initialize: function(options) {
					this.data = options.data;

					this.search = utils.throttle(this.search, 500)
				},

				render: function() {
					this.$el.html(this.template(this.data));
					return this;
				},

				search: function() {
					var value = this.$el.find('input').val(),
						results;

					results = new ListCollection(this.collection.filter(function(model){
						return (model.get('title').toLowerCase().indexOf(value.toLowerCase()) != -1) 
							|| (model.get('description').toLowerCase().indexOf(value.toLowerCase()) != -1);
					}));

					that.trigger('search', results, value);
					that.$element.trigger('search', [results, value]);
				}
			});

			LoadingView = this.LoadingView = this.options.loading.View || new Sushi.Class( View, {
				constructor: function(options) {
					LoadingView.Super.call(this, options);
				},

				tagName: 'div',

				className: 'listable-loading',

				events: {
					'click span': 'clicked'
				},

				clicked: function() {
					alert('clicked')
				},

				template: (typeof that.options.loading.template === 'string') ? template.compile(that.options.loading.template) : that.options.loading.template,

				render: function() {
					this.$el.html( this.template() );
					return this.bindModel();
				}
			});

			ItemView = this.options.item.View || new Sushi.Class( View, {
				constructor: function(options) {
					ItemView.Super.call(this, options);
					this._configure(options || {});
				},

				tagName: 'li',

				template: (typeof that.options.item.template === 'string') ? template.compile(that.options.item.template) : that.options.item.template,

				className: 'listable-item',

				events: {
					'mouseenter': 'mouseenter',
					'mouseleave': 'mouseleave',
					'click': 'click'
				},

				bindings: {
					'text [data-binding="title"]': 'title',
					'text [data-binding="description"]': 'description'
				},

				initialize: function(options) {
					this.model.bind('destroy', this.dealloc, this);
					return this;
				},

				render: function() {
					this.$el.html( this.template( this.model.toJSON() ) );

					if (this.model.has('link')) this.$el.addClass('listable-item-interactive');

					return this.bindModel();
				},

				mouseenter: function() {
					that.trigger('mouseenter');
					that.$element.trigger('mouseenter');
				},

				mouseleave: function() {
					that.trigger('mouseleave');
					that.$element.trigger('mouseleave');
				},

				click: function() {
					that.trigger('click');
					that.$element.trigger('click');
				}
			});

			this.ListView = ListView = new Sushi.Class( View, {
				constructor: function(options) {
					ListView.Super.call(this, options);
					this._configure(options || {});
				},

				tagName: (that.options.listType === 'unordered') ? 'ul' : 'ol',

				className: 'listable-list unstyled',

				_height: 0,

				initialize: function(options) {
					this.collection.bind('reset', this.addAll, this);
					this.collection.bind('add', this.addOne, this);
					this.collection.bind('add', this.setHeight, this);
					this.collection.bind('remove', this.setHeight, this);

					that.bind('search', this.search, this);

					if (that.options.scrollable) {
						this.collection.bind('reset', function() {
							if (!that._scrollable) return false;
							setTimeout(function() {
								that._scrollable.refresh();
							}, 0);
						});
						this.collection.bind('add', function() {
							if (!that._scrollable) return false;
							setTimeout(function() {
								that._scrollable.refresh();
							}, 0);
						});
						this.collection.bind('remove', function() {
							if (!that._scrollable) return false;
							setTimeout(function() {
								that._scrollable.refresh();
							}, 0);
						});
					}

					this.addAll();

					return this;
				},

				addOne: function(item) {
					if (this.emptyView) this.emptyView.dealloc();

					var view = new ItemView( {model: item} );
					this.$el[that.options.listMethod]( view.render().el );

					return this;
				},

				addAll: function(collection) {
					collection = (collection) ? collection : this.collection;

					this.$el.html('');

					if (collection.length) {
						collection.each( this.addOne, this );
					} else {
						this.emptyView = new EmptyView();
						this.$el.html('').append( this.emptyView.render().el);
					}

					return this;
				},

				setHeight: function() {
					this._height = this.$el.get(0).scrollHeight - this.$el.get(0).offsetHeight;
				},

				search: function(collection) {
					this.addAll.call(this, collection);
				}

			});

			// Turn it into a ListCollection if it's a simple array
			if (!isCollection) this.source = new ListCollection(this.source);

			this.render();
		}