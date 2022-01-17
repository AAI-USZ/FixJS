function(node) {
	var ns = this.templateNamespace;
	if(this.options.minify !== true && node.line != null && (this.lastNode == null ||
		this.lastNode.type != "code" || this.lastNode.children.length == 0 ||
		node.type != "code") )
	{
		this._pushOff(ns + ".line=" + node.line + "," + ns + ".col=" + node.col + ";");
		this.lastNode = node;
	}
	if(this.prependNewline && node.type != "text" && node.type != "filtered_text")
		this.prependNewline = false;
	switch(node.type)
	{
		case 'tag':
			var attrs = node.attributes;
			//id attribute
			if(!attrs.id && node.id)
				attrs.id = {'escape': false, 'text': node.id};
			//class attribute
			if(node.classes.length > 0)
			{
				if(attrs['class'] == undefined)
					attrs['class'] = {'escape': false, 'text': node.classes.join(" ")};
				else if(attrs['class'].text)
					attrs['class'].text += (attrs['class'].text.length > 0 ? " " : "") +
						node.classes.join(" ");
				else
					attrs['class'].append = node.classes.join(" "); //append classes at runtime
			}
			//event handlers
			var numEventHandlers = 0,
				eventHandlerID;
			for(var i = 0; i < node.children.length; i++)
				if(node.children[i].type == "event_handler")
				{
					//This is the first event handler, so we have some setup work to do...
					if(numEventHandlers++ == 0)
					{
						//Add id attribute, if necessary
						if(!attrs.id)
						{
							eventHandlerID = "'blade_'+" + ns + ".r.ueid";
							attrs.id = {
								"escape": false,
								"code": eventHandlerID + "++"
							};
						}
						else
							eventHandlerID = attrs.id.text ? JSON.stringify(attrs.id.text) :
								attrs.id.code;
					}
					if(node.children[i].event_handler.length == 0) continue;
					//Setup the event handler
					this._pushOff(ns + ".r.bind(" + JSON.stringify(node.children[i].events) +
						"," + eventHandlerID + ",function(e){" +
						node.children[i].event_handler + "\n}," + ns + ");");
					//Add event attributes
					var events = node.children[i].events.split(" ");
					for(var j = 0; j < events.length; j++)
						attrs["on" + events[j].toLowerCase() ] = {
							"escape": false,
							"text": "return blade.runtime.trigger(this,arguments);"
						};
				}
			//start tag
			this._push("'<" + node.name + "'");
			//attributes
			var varAttrs = "";
			for(var i in attrs)
			{
				//take care of text attributes here
				if(attrs[i].text)
				{
					if(attrs[i].escape)
						this._push("' " + i + "=" + bladeutil.quote(
							JSON.stringify(runtime.escape(attrs[i].text)) ) + "'");
					else
						this._push("' " + i + "=" + bladeutil.quote(
							JSON.stringify(attrs[i].text) ) + "'");
				}
				else if(i == "class" && attrs[i].append)
					varAttrs += "," + i + ":{a:" + JSON.stringify(attrs[i].append) +
						",v:" + attrs[i].code + (attrs[i].escape ? ", e:1" : "") + "}";
				else
					varAttrs += "," + i + ":{v:" + attrs[i].code +
						(attrs[i].escape ? ", e:1" : "") + "}";
			}
			if(varAttrs.length > 0)
				this._pushOff(ns + ".r.attrs({" + varAttrs.substr(1) + "}, " + ns + ");");
			//child nodes and end tag
			if(selfClosingTags.indexOf(node.name) >= 0)
			{
				this._push("'/>'");
				if(node.children.length > numEventHandlers)
				{
					var e = new Error("Self-closing tag <" + node.name +
						"/> may not contain any children.");
					e.line = node.line, e.column = node.col;
					throw e;
				}
			}
			else
			{
				this._push("'>'");
				for(var i = 0; i < node.children.length; i++)
					if(node.children[i].type != "event_handler")
						this._compileNode(node.children[i]);
				this._push("'</" + node.name + ">'");
			}
			break;
		case 'event_handler':
			var e = new Error("Event handlers may only be defined for a tag.");
			e.line = node.line, e.column = node.col;
			throw e;
			break;
		case 'text':
			//Ensure we prepend a newline if the last node was a text node.
			if(this.prependNewline)
				node.text = "\n" + node.text;
			//Interpolate #{stuff}
			var interpolated = bladeutil.interpolate(JSON.stringify(node.text), ns);
			//Optionally escape the text
			if(node.escape)
			{
				//If no string interpolation was used in this node, we can just escape it now
				if(interpolated == JSON.stringify(node.text) )
					this._push(JSON.stringify(runtime.escape(node.text) ) );
				//Otherwise, we'll escape it at runtime
				else
					this._push(ns + ".r.escape(" + interpolated + ")");
			}
			else
				this._push(interpolated);
			this.prependNewline = true;
			break;
		case 'code_output':
			/* This is a text block that contains code, which should be outputed into
			the view.  If the code ends in a semicolon, we just remove it for
			convenience. The extra semicolon can break things. :) */
			if(node.code_output.charAt(node.code_output.length - 1) == ";")
				node.code_output = node.code_output.substr(0, node.code_output.length - 1);
			if(node.escape)
				this._push(ns + ".r.escape(" + node.code_output + ")");
			else
				this._push(node.code_output);
			break;
		case 'filtered_text':
			if(typeof this.filters[node.name] != "function")
			{
				var e = new Error("Invalid filter name: " + node.name);
				e.line = node.line, e.column = node.col;
				throw e;
			}
			var output = this.filters[node.name](node.filtered_text,
				{'minify': this.options.minify, 'compress': this.options.minify});
			//Ensure we prepend a newline if the last node was a text node.
			if(this.prependNewline)
				output = "\n" + output;
			if(this.filters[node.name].interpolate === false)
				this._push(JSON.stringify(output) );
			else
				this._push(bladeutil.interpolate(JSON.stringify(output), ns) );
			this.prependNewline = true;
			break;
		case 'comment':
			if(!node.hidden)
			{
				this._push("'<!--'");
				var start = this.buf.length; //Keep track of where the comment begins
				this._push(JSON.stringify(node.comment) );
				if(node.children) //unparsed comments do not have children attribute
					for(var i = 0; i < node.children.length; i++)
						this._compileNode(node.children[i]);
				//Escape all instances of "<!--" and "-->"
				var comment = this.buf.substr(start)
					.replace(/<!--/g, "<!-!-")
					.replace(/-->/g, "-!->");
				this.buf = this.buf.substr(0, start) + comment;
				//Now end the comment
				this._push("'-->'");
			}
			//if node.hidden, we ignore it entirely
			break;
		case 'conditional_comment':
			this._push("'<!--['");
			this._push(JSON.stringify(node.comment) );
			this._push("']>'");
			for(var i = 0; i < node.children.length; i++)
				this._compileNode(node.children[i]);
			this._push("'<![endif]-->'");
			break;
		case 'code':
			/* A line of code, which does not output into the view.
			If the node has children, we use the curly brace to enclose them;
			otherwise, we terminate the code with a semicolon */
			this._pushOff(node.code + //TODO: Get rid of "//" comments
				(node.children.length > 0 ? "{" : ";") );
			for(var i = 0; i < node.children.length; i++)
				this._compileNode(node.children[i]);
			if(node.children.length > 0)
				this._pushOff("}");
			break;
		case 'include':
			if(this.includes == -1)
			{
				var e = new Error("Includes will not work unless the `filename` property" +
					" is passed to the compiler.");
				e.line = node.line, e.column = node.col;
				throw e;
			}
			this.includes++;
			var exposedVarList = "";
			if(node.exposing)
				for(var i = 0; i < node.exposing.length; i++)
					exposedVarList += "," + JSON.stringify(node.exposing[i]) + "," + node.exposing[i];
			if(node.filename)
			{
				this._pushOff(ns + ".r.include(" + JSON.stringify(node.filename) + "," +
					ns + exposedVarList + ");");
				//Add to list of dependencies
				if(this.dependencies.indexOf(node.filename) < 0)
					this.dependencies.push(node.filename);
			}
			else
			{
				this._pushOff(ns + ".r.include(" + node.code + "," + ns + ");");
				this.unknownDependencies = true;
			}
			break;
		case 'block':
			var paramStr = node.parameters == null ? "" : "," + node.parameters.join(",");
			this._pushOff(ns + ".r.blockDef(" + JSON.stringify(node.name) + ", " + ns +
				", function(" + ns + paramStr + ") {");
			for(var i = 0; i < node.children.length; i++)
				this._compileNode(node.children[i]);
			this._pushOff("});");
			break;
		case 'render':
			this._pushOff(ns + ".r.blockRender('" + node.behavior.charAt(0) + "', " +
				JSON.stringify(node.name) + ", " + ns +
				(node.arguments.length > 0 ? ", " + node.arguments : "") + ");");
			break;
		case 'append':
		case 'prepend':
			if(node.parameters != null)
			{
				var e = new Error("Parameters are not permitted for `" +
					node.type + " block`.");
				e.line = node.line, e.column = node.col;
				throw e;
			}
		case 'replace':
			var paramStr = node.parameters == null ? "" : "," + node.parameters.join(",");
			this._pushOff(ns + ".r.blockMod('" + node.type.charAt(0) + "', " +
				JSON.stringify(node.name) + ", " + ns + ", " +
				"function(" + ns + paramStr + ") {");
			for(var i = 0; i < node.children.length; i++)
				this._compileNode(node.children[i]);
			this._pushOff("});");
			break;
		case 'function':
			var paramStr = node.parameters == null ? "" : "," + node.parameters.join(",");
			this._pushOff(ns + ".r.func(" + JSON.stringify(node.name) + ",function(" +
				ns + paramStr + ") {");
			/* If the first child node is a tag, ensure that its attributes are modified
				to allow a user to pass in an id or classes when the function is called */
			if(node.children.length > 0 && node.children[0].type == "tag")
			{
				var attrs = node.children[0].attributes;
				modifyAttribute('id', 'this.id', false);
				modifyAttribute('class', 'this.classes', true);
				function modifyAttribute(attrName, mergeWith, append) {
					if(attrs[attrName] == null)
						attrs[attrName] = {'escape': false, 'code': mergeWith};
					else if(attrs[attrName].code)
						attrs[attrName].code = "(" + mergeWith + (append ? '.push(' +
							attrs[attrName].code + '),' + mergeWith
							: '||' + attrs[attrName].code) + ")";
					else
					{
						attrs[attrName].code = "(" + mergeWith + (append ? '.push(' +
							JSON.stringify(attrs[attrName].text) + '),' + mergeWith
							: '||' + JSON.stringify(attrs[attrName].text)) + ")";
						delete attrs[attrName].text;
					}
				}
			}
			for(var i = 0; i < node.children.length; i++)
				this._compileNode(node.children[i]);
			//The buffer length before the function call is returned by the function
			this._pushOff("}," + ns + ");");
			break;
		case 'call':
			//The buffer length before the function call is returned by the function
			if(node.output)
				this._pushOff(node.output.to + (node.output.append ? "+=" : "=") + ns +
					".r.capture(" + ns + "," + ns + ".length,");
			if(node.arguments != "")
				node.arguments = "," + node.arguments;
			this._pushOff(ns + ".r.call(" + JSON.stringify(node.name) + ",{" +
				(node.id ? "id:" + JSON.stringify(node.id) + "," : "") +
				(node.classes.length > 0 ? "classes:" +
					JSON.stringify(node.classes) + "," : "") +
				"}," + ns + node.arguments + (node.output ? ") );" : ");") );
			break;
		case 'chunk':
			var paramStr = node.parameters == null ? "" : node.parameters.join(",");
			this._pushOff(ns + ".r.chunk(" + JSON.stringify(node.name) + ",function(" +
				paramStr + ") {");
			for(var i = 0; i < node.children.length; i++)
				this._compileNode(node.children[i]);
			this._pushOff("return this;}, " + ns + ");");
			break;
		default:
			var e = new Error("Unknown node type: " + node.type);
			e.line = node.line, e.column = node.col;
			throw e;
			break;
	}
	if(this.prependNewline && node.type != "text" && node.type != "filtered_text")
		this.prependNewline = false;
	this.lastNode = node;
}