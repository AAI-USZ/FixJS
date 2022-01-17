function($) {

	'use strict'
	var Search = function(element, options) {

		this.$element = $(element)
		this.options = $.extend({}, $.fn.search.defaults, options)
		this.$container = this.setup(element)
		this.matcher = this.options.matcher || this.matcher
		this.sorter = this.options.sorter || this.sorter
		this.highlighter = this.options.highlighter || this.highlighter
		this.updater = this.options.updater || this.updater
		this.$menu = $(this.options.menu).appendTo('body')
		this.$addOn = this.options.addOn
		this.targetForm = this.options.formId
		if (this.options.menuWidth) {
			this.$menu.css('width', this.options.menuWidth)
		}
		this.source = this.options.source
		console.log(24, this.source)
		this.loadSource(this.options.comboIds)
		this.shown = false
		this.listen()
	}

	/*
	 * NOTE: SearchBox EXTENDS BOOTSTRAP-TYPEAHEAD.js
	 * ==========================================
	 */

	Search.prototype = $.extend({}, $.fn.typeahead.Constructor.prototype, {

		constructor : Search,
		loadSource : function(comboIds) {
			var comboArr = comboIds.split(';')
			var me = this
			if (comboArr.length) {
				var url0 = $.jStore.getUrl($('#' + comboArr[0],
						$(this.targetForm)).attr('data-url'))
				$.getJSON(url0, function(data, x, y) {
					for ( var j = 0; j < data.length; j++) {
						data[j].target = comboArr[0]
						me.source.push(data[j])
					}
				})
				if (comboArr.length == 1)
					return

				var url1 = $.jStore.getUrl($('#' + comboArr[1],
						$(this.targetForm)).attr('data-url'))
				$.getJSON(url1, function(data, x, y) {
					for ( var j = 0; j < data.length; j++) {
						data[j].target = comboArr[1]
						me.source.push(data[j])
					}
				})
				if (comboArr.length == 2)
					return


				var url2 = $.jStore.getUrl($('#' + comboArr[2],
						$(this.targetForm)).attr('data-url'))
				$.getJSON(url2, function(data, x, y) {
					for ( var j = 0; j < data.length; j++) {
						data[j].target = comboArr[2]
						me.source.push(data[j])
					}
				})
			}

		},
		adjust : function() {
			var search = this.$container
			var offsetX = parseInt(search.find('.query-params').css('width'))

			search.find('.query-input').css({
				marginLeft : offsetX + 'px'
			})
			console.log(offsetX + 'px')

			var inputWidth = parseInt(search.css('width')) - offsetX - 30
					+ 'px'
			search.find('.query-input').css({
				width : inputWidth
			})
			this.$element.css({
				width : inputWidth
			})

			$('ul.search.dropdown-menu').css({
				width : inputWidth
			})
			console.log(97, $('ul.search.dropdown-menu').css('width'))
		},
		setup : function(element) {
			var input = $(element), search = $(this.options.template)
			input.before(search)

			input.css('width', parseInt(search.css('width')) - 30)
			search.find('.query-input').css('width',
					parseInt(search.css('width')) - 30).prepend(input)
			$('.query-clear .search-clear').click(function() {
				input.val('')
			})
			return search
		},
		select : function() {
			var me = this
			var activeLi = this.$menu.find('.active')
			var val = activeLi.attr('data-value')
			var dataId = activeLi.attr('data-id')
			var dataType = activeLi.attr('data-type')

			this.$element.val(this.updater(val)).change()

			var search = this.$container
			$('.search-clear', search).addClass('hidden')
			var similar = $('span[data-type=' + dataType + ']', search)
			if (similar.length) {
				similar.attr('data-value', val).attr('data-id', dataId).attr(
						'data-type', dataType)
				$('.jlabel-inner', similar).text(val)
			} else {
				var addOn = $.jString.format(this.$addOn, val, dataId,
						dataType, 'icon-user')
				search.find('.query-params').append(addOn)

				$('.query-item-clear', search).unbind('click').click(
						function() {
							$(this).parent().remove();
							me.adjust()
						})
			}
			this.adjust()
			this.$element.val('')// .change()

			// form record
			var record = {}
			$('.query-item-label', search).each(function() {
				var label = $(this)
				record[label.attr('data-type')] = label.attr('data-id')
			})
			$.jForm.loadRecord($(this.targetForm), record)

			console.log(record)
			return this.hide()
		}

		,
		updater : function(item) {
			return item
		}

		,
		show : function() {
			var pos = $.extend({}, this.$element.offset(), {
				height : this.$element[0].offsetHeight
			})

			this.$menu.css({
				top : pos.top + pos.height,
				left : pos.left
			})

			this.$menu.show()
			this.shown = true
			return this
		},
		listen : function() {
			var me = this, el = this.$element
			this.$element.on('blur', $.proxy(this.blur, this)).on('keypress',
					$.proxy(this.keypress, this)).on('keyup focus',
					$.proxy(this.keyup, this)).on('keyup blur', function() {
				if (el.val() == '' || el.val() == el.attr('placeholder')) {
					console.log(190, el.val())
					$('.search-clear', me.$container).addClass('hidden')

				} else {
					$('.search-clear', me.$container).removeClass('hidden')
				}
			})

			if ($.browser.webkit || $.browser.msie) {
				this.$element.on('keydown', $.proxy(this.keypress, this))
			}

			this.$menu.on('click', $.proxy(this.click, this)).on('mouseenter',
					'li', $.proxy(this.mouseenter, this))
		},
		lookup : function(event) {
			var that = this, items, q

			this.query = this.$element.val()

			if (!this.query) {
				return this.shown ? this.hide() : this
			}

			items = $.grep(this.source, function(item) {
				return that.matcher(item.name)
			})

			console.log(75, items)
			items = this.sorter(items)

			if (!items.length) {
				return this.shown ? this.hide() : this
			}

			console.log(81, items)
			return this.render(items.slice(0, this.options.items)).show()
		}

		,
		hide : function() {
			this.$menu.hide()
			this.shown = false
			return this
		},
		matcher : function(item) {
			return ~item.toLowerCase().indexOf(this.query.toLowerCase())
		}

		,
		sorter : function(items) {
			var beginswith = [], caseSensitive = [], caseInsensitive = [], item

			while (item = items.shift()) {
				if (!item.name.toLowerCase().indexOf(this.query.toLowerCase()))
					beginswith.push(item)
				else if (~item.name.indexOf(this.query))
					caseSensitive.push(item)
				else
					caseInsensitive.push(item)
			}

			return beginswith.concat(caseSensitive, caseInsensitive)
		}

		,
		highlighter : function(item) {
			var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,
					'\\$&')
			return item.replace(new RegExp('(' + query + ')', 'ig'), function(
					$1, match) {
				return '<strong>' + match + '</strong>'
			})
		},
		render : function(items) {
			var that = this
			// console.log(items)
			items = $(items).map(
					function(i, item) {
						i = $(that.options.item).attr('data-id', item.id).attr(
								'data-value', item.name).attr('data-type',
								item.target)
						i.find('a').html(that.highlighter(item.name))
						return i[0]
					})
			console.log(items)

			items.first().addClass('active')
			this.$menu.html(items)
			return this
		}
	})
	/*
	 * COMBOBOX PLUGIN DEFINITION ===========================
	 */

	$.fn.search = function() {
		this.each(function() {
			var $this = $(this), mySearch
			mySearch = new Search(this, {
				// source : $.parseJSON($this.attr('data-source')) || [],
				comboIds : $this.attr('combo-select'),
				formId : $this.attr('target-form'),
				/*
				 * source : [ { id : 1, name : "Alabama", target : 'userId' }, {
				 * id : 2, name : "Alaska", target : 'userId' }, { id : 3, name :
				 * "Arizona", target : 'userId' }, { id : 4, name : "Arkansas",
				 * target : 'userId' }, { id : 5, name : "Alabama", target :
				 * 'userId' }, { id : 7, name : "axxx", target : 'userName' }, {
				 * id : 8, name : "acds", target : 'userName' } ],
				 */
				menuWidth : $this.css('width')
			})
		})
	}

	$.fn.search.defaults = {
		source : [],
		items : 8,
		addOn : '<div class="query-item"><span data-id="{1}" data-type="{2}" data-value="{0}"  class="query-item-label"><i class="{3}"></i> <span class="jlabel-inner">{0}</span></span><span class="query-item-clear">×</span></div>',
		template : '<div class="query-container"><div class="query-params"></div><div class="query-input"><div class="query-clear"><div class="search-clear hidden show-hide-switch" show-hide="search-clear" >×</div></div><div class="query-trigger show-hide-switch" show-hide="query-detail"></div></div></div>',
		menu : '<ul class="search dropdown-menu"></ul>',
		item : '<li><a href="#"></a></li>'
	}

	$.fn.search.Constructor = Search

	// $(function() {
	$('.search').search()
	// })

}