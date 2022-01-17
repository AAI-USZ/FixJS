function (doc) {
            if (!memoryQuery.filterTest(doc, ns)) {
              if ((currResult && currResult.id) !== doc.id) return;
              var results = equivFindQuery.syncRun(searchSpace);
              if (results.length) {
                return model.set(pointerPath, results[0].id);
              }
              return model.set(pointerPath, null);
            }
            var comparator = memoryQuery._comparator;
            if (!comparator) return;
            if (comparator(doc, currResult) < 0) {
              model.set(pointerPath, doc.id);
            }
          }