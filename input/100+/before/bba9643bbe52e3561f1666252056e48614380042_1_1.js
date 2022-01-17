function(data){

		

		// Create phony Dialog and Tooltip widgets with the appearance (template) of the Dijit widgets, but without the behavior.

		//.We need to do this because the stock widgets don't appear when placed on the page without user interaction, and they have

		// side effects which would interfere with operation of the Theme Editor.



		// Hard-code widget replacements for styling.  Need to factor creation out somehow to be data-driven.

		var mixins = [this.getDijit()._WidgetBase, this.getDijit()._TemplatedMixin];

		this.getDojo().declare("dijit.davinci.themeEditor.Dialog", mixins, {

			buttonCancel: "cancel", //TODO: i18n

			onCancel: function(){},

			title: "title",

			templateString: dojo.cache("dijit", "templates/Dialog.html"),

			// Map widget attributes to DOMNode attributes.

			attributeMap: dojo.delegate(dijit._Widget.prototype.attributeMap, {

				title: [

					{ node: "titleNode", type: "innerHTML" },

					{ node: "titleBar", type: "attribute" }

				],

				"aria-describedby":""

			})

,			_setTitleAttr: [

				{ node: "titleNode", type: "innerHTML" },

				{ node: "titleBar", type: "attribute" }

			]

		});



		this.getDojo().declare("dijit.davinci.themeEditor.Tooltip", mixins, {

			templateString: dojo.cache("dijit", "templates/Tooltip.html")

		});

		dojo.connect(this.getGlobal(), 'onload', this, function() {

            this.onload();

        });

		this.setHeader({

			title: data.title,

			metas: data.metas,

			scripts: data.scripts,

			modules: data.modules,

			styleSheets: data.styleSheets,

			theme: data.theme,

			bodyClasses: data.bodyClasses,

			style: data.style

		});

		content = (data.content || "");

		this._themeName = data.theme; 

		var containerNode = this.getContainerNode();

		var active = this.isActive();

		if(active){

			this.select(null);

			dojo.forEach(this.getTopWidgets(), this.detach, this);

		}

		var escapees = [],

			scripts = {},

			dvAttributes = {},

			promise = new dojo.Deferred();

		dojo.forEach(this.getTopWidgets(), function(w){

			if(w.getContext()){

				w.destroyWidget();

			}

		});

		containerNode.innerHTML = content;

		dojo.forEach(dojo.query("*", containerNode), function(n){

			var type =  n.getAttribute("data-dojo-type") || n.getAttribute("dojoType") || /*n.getAttribute("oawidget") ||*/ n.getAttribute("dvwidget");

			this.loadRequires(type, false/*doUpdateModel*/, true/*doUpdateModelDojoRequires*/);

			//this.loadRequires(n.getAttribute("dojoType"));

		}, this);

		this.getGlobal()["require"]("dojo/ready")(function(){

			try {

				this.getGlobal()["require"]("dojo/parser").parse(containerNode);

				promise.callback();

			} catch(e) {

				// When loading large files on FF 3.6 if the editor is not the active editor (this can happen at start up

				// the dojo parser will throw an exception trying to compute style on hidden containers

				// so to fix this we catch the exception here and add a subscription to be notified when this editor is seleected by the user

				// then we will reprocess the content when we have focus -- wdr

				

				// remove all registered widgets, some may be partly constructed.

				var localDijit = this.getDijit();

				localDijit.registry.forEach(function(w){

					  w.destroy();

				});

				this._editorSelectConnection = dojo.subscribe("/davinci/ui/editorSelected",  dojo.hitch(this, this._editorSelectionChange));



				promise.errback();

				throw e;

			}

		}.bind(this));

		if(active){

			dojo.query("> *", this.rootNode).map(davinci.ve.widget.getWidget).forEach(this.attach, this);

		}

		// remove the styles from all widgets and subwidgets that supported the state

		dojo.query('.dvThemeWidget').forEach(this.theme.removeWidgetStyleValues);

			// set the style on all widgets and subwidgets that support the state

			//this._themeEditor._theme.setWidgetStyleValues(widgets[i],this._currentState);

		return promise;

	}