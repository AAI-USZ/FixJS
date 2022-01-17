function coreConfig(req, res, template, block, next) {

  // Temporary data for form
  calipso.data.loglevels = [];
  for(var level in calipso.lib.winston.config.npm.levels){
    calipso.data.loglevels.push(level);
  }

  calipso.data.themes = [];
  calipso.data.adminThemes = []; // TODO
  for(var themeName in calipso.themes){
    var theme = calipso.themes[themeName];
    if(theme.about.type === "full" || theme.about.type === "frontend") {
      calipso.data.themes.push(themeName);
    }
    if(theme.about.type === "full" || theme.about.type === "admin") {
      calipso.data.adminThemes.push(themeName);
    }
    if(!theme.about.type) {
      console.error("Theme " + themeName + " not enabled due to missing type.");
    }
  }


  var adminForm = {
    id:'admin-form',
    title:'Administration',
    type:'form',
    method:'POST',
    action:'/admin/core/config/save',
    tabs:true,
    sections:[
      {
        id:'form-section-core',
        label:'Site',
        fields:[
          {
            label:'Site Name',
            name:'server:name',
            type:'text'
          }
        ]
      },
      {
        id:'form-section-language',
        label:'Language',
        fields:[
          {
            label:'Default Language',
            name:'i18n:language',
            type:'select',
            options: req.languages
          },
          {
            label:'Add Unknown Terms',
            name:'i18n:additive',
            type:'checkbox',  
            labelFirst: true
          }
        ]
      },
      {
        id:'form-section-performance',
        label:'Performance & Clustering',
        fields:[
          {
            label:'Performance',
            legend:'Performance',
            type:'fieldset',
            fields:[
              {
                label:'Enable Cache',
                name:'performance:cache:enabled',
                type:'checkbox',
                description:'Experimental - will probably break things!',
                labelFirst: true
              },
              {
                label:'Default Cache TTL',
                name:'performance:cache:ttl',
                type:'text',
                description:'Default age (in seconds) for cache items.'
              },
              {
                label:'Watch Template Files',
                name:'performance:watchFiles',
                type:'checkbox',
                labelFirst: true
              }
            ]
          },
          {
            label:'Hook.IO',
            legend:'Hook.IO',
            type:'fieldset',
            fields:[
              {
                label:'Hook.IO Name',
                name:'server:hookio:name',
                type:'text'
              }, 
              {
                label:'Hook.IO Port',
                name:'server:hookio:port',
                type:'text'
              },
              {
                label:'Hook.IO Host Name',
                name:'server:hookio:host',
                type:'text'
              },
              {
                label:'Hook.IO Debug',
                name:'server:hookio:debug',
                type:'checkbox',
                labelFirst: true
              },
              {
                label:'Hook.IO Max Listeners',
                name:'server:hookio:maxListeners',
                type:'text'
              }
            ]
          },
          {
            label:'Event Emitter',
            legend:'Event Emitter',
            type:'fieldset',
            fields:[
              {
                label:'EventEmitter Max Listeners',
                name:'server:events:maxListeners',
                type:'text'
              }
            ]
          }
        ]
      },
      {
        id:'form-section-theme',
        label:'Theme',
        fields:[
          {
            label:'Frontend Theme',
            name:'theme:front',
            type:'select',
            options: calipso.data.themes,
            description:'Theme used for all web pages excluding admin pages'
          },
          {
            label:'Admin Theme',
            name:'theme:admin',
            type:'select',
            options: calipso.data.adminThemes,
            description:'Administration theme [NOT YET IMPLEMENTED]'
          }
        ]
      },
      {
        id:'form-section-logging',
        label:'Logging',
        fields:[
          {
            label:'Console Logging',
            name:'logging:console:enabled',
            type:'checkbox',
            labelFirst: true,
            description:'Enable logging to the console.'
          },
          {
            label:'Console Log Level',
            name:'logging:console:level',
            type:'select',
            options: calipso.data.loglevels,
            description:'Log level that controls verbosity of display on the console.'
          },
          {
            label:'Console Timestamp',
            name:'logging:console:timestamp',
            type:'checkbox',
            labelFirst: true,
            description:'Prepend timestamps to console logs.'
          },
          {
            label:'Console Colorize',
            name:'logging:console:timestamp',
            type:'checkbox',
            labelFirst: true,
            description:'Show colors on the console logs'
          },
          {
            label:'File Logging',
            name:'logging:file:enabled',
            type:'checkbox',
            labelFirst: true
          },
          {
            label:'File Log Level',
            name:'logging:file:level',
            type:'select',
            options: calipso.data.loglevels,
            description:'Log level that controls verbosity of display in the file logs.'
          },
          {
            label:'File Log Path',
            name:'logging:file:filepath',
            type:'text',
            description:'Path to create the file logs.'
          },
          {
            label:'File Log Timestamp',
            name:'logging:file:timestamp',
            type:'checkbox',
            labelFirst: true,
            description:'Prepend timestamps to file logs.'
          }
        ]
      },
      {
        id:'form-section-modules',
        label:'Modules',
        fields:[] // populated in a loop just below
      }
    ],
    fields:[
      {
        label:'',
        name:'returnTo',
        type:'hidden'
      }
    ],
    buttons:[
      {
        name:'submit',
        type:'submit',
        value:'Save Configuration'
      }
    ]
  };

  // Values can come straight off the config.
  var values = calipso.config;

  var adminModuleFields = adminForm.sections[5].fields;
  createModuleFields(adminModuleFields);
  
  res.layout = 'admin';

  calipso.form.render(adminForm, values, req, function(form) {
    calipso.theme.renderItem(req, res, form, block, {}, next);
  });

}