function()
    {
        jake.mkdirP('Frameworks/Debug');

        var plist = OBJJ.readPropertyList('Build.plist'),
            frameworks = plist.valueForKey('CPFrameworks');

        frameworks = frameworks || [];

        frameworks.unshift('Objective-J');

        for (var i = 0; i < frameworks.length; i++)
        {
            var fname = frameworks[i],
                moduleName = i ? 'Cappuccino-' + fname : fname;

            var sourcePath = PATH.join('..', 'node_modules', moduleName, 'Release', fname),
                targetPath = PATH.join('Frameworks', fname),
                debugSourcePath = PATH.join('..', '..', 'node_modules', moduleName, 'Debug', fname),
                debugTargetPath = PATH.join('Frameworks', 'Debug', fname);

            if (PATH.existsSync(targetPath))
                FILE.unlinkSync(targetPath);

            FILE.symlinkSync(sourcePath, targetPath, 'dir');

            if (PATH.existsSync(debugTargetPath))
                FILE.unlinkSync(debugTargetPath);

            FILE.symlinkSync(debugSourcePath, debugTargetPath, 'dir');
        }
    }