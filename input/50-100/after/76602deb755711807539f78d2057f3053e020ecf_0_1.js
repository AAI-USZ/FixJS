function Client(options) {

    this.options = options || {
      'minified-script': 'media/calipso-main'
    };

    this.scripts = [];
    this.styles = [];

  // Shortcuts to core, must be included somewhere (module or theme) to be rendered
  this.coreScripts = {
     'jquery': {key:'jquery', url:'jquery-1.7.2.min.js', weight: -100},
     'calipso': {key:'calipso', url:'calipso.js', weight: -50}
  }

  }