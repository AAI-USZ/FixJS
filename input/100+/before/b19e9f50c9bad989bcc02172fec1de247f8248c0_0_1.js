function (doc) {
            if (! memoryQuery.filterTest(doc, ns)) {
              if (currResult.id !== doc.id) return;
              var results = equivFindQuery.syncRun(searchSpace);
              if (results.length) {
                return model.set(pointerPath, results[0].id);
              }
              return model.set(pointerPath, null);
            }
            var comparator = memoryQuery._comparator
              , comparison = comparator(doc, currResult);
            if (comparison < 0) model.set(pointerPath, doc.id);
          }