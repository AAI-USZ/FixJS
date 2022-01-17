function(moduleFolderName) {

        if (moduleFolderName != "README" && moduleFolderName != '.DS_Store') { // Ignore the readme file and .DS_Store file for Macs
          
          var modulePath = path.join(moduleBasePath, type, moduleFolderName);
          
          var module = {
            name: moduleFolderName,
            folder: moduleFolderName,
            library: moduleFolderName,
            type: type,
            path: modulePath,
            enabled: false,
            inited: false
          };

          // Add about info to it
          loadAbout(module, modulePath, 'package.json');

          // Set the module name to what is in the package.json, default to folder name
          module.name = module.about.name ? module.about.name : moduleFoldername;

          // Now set the module
          calipso.modules[module.name] = module;

          // Set if it is enabled or not
          module.enabled = configuredModules[module.name] ? configuredModules[module.name].enabled : false;

          if (module.enabled) {

            // Load the module itself via require
            requireModule(calipso.modules[module.name], modulePath);

            // Load the templates (factored out so it can be recalled by watcher)
            loadModuleTemplates(calipso.modules[module.name], path.join(modulePath,'templates'));

          }

        }

      }