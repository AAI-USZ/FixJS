function(html)
    {
      $('#uncollapse').after(html);
      if(start<=0) $('#uncollapse').hide();
      $('#uncollapse_loading').hide();
      $('#uncollapse_links').show();
    }