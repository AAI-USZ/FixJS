function getSettings()
{
    function parse(x)
    {
      try
      {
        return JSON.parse(x);
      } catch(e)
      {
        return undefined;
      }
    }

    var settings = {
        style: localStorage['style'],
        size: localStorage['size'],
        margin: localStorage['margin'],
        enable_links: parse(localStorage['enable_links']),
        enable_experimental: parse(localStorage['enable_experimental']),
        show_article_tools: parse(localStorage['show_article_tools']),
        enable_keys: parse(localStorage['enable_keys']),
        keys: parse(localStorage['keys'])
    };

    if(!_.isArray(settings['keys']))
        settings['keys'] = [];

    var defaults = {
        style: 'style-newspaper',
        size: 'size-large',
        margin: 'margin-wide',
        enable_links: false,
        enable_keys: false,
        enable_experimental: false,
        show_article_tools: true,
        keys: []
    };

    return _.extend(settings, defaults);
}