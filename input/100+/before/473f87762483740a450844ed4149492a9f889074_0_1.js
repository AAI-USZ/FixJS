function ()
                      {
                        if ($(this).val())
                        {
                          // For each item, select HTML contents and value of
                          // <option/>
                          //
                          // Selecting HTML contents is important for
                          // <em>Untitled</em>
                          dataSource.liveData.push([$(this).html(), $(this).val()]);
                        }
                      }