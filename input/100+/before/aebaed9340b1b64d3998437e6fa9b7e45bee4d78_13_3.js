function()
{
  var toolbar_buttons =
  [
    {
      handler: 'continue',
      rawtitle: ui_strings.S_BUTTON_LABEL_CONTINUE,
      id: 'continue-run',
      disabled: true
    },
    {
      handler: 'continue',
      rawtitle: ui_strings.S_BUTTON_LABEL_STEP_INTO,
      id: 'continue-step-into-call',
      disabled: true
    },
    {
      handler: 'continue',
      rawtitle: ui_strings.S_BUTTON_LABEL_STEP_OVER,
      id: 'continue-step-next-line',
      disabled: true
    },
    {
      handler: 'continue',
      rawtitle: ui_strings.S_BUTTON_LABEL_STEP_OUT,
      id: 'continue-step-out-of-call',
      disabled: true
    }
  ];

  var set_shortcuts = function()
  {
    var broker = ActionBroker.get_instance();
    var global_handler = ActionBroker.GLOBAL_HANDLER_ID;
    toolbar_buttons.forEach(function(button)
    {
      if (button.rawtitle)
      {
        var shortcut = broker.get_shortcut_with_handler_and_action(global_handler,
                                                                   button.id);
        shortcut = window.helpers.capitalize_first_char(shortcut);
        button.title = button.rawtitle.replace("%s", shortcut);
      }
    });
  };

  new ToolbarConfig
  (
    'js_source',
    toolbar_buttons,
    null,
    /*
    [
      {
        handler: 'js-source-text-search',
        shortcuts: 'js-source-text-search',
        title: ui_strings.S_INPUT_DEFAULT_TEXT_SEARCH,
        label: ui_strings.S_INPUT_DEFAULT_TEXT_SEARCH
      }
    ],*/
    null,
    [
      {
        handler: 'select-window',
        title: ui_strings.S_BUTTON_LABEL_SELECT_WINDOW,
        type: 'dropdown',
        class: 'window-select-dropdown',
        template: window['cst-selects']["js-script-select"].getTemplate()
      }
    ],
    true
  );

  var service = window.services['ecmascript-debugger'];
  // core integartion is at least 168, that means major version is at least 6
  var stop_on_error = (service.major_version > 6 ||
                       service.minor_version > 7)
                    ? 1
                    : 0;
  
  new Settings
  (
    // id
    'js_source',
    // key-value map
    {
      script: 0,
      exception: 0,
      error: stop_on_error,
      abort: 0,
      'tab-size': 4,
      'js-search-type': DOMSearch.PLAIN_TEXT,
      'js-search-ignore-case': true,
      'js-search-all-files': false,
      'js-search-injected-scripts': true,
      'max-displayed-search-hits': 1000,
      'show-js-tooltip': true,
      'js-dd-match-history': [],
    },
    // key-label map
    {
      script: ui_strings.S_BUTTON_LABEL_STOP_AT_THREAD,
      exception: ui_strings.S_BUTTON_LABEL_AT_EXCEPTION,
      error: ui_strings.S_BUTTON_LABEL_AT_ERROR,
      abort: ui_strings.S_BUTTON_LABEL_AT_ABORT,
      'tab-size': ui_strings.S_LABEL_TAB_SIZE,
      'max-displayed-search-hits': ui_strings.S_LABEL_MAX_SEARCH_HITS,
      'show-js-tooltip': ui_strings.S_LABEL_SHOW_JS_TOOLTIP
    },
    // settings map
    {
      checkboxes:
      [
        'script',
        'exception',
        'error',
        'abort',
        'show-js-tooltip'
      ],
      customSettings:
      [
        'hr',
        'tab-size',
        'max-displayed-search-hits'
      ],
      contextmenu:
      [
        'error',
        'show-js-tooltip'
      ]
    },
    // custom templates
    {
      'hr':
      function(setting)
      {
        return ['hr'];
      },
      'tab-size':
      function(setting)
      {
        return (
        [
          'setting-composite',
          ['label',
            setting.label_map['tab-size'] + ': ',
            ['input',
              'type', 'number',
              'handler', 'set-tab-size',
              'max', '8',
              'min', '0',
              'value', setting.get('tab-size')
            ]
          ]
        ] );
      },
      'max-displayed-search-hits':
      function(setting)
      {
        return (
        [
          'setting-composite',
          ['label',
            setting.label_map['max-displayed-search-hits'] + ': ',
            ['input',
              'type', 'number',
              'handler', 'set-max-search-hits',
              'max', '10000',
              'min', '100',
              'value', setting.get('max-displayed-search-hits')
            ]
          ]
        ] );
      },
    },
    "script"
  );

  window.views.js_source.handle_tooltip_setting();

  new Switches
  (
    'js_source',
    [
      'script',
      'error'
    ]
  );

  eventHandlers.change['set-tab-size'] = function(event, target)
  {
    var
    style = document.styleSheets.getDeclaration("#js-source-content div"),
    tab_size = event.target.value;

    if(style && /[0-8]/.test(tab_size))
    {
      style.setProperty('-o-tab-size', tab_size, 0);
      settings.js_source.set('tab-size', tab_size);
    }
  }

  eventHandlers.change['set-max-search-hits'] = function(event, target)
  {
    var max_search_hits = Number(event.target.value);
    if (100 < max_search_hits && max_search_hits < 10000)
    {
      settings.js_source.set('max-displayed-search-hits', max_search_hits);
    }
  }

  eventHandlers.click['show-event-breakpoint-view'] = function(event, target)
  {
    var view = window.views['event-breakpoints'];
    UIWindowBase.showWindow(view.id,
                            view.window_top,
                            view.window_left,
                            view.window_width,
                            window.innerHeight >= view.window_height + 80 ?
                            view.window_height :
                            window.innerHeight - 80);
  }

  window.messages.addListener('shortcuts-changed', set_shortcuts);
  set_shortcuts();

  var broker = ActionBroker.get_instance();
  var contextmenu = ContextMenu.get_instance();
  var breakpoints = cls.Breakpoints.get_instance();

  contextmenu.register("js_source", [
    {
      callback: function(event, target)
      {
        var line = parseInt(event.target.get_attr("parent-node-chain", 
                                                  "data-line-number"));
        var script_id = views.js_source.getCurrentScriptId();
        var bp_view = window.views.breakpoints;
        var items = [];

        if (!line)
        {
          var input = event.target.parentNode.firstElementChild;
          line = input && parseInt(input.value);
        }
        if (line)
        {
          var selection = window.getSelection();
          if (!selection.isCollapsed)
          {
            var key = selection.toString();
            items.push({
              label: ui_strings.M_CONTEXTMENU_ADD_WATCH.replace("%s", key),
              handler: function(event, target) {
                window.views.watches.add_watch(key);
              }
            });
          }

          var bp = breakpoints.get_breakpoint_on_script_line(script_id, line);
          if (bp)
          {
            if (bp.is_enabled)
            {
              items.push({
                label: !bp.condition ?
                       ui_strings.M_CONTEXTMENU_ADD_CONDITION :
                       ui_strings.M_CONTEXTMENU_EDIT_CONDITION,
                handler: bp_view.show_and_edit_condition.bind(bp_view, script_id, line)
              },
              {
                label: ui_strings.M_CONTEXTMENU_DELETE_CONDITION,
                handler: function(event, target) {
                  breakpoints.set_condition("", bp.id);
                },
                disabled: !bp.condition
              },
              {
                label: ui_strings.M_CONTEXTMENU_DISABLE_BREAKPOINT,
                handler: function(event, target) {
                  // fixme: remove_breakpoint only disables a breakpoint. the name needs to be changed.
                  breakpoints.remove_breakpoint(script_id, line);
                }
              },
              {
                label: ui_strings.M_CONTEXTMENU_DELETE_BREAKPOINT,
                handler: function(event, target) {
                  var bp_id = breakpoints.remove_breakpoint(script_id, line);
                  breakpoints.delete_breakpoint(bp_id);
                }
              });
            }
            else
            {
              items.push({
                label: ui_strings.M_CONTEXTMENU_ENABLE_BREAKPOINT,
                handler: function(event, target) {
                  breakpoints.add_breakpoint(script_id, line);
                }
              });
            }
          }
          else
          {
            items.push({
              label: ui_strings.M_CONTEXTMENU_ADD_BREAKPOINT,
              handler: function(event, target) {
                breakpoints.add_breakpoint(script_id, line);
              }
            });
          }
        }
        
        if (items.length)
          items.push(ContextMenu.separator);

        return items;
      }
    }
  ], true); // extend the default existing menu
}