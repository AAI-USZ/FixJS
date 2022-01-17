function (element)
	{
		var value=element.getAttribute("expr")
		var c=element.firstElementChild
		switch(element.tagName)
		{
		case "raise":
			this.internalQueue.push(new SCxml.Event(
				element.getAttribute("event"), element))
			break
		case "log":
			console.log(element.getAttribute("label")+" = "
				+this.expr(value,element))
			break
		case "data":
			if(!this.lateBinding) break // do not reinitialize again
			var id=element.getAttribute("id")
			// create the variable first, so it's "declared"
			// even if the assignment part fails or doesn't occur
			this.datamodel[id]=undefined
			if(element.hasAttribute("expr"))
				this.datamodel[id]=this.expr(value,element)
			else if(value=element.getAttribute("src"))
				this.datamodel[id]=undefined
				// TODO: fetch the data
			else if(element.childElementCount)
				this.datamodel[id]=xml2JS(element.childNodes)
			break
		case "assign":
			var loc=element.getAttribute("location")
			if(!(loc in this.datamodel))
				throw this.name+"'s datamodel doesn't have location "+loc
			if(value) this.datamodel[loc]=this.expr(value,element)
			else this.datamodel[loc]=xml2JS(element.childNodes)
			break
		case "if":
			var cond=this.expr(element.getAttribute("cond"))
			while(!cond && c)
			{
				if(c.tagName=="else") cond=true
				if(c.tagName=="elseif") cond=this.expr(c.getAttribute("cond"))
				c=c.nextElementSibling
			}
			while(c)
			{
				if(c.tagName=="else" || c.tagName=="elseif") break
				this.execute(c)
				c=c.nextElementSibling
			}
			break
		case "foreach":
			var a=this.expr(element.getAttribute("array"))
			var v=element.getAttribute("item")
			var i=element.getAttribute("index")
			if(!(a instanceof Object || "string"==typeof a)
			|| !/^(\$|[^\W\d])[\w$]*$/.test(i)
			|| !/^(\$|[^\W\d])[\w$]*$/.test(v))
			{
				this.internalQueue.push(
					new SCxml.Event("error.execution",element))
				throw "invalid item, index or array (see http://www.w3.org/TR/scxml/#foreach)"
			}
			for(var k in a)
			{
				if(i) this.datamodel[i]=k
				if(v) this.datamodel[v]=a[k]
				for(c=element.firstElementChild; c; c=c.nextElementSibling)
					this.execute(c)
			}
			break
		case "script":
			this.expr(element.textContent,element)
			break
			
		default:
			while(c)
			{
				this.execute(c)
				c=c.nextElementSibling
			}
		}
	}