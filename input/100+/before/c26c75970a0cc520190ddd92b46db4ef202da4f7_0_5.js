function verifyLink(id) {

            var links = mongo.collection('links');
            promises[id-1] = new p.Promise();

            links.find({ linkID: id }).toArray(function(err, result) {
              if (err) {
                promises[id-1].reject(err);
              } else {
                expect(result.length).toBe(1);
                expect(result[0].linkID).toEqual(fixtures[id-1].linkID);
                expect(result[0].shortLink).toEqual(fixtures[id-1].shortLink);
                expect(result[0].longLink).toEqual(fixtures[id-1].longLink);
                promises[id-1].resolve();
              }
            });
          }