function(baseConfig)
{
    baseConfig = baseConfig || {};

    // Set configuration defaults.
    baseConfig.baseLoaderUrl = baseConfig.baseLoaderUrl || "resource://moduleLoader/";
    baseConfig.prefDomain = baseConfig.prefDomain || "extensions.firebug";
    baseConfig.baseUrl = baseConfig.baseUrl || "resource://";
    baseConfig.xhtml = true;  // createElementNS used
    baseConfig.arch = baseConfig.arch || "chrome://firebug/content/bti/inProcess";

    baseConfig.paths = baseConfig.paths || {
        "arch": baseConfig.arch,
        "firebug": "chrome://firebug/content"
    };

    var config = {};
    var keys = Object.keys(baseConfig);
    keys.forEach(function copy(key)
    {
        config[key] = baseConfig[key];
    });

    // This is the basic list of necessary modules. All the other modules will be
    // automatically loaded as dependencies.
    config.modules = [
        "firebug/trace/traceModule",
        "firebug/chrome/navigationHistory",
        "firebug/chrome/knownIssues",
        "firebug/js/sourceFile",
        "firebug/chrome/shortcuts",
        "firebug/firefox/start-button/startButtonOverlay",
        "firebug/firefox/external-editors/externalEditors",
        "firebug/chrome/panelActivation",
        //"firebug/console/memoryProfiler", xxxHonza: removed from 1.10 (issue 5599)
        "firebug/chrome/tableRep",
        "firebug/html/htmlPanel",
        "firebug/console/commandLinePopup",
        "firebug/accessible/a11y",
        "firebug/js/scriptPanel",
        "firebug/js/callstack",
        "firebug/console/consoleInjector",
        "firebug/net/spy",
        "firebug/js/tabCache",
        "firebug/chrome/activation",
        "firebug/css/stylePanel",
        "firebug/css/computedPanel",
        "firebug/cookies/cookieModule",
        "firebug/cookies/cookiePanel",
    ];

    return config;
}