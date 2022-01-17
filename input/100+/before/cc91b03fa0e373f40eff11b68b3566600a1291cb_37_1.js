function(object, type, props, name, value, level, order, context)
    {
        // do this first in case a call to instanceof reveals contents
        var rep = Firebug.getRep(value);
        var tag = rep.shortTag ? rep.shortTag : rep.tag;

        var hasProperties = Obj.hasProperties(value, !Firebug.showEnumerableProperties,
            Firebug.showOwnProperties);

        var valueType = typeof(value);
        var hasChildren = hasProperties && !(value instanceof FirebugReps.ErrorCopy) &&
            (valueType == "function" || (valueType == "object" && value != null)
            || (valueType == "string" && value.length > Firebug.stringCropLength));

        // Special case for "arguments", which is not enumerable by for...in statement
        // and so, Obj.hasProperties always returns false.
        if (!hasChildren && value) // arguments will never be falsy if the arguments exist
            hasChildren = isArguments(value);

        if (value)
        {
            var proto = Obj.getPrototype(value);
            // Special case for functions with a prototype that has values
            if (valueType === "function" && proto)
            {
                hasChildren = hasChildren || Obj.hasProperties(proto,
                    !Firebug.showEnumerableProperties, Firebug.showOwnProperties);
            }
        }

        if ("StorageList" in window && value instanceof window.StorageList)
        {
            var domain = context.window.location.hostname;
            hasChildren = value.namedItem(domain).length > 0;
        }

        var member = {
            object: object,
            name: name,
            value: value,
            type: type,
            rowClass: "memberRow-"+type,
            open: "",
            order: order,
            level: level,
            indent: level*16,
            hasChildren: hasChildren,
            tag: tag,
            prefix: "",
            readOnly: false
        };

        // The context doesn't have to be specified (e.g. in case of Watch panel that is based
        // on the same template as the DOM panel, but doesn't show any breakpoints).
        if (context)
        {
            // xxxHonza: Support for object change not implemented yet.
            member.breakable = !hasChildren;

            var breakpoints = context.dom.breakpoints;
            var bp = breakpoints.findBreakpoint(object, name);
            if (bp)
            {
                member.breakpoint = true;
                member.disabledBreakpoint = !bp.checked;
            }
        }

        // Set prefix for user defined properties. This prefix help the user to distinguish
        // among simple properties and those defined using getter and/or (only a) setter.
        var o = this.getObjectView(object);
        if (o && !Dom.isDOMMember(object, name) && (XPCNativeWrapper.unwrap(object) !== object))
        {
            var getter = o.__lookupGetter__(name);
            var setter = o.__lookupSetter__(name);

            // both, getter and setter
            if (getter && setter)
                member.type = "userFunction";

            // only getter
            if (getter && !setter)
            {
                member.readOnly = true;
                member.prefix = "get";
            }

            // only setter
            if (!getter && setter)
            {
                member.readOnly = true;
                member.prefix = "set";
            }
        }

        var readOnly = isReadOnly(object, name);
        if (typeof(readOnly) != "undefined")
            member.readOnly = readOnly;

        props.push(member);
        return member;
    }