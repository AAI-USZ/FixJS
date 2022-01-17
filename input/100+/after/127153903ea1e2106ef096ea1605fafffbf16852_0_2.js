function(err, cursor) {
        if (err != null) {
          console.log('Error retrieving responses for survey ' + surveyid + ': ' + err.message);
          response.send(500);
          return;
        }

        cursor.toArray(function(err, items) {

          // Limit the items
          //if list:
          //  for each in list: 
          //    items = each(list)

          // Start with some basic headers
          var headers = ['parcel_id', 'collector', 'timestamp', 'source'];

          // Record which header is at which index
          var headerIndices = {};
          var headerCount = {};
          var i;
          for (i = 0; i < headers.length; i++) {
            headerIndices[headers[i]] = i;
            headerCount[headers[i]] = 1;
          }

          // Iterate over each response
          var rows = [];
          var len = items.length;
          for (i = 0; i < len; i++) {
            var responses = items[i].responses;

            // Add context entries (parcel ID, source type)
            var row = [
              items[i].parcel_id, 
              items[i].source.collector,
              items[i].created,
              items[i].source.type
            ];

            // Then, add data about the element
            for (var resp in responses) {
              if (responses.hasOwnProperty(resp)) {
                // If we haven't encountered this column, track it.
                if (!headerIndices.hasOwnProperty(resp)) {
                  headerIndices[resp] = headers.length;
                  headerCount[resp] = 1;
                  headers.push(resp);
                  // Add an empty entry to each existing row, since they didn't
                  // have this column.
                  for (var j = 0; j < rows.length; j++) {
                    rows[j].push('');
                  }
                }
                var entry = responses[resp];

                // Check if we have multiple answers.
                if (isArray(entry)) {
                  if (entry.length > headerCount[resp]) {
                    headerCount[resp] = entry.length;
                  }
                }

                // Add the response to the CSV row.
                row[headerIndices[resp]] = responses[resp];
              }
            }

            // Add the CSV row.
            rows.push(row);
          } // End loop over every result


          // CSV output
          response.writeHead(200, {
            'Content-Type': 'text/csv'
          });
          // Turn each row into a CSV line
          response.write(listToCSVString(headers, headers, headerCount));
          response.write('\n');
          for (i = 0; i < len; i++) {
            response.write(listToCSVString(rows[i], headers, headerCount));
            response.write('\n');
          }
          response.end();

        }); // end cursor.toArray()
      }