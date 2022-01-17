function (autoCompleteData) {

          // Filter items that has already been mentioned
          var mentionValues = _.pluck(self.mentionsCollection, 'value');

          autoCompleteData = _.reject(autoCompleteData, function (item) {
            return _.include(mentionValues, item.name);
          });

          self.autoCompleter.populate(autoCompleteData, query);

        }