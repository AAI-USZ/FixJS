function(response) {
      if (response.error == 'yes')
        $('#head-col2-row1').text('Set Status Error');
      else
        $('#head-col2-row1').text(val);
    }