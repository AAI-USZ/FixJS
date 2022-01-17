function setSettings(settings)
{
    var keys = _.keys(settings);

    if(_.include(keys, 'style'))
        settings['style'] = settings['style']

    if(_.include(keys, 'size'))
        settings['size'] = settings['size']

    if(_.include(keys, 'margin'))
        settings['margin'] = settings['margin']

    if(_.include(_.keys(settings), 'enable_links'))
        settings['enable_links'] = JSON.stringify(!!settings['enable_links']);

    if(_.include(_.keys(settings), 'enable_experimental'))
        settings['enable_experimental'] = JSON.stringify(!!settings['enable_experimental']);

    if(_.include(_.keys(settings), 'show_article_tools'))
        settings['show_article_tools'] = JSON.stringify(!!settings['show_article_tools']);

    if(_.include(_.keys(settings), 'enable_keys'))
        settings['enable_keys'] = JSON.stringify(!!settings['enable_keys']);

    if(_.include(_.keys(settings), 'keys'))
        settings['keys'] = JSON.stringify(settings['keys']);

    //console.log('setSettings', settings);

    _.extend(localStorage, settings);

    chrome.windows.getAll({'populate': true}, function(windows)
    {
        _.each(windows, function(window)
        {
            _.each(window.tabs, function(tab)
            {
                chrome.tabs.sendRequest(tab.id, {'type': 'newSettings', 'settings': getSettings()});
            });
        });
    });
}