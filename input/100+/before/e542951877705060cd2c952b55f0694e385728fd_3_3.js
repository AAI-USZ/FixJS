function(card) {
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
        }