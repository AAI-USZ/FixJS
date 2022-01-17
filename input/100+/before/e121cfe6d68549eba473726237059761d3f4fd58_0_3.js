function($) {



	$.widget("ui.zybcombobox", {

		_create : function() {

			if (!this.element.hasClass("zyb-combo")) {

				this.element.addClass("zyb-combo");

			}



			var html = "<input class='cb-autocomplete "

					+ (this.element.data("combosize") ? this.element

							.data("combosize") : "")

					+ "'/>"

					+ "<i class='zybcombo-queryall icon icon-chevron-down' ></i>"

					+ "<input class='cb-value' type='hidden' name='"

					+ (this.options.name || ZtUtils.id())

					+ "' error-placement='"

					+ (this.element.attr("error-placement") || "inline")

					+ "' all-true='true' />";

			$(this.element).html(html);



			$("i.zybcombo-queryall", this.element).on("click",

					$.proxy(this._onQueryAll, this));



			this.elAutoComplete = $(".cb-autocomplete", this.element);

			this.elHidden = $(".cb-value", this.element);

			this.selectedValue = 0;



			this.elAutoComplete[this.options.autocomplete]({

						search : $.proxy(this._onAutoCompleteSearch, this),

						select : $.proxy(this._onAutoCompleteSelect, this)

					}).on("blur", $.proxy(this._onAutoCompleteBlur, this));



			this.elAutoComplete.data(this.options.autocomplete)._renderItem = $

					.proxy(this._renderItem, this);



			this.getResponseFn = $.proxy(function() {

						return this.elAutoComplete

								.data(this.options.autocomplete)._response();

					}, this);

			this._initSource();



			if (this.options.value) {

				this.setValue(this.options.value);

			}

		},



		requestIndex : 0,



		_renderItem : function(ul, item) {

			return $("<li></li>").data("item.autocomplete", item)

					.append($("<a></a>").html(item.label)).appendTo(ul);

		},



		_initSource : function() {

			var self = this, array, url;

			if ($.isArray(this.options.source)) {

				array = [];



				$.each(this.options.source, function(i, v) {

							array.push(self._getRecord(v));

						});



				this.source = function(request, response) {

					if ($.isFunction(this.options.filter)) {

						var a = [];

						$.each(array, $.proxy(function(i, v) {

											if (this.options.filter(v.obj)) {

												a.push(v);

											}

										}, this));

						response($.ui.autocomplete.filter(a, request.term));

					} else {

						response($.ui.autocomplete.filter(array, request.term));

					}

				};

			} else if (typeof this.options.source === "string") {

				url = this.options.source;

				this.source = function(request, response) {

					if (self.xhr) {

						self.xhr.abort();

					}



					var data = {

						query : request.term

					};



					this._trigger("beforeremotequery", null, [{

										data : data

									}]);



					self.xhr = $.ajax({

								url : ZtUtils.getContextPath() + url,

								data : data

							});

					self.xhr.autocompleteRequest = ++self.requestIndex;

					self.xhr.done($.proxy(self._onRemoteSearchSuccess, self))

							.fail($.proxy(self._onRemoteSearchError, self));

				};

			} else {

				this.source = this.options.source;

			}

		},



		_getRecord : function(data) {

			var record;

			if (data) {

				var id = $.isFunction(this.options.valueField) ? this.options

						.valueField(data) : data[this.options.valueField];

				var value = $.isFunction(this.options.displayField)

						? this.options.displayField(data)

						: data[this.options.displayField];

				record = {

					id : id,

					label : value,

					value : value,

					obj : data

				};

			}

			return record;

		},



		_onAutoCompleteBlur : function() {

			if (this.elAutoComplete.val()) {

				this.elAutoComplete.val(this.selectedDescription);

			} else {

				this._setValue();

			}

		},



		_onAutoCompleteSearch : function() {

			this.source({

						term : this.elAutoComplete.val()

					}, this.getResponseFn());



			return false;

		},



		_onRemoteSearchSuccess : function(data, status, jqXHR) {

			if (jqXHR.autocompleteRequest === this.requestIndex) {

				var array = [];

				var self = this;

				$.each(data[this.options.root], function(i, v) {

							array.push(self._getRecord(v));

						});



				this.getResponseFn()(array);

			}

		},



		_onRemoteSearchError : function(jqXHR, textStatus, errorThrown) {

			if (jqXHR.autocompleteRequest === this.requestIndex) {

				this.getResponseFn()([]);

			}

		},



		_onAutoCompleteSelect : function(e, data) {

			this._setValue(data.item);

		},



		_fireSelectedEvent : function(data) {

			if (data) {

				this._trigger("select", 0, data.obj);

			} else {

				this._trigger("select");

			}

		},



		_onQueryAll : function() {

			if (this.elAutoComplete[this.options.autocomplete]("widget")

					.is(":visible")) {

				this.elAutoComplete[this.options.autocomplete]("close");

				return;

			}



			// To nullify the blur event's closing timout

			var closing = this.elAutoComplete.data(this.options.autocomplete).closing;

			if (closing) {

				clearTimeout(closing);

			}



			this.source({

						term : ""

					}, this.getResponseFn());

			this.elAutoComplete.focus();

		},



		_setValue : function(data, isSetValue) {

			if (data) {

				this.elHidden.val(data.id);

			} else {

				this.elHidden.val("");

			}



			this.selectedValue = data ? data.id : 0;

			this.selectedDescription = data ? data.value : "";



			if (!isSetValue

					|| (isSetValue && !this.options.ignoreSelectEventOnSetValue)) {

				this._fireSelectedEvent(data);

			}

		},



		getValue : function() {

			return this.selectedValue;

		},



		setValue : function(data) {

			if (data) {

				var record = this._getRecord(data);

				this._setValue(record, true);

				this.elAutoComplete.val(record.value);

			} else {

				this._setValue(false, true);

				this.elAutoComplete.val("");

			}

		},



		options : {

			autocomplete : "autocomplete",

			valueField : "id",

			displayField : "description",

			root : "data",

			ignoreSelectEventOnSetValue : false

		}

	});



}