function($, _, Backbone, measureEditTemplate, cardTemplate, barTemplate, noteTemplate, fingerTemplate, inputOverlayView, listView, timeSignatureListView){
  "use strict";


  var OverlayView,
      InstrumentList,
      TimeSignatureList,
      GranularityList, 
      measureEditView = Backbone.View.extend({
        className: "measure",
        containers: {
          instrument_list: '.instrument_container',
          time_signature_list: '.time_signature_container',
          granularity_list: '.granularity_container',
          overlay: '.input_overlay' 
        },  
        events:{
         //nav
         'keyup': 'checkKeyPressInput',
         //'mousewheel': 'checkMouseScroll',
         //overlay
         'focus .card_edit input': 'addOverlay',
         'blur .card_edit input': 'removeOverlay',
         //validations
         'keyup .accent': 'validateAccent',
         'keyup .chord': 'validateChord',
         'keyup .finger': 'validateFinger',
         'keyup .fret': 'validateFret',
         //save
         'click .save': 'saveCards'
        },
        initialize: function(){
          //console.log('measureEditView.init');	
          _.bindAll(this);
          
          window.measureEdit = this;

          this.initComponents();
        },

        initComponents: function() {
          var instruments = this.options.collections.instruments,
              time_signatures = this.options.collections.time_signatures;//,
              //granularities = this.options.collections.granularities;


          OverlayView = new inputOverlayView({model: this.model, collections: this.options.collections});
            
          //console.log('instruments:', instruments);  
          InstrumentList = new listView({collection: instruments, initial_value: this.model.get('instrument').name });

          //console.log('time_signatures:', time_signatures);  
          TimeSignatureList = new timeSignatureListView({collection: time_signatures, initial_value: this.model.get('time_signature').upper + '/' + this.model.get('time_signature').lower});
          ''
          ////console.log('granularity:', granularities);            
          //GranularityList = new listView({collection: granularities});
        
          instruments.on('item:select', this.updateInstrument);
          time_signatures.on('item:select', this.updateTimeSignature);
          //granularities.on('item:select', this.updateGranularity);

          this.model.on('change', this.renderCards);

        },
        render: function(){
          //console.log('measureEditView.render');	
          var data = this.model.toJSON(),
              compiledTemplate;

          compiledTemplate = _.template( measureEditTemplate, data );

          $(this.el)
            .empty()
            .append( compiledTemplate );
          
          this.renderLists();
          this.renderCards();
          this.renderOverlay();

          return this;
        },

        renderCards:function() {
          //console.log('measureEditView.renderCards');
          var data = this.model.toJSON(),
              container = $(this.el).find('.card_edit_container'),
              compiled_card;

          //console.log('data:', data);
          //console.log(data);

          compiled_card = _.template( cardTemplate, data );

          container
            .empty()
            .append(compiled_card);

          this.renderBars();
        },

        renderBars: function() {
          //console.log('measureEditView.renderBars');
          var data = this.model.toJSON().positions.bar,
              container = $(this.el).find('.bars'),
              bars_length = this.model.get('bars'),
              data_length = data.length;

          //console.log('bar.length: ', data.length);

          container.empty();

          if(data_length > bars_length) {
              data.splice(bars_length);
            } else if(data_length < bars_length) {
              ////console.log('beat.pos.length:', beat.pos.length);
              ////console.log('strings_length:', strings_length);
              var add_bars = bars_length - data_length,
                  i,
                  default_bar;
              for(i = 0; i < add_bars; i++){
                default_bar = {no: i+data_length+1, chord: '', pos: []};
                data.push(default_bar);
              }
            } 

          _.each(data, function(beat) {
            //console.log('beat:', beat);
            var compiled_bar = _.template( barTemplate, beat );
            container.append(compiled_bar);
          })    

          this.renderStrings();
 
        },
        renderStrings: function() {
          //console.log('measureEditView.renderStrings');      
          var data = this.model.toJSON().positions.bar,
              note_containers =  $(this.el).find('.notes'),
              finger_containers =  $(this.el).find('.fingers'),
              model = this.model;

          note_containers.empty();
          finger_containers.empty();

          _.each(data, function(beat, i) {
            //console.log('beat:');
            //console.log(beat);
            var compiled_bar = _.template( barTemplate, beat ),
                note_container = note_containers.eq(i),
                fingers_container = finger_containers.eq(i),
                strings_length = model.get('strings'),
                beat_pos_length = beat.pos.length;

            //reconcile strings arrays with new string count    
            if(beat_pos_length > strings_length) {
              beat.pos.splice(strings_length);
            } else if(beat_pos_length < strings_length) {
              ////console.log('beat.pos.length:', beat.pos.length);
              ////console.log('strings_length:', strings_length);
              var add_strings = strings_length - beat.pos.length,
                  i,
                  default_string;
              for(i = 0; i < add_strings; i++){
                default_string = {no: i+beat_pos_length+1, accent: '', finger:'', fret: ''};
                beat.pos.push(default_string);
              }
            } 

            _.each(beat.pos, function(strng) {
              var bar_no = i + 1;
              strng = _.extend(strng, {"bar_no": bar_no});
              //console.log('strng:', strng);
              var compiled_note = _.template(noteTemplate, strng),
                  compiled_finger = _.template(fingerTemplate, strng);
              note_container.append(compiled_note);
              fingers_container.append(compiled_finger);
            });
          });           
        },

        renderLists: function() {
          //console.log('measureEditView.renderLists'); 

          $(this.el).find(this.containers.instrument_list)
            .empty()
            .append(InstrumentList.render().el);
          
          $(this.el).find(this.containers.time_signature_list)
            .empty()
            .append(TimeSignatureList.render().el);

          //$(this.el).find(this.containers.granularity_list)
          //  .empty()
          //  .append(GranularityList.render().el);            

        },

        renderOverlay: function() {
          //console.log('measureEditView.renderOverlay'); 
          $(this.el).find(this.containers.overlay)
            .empty()
            .append(OverlayView.render().el);
        },

        checkMouseScroll: function(event) {
          //console.log('measureEditView.checkMouseScroll');
          ////console.log(event);
          var delta = 0,
              $event = event,
              event = event.originalEvent;

            if (!event) {/* For IE. */
              event = window.event;
            }        
            if (event.wheelDelta) { /* IE/Opera. */
              delta = event.wheelDelta/120;
            } else if (event.detail) { /** Mozilla case. */
              /** In Mozilla, sign of delta is different than in IE.
               * Also, delta is multiple of 3.
               */
              delta = -event.detail/3;
            }
            /** If delta is nonzero, handle it.
             * Basically, delta is now positive if wheel was scrolled up,
             * and negative, if wheel was scrolled down.
             */
            if (delta) {
              this.moveBar(delta);
            }  
            /** Prevent default actions caused by mouse wheel.
             * That might be ugly, but we handle scrolls somehow
             * anyway, so don't bother here..
             */
            if (event.preventDefault) {
              event.preventDefault();
            } 
            event.returnValue = false;
        },

        checkKeyPressInput: function(event) {
          //console.log('measureEditView.checkKeyPressInput');
          //console.log('event', event);
          if(this.checkSpecialCharacters(event.keyCode)) {
            event.stopPropagation();
            event.preventDefault();     
          } else {
          }
          
        },

        checkSpecialCharacters: function(key) {
          //console.log('measureEditView.checkSpecialCharacters');
          ////console.log('key', key);

          var current_input = $(this.el).find('input:focus');

          switch(key) {
            case 38:
              //up arrow 
              this.moveField('up');
              break;
            case 40:
              //down arrow 
              this.moveField('down');
              break;
            case 37:
              //left arrow 
              this.moveField('left');
              break;
            case 39:
              //right arrow 
              this.moveField('right');
              break; 
            case 27:
              //esc arrow 
              this.clearInput();
              break;                                         
            default:
              return false;
          }
          return true;
        },
        clearInput: function() {
          //console.log('measureEditView.clearField');
          var current_field = $(this.el).find('input:focus');
          current_field.val('');  
        },
        moveField: function(direction) {
          //console.log('measureEditView.moveField: ' + direction);
          var $el = $(this.el),
              has_eighth = $el.find('.card_edit').hasClass('eighth'),
              all_fields = $el.find('.card_edit input'),
              current_field = all_fields.filter(':focus'),
              has_chord = current_field.parent().hasClass('chord'),
              has_accent = current_field.parent().hasClass('accent'),
              has_fret = current_field.parent().hasClass('fret'),
              has_finger = current_field.parent().hasClass('finger'),
              field_type,
              new_field,
              travel = 1,
              current_bar_container = current_field.parents('.bar'),
              current_bar_inputs = current_bar_container.find('input').filter(':visible'),
              current_y_position = current_bar_inputs.index(current_field),

              current_bars_container = current_field.parents('.bars'),
              current_bars = current_bars_container.find('.bar').filter(':visible'),
              current_x_position = current_bars.index(current_bar_container);

          //console.log('has_eighth', has_eighth);
          //console.log('has_chord', has_chord);
          ////console.log('all_fields', all_fields.length);   
          //console.log('current_field', current_field.attr('name'));    
          //console.log('x', current_x_position); 
          //console.log('y', current_y_position); 

          if(has_eighth && (has_chord || has_finger)) {
            travel = 2;
          }

          switch(direction) {
            case 'up':
              //up arrow 
              //console.log('up');
              new_field = current_bar_inputs.eq(current_y_position-1);
              break;
            case 'down':
              //down arrow 
              //console.log('down');
              new_field = current_bar_inputs.eq(current_y_position+1);
              if(!new_field.attr('name')){
                new_field = current_bar_inputs.eq(0);
                //console.log('@bottom:', new_field);
              }
              break;
            case 'left':
              //left arrow 
              //console.log('left');
              if(has_eighth) {
                if (has_chord || has_finger) {
                  new_field = current_bars.eq(current_x_position-travel).find('input:visible').eq(current_y_position);
                } else {
                  if(current_x_position%2 == 0) {
                    new_field = current_bars.eq(current_x_position-1).find('input:visible').eq(current_y_position-1);
                  } else {
                    new_field = current_bars.eq(current_x_position-1).find('input:visible').eq(current_y_position+1);
                  }
                }
              } else {

              }
              break;
            case 'right':
              //right arrow 
              //console.log('right');
              if(has_eighth) {
                if (has_chord || has_finger) {
                  new_field = current_bars.eq(current_x_position+travel).find('input:visible').eq(current_y_position);
                  if(!new_field.attr('name')) {
                    new_field = current_bars.eq(0).find('input:visible').eq(current_y_position);
                  }
                } else {
                  if(current_x_position%2 == 0) {
                    new_field = current_bars.eq(current_x_position+1).find('input:visible').eq(current_y_position-1);
                  } else {
                    new_field = current_bars.eq(current_x_position+1).find('input:visible').eq(current_y_position+1);
                  }
                  if(!new_field.attr('name')) {
                    new_field = current_bars.eq(0).find('input:visible').eq(current_y_position+1);
                  }
                }
              } else {

              }
              break;                                     
            default:
              return false;
          }
          //console.log('new_field',  new_field.attr('name')); 
          //console.log(new_field);
          $(new_field).focus();

        },
        moveBar: function(delta){
          //console.log('measureEditView.moveBar: ' + delta);
          if(delta > 0) {
            this.moveField('right');
          } else {
            this.moveField('left');
          }   
              
        },
        addOverlay:function(event) {
          console.log('measureEditView.addOverlay');
          var $overlay = $(this.el).find('.input_overlay'),
              overlay_height = $overlay.height(),
              overlay_width = $overlay.width(),
              $target = $(event.target),
              target_height = $target.height(),
              target_width = $target.width(),
              target_offset = $target.offset(),
              position_left = target_offset.left + target_width + 3,
              position_top = target_offset.top - 2,
              target_type = $target.attr('name').split('_')[0];

          console.log('target_type', target_type);    

          $overlay
            .css({'left': position_left, 'top': position_top})
            .removeClass('hide');

          OverlayView.trigger('overlay:type', target_type);            
        },
        removeOverlay: function(event) {
          var $overlay = $(this.el).find('.input_overlay'),
              $focus = $(this.el).find('input:focus');
          if(!focus) {
            $overlay.addClass('hide');
          }  
        },

        validateAccent: function(event) {
          //console.log('measureEditView.validateAccent');
          //console.log('event:', event);
          var testArray = this.options.collections.accents.pluck('symbol');
          this.validateAgainstArray(event, testArray);
        },
        validateChord: function(event) {
          //console.log('measureEditView.validateChord');
          var testArray = ['Ab', 'A', 'A#','Bb', 'B', 'B#', 'Cb', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#'];

          this.validateAgainstArray(event, testArray);
        },
        validateFinger: function(event) {
          //console.log('measureEditView.validateFinger');
          var testArray = this.options.collections.fingers.pluck('symbol');
          this.validateAgainstArray(event, testArray);          
        },
        validateFret: function(event) {
          //console.log('measureEditView.validateFret');
          var instrument_id = this.model.get('instrument').id,
              instrument_model = this.options.collections.instruments.find(function(instrument){ return instrument.get('id') ==  instrument_id}),
              string_length = instrument_model.get('strings')[0]['length'],//TODO get string # and test against actual string instead of first string
              testArray = [];

          for(var i = 0; i <= string_length; i++) {
            testArray.push(i);
          }    
          this.validateAgainstArray(event, testArray);
        },  
        validateAgainstArray:function(event, testArray) {
          //console.log('measureEditView.validate');
          //console.log('event:', event);
          //console.log('testArray:', testArray);
          //onkeyup="this.value = this.value.toUpperCase();"

          var input = event.target.value.toUpperCase(),
              match = false;

          _.each(testArray, function(item) {
            if (input == item) {
              match = true;
            }
          });
          
          if(input.length == 0) {
            this.displayNoEntry(event.target);
            this.displaySave();
            return;
          }

          if(match) {
            $(event.target).val(input);
            this.displayValidEntry(event.target);
          } else {
            this.displayInvalidEntry(event.target);
          }

          this.displaySave();
        },
        displayNoEntry: function(field) {
          $(field)
            .removeClass('invalid')
            .removeClass('valid'); 
        },
        displayValidEntry: function(field) {
          //console.log('measureEditView.displayValidEntry');
          $(field)
            .removeClass('invalid')
            .addClass('valid');

          this.parseEntry(field);  
        },    
        displayInvalidEntry: function(field) {
          //console.log('measureEditView.displayInvalidEntry');
          $(field)
            .removeClass('valid')
            .addClass('invalid');
        },

        parseEntry:function(field) {
          //console.log('measureEditView.parseEntry');
          //console.log(field);
          var $field = $(field),
              field_name = $field.attr('name'),
              field_val = $field.val(),
              field_name_array = field_name.split('_'),
              attr = field_name_array[0],
              bar = field_name_array[2] - 1,
              strng;

          //console.log(field_name, field_val);    
          //console.log('field_name_array', field_name_array);

          if(field_name_array.length == 5) {
              strng = field_name_array[4] - 1;
          }  

          //console.log(attr, bar, strng);

          this.saveEntry(field_val, attr, bar, strng);
        },

        saveEntry: function(field_val, attr, bar_num, strng) {
          //console.log('measureEditView.saveEntry');
          //console.log('this.model', this.model);

          var positions = this.model.get('positions');

          //console.log('positions', positions);

          if(attr === 'chord') {
            positions.bar[bar_num].chord = field_val;
          } else {
            //console.log('positions.bar', positions.bar);
            //console.log('positions.bar['+ bar_num +']', positions.bar[bar_num]);
            //console.log('positions.bar['+ bar_num +'].pos', positions.bar[bar_num].pos);
            //console.log('positions.bar['+ bar_num +'].pos['+ strng +']', positions.bar[bar_num].pos[strng]);
            //console.log('positions.bar['+ bar_num +'].pos['+ strng +']['+ attr +']', positions.bar[bar_num].pos[strng][attr]);
            positions.bar[bar_num].pos[strng][attr] = field_val;
          }
          this.model.set({'positions': positions});
          this.model.trigger("change:positions");
          //console.log('positions:set:', this.model.get('positions'));
        },

        displaySave: function() {
          var $save = $(this.el).find('.save'),
              all_inputs = $(this.el).find('input'),
              valid_inputs =  all_inputs.filter('.valid');
          if( valid_inputs.length > 0) {
            $save.removeClass('hide');
          } else {
            $save.addClass('hide');
          }
        },

        validateCard: function(card) {
          console.log('measureEditView.validateCard');
          var all_inputs = card.find('input'),
              valid_inputs =  all_inputs.filter('.valid'),
              invalid_inputs = all_inputs.filter('.invalid');
          console.log('invalid_inputs.length', invalid_inputs.length);
          console.log('valid_inputs.length', valid_inputs.length);


          if(invalid_inputs.length == 0 && valid_inputs.length > 0) {
            console.log('true');
            return true;
          } else {
            console.log('false');
            return false;
          }
        },

        saveCard: function(card) {
          console.log('measureEditView.saveCard');
          if(this.validateCard(card)) {
            var instrument_id = this.model.get('instrument').id,
                time_signature_id = this.model.get('time_signature').id,
                chord_id = this.options.collections.chords.search(this.model.get('positions').bar[0].chord)._wrapped[0].id,
                state_id = 3, //Published
                data = {};
            data.strings = this.model.get('strings');
            data.bars = this.model.get('bars');
            data.positions = this.model.get('positions');//this.purgeData(this.model.get('positions'));
            data = JSON.stringify(data);

            this.model.set({'instrument_id': instrument_id, 'time_signature_id': time_signature_id, 'state_id': state_id, 'chord_id': chord_id, 'data': data});

            this.model.save();

            //trigger event card:saved
          }
        },

        purgeData: function(data) {
          console.log('measureEditView.purgeData');
          console.log('full_data:', data);
          var filtered_bars = [];
          filtered_bars = _.filter(data.bar, function(bar){
            console.log('filter_bar');
            var filtered_strings = [],
                has_bar_data = false;
            
            if (bar.chord) {
              has_bar_data = true;
            }
            
            filtered_strings = _.filter(bar.pos, function(strng) {
              console.log('filter_string');
              var has_strng_data = false;
              if (strng.accent || strng.fret || strng.finger) {
                has_bar_data = true;
                has_strng_data = true;
              } else {
                has_strng_data = false;
              }
              console.log('has_strng_data',has_strng_data);
              return has_strng_data;
            });

            bar.pos = $.extend(true, {}, filtered_strings);

            console.log('has_bar_data', has_bar_data);
            return has_bar_data;
          });

          console.log('filtered_data:', data);
          return data;
        },

        saveCards: function(event) {
          console.log('measureEditView.saveCards');
          // loop through visible cards and save
          this.saveCard($(this.el));

        },

        //update template         
        updateInstrument: function(instrument) {
          //console.log('measureEditView.updateInstrument');
          //console.log('instrument', instrument);
          this.model.set('instrument', instrument.toJSON());
          this.model.set('strings', instrument.get('strings').length);
          //console.log('this.model', this.model);
        },
        updateTimeSignature: function(time_signature) {
          //console.log('measureEditView.updateTimeSignature');
          //console.log('time_signature', time_signature);

          this.model.set('time_signature', time_signature.toJSON());
          this.model.set('bars', time_signature.get('upper') * time_signature.get('lower') );

          //console.log('this.model', this.model);
        }, 
        updateGranularity: function(model) {
          //console.log('measureEditView.updateGranularity');
          //console.log('model', model);
        },                      
      });

  window.OverlayView = OverlayView;

  return measureEditView;
}