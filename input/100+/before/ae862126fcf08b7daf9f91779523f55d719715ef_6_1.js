function () {
	function _onChangeData(wgt, inf, selbk) {
		inf.start = zk(wgt.getInputNode()).getSelectionRange()[0];
		if (selbk) inf.bySelectBack =  true;
		return inf;
	}
	function _startOnChanging(wgt) {
		_stopOnChanging(wgt);
		wgt._tidChg = setTimeout(
			wgt.proxy(_onChanging), zul.inp.InputWidget.onChangingDelay);
	}
	function _stopOnChanging(wgt, onBlur) {
		if (wgt._tidChg) {
			clearTimeout(wgt._tidChg);
			wgt._tidChg = null;
		}
		if (onBlur) {
			if ((zul.inp.InputWidget.onChangingForced && 
					wgt.isListen("onChanging")) || wgt._instant)
				_onChanging.call(wgt, -1); //force
			_clearOnChanging(wgt);
		}
	}
	function _clearOnChanging(wgt) {
		wgt._lastChg = wgt.valueEnter_ = wgt.valueSel_ = null;
	}
	function _onChanging(timeout) {
		//Note: "this" is available here
		var inp = this.getInputNode(),
			val = this.valueEnter_ || inp.value;
		if (this._lastChg != val) {
			this._lastChg = val;
			var valsel = this.valueSel_;
			this.valueSel_ = null;
			if (this.isListen("onChanging"))
				this.fire('onChanging', _onChangeData(this, {value: val}, valsel == val), //pass inp.value directly
					{ignorable:1, rtags: {onChanging: 1}}, timeout||5);
			if (this._instant)
				this.updateChange_();
		}
	}

	var _keyIgnorable = zk.ie ? function () {return true;}:
		zk.opera ? function (code) {
			return code == 32 || code > 46; //DEL
		}: function (code) {
			return code >= 32;
		},

		_fixInput = zk.ie ? function (wgt) { //ZK-426
			setTimeout(function () { //we have to delay since zk.currentFocus might not be ready
				if (wgt == zk.currentFocus)
					zjq.fixInput(wgt.getInputNode());
			}, 0);
		}: zk.$void;

/** @class zul.inp.RoundUtl
 * The RoundUtl used to adjust the display of the rounded input.
 * @since 5.0.7
 */
zul.inp.RoundUtl = {
	/** Synchronizes the input element's width of this component
	*/
	syncWidth: function (wgt, rightElem) {
		var node = wgt.$n();
		if (!zk(node).isRealVisible() || (!wgt._inplace && !node.style.width))
			return;

		var inp = wgt.getInputNode();
		
		if (!node.style.width && wgt._inplace && 
			(wgt._buttonVisible == undefined
				|| wgt._buttonVisible)) {
			node.style.width = jq.px0(this.getOuterWidth(wgt, true));
		}
		
		if (zk.ie6_ && node.style.width)
			inp.style.width = '0px';
	
		var width = this.getOuterWidth(wgt, wgt.inRoundedMold()),
			// ignore left border, as it is countered by margin-left
			rightElemWidth = rightElem ? rightElem.offsetWidth - 
					zk(rightElem).sumStyles('l', jq.borders) : 0, 
			rev = zk(inp).revisedWidth(width - rightElemWidth);
		inp.style.width = jq.px0(rev);
	},
	getOuterWidth: function(wgt, rmInplace) {
		var node = wgt.$n(),
			$n = jq(node),
			$inp = jq(wgt.getInputNode()),
			inc = wgt.getInplaceCSS(),
			shallClean = !node.style.width && wgt._inplace;
		
		if (rmInplace && shallClean) {
    		$n.removeClass(inc);
    		$inp.removeClass(inc);
		}
		var	width = zk(node).revisedWidth(
				node[zk.opera ? 'clientWidth': 'offsetWidth']) 
				+ (zk.opera ? zk(node).borderWidth(): 0);
		if (rmInplace && shallClean) {
    		$n.addClass(inc);
    		$inp.addClass(inc);
		}
		return width;
	}
	
};
var InputWidget =
/**
 * A skeletal implementation for a input widget.
 *
 * <p>The delay to send the onChanging event is controlled by
 * {@link #onChangingDelay}, which is default to 350.
 * To change it, you can specify the following in a ZUL file.
 * <pre><code>
&lt;?script content="zk.afterLoad('zul.inp',function(){zul.inp.InputWidget.onChangingDelay=1000;})"?&gt;
</code></pre>
 */
zul.inp.InputWidget = zk.$extends(zul.Widget, {
	_maxlength: 0,
	_cols: 0,
	//_tabindex: 0,
	_type: 'text',
	$define: {
		/** Returns the name of this component.
		 * <p>Default: null.
		 * <p>Don't use this method if your application is purely based
		 * on ZK's event-driven model.
		 * <p>The name is used only to work with "legacy" Web application that
		 * handles user's request by servlets.
		 * It works only with HTTP/HTML-based browsers. It doesn't work
		 * with other kind of clients.
		 * @return String
		 */
		/** Sets the name of this component.
		 * <p>Don't use this method if your application is purely based
		 * on ZK's event-driven model.
		 * <p>The name is used only to work with "legacy" Web application that
		 * handles user's request by servlets.
		 * It works only with HTTP/HTML-based browsers. It doesn't work
		 * with other kind of clients.
		 *
		 * @param String name the name of this component.
		 */
		name: function (name) {
			var inp = this.getInputNode();
			if (inp) //check if bind
				inp.name = name;
		},
		/** Returns whether it is disabled.
		 * <p>Default: false.
		 * @return boolean
		 */
		/** Sets whether it is disabled.
		 * @param boolean disabled
		 */
		disabled: function (disabled) {
			var inp = this.getInputNode();
			if (inp) { //check if bind
				inp.disabled = disabled;
				var zcls = this.getZclass(),
					fnm = disabled ? 'addClass': 'removeClass';
				jq(this.$n())[fnm](zcls + '-disd');
				jq(inp)[fnm](zcls + '-text-disd');
			}
		},
		/** Returns whether it is readonly.
		 * <p>Default: false.
		 * @return boolean
		 */
		/** Sets whether it is readonly.
		 * @param boolean readonly
		 */
		readonly: function (readonly) {
			var inp = this.getInputNode();
			if (inp) {
				_fixInput(this);

				var zcls = this.getZclass(),
					fnm = readonly ? 'addClass': 'removeClass';
				
				inp.readOnly = readonly;
				jq(this.$n())[fnm](zcls + '-real-readonly'); //Merge breeze
				jq(inp)[fnm](zcls + '-readonly');
				
				if (!this.inRoundedMold()) return;
				
				var btn = this.$n('btn');
				jq(btn)[fnm](zcls + '-btn-readonly');
				
				if (zk.ie6_) {
					jq(btn)[fnm](zcls + (this._buttonVisible ? '-btn-readonly':
													'-btn-right-edge-readonly'));
					jq(this.$n('right-edge'))[fnm](zcls + '-right-edge-readonly');
				}
			}
		},
		/** Returns the cols.
		 * <p>Default: 0 (non-positive means the same as browser's default).
		 * @return int
		 */
		/** Sets the cols.
		 * @param int cols
		 */
		cols: function (cols) {
			var inp = this.getInputNode();
			if (inp)
				if (this.isMultiline()) inp.cols = cols;
				else inp.size = cols;
		},
		/** Returns the maxlength.
		 * <p>Default: 0 (non-postive means unlimited).
		 * @return int
		 */
		/** Sets the maxlength.
		 * @param int maxlength
		 */
		maxlength: function (maxlength) {
			var inp = this.getInputNode();
			if (inp && !this.isMultiline())
				inp.maxLength = maxlength;
		},
		/** Returns the tab order of this component.
		 * <p>Default: 0 (means the same as browser's default).
		 * @return int
		 */
		/** Sets the tab order of this component.
		 * @param int tabindex
		 */
		tabindex: function (tabindex) {
			var inp = this.getInputNode();
			if (inp)
				inp.tabIndex = tabindex||'';
		},
		/** Returns whether enable the inplace-editing.
		 * <p>default: false.
		 * @return boolean
		 */
		/** Sets to enable the inplace-editing function that the look and feel is
		 * like a label.
		 * @param boolean inplace
		 */
		inplace: function (inplace) {
			this.rerender();
		},
		/** Returns whether to send onChange event as soon as user types in the 
		 * input.
		 * <p>Default: false.
		 * @return boolean
		 * @since 6.0.0
		 */
		/**
		 * Sets whether to send onChange event as soon as user types in the 
		 * input.
		 * @param boolean instant
		 * @since 6.0.0
		 */
		instant: null
	},
	/** Returns the CSS style of inplace if inplace is not null
	 * @return String
	 */
	getInplaceCSS: function () {
		return this._inplace ? this.getZclass() + '-inplace' : '';
	},
	/** Selects the whole text in this input.
	 * @param int start the starting index of the selection range
	 * @param int end the ending index of the selection range (excluding).
	 * 		In other words, the text between start and (end-1) is selected. 
	 */
	select: function (start, end) {
		zk(this.getInputNode()).setSelectionRange(start, end);
	},
	/** Returns the type.
	 * <p>Default: text.
	 * @return String
	 */
	getType: function () {
		return this._type;
	},
	/** Returns whether it is multiline.
	 * <p>Default: false.
	 * @return boolean
	 */
	isMultiline: function() {
		return false;
	},
	/**
	 * Returns whether is in rounded mold or not.
	 * @return boolean
	 */
	inRoundedMold: function(){
		return this._mold == "rounded";
	},

	/** Returns the text representing the value in the given format,
	 * or an empty etring if value is null
	 * @return String
	 * @since 5.0.5
	 */
	getText: function () {
		return this.coerceToString_(this.getValue());
	},
	/** Sets the text representing the value in the given format.
	 * @param String txt the text
	 * @since 5.0.5
	 */
	setText: function (txt) {
		this.setValue(this.coerceFromString_(txt));
	},

	/** Returns the value in the String format.
	 * @return String
	 */
	getValue: function () {
		return this._value;
	},
	/** Sets the value in the String format(assumes no locale issue).
	 * <p>Notice that the invocation of {@link #getValue} won't fire
	 * the onChange event. To fire it, you have to invoke {@link #fireOnChange}
	 * explicitly.
	 * @param Object value the value.
	 * @param boolean fromServer whether it is called from the server.
	 * The error message will be cleared if true
	 */
	setValue: function (value, fromServer) {
		var vi;
		if (fromServer)
			this.clearErrorMessage(this.cst != null);
		else {
 			vi = this._validate(value);
 			value = vi.value;
	 	}

		_clearOnChanging(this);

		//Note: for performance reason, we don't send value back if
		//the validation shall be done at server, i.e., if (vi.server)
		if ((!vi || !vi.error) && (fromServer || !this._equalValue(this._value, value))) {
			this._value = value;
			var inp = this.getInputNode();
			if (inp) //check if bind
				this._defRawVal = this._lastChg = inp.value = value = this.coerceToString_(value);
		}
	},
	//value object set from server(smartUpdate, renderProperites)
	set_value: function (value, fromServer) {
		this.setValue(this.unmarshall_(value), fromServer);
	},
	/** Returns the input node of this widget
	 * @return DOMElement
	 */
	getInputNode: _zkf = function () {
		return this.$n('real') || this.$n();
	},
	getTextNode: _zkf,
	domAttrs_: function (no) {
		var attr = this.$supers('domAttrs_', arguments);
		if (!no || !no.text)
			attr += this.textAttrs_();
		return attr;
	},
	/** Attributes for the text control.
	 * Called automatically by [[#domAttrs_]] unless {text:true}
	 * is specified
	 * @return String
	 */
	textAttrs_: function () {
		var html = '', v;
		if (this.isMultiline()) {
			v = this._cols;
			if (v > 0) html += ' cols="' + v + '"';
		} else {
			html += ' value="' + this._areaText() + '"';
			html += ' type="' + this._type + '"';
			v = this._cols;
			if (v > 0) html += ' size="' + v + '"';
			v = this._maxlength;
			if (v > 0) html += ' maxlength="' + v + '"';
		}
		v = this._tabindex;
		if (v) html += ' tabindex="' + v +'"';
		v = this._name;
		if (v) html += ' name="' + v + '"';
		if (this._disabled) html += ' disabled="disabled"';
		if (this._readonly) html += ' readonly="readonly"';
		
		var s = jq.filterTextStyle(this.domStyle_({width: true, height: true, top: true, left: true}));
		if (s) html += ' style="' + s + '"';
		
		return html;
	},
	_onChanging: _onChanging,
	_areaText: function () {
		return zUtl.encodeXML(this.coerceToString_(this._value));
	},
	/** Sets the constraint.
	 * <p>Default: null (means no constraint all all).
	 * @param String cst
	 */
	setConstraint: function (cst) {
		if (typeof cst == 'string' && cst.charAt(0) != '['/*by server*/)
			this._cst = new zul.inp.SimpleConstraint(cst);
		else
			this._cst = cst;
		if (this._cst)
			this._reVald = true; //revalidate required
	},
	/** Returns the constraint, or null if no constraint at all.
	 * @return zul.inp.SimpleConstraint
	 */
	getConstraint: function () {
		return this._cst;
	},
	doMouseOut_: function () {
		this._inplaceout = true;
		this.$supers('doMouseOut_', arguments);
	},
	doMouseOver_: function () {
		this._inplaceout = false;
		this.$supers('doMouseOver_', arguments);
	},
	doFocus_: function (evt) {
		this.$supers('doFocus_', arguments);

		var inp = this.getInputNode();
		this._lastChg = inp.value;

		if (evt.domTarget.tagName) { //Bug 2111900
			jq(this.$n()).addClass(this.getZclass() + '-focus');
			if (this._inplace) {
				jq(inp).removeClass(this.getInplaceCSS());
				if (!this._inplaceout)
					this._inplaceout = true;
			}
			
			// Bug #2280308
			if (this._errbox) {
				var self = this, cstp = self._cst && self._cst._pos;
				setTimeout(function () {
					if (self._errbox)
						self._errbox.open(self, null, cstp || "end_before", 
								{dodgeRef: !cstp}); // Bug 3251564
				});
			}
		}
	},
	doBlur_: function (evt) {
		_stopOnChanging(this, true);
		
		jq(this.$n()).removeClass(this.getZclass() + '-focus');
		if (!zk.alerting && this.shallUpdate_(zk.currentFocus)) {
			this.updateChange_();
			this.$supers('doBlur_', arguments);
		}
		if (this._inplace && this._inplaceout)
			jq(this.getInputNode()).addClass(this.getInplaceCSS());
	},

	_doSelect: function (evt) { //domListen_
		if (this.isListen('onSelection')) {
			var inp = this.getInputNode(),
				sr = zk(inp).getSelectionRange(),
				b = sr[0], e = sr[1];
			this.fire('onSelection', {start: b, end: e,
				selected: inp.value.substring(b, e)});
		}
	},
	/** Returns shall be update or not
	 * @param zk.Widget focus
	 */
	shallUpdate_: function (focus) {
		return !focus || !zUtl.isAncestor(this, focus);
	},
	/** Returns the error message that is caused when user entered invalid value,
	 * or null if no error at all.
	 * 
	 * <p>
	 * The error message is set when user has entered a wrong value, or setValue
	 * is called with a wrong value. It is cleared once a correct value is
	 * assigned.
	 * 
	 * <p>
	 * If the error message is set, we say this input is in the error mode.
	 * @return String
	 */
	getErrorMesssage: function () {
		return this._errmsg;
	},
	/** Marks this widget's value is wrong and show the error message.
	 * <p>It is usually called by {@link zk.AuCmd0#wrongValue} (from the sever)
	 * @param String msg the error message
	 */
	setErrorMessage: function (msg) {
		this.clearErrorMessage(true, true);
		this._markError(msg, null, true);
	},
	/** Clears the error message and the error status.
	 * <p>It is also called by {@link zk.AuCmd0#clearWrongValue} (from the server).
	 * @param boolean revalidate whether to re-validate the value next time
	 * onblur occurs
	 * @param boolean remainError whether the input widget remains in the
	 * error status, if any, after the invocation.
	 */
	clearErrorMessage: function (revalidate, remainError) {
		var w = this._errbox;
		if (w) {
			this._errbox = null;
			w.destroy();
		}
		if (!remainError) {			
			var zcls = this.getZclass();
			this._errmsg = null;
			jq(this.getInputNode()).removeClass(zcls + "-text-invalid");
			if(zk.ie6_ && this.inRoundedMold()) {
				jq(this.$n('btn')).removeClass(zcls + "-btn-right-edge-invalid");
				jq(this.$n('right-edge')).removeClass(zcls + "-right-edge-invalid");
			}
			
		}
		if (revalidate)
			this._reVald = true; //revalidate required
	},
	/** Coerces the value passed to {@link #setValue}.
	 *
	 * <p>Deriving note:<br>
	 * If you want to store the value in other type, say BigDecimal,
	 * you have to override {@link #coerceToString_} and {@link #coerceFromString_}
	 * to convert between a string and your targeting type.
	 *
	 * <p>Moreover, when {@link zul.inp.Textbox} is called, it calls this method
	 * with value = null. Derives shall handle this case properly.
	 *
	 * @param String value the string to coerce from
	 * @return String
	 */
	coerceFromString_: function (value) {
		return value;
	},
	/** Coerces the value passed to {@link #setValue}.
	 *
	 * <p>Default: convert null to an empty string.
	 *
	 * <p>Deriving note:<br>
	 * If you want to store the value in other type, say BigDecimal,
	 * you have to override {@link #coerceToString_} and {@link #coerceFromString_}
	 * to convert between a string and your targeting type.
	 * @param Object value the value that will be coerced to a string
	 * @return String
	 */
	coerceToString_: function (value) {
		return value || '';
	},
	_markError: function (msg, val, noOnError) {
		this._errmsg = msg;
		
		var zcls = this.getZclass();
		if (this.desktop) { //err not visible if not attached
			jq(this.getInputNode()).addClass(zcls + "-text-invalid");
			if(zk.ie6_ && this.inRoundedMold()) {
				if(!this._buttonVisible)
					jq(this.$n('btn')).addClass(zcls + "-btn-right-edge-invalid");
				jq(this.$n('right-edge')).addClass(zcls + "-right-edge-invalid");
			}

			var cst = this._cst, errbox;
			if (cst != "[c") {
				if (cst && (errbox = cst.showCustomError))
					errbox = errbox.call(cst, this, msg);

				if (!errbox) this._errbox = this.showError_(msg);
			}

			if (!noOnError)
				this.fire('onError', {value: val, message: msg});
		}
	},
	/** Make the {@link zul.inp.SimpleConstraint} calls the validate for val,
	 * if {@link zul.inp.SimpleConstraint} is exist
	 * @param Object val a String, a number, or a date,the number or name of flag, 
	 * such as "no positive", 0x0001.
	 */
	validate_: function (val) {
		var cst;
		if (cst = this._cst) {
			if (typeof cst == "string") return false; //by server
			var msg = cst.validate(this, val);
			if (!msg && cst.serverValidate) return false; //client + server
			return msg;
		}
	},
	_validate: function (value) {
		zul.inp.validating = true;
		try {
			var val = value, msg;
			if (typeof val == 'string' || val == null) {
				val = this.coerceFromString_(val);
				if (val && ((msg = val.error) || val.server)) {
					this.clearErrorMessage(true);
					if (val.server || this._cst == "[c") { //CustomConstraint
						this._reVald = false;
						return {rawValue: value||'', server: true}; //let server to validate it
					}
					this._markError(msg, val);
					return val;
				}
			}

			//unlike server, validation occurs only if attached
			if (!this.desktop) this._errmsg = null;
			else {
				var em = this._errmsg;
				this.clearErrorMessage(true);
				msg = this.validate_(val);
				if (msg === false) {
					this._reVald = false;
					return {value: val, server: true}; //let server to validate it
				}
				if (msg) {
					this._markError(msg, val);
					return {error: msg};
				}
				this._reVald = false;
				if (em)
					this.fire('onError', {value: val});
			}
			return {value: val};
		} finally {
			zul.inp.validating = false;
		}
	},
	_shallIgnore: function (evt, keys) {
		var code = (zk.ie||zk.opera) ? evt.keyCode : evt.charCode;
		if (!evt.altKey && !evt.ctrlKey && _keyIgnorable(code)
		&& keys.indexOf(String.fromCharCode(code)) < 0) {
			evt.stop();
			return true;
		}
	},
	/** Create a {@link zul.inp.Errorbox} widget, and show the error message
	 * @param String msg the error message
	 * @see zul.inp.Errorbox#show
	 */
	showError_: function (msg) {
		var eb = new zul.inp.Errorbox();
		eb.show(this, msg);
		return eb;
	},
	_equalValue: function(a, b) {
		return a == b || this.marshall_(a) == this.marshall_(b);
	},
	marshall_: function(val) {
		return val;
	},
	unmarshall_: function(val) {
		return val;
	},
	/** Updates the change to server by firing onChange if necessary. 
	 * @return boolean
	 */
	updateChange_: function () {
		if (zul.inp.validating) return false; //avoid deadloop (when both focus and blur fields invalid)

		var inp = this.getInputNode(),
			value = inp.value;
		if (!this._reVald && value == this._defRawVal /* ZK-658 */)
			return false; //not changed

		var wasErr = this._errmsg,
			vi = this._validate(value);
		if (!vi.error || vi.server) {
			var upd, data;
			if (vi.rawValue != null) { //coerce failed
				data = {rawValue: vi.rawValue};
			} else if (!vi.error) {
				inp.value = value = this.coerceToString_(vi.value);
				this._reVald = false;

				//reason to use this._defRawVal rather than this._value is
				//to save the trouble of coerceToString issue
				upd = wasErr || !this._equalValue(vi.value, this._value);
				if (upd) {
					this._value = vi.value; //vi - not coerced
					this._defRawVal = value;
				}
			}
			if (upd || vi.server)
				this.fire('onChange',
					_onChangeData(this,
						data != null ? data: {value: this.marshall_(vi.value)}),
					vi.server ? {toServer:true}: null, 90);
		}
		return true;
	},
	/** Fires the onChange event.
	 * If the widget is created at the server, the event will be sent
	 * to the server too.
	 * @param Map opts [optional] the options. Refer to {@link zk.Event#opts}
	 * @since 5.0.5
	 */
	fireOnChange: function (opts) {
		this.fire('onChange',
			_onChangeData(this, {value: this.marshall_(this.getValue())}), opts);
	},

	_resetForm: function () {
		var inp = this.getInputNode();
		if (inp.value != inp.defaultValue) { //test if it will be reset
			var wgt = this;
			setTimeout(function () {wgt.updateChange_();}, 0);
				//value not reset yet so wait a moment
		}
	},

	//super//
	focus_: function (timeout) {
		zk(this.getInputNode()).focus(timeout);
		return true;
	},
	domClass_: function (no) {
		var sc = this.$supers('domClass_', arguments),
			zcls = this.getZclass();
		if ((!no || !no.zclass) && this._disabled)
			sc += ' ' + zcls + '-disd';
		
		if ((!no || !no.input) && this._inplace)
			sc += ' ' + this.getInplaceCSS();
			
		// Merge breeze
		if ((!no || !no.zclass) && this._readonly)
			sc += ' ' + zcls + '-real-readonly';
			
		return sc;
	},
	bind_: function () {
		this.$supers(InputWidget, 'bind_', arguments);
		var n = this.getInputNode(),
			zcls = this.getZclass();

		this._defRawVal = n.value;

		if (this._readonly)
			jq(n).addClass(zcls + '-readonly');
		
		if (this._disabled)
			jq(n).addClass(zcls + '-text-disd');
			
		this.domListen_(n, "onFocus", "doFocus_")
			.domListen_(n, "onBlur", "doBlur_")
			.domListen_(n, "onSelect");

		if (n = n.form)
			jq(n).bind("reset", this.proxy(this._resetForm));
	},
	unbind_: function () {
		this.clearErrorMessage(true);

		var n = this.getInputNode();
		this.domUnlisten_(n, "onFocus", "doFocus_")
			.domUnlisten_(n, "onBlur", "doBlur_")
			.domUnlisten_(n, "onSelect");

		if (n = n.form)
			jq(n).unbind("reset", this.proxy(this._resetForm));

		this.$supers(InputWidget, 'unbind_', arguments);
	},
	resetSize_: function(orient) {
		var n;
		if (this.$n() != (n = this.getInputNode()))
			n.style[orient == 'w' ? 'width': 'height'] = '';
		this.$supers('resetSize_', arguments);
	},
	doKeyDown_: function (evt) {
		var keyCode = evt.keyCode;
		if (this._readonly && keyCode == 8 && evt.target == this) {
			evt.stop(); // Bug #2916146
			return;
		}
			
		if (!this._inplaceout)
			this._inplaceout = keyCode == 9;
		if (keyCode == 9 && !evt.altKey && !evt.ctrlKey && !evt.shiftKey
		&& this._tabbable) {
			var inp = this.getInputNode(),
				$inp = zk(inp),
				sr = $inp.getSelectionRange(),
				val = inp.value;
			val = val.substring(0, sr[0]) + '\t' + val.substring(sr[1]);
			inp.value = val;

			val = sr[0] + 1;
			$inp.setSelectionRange(val, val);

			evt.stop();
			return;
		}

		_stopOnChanging(this); //wait for key up

		this.$supers('doKeyDown_', arguments);
	},
	doKeyUp_: function () {
		//Support maxlength for Textarea
		if (this.isMultiline()) {
			var maxlen = this._maxlength;
			if (maxlen > 0) {
				var inp = this.getInputNode(), val = inp.value;
				if (val != this._defRawVal && val.length > maxlen)
					inp.value = val.substring(0, maxlen);
			}
		}

		if (this.isListen("onChanging") || this._instant)
			_startOnChanging(this);

		this.$supers('doKeyUp_', arguments);
	},
	afterKeyDown_: function (evt,simulated) {
		if (!simulated && this._inplace) {
			if (!this._multiline && evt.keyCode == 13) {
				var $inp = jq(this.getInputNode()), inc = this.getInplaceCSS();
				if ($inp.toggleClass(inc).hasClass(inc)) 
					$inp.zk.setSelectionRange(0, $inp[0].value.length);
			} else
				jq(this.getInputNode()).removeClass(this.getInplaceCSS());
		}
		if (evt.keyCode != 13 || !this.isMultiline())
			return this.$supers('afterKeyDown_', arguments);
	},
	beforeCtrlKeys_: function (evt) {
		this.updateChange_();
	}
},{
	/** The delay for sending the onChanging event (unit: milliseconds).
	 * The onChanging event will be sent after the specified delay once
	 * the user pressed a keystroke (and changed the value).
	 * <p>Default: 350
	 * @type int
	 * @since 5.0.1
	 */
	onChangingDelay: 350,
	/** Whether to send at least one the onChanging event if it is listened
	 * and the content is ever changed.
	 * <p>Default: true
	 * @type boolean
	 * @since 5.0.1
	 */
	onChangingForced: true
});
}