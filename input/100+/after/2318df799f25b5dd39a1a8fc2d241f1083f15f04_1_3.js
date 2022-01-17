function()
    {
        jake.mkdirP('Frameworks/Debug');

        var frameworks = (options.frameworks || []).slice(0);

        for (var i = 0; i < frameworks.length; i++)
        {
            var fname = frameworks[i],
                moduleName = (fname == 'Objective-J' ? fname : 'Cappuccino-' + fname);

            var sourcePath = PATH.join('..', 'node_modules', moduleName, 'Release', fname),
                targetPath = PATH.join('Frameworks', fname),
                debugSourcePath = PATH.join('..', '..', 'node_modules', moduleName, 'Debug', fname),
                debugTargetPath = PATH.join('Frameworks', 'Debug', fname);

            try
            {
                FILE.unlinkSync(targetPath);
            }
            catch(e) {}
            try
            {
                FILE.unlinkSync(debugTargetPath);
            }
            catch(e) {}

            FILE.symlinkSync(sourcePath, targetPath, 'dir');
            FILE.symlinkSync(debugSourcePath, debugTargetPath, 'dir');
        }
    }