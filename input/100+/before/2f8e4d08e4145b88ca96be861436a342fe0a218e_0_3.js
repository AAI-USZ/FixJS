f
	$.noty.defaultOptions.theme = 'noty_theme_twitter';



	slugify = function(s) {

		return s.trim().replace(/[^\w\s]/g,'').toLowerCase().replace(/\s/g,'-');

	};



	tryLoad = function(data,attr,obj,altname) {

		if(!data)

			return;



		if(attr instanceof Array)

		{

			if(!altname)

				altname=[];

			for(var i=0;i<attr.length;i++)

			{

				tryLoad(data,attr[i],obj,altname[i] || attr[i]);

			}

			return;

		}

		altname = altname || attr;



		if(attr in data)

			obj[altname](data[attr]);

		else if(attr.toLowerCase() in data)

			obj[altname](data[attr.toLowerCase()]);

	}



	Editor.contentObservable = function(val) {

		var obs = ko.observable(val);

        return ko.computed({

            read: obs,

            write: function(v) {

                obs(HTMLtoXML(v));

            }

        });

	};



	Editor.beforeRemove = function(elem) {

		if(elem.nodeType==elem.ELEMENT_NODE) {

			$(elem).slideUp(150,function(){$(this).remove()});

		}

		else {

			$(elem).remove();

		}

	};



	Editor.afterAdd = function(elem) {

		if(elem.nodeType==elem.ELEMENT_NODE) {

			$(elem).hide().slideDown(150);

		}

	}



	function indent(s,n)

	{

		//if n is not given, set n=1

		if(n===undefined)

			n=1;



		var lines = s.split('\n');

		for(var tabs='';tabs.length<n;tabs+='  '){}



		for(var i=0;i<lines.length;i++)

		{

			lines[i] = tabs+lines[i];

		}

		return lines.join('\n');

	}



	//represent a JSON-esque object in the Numbas .exam format

	prettyData = function(data){

		switch(typeof(data))

		{

		case 'number':

			return data+'';

		case 'string':

			//this tries to use as little extra syntax as possible. Quotes or triple-quotes are only used if necessary.

			if(data.contains('"') || data.contains("'"))

				return '"""'+data+'"""';

			if(data.search(/[:\n,\{\}\[\] ]/)>=0)

				return '"'+data+'"';

			else if(!data.trim())

				return '""';

			else

				return data;

		case 'boolean':

			return data ? 'true' : 'false';

		case 'object':

			if($.isArray(data))	//data is an array

			{

				if(!data.length)

					return '[]';	//empty array



				data = data.map(prettyData);	//pretty-print each of the elements



				//decide if the array can be rendered on a single line

				//if any element contains a linebreak, render array over several lines

				var multiline=false;

				for(var i=0;i<data.length;i++)

				{

					if(data[i].contains('\n'))

						multiline = true;

				}

				if(multiline)

				{

					data=data.map(function(s){return indent(s)});

					return '[\n'+data.join('\n')+'\n]';

				}

				else

				{

					return '[ '+data.join(', ')+' ]';

				}

			}

			else	//data is an object

			{

				if(!Object.keys(data).filter(function(x){return x}).length)

					return '{}';

				var o='{\n';

				for(var x in data)

				{

					if(x)

						o += indent(x+': '+prettyData(data[x]))+'\n';

				}

				o+='}';

				return o;

			}

		}

	};



	function cleanJME(val)

	{

		var dval = $.trim(val);

		var bits = Numbas.util.contentsplitbrackets(dval);

		dval='';

		for(var i=0;i<bits.length;i++)

		{

			switch(i % 2)

			{

			case 0:	//text

				dval += bits[i];

				break;

			case 1: //delimiter

				switch(bits[i])

				{

				case '$':

					if(i<bits.length-1)

					{

						dval += '$'+texMaths(bits[i+1])+'$';

						i+=2;

					}

					else

						dval += bits[i];

					break;

				case '\\[':

					if(i<bits.length-1)

					{

						dval += '\\['+texMaths(bits[i+1])+'\\]';

						i+=2;

					}

					else

						dval += bits[i];

					break;

				}

			}

		}

		return dval;

	}

	function texsplit(s)

	{

		var cmdre = /((?:.|\n)*?)\\((?:var)|(?:simplify))/m;

		var out = [];

		while( m = s.match(cmdre) )

		{

			out.push(m[1]);

			var cmd = m[2];

			out.push(cmd);



			var i = m[0].length;



			var args = '';

			var argbrackets = false;

			if( s.charAt(i) == '[' )

			{

				argbrackets = true;

				var si = i+1;

				while(i<s.length && s.charAt(i)!=']')

					i++;

				if(i==s.length)

				{

					out = out.slice(0,-2);

					out.push(s);

					return out;

				}

				else

				{

					args = s.slice(si,i);

					i++;

				}

			}

			if(!argbrackets)

				args='all';

			out.push(args);



			if(s.charAt(i)!='{')

			{

				out = out.slice(0,-3);

				out.push(s);

				return out;

			}



			var brackets=1;

			var si = i+1;

			while(i<s.length-1 && brackets>0)

			{

				i++;

				if(s.charAt(i)=='{')

					brackets++;

				else if(s.charAt(i)=='}')

					brackets--;

			}

			if(i == s.length-1 && brackets>0)

			{

				out = out.slice(0,-3);

				out.push(s);

				return out;

			}



			var expr = s.slice(si,i);

			s = s.slice(i+1);

			out.push(expr);

		}

		out.push(s);

		return out;

	}

	function texMaths(s) {

		var scope = new Numbas.jme.Scope(Numbas.jme.builtinScope,{rulesets: Numbas.jme.display.simplificationRules});

		var bits = texsplit(s);

		var out = '';

		for(var i=0;i<bits.length-3;i+=4)

		{

			out+=bits[i];

			var cmd = bits[i+1],

				args = bits[i+2],

				expr = bits[i+3];

			try{

				var sbits = Numbas.util.splitbrackets(expr,'{','}');

				var expr = '';

				for(var j=0;j<sbits.length;j+=1)

				{

					expr += j%2 ? 'subvar('+sbits[j]+',"gray")' : sbits[j]; //subvar here instead of \\color because we're still in JME

				}

				expr = Numbas.jme.display.exprToLaTeX(expr,[],scope);

			} catch(e) {

				expr = '\\color{red}{\\textrm{'+e.message+'}}';

			}



			switch(cmd)

			{

			case 'var':	//substitute a variable

				out += ' \\color{olive}{'+expr+'}';

				break;

			case 'simplify': //a JME expression to be simplified

				out += ' \\color{blue}{'+expr+'}';

				break;

			}

		}

		return out+bits[bits.length-1];

	};





	ko.bindingHandlers.writemaths = {

		init: function(element,valueAccessor) {

            valueAccessor = valueAccessor();

			var value = ko.utils.unwrapObservable(valueAccessor) || '';



            function onkeyup(e,tinymce) {

                switch(e.type) {

				case 'keyup':

				case 'paste':

					valueAccessor(tinymce.getContent());

					break;

				}

            }



			var toggle = $('<button class="wmToggle on">Toggle rich text editor</button>');

			$(element).append(toggle);

			toggle.click(function() {

				var ed = $(this).siblings('textarea').tinymce();

				if(ed.isHidden())

					ed.show()

				else

					ed.hide();

				$(this).toggleClass('on',!ed.isHidden());

			});



            var t = $('<textarea style="width:100%"/>');

            $(element)

                .addClass('writemathsContainer')

                .append(t)

            ;



            $(t)

                .tinymce({

                    theme:'numbas',

                    handle_event_callback: onkeyup,

					init_instance_callback: function() { 

						$(element).writemaths({cleanMaths: cleanJME, iFrame: true}); 

					},

                    theme_advanced_resizing: true,

                    theme_advanced_resizing_max_width: '750'

                })

                .html(value)

            ;

            

		},

		update: function(element, valueAccessor) {

			if(!($(element).find('iframe').length))

				return;

            if (!$(element).find('iframe').contents().find('body').is(':focus')) {              

                var value = ko.utils.unwrapObservable(valueAccessor()) || '';

                $(element).children('textarea').html(value);

            }		

		}

	};



	$.fn.unselectable = function() {

		$(this).on('mousedown',function(e){ e.preventDefault(); });

	};



	ko.bindingHandlers.folder = {

		init: function(element,valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

			var value = ko.utils.unwrapObservable(valueAccessor());



			var options = {

				label: '',

				show: false

			}

			if(typeof value == 'string')

				options.label = value;

			else

				options = $.extend(options,value);



			ko.applyBindingsToDescendants(bindingContext, element);



			var root = $(element);



			root.addClass('fold');

			var header = $('<div class="folder-header"/>');

			var content = $('<div class="folder"/>');

			root.toggleClass('folded',!options.show);

			root.contents().appendTo(content);

			root.append(header,content);



			header.on('click',function() {

				$(this).siblings('.folder').toggle(150,function() {

					$(this).parent().toggleClass('folded');

				});

			});



			return {controlsDescendantBindings: true};

		},

		update: function(element,valueAccessor) {

			var value = ko.utils.unwrapObservable(valueAccessor());



			var options = {

				label: '',

				show: false

			}

			if(typeof value == 'string')

				options.label = value;

			else

				options = $.extend(options,value);



			$(element)

				.children('.folder-header').html(options.label);



		}

	};



	ko.bindingHandlers.cleanJME = {

		update: function(element,valueAccessor) {

			var value = ko.utils.unwrapObservable(valueAccessor()) || '';

			value = cleanJME(value);

			$(element).html(value).mathjax();

		}

	}

	

	ko.bindingHandlers.foldlist = {

		init: function(element,valueAccessor,allBindingsAccessor,viewModel)

		{

			var value = valueAccessor(), allBindings = allBindingsAccessor();

			var show = allBindings.show;



			element=$(element);

			var b = $('<button class="delete" data-bind="click:remove"></button>');

			b.click(function(){viewModel.remove()});

			element.prepend(b);

		}

	};



	ko.bindingHandlers.fadeVisible = {

		init: function (element, valueAccessor) {

			// Initially set the element to be instantly visible/hidden depending on the value

			var value = valueAccessor();

			$(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable

		},

		update: function (element, valueAccessor) {

			// Whenever the value subsequently changes, slowly fade the element in or out

			var value = valueAccessor();

			ko.utils.unwrapObservable(value) ? $(element).slideDown(150) : $(element).slideUp(150);

		}

	};



	ko.bindingHandlers.listbox = {

		init: function(element,valueAccessor) {

			var value = valueAccessor();

			$(element).addClass('listbox');



			var i = $('<input/>');

			i.keydown(function(e){

				switch(e.which)

				{

				case 13:

				case 188:

					var val = $(this).val().slice(0,this.selectionStart);

					if(val.length)

						value.push(val);

					e.preventDefault();

					e.stopPropagation();

					$(this).val($(this).val().slice(val.length));

					break;

				case 8:

					if(this.selectionStart==0 && this.selectionEnd==0)

					{

						var oval = $(this).val();

						var val = (value.pop() || '');

						$(this).val(val+oval);

						this.setSelectionRange(val.length,val.length);

						e.preventDefault();

						e.stopPropagation();

					}

					break;

				}

			});

			i.blur(function(e){

				var val = $(this).val();

				if(val.length)

					value.push(val);

				$(this).val('');

			});

			$(element).append('<ul/>');

			$(element).append(i);

			function selectItem() {

				var n = $(this).index();

				i.val(value()[n]).focus();

				value.splice(n,1);

			};



			$(element).on('click',function() {

				i.focus();

			});





			$(element).delegate('li',{

				click: selectItem,

				keypress: function(e) {

					if($(this).is(':focus') && e.which==32)

					{

						selectItem.call(this);

						e.preventDefault();

						e.stopPropagation();

					}

				}

			});

		},

		update: function(element,valueAccessor) {

			var value = ko.utils.unwrapObservable(valueAccessor());

			$(element).find('ul li').remove();

			for(var i=0;i<value.length;i++)

			{

				$(element).find('ul').append($('<li tabindex="0"/>').html(value[i]));

			}

		}

	}



	ko.bindingHandlers.dragOut = {

		init: function(element, valueAccessor) {

			var obj = {

				data: null,

				sortable: ''

			};

			obj = $.extend(obj,valueAccessor());

			$(element)

				.draggable({

					handle: '.handle',

					revert: true, 

					revertDuration: 100,

					helper: 'clone',

					connectToSortable: obj.sortable

				})

			;

		}

	};



	ko.bindingHandlers.mathjax = {

		update: function(element) {

			$(element).mathjax();

		}

	};



});
