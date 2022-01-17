function()
    {
        var plist = OBJJ.readPropertyList('Build.plist'),
            frameworks = plist.valueForKey('CPFrameworks');

        if (!plist)
            fail('Cannot read Build.plist');

        frameworks = frameworks || [];

        for (var i = 0; i < frameworks.length; i++)
        {
            var fname = frameworks[i];

            frameworks[i] = 'Cappuccino-' + fname;
        }
        frameworks.unshift('Objective-J');

        NPM.commands.link(frameworks, function()
        {
            complete();
        });
    }, {async : true}