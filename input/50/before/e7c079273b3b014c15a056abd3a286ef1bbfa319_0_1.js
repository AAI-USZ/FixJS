function(services)
      {
        if (services['ecmascript-debugger'].satisfies_version(6, 11))
        {
          return ['dom-side-panel',
                  'dom_attrs',
                  'css-layout',
                  'dom-search',
                  'ev-listeners-side-panel'];
        }

        return ['dom-side-panel', 'dom_attrs', 'css-layout', 'dom-search'];
      }