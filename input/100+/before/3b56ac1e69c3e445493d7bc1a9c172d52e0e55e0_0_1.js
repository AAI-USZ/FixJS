function(e){
          $(".step2").hide();
          $(".map-long-combo").empty();
          $(".map-lat-combo").empty();
          var containerId=$(e.target).parent().parent().attr("id");
          $("#map-id").val("#"+containerId+">.map");
          var el = $("#"+containerId+" .map");
          var fields = (datasetCollection.models[0]).fields.models;
          for( i in fields){
            $(".map-long-combo").append("<option value='"+fields[i].id+"'>"+fields[i].id+"</option>");
            $(".map-lat-combo").append("<option value='"+fields[i].id+"'>"+fields[i].id+"</option>");
          }
          $("#map-msg").modal('show');
        }