function() {
            $.post(
               gdn.url('/vanilla/settings/sortcategories/'),
               {
                  'TreeArray': $('ol.Sortable').nestedSortable('toArray', {startDepthCount: 0}),
                  'DeliveryType': 'VIEW',
                  'TransientKey': gdn.definition('TransientKey')
               },
               function(response) {
                  if (response != 'TRUE') {
                     alert("Oops - Didn't save order properly");
                  }
               }
            );
         }