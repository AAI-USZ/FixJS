function(describe, it) {
      var childCollectionLevel2, childCollectionLevel3, childCollectionLevel4, parentCollection;
      parentCollection = queryEngine.createCollection(models);
      childCollectionLevel2 = parentCollection.findAllLive({
        tags: {
          $has: ['jquery']
        }
      });
      childCollectionLevel3 = childCollectionLevel2.findAllLive({
        tags: {
          $has: ['html5']
        }
      });
      childCollectionLevel4 = childCollectionLevel3.findAllLive({
        category: 1
      });
      it('removes triggered by changes trickle through children correctly', function() {
        var actual, expected;
        parentCollection.where({
          id: 'history'
        })[0].set({
          'tags': ['html5', 'history']
        });
        actual = childCollectionLevel4.toJSON();
        expected = [];
        return assert.deepEqual(actual, expected);
      });
      return it('additions triggered by changes trickle through children correctly', function() {
        var actual, expected;
        parentCollection.where({
          id: 'history'
        })[0].set({
          'tags': ['jquery', 'html5', 'history']
        });
        actual = childCollectionLevel4.toJSON();
        expected = [modelsObject.history];
        return assert.deepEqual(actual, expected);
      });
    }