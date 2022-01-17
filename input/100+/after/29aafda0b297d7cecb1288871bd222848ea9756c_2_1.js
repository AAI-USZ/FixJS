function(array, max)
    {
        var items = [];
        for (var i = 0; i < array.length && i <= max; ++i)
        {
            try
            {
                var delim = (i == array.length-1 ? "" : ", ");
                var value = array[i];

                // Cycle detected
                if (value === array)
                    value = new FirebugReps.ReferenceObj(value);

                var rep = Firebug.getRep(value);
                var tag = rep.shortTag || rep.tag;
                items.push({object: value, tag: tag, delim: delim});
            }
            catch (exc)
            {
                var rep = Firebug.getRep(exc);
                var tag = rep.shortTag || rep.tag;

                items.push({object: exc, tag: tag, delim: delim});
            }
        }

        if (array.length > max + 1)
        {
            items[max] = {
                object: (array.length-max) + " " + Locale.$STR("firebug.reps.more") + "...",
                tag: FirebugReps.Caption.tag,
                delim: ""
            };
        }

        return items;
    }