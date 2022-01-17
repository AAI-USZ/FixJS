function(){
			if(this.widgetsInTemplate){
				// Before copying over content, instantiate widgets in template
				var node = this.domNode;

				var cw = (this._startupWidgets = parser.parse(node, {
					noStart: !this._earlyTemplatedStartup,
					template: true,
					inherited: {dir: this.dir, lang: this.lang, textDir: this.textDir},
					propsThis: this,	// so data-dojo-props of widgets in the template can reference "this" to refer to me
					scope: "dojo"	// even in multi-version mode templates use dojoType/data-dojo-type
				}));

				// _WidgetBase::destroy() will destroy any supporting widgets under this.domNode.
				// If we wanted to, we could call this.own() on anything in this._startupWidgets that was moved outside
				// of this.domNode (like Dialog, which is moved to <body>).

				this._attachTemplateNodes(cw, function(n,p){
					return n[p];
				});
			}
		}