function(config){
    console.log('  Copying Sources...');
    wrench.copyDirSyncRecursive(config.inputDir, config.outputDir, {resolveSymbolicLinks: true});

    console.log('  Converting files...');

    compileAllTemplates(config);

    var toc = processDoc(config),
        outputDir = config.outputDir;

    console.log('  Generating Sidebar...');
    fs.writeFileSync(path.join(outputDir, 'sidebar_.html'), _sidebarTemplate({
        modules : toc
    }), 'utf-8');

    console.log('  Generating Index...');
    fs.writeFileSync(path.join(outputDir, 'index.html'), _indexTemplate({
        modules : toc,
        page_title : config.baseTitle || DEFAULT_PAGE_TITLE,
        content : getIndexContent(config)
    }), 'utf-8');

    console.log('  Copying Assets...');
    var assetsPath = config.assetsPath || path.normalize(_baseTemplatePath +'/assets_');
    wrench.copyDirSyncRecursive(assetsPath, path.join(outputDir, 'assets_'), {resolveSymbolicLinks: true});

    console.log('  Finished.');
}