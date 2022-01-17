function(/* String */ name, /* Array */ dependencies, /* Object */ options)
{
    options = options || {};
    dependencies = dependencies || [];

    options.copyFrameworks = true;

    var plist = OBJJ.readPropertyList('Build.plist');

    if (!plist)
        fail('Cannot read Build.plist');

    var fileList = new jake.FileList();

    plist.valueForKey('CPSources').forEach(function(item)
    {
        fileList.include(item);
    });

    options.sourcePaths = fileList.toArray() || [];
    options.buildDirectory = plist.valueForKey('CPBuildDirectory') || 'Build';
    options.copyFiles = plist.valueForKey('CPCopyFiles') || [];
    options.frameworks = plist.valueForKey('CPFrameworks') || ['Objective-J', 'Foundation', 'AppKit'];
    if (options.frameworks.indexOf('Objective-J') === -1)
        options.frameworks.unshift('Objective-J');

    var res = plist.valueForKey('CPResources');

    if (res)
        options.copyFiles = options.copyFiles.concat(res);

    tasks.linkFrameworks(nil, [], {frameworks:options.frameworks});
    if (options.alwaysLinkFrameworks)
        dependencies.push('link-frameworks');

    tasks.makeBundle(name, dependencies, options);
}