function (mojit, action, resources, appResources) {
    mojit = mojit || {};

    var i, fileparts, modules, mergedModules,
        models = resources.models,
        appModels = appResources.models,
        mergedModels = util.simpleMerge(models,appModels),
        autoload = resources.autoload,
        appAutoload = appResources.autoload,
        addons = resources.addons,
        appAddons = appResources.addons,
        mergedAddons = util.simpleMerge(addons,appAddons),
        mergedAutoload = util.simpleMerge(autoload,appAutoload),
        views = resources.views,
        binders = resources.binders,
        controllerFile = resources.controller,
        controller_affinity = libpath.basename(controllerFile).split('.', 2)[1],
        clientDependencies = {controllers: [], dependencies: [], binders: [], views: []};

        mergedModules = util.simpleMerge(util.simpleMerge(mergedModels,mergedAutoload), mergedAddons);

        for(i in mergedModules){
            if(libpath.basename(mergedModules[i]).split('.')[1] === 'server'){
                delete mergedModules[i];
            }
        }
        modules = this._precalculateAutoloads(mergedModules);

    if (action === '*') {
        return clientDependencies;
    }

    if (controller_affinity !== 'server') {
        clientDependencies.controllers.push(controllerFile);
        clientDependencies.dependencies = clientDependencies.dependencies.concat(this._calculateBinderDependencies(action,controllerFile,modules));
    }

    for (i in views) {
        fileparts = libpath.basename(views[i]).split('.', 3);
        //WE PUT ONLY ONE VIEW 
        if(fileparts[0] === action){
            clientDependencies.views.push(views[i]);
        }
    }

    for (i in binders) {
        fileparts = fileparts = libpath.basename(binders[i]).split('.');
        if (action === fileparts[0]) {
            clientDependencies.binders.push(binders[i]);
            clientDependencies.dependencies = clientDependencies.dependencies.concat(this._calculateBinderDependencies(action, binders[i], modules));
        }
    }
    clientDependencies.dependencies = util.removeDuplicates(clientDependencies.dependencies);
    return clientDependencies;
}