function(response) {
        var expected = {
              statusCode: 200,
              body: '<?xml version="1.0"?>\n' +
                    '<IndexDocumentsResponse xmlns="' + XMLNS + '">' +
                      '<IndexDocumentsResult>' +
                        '<FieldNames>' +
                          '<member>name</member>' +
                        '</FieldNames>' +
                      '</IndexDocumentsResult>' +
                      '<ResponseMetadata>' +
                        '<RequestId></RequestId>' +
                      '</ResponseMetadata>' +
                    '</IndexDocumentsResponse>'
            };
        var actual = {
              statusCode: response.statusCode,
              body: response.body
            };
        assert.deepEqual(actual, expected);

        var dump = database.commandSync('dump', {
              tables: 'companies'
            });
        var expected = 'table_create companies TABLE_HASH_KEY ShortText\n' +
                       'column_create companies name COLUMN_SCALAR ShortText\n' +
                       'table_create companies_BigramTerms ' +
                         'TABLE_PAT_KEY|KEY_NORMALIZE ShortText ' +
                         '--default_tokenizer TokenBigram\n' +
                       'column_create companies_BigramTerms companies_name ' +
                         'COLUMN_INDEX|WITH_POSITION companies name';
        assert.equal(dump, expected);

        done();
      }