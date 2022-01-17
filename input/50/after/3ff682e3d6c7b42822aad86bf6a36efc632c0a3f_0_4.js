function() {
       State.load();
       State.iterate(function(name, date) {
         $('#' + name).attr('checked', true).checkboxradio('refresh');
       });
       update_numbers();
     }