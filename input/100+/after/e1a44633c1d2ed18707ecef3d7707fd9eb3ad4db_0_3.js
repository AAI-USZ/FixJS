function(elements, place, options){
		//if (!MooRTE.btnVals.args) MooRTE.btnVals.combine(['args','shortcut','element','click','img','load','source','contains']);
		if (!place) place = MooRTE.activeBar.getFirst();
		else if (Type.isArray(place)){
			var relative = place[1]; 
			place = place[0];
		}
		if (!options) options = {};

		if (Type.isString(elements)){
			elements = elements.replace(/'([^']*)'|"([^"]*)"|([^{}:,\][\s]+)/gm, "'$1$2$3'");
			elements = elements.replace(/((?:[,[:]|^)\s*)('[^']+'\s*:\s*'[^']+'\s*(?=[\],}]))/gm, "$1{$2}");
			elements = elements.replace(/((?:[,[:]|^)\s*)('[^']+'\s*:\s*{[^{}]+})/gm, "$1{$2}");
			while (elements != (elements = elements.replace(/((?:[,[]|^)\s*)('[^']+'\s*:\s*\[(?:(?=([^\],\[]+))\3|\]}|[,[](?!\s*'[^']+'\s*:\s*\[([^\]]|\]})+\]))*\](?!}))/gm, "$1{$2}")));
			elements = JSON.decode('['+elements+']');
		}

		var els = []
		  , elsLoop = 0;
		do {
			if (els.length) elements = els, els = [];
			Array.from(elements).each(function(item){
				switch(typeOf(item)){
					case 'string': case 'element':
						els.push(item); break;
					case 'object':
						Object.each(item, function(val,key){
							els.push(Object.set(key,val))
						}); break;
					case 'array':
						item.each(function(val){els.push(val)});
						elsLoop = item.length;
				}
			});
		} while (elsLoop);
		
		var collection = []
		, bar = place.hasClass('MooRTE') ? place : place.getParent('.MooRTE');
		
		els.each(function(btn){
			if (Type.isObject(btn)){
				var btnVals = Object.values(btn)[0];
				btn = Object.keys(btn)[0];
			}
			// console.log('addElements called. elements:',elements,', btn is:',btn,', e is:',e,', func args are:',arguments);
		
			if (Type.isElement(btn))       var newEl = btn;
			else if(!MooRTE.Elements[btn]) var newEl = new Element(btn);
			else var loc = {before:'Previous', after:'Next', top:'First'}[relative] || 'Last'
				    , e = place['get' + loc]('.rte' + btn);
				 
			if (newEl) var e = newEl.inject(place, relative);
			else if (!e || !options.ifExists){
				var val = MooRTE.Elements[btn]
				  , textarea = (val.tag && val.tag.toLowerCase() == 'textarea')
				  , input = 'text,password,checkbox,file,radio'.contains(val.type)
				  , state = /bold|italic|underline|strikethrough|unlink|(sub|super)script|insert(un)?orderedlist|justify(left|full|right|center)/i.test(btn);

				var properties = Object.append(
					{ title: btn
						.replace(/([0-9]+|[A-Z][a-z]+|[A-Z]+(?=[A-Z][a-z]|[0-9])|^[a-z]+)/g, "$1 ")
						.trim().capitalize() + (val.key ? ' (Ctrl+'+ val.key.toUpperCase()+')' : '')
					, events:{}
					}, Object.clone(val));

				if (!val.tag || val.tag.test(/^a$/i)) properties.href = 'javascript:void(0)';
				if (Browser.ie || Browser.opera) unselectable = input || textarea ? 'off' : 'on';
				
				properties.events.mousedown = function(e){
					MooRTE.activeBar = bar;
					var source = bar.retrieve('source')
					  , fields = bar.retrieve('fields');
					
					// Workaround, see docs.
					var holder = MooRTE.Range.parent();
					if (Browser.webkit && holder.nodeType == 3) holder = holder.parentElement;
					
					if (!(fields.contains(MooRTE.activeField) && MooRTE.activeField.contains(holder)))
						(MooRTE.activeField = fields[0]).focus();

					if (e && e.stop) input || textarea ? e.stopPropagation() : e.stop();
					!(val.events||{}).click && !source && (!val.tag || val.tag == 'a')
						? MooRTE.Utilities.exec(val.args || btn)
						: MooRTE.Utilities.eventHandler(source || 'click', this, btn);
					}

				MooRTE.Reserved.each(function(bye){
					Type.isString(bye)
						? delete properties[bye]
						: Object.each(bye, function(del,where){
							if (properties[where]) delete properties[where][del]
							});
					});

				e = new Element((input && !val.tag ? 'input' : val.tag || 'a'), properties)
					.addClass('rte' + btn)
					.inject(place, relative);
			
				if (val.onUpdate || state)
					bar.retrieve('update', {'value':[], 'state':[], 'custom':[] })[ 
						/font(name|size)|(back|fore|hilite)color/i
							.test(btn) ? 'value' : (state ? 'state' : 'custom')
					].push([btn, e, val.onUpdate]);
				if (val.shortcut) bar.retrieve('shortcuts',{				//if (collection.getCoordinates().top < 0)toolbar.addClass('rteTopDown'); //untested!!
			}

			var sub = btnVals || val && val.contains;
			if (sub && !(options.ifExists == 'stop' && !val))
				MooRTE.Utilities.addElements(sub, e, options.inherit ? options : {});
			e.removeClass('rteHide');
			collection.push(e);

			if (!newEl) MooRTE.Utilities.eventHandler('load', e, btn);
		});
		
		return collection[1] ? collection : collection[0];	
	}
