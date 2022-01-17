function(object, max)
    {
        // we can't utilize the existing function due to:
        // https://bugzilla.mozilla.org/show_bug.cgi?id=573875
        //return FirebugReps.Obj.propIterator(object, max);

        max = max || 3;
        if (!object)
            return [];

        var props = [];
        var len = 0, count = 0;

        try
        {
            for (var i=0; i<object.length; i++)
            {
                var value;
                var name;
                try
                {
                    name = object.key(i);
                    value = object.getItem(name);
                    if (value instanceof window.StorageItem)
                        value = value.value;
                }
                catch (exc)
                {
                    continue;
                }

                var rep = Firebug.getRep(value);
                var tag = rep.shortTag || rep.tag;

                count++;
                if (count <= max)
                    props.push({tag: tag, name: name, object: value, equal: "=", delim: ", "});
                else
                    break;
            }

            if (count > max)
            {
                props[Math.max(1,max-1)] = {
                    object: Locale.$STR("firebug.reps.more") + "...",
                    tag: FirebugReps.Caption.tag,
                    name: "",
                    equal:"",
                    delim:""
                };
            }
            else if (props.length > 0)
            {
                props[props.length-1].delim = '';
            }
        }
        catch (exc)
        {
        }
        return props;
    }