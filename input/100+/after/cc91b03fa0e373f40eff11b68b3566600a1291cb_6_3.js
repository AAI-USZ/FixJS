function (object, max)
    {
        max = max || 3;
        if (!object)
            return [];

        var props = [];
        for (var i=0; i<object.length && i<max; i++)
        {
            var item = object.item(i);
            var name = item.name;
            var value = item.value;

            var rep = Firebug.getRep(value);
            var tag = rep.tag;

            props.push({tag: tag, name: name, object: value, equal: "=", delim: ", "});
        }

        if (object.length > max)
        {
            props[Math.max(1,max-1)] = {
                object: (object.length-max) + " " + Locale.$STR("firebug.reps.more") + "...",
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

        return props;
    }