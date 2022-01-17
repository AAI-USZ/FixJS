function()
    {
        console.log('[COPY] %s', PATH.basename(targetPath));

        if (options.copyToDirectory)
            targetPath = PATH.dirname(targetPath);

        jake.cpR(sourcePath, targetPath);
    }