function()
    {
        console.log('[COPY] %s', PATH.basename(targetPath));
        try
        {
            if (FILE.lstatSync(sourcePath).isDirectory() && FILE.lstatSync(targetPath).isDirectory())
                targetPath = PATH.dirname(targetPath);
        }
        catch(e) {}
        jake.cpR(sourcePath, targetPath);
    }