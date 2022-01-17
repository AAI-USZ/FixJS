function(event){
        var search = $.bbq.getState('search'),
            data_out = event.cell_data,
            type = search.content_type;
            ajax_type = undefined; 
        if (search.subgrid && search.subgrid.type){
            type = search.subgrid.type;
        }
        console.log(type);
        data_out.offset = event.offset;
        if(more_results_urls[type].include_search){ 
            data_out = utils.extend(data_out, search);
            ajax_type = "application/json";
            data_out = JSON.stringify(data_out);
        }
        $.ajax({
          type: more_results_urls[type].method,
          contentType:ajax_type,
          url: more_results_urls[type].url,
          cache: false,
          data: data_out,
          success: function(data){
            $(document).trigger('show_more.comparison_grid', [data]);
          }
        })
      }