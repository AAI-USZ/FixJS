function (responseData) {

          // Filter items that has already been mentioned
          var mentionValues = _.pluck(this.mentionsCollection, 'value');

          responseData = _.reject(responseData, function (item) {
            return _.include(mentionValues, item.name);
          });

          self.autoCompleter.populate(responseData, query);

        }