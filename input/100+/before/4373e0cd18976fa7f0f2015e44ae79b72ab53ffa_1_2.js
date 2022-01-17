function(event){
        var search = utils.extend($.bbq.getState('search'), event.cell_data);
          search.offset = event.offset;

        $.ajax({
          type: 'POST',
          contentType:"application/json",
          url: more_results_urls[search.content_type],
          cache: false,
          data: JSON.stringify(search),
          success: function(data){
            $(document).trigger('show_more.comparison_grid', [data]);
          }
        })
      }