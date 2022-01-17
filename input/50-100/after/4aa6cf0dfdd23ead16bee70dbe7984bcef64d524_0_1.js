function() {
            $.post(
               gdn.url('/vanilla/settings/sortcategories.json'),
               {
                  'TreeArray': $('ol.Sortable').nestedSortable('toArray', {startDepthCount: 0}),
                  'TransientKey': gdn.definition('TransientKey')
               },
               function(response) {
                  if (!response || !response.Result) {
                     alert("Oops - Didn't save order properly");
                  }
               }
            );
         }