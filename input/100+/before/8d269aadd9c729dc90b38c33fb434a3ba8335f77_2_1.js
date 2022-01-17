function(ob, nonEnumProps, ownPropsOnly)
{
    try
    {
        if (!ob)
            return false;

        var obString = Str.safeToString(ob);
        if (obString === "[object StorageList]" ||
            obString === "[xpconnect wrapped native prototype]")
        {
            return true;
        }

        // The default case (both options false) is relatively simple.
        // Just use for..in loop.
        if (!nonEnumProps && !ownPropsOnly)
        {
            for (var name in ob)
            {
                // Try to access the property before declaring existing properties.
                // It's because some properties can't be read see:
                // issue 3843, https://bugzilla.mozilla.org/show_bug.cgi?id=455013
                var value = ob[name];
                return true;
            }
            return false;
        }

        var type = typeof(ob);
        if (type == "string" && ob.length)
            return true;

        if (nonEnumProps)
            props = Object.getOwnPropertyNames(ob);
        else
            props = Object.keys(ob);

        if (props.length)
        {
            // Try to access the property before declaring existing properties.
            // It's because some properties can't be read see:
            // issue 3843, https://bugzilla.mozilla.org/show_bug.cgi?id=455013
            var value = ob[props[0]];
            return true;
        }

        // Not interested in inherited properties, bail out.
        if (ownPropsOnly)
            return false;

        // Climb prototype chain.
        var inheritedProps = [];
        var parent = Object.getPrototypeOf(ob);
        if (parent)
            return this.hasProperties(parent, nonEnumProps, ownPropsOnly);
    }
    catch (exc)
    {
        // Primitive (non string) objects will throw an exception when passed into
        // Object.keys or Object.getOwnPropertyNames APIs.
        // There are also many "security error" exceptions I guess none of which are really
        // necessary to display in the FBTrace console, so, remove the tracing for now.
        // if (FBTrace.DBG_ERRORS)
        //     FBTrace.sysout("lib.hasProperties(" + Str.safeToString(ob) + ") ERROR " + exc, exc);

        // workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=648560
        if (ob.wrappedJSObject)
            return true;
    }

    return false;
}