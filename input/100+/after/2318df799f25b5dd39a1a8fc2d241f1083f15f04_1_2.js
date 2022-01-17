function()
    {
        var frameworks = (options.frameworks || []).slice(0);

        for (var i = 0; i < frameworks.length; i++)
        {
            var fname = frameworks[i];
            if (fname == 'Objective-J')
                continue;

            frameworks[i] = 'Cappuccino-' + fname;
        }

        NPM.commands.link(frameworks, function()
        {
            complete();
        });
    }, {async : true}