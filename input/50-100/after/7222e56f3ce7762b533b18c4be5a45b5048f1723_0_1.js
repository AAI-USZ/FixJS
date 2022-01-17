function(row) {
          var hasFooInTitle = (row.title.toLowerCase().indexOf('foo') !== -1)
            , hasFooInContent = (row.content.toLowerCase().indexOf('foo') !== -1)

          expect(hasFooInTitle || hasFooInContent).toBeTrue()
        }