function(updateWidget, widgetType, state, mode){

		if (updateWidget.id === 'all') return; // global all widget 

		var init = false;

		if(!state) {

			state = 'Normal';

			init = true;

		}

		if(!this._widgets){

			return null;

		}

		if (!widgetType){

			widgetType = updateWidget.type;

		}

//		if (widgetType == 'davinci.ve.widget.HtmlWidget' || widgetType == 'davinci.ve.helpers.HtmlWidget') {

//			 widgetType = 'html.' + node.localName;

//		 }

		var p = widgetType.split('.');

		var w = p[0];

		var n = p[p.length-1];

		var query;

		var simulate;

		var widget = this._widgets[w][n];

		// some widgets do not start in a normal state. like TabContainer

		if (state === 'Normal' && init == true && mode === 'remove' && this._widgets[w][n].startState){

			state = this._widgets[w][n].startState;

		} 

		if (this._widgets[w][n].states[''+state]){

			var q = this._widgets[w][n].states[''+state].query;

			if (!q || q == '$auto'){

				q = this._createDefaultQuery(w+n, state);

				widget.states[''+state].query = q;

			}



			var s = this._widgets[w][n].states[''+state].simulate;

			if(!s){

				s = ' ';

				var selectors = this.getStyleSelectors(widgetType, state);

				var cssClass = '';

				for (var selector in selectors){

					cssClass  = selector.replace(/\./g,'');

					cssClass = cssClass.replace(this._theme.className,'');

					s = s + ' ' + cssClass;

				}

				if(state != 'Normal'){

						s = w + state + ' ' + s; // add the default state class

					}

			}

			if (state != 'Normal'){ // Normal is the base class do not remove it.

			    this._simulateState(q, s, mode, updateWidget);

			}

		}



		for(var sub in widget.subwidgets){

			var subwidget = widget.subwidgets[sub];

			// some widgets do not start in a normal state. like TabContainer

			if (state === 'Normal' && init == true && mode === 'remove' && subwidget.startState){

				state = subwidget.startState;

			} 

			if (subwidget.states[''+state]){ // only add if subwidget has this state

				var q = subwidget.states[''+state].query;

				var s = subwidget.states[''+state].simulate;

				if (!q || q == '$auto'){

					q = this._createDefaultQuery(w+sub, state);

					subwidget.states[''+state].query = q;

				}

				if(!s){

					var selectors = this.getStyleSelectors(widgetType, state, sub);

					var cssClass = '';

					s = ' ';

					for (var selector in selectors){

						cssClass  = selector.replace(/\./g,'');

						cssClass = cssClass.replace(this._theme.className,'');

						s = s + ' ' + cssClass;

					}

					if(state != 'Normal'){

							s = w + state + ' ' + s; // add the default state class

						}

				}

				if (state != 'Normal'){ // Normal is the base class do not remove it.

	                this._simulateState(q, s, mode, updateWidget);

	            }

				/*query = q; //push(q);

				simulate = s; //.push(s);

				var nodes = dojo.query(query,updateWidget.domNode);

				var n = nodes[0];

				if(!n){ // might already be at the top node.

					n = updateWidget.domNode;

				}

				if (state != 'Normal'){ // Normal is the base class do not remove it.

					if(mode == 'add'){

						dojo.addClass(n,simulate);

					} else { 

						dojo.removeClass(n,simulate);

					}

				}*/

				

			}

		}



		return;

	}