function (obj, arg, add) {
			var classes;

			obj = utility.object(obj);

			if (obj instanceof Array) return obj.each(function (i) { element.klass(i, arg, add); });

			if (!(obj instanceof Element) || String(arg).isEmpty()) throw Error(label.error.invalidArguments);

			obj.fire("beforeClassChange");
			add     = (add !== false);
			arg     = arg.explode();
			classes = obj.className.explode(" ");
			arg.each(function (i) { add ? classes.add(i) : (arg === "*" ? classes = [] : classes.remove(i)); });
			classes = classes.join(" ");
			client.ie && client.version < 9 ? obj.className = classes : obj.attr("class", classes);
			obj.fire("afterClassChange");
			return obj;
		}