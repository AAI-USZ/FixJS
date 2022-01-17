function(services)
      {
        if (services['ecmascript-debugger'].satisfies_version(6, 11))
        {
          return ['dom-side-panel',
                  'dom_attrs',
                  'css-layout',
                  'ev-listeners-side-panel',
                  'dom-search'];
        }

        return ['dom-side-panel', 'dom_attrs', 'css-layout', 'dom-search'];
      }