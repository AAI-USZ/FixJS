function( Extension ) {
	
	"use strict";

	var TabManager = Extension.$extend({

		_nextId : 0,

		getSandboxExtension : function( opts ) {

			opts = opts || {};

			var self = this;

			self._container = $(opts.container);

			self._initLayout();
			self._initEventHandlers();

			return {
				add : self._add.bind( self ),
				remove : self._remove.bind( self ),
				current : self._current.bind( self )
			};

		},

		_initLayout : function() {

			var self = this,
				tabs = $('<ul />'),
				content = $('<ul />'),
				container = self._container;

			container.empty();

			tabs.addClass('tabs');

			content.addClass('content');

			container.append( tabs )
					 .append( content );

			self._tabs = tabs;
			self._content = content;
		},

		_initEventHandlers : function() {
			var self = this,
				container = self._container;
			container.on('click', '.tabs li', self._onTabClick.bind( self ) );
		},

		_getNextId : function() {
			return this._nextId++;
		},

		_onTabClick : function( evt ) {

			var tabId,
				self = this,
				target = $(evt.currentTarget);

			if( !target.hasClass('current') ) {
				tabId = target.data('tab-id');
				self._current( tabId );
			}

		},

		_current : function( id ) {

			var content, title,
				self = this,
				pubsub = self.sandbox.events,
				container = self._container;

			if( id !== undefined ) {
				container.find( '.current' ).removeClass( 'current' );
				container.find( 'li[data-tab-id="'+id+'"]' ).addClass( 'current' );
				pubsub.publish( 'tab:focus', [ +id ] );
			} else {
				return {
					title : container.find('.tabs li.current'),
					content : container.find('.content li.current')
				}
			}

		},

		// return tab id
		_add : function( title, content, isCurrent ) {

			var self = this,
				id = self._getNextId(),
				titleItem = $('<li />'),
				contentItem = $('<li />');

			titleItem.append( title );
			contentItem.append( content );

			titleItem.data( 'tab-id', id );
			contentItem.data( 'tab-id', id );

			self._tabs.append( titleItem );
			self._content.append( contentItem );

			if( isCurrent ) {
				self._current( id );
			}

			return {
				id : id,
				title : titleItem,
				content : contentItem
			};

		},

		// remove tab by id
		_remove : function( id ) {

			var current, prevId,
				self = this,
				container = self._container;
			current = container.find( 'li[data-tab-id="'+id+'"]' );
			if( current.hasClass('current') ) {
				prevId = current.prev().data('tab-id');
				if( prevId ) {
					self._current( prevId );
				}
			}
			current.remove();
		},


	});

	return TabManager;

}