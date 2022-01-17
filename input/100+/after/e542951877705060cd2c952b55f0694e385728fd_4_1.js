function(){
      console.log('measureNewView.init');
      _.bindAll(this);

      var  defaults = {
            time_signature: this.options.collections.time_signatures.get(3).toJSON() , 
            instrument: this.options.collections.instruments.get(1).toJSON() ,
            state: this.options.collections.states.get(1).toJSON() ,
            positions: {},
            strings: 0,
            bars: 0
          },
          new_measure,
          i, 
          j,
          bar_length = defaults.time_signature.upper * defaults.time_signature.lower,
          strings_length = defaults.instrument.strings.length;

      //console.log('strings_length:', strings_length);

      defaults.strings = strings_length;
      defaults.bars = bar_length;
      defaults.positions.bar = [];
      for(i = 0; i < bar_length; i++){
        var default_bar = {no: i+1, chord: '', pos: []};

        for(j = 0; j < strings_length; j++){
          var default_string = {no: j+1, accent: '', finger:'', fret: ''};
          default_bar.pos.push(default_string);
        }  
        defaults.positions.bar.push(default_bar); 
      }

      new_measure = new measure(defaults);

      //console.log('new_measure: ' + JSON.stringify(new_measure));

      this.model = new_measure;


      this.initComponents();
    }