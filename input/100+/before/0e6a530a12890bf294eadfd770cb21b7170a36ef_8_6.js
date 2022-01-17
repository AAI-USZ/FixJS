function(cmdLine, options)
    {
        var lastI = 0, args = [], argIndex = 0, inGroup;
        var subs = "col|line|file|url".split("|");

        // do not send argument with bogus line number
        function checkGroup()
        {
            var group = args.slice(argIndex), isValid = null;
            for (var i=0; i<subs.length; i++)
            {
                var sub = subs[i];
                if (group.indexOf("%" + sub) == -1)
                    continue;

                if (options[sub] == undefined)
                {
                    isValid = false;
                }
                else
                {
                    isValid = true;
                    break;
                }
            }

            if (isValid == false)
                args = args.slice(0, argIndex);

            argIndex = args.length;
        }

        cmdLine.replace(/(\s+|$)|(?:%([{}]|(%|col|line|file|url)))/g, function(a, b, c, d, i, str)
        {
            var skipped = str.substring(lastI, i);
            lastI = i+a.length;
            skipped && args.push(skipped);

            if (b || !a)
            {
                args.push(" ");
                if (!inGroup)
                    checkGroup();
            } else  if (c == "{") {
                inGroup = true;
            } else  if (c == "}") {
                inGroup = false;
                checkGroup();
            } else  if (d) {
                args.push(a);
            }
        });

        cmdLine = args.join("");
        // add %file
        if (!/%(url|file)/.test(cmdLine))
            cmdLine += " %file";

        args = cmdLine.trim().split(" ");
        args = args.map(function(x)
        {
            return x.replace(/(?:%(%|col|line|file|url))/g, function(a, b){
                if (b == '%')
                    return b;
                if (options[b] == null)
                    return "";
                return options[b];
            });
        })
        return args;
    }