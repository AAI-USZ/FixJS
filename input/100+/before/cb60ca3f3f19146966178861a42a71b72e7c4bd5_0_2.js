function(){
          $("#import-url-dialog").modal('hide'); 
          $("#wait-msg").modal('show');
          $("#progress-bar").css("width", "20%");          
          var source = $("#dataset-url").val();
          counter++;
          console.log("source: "+source);
          url = serverUri+'/dataset/'+source.replace(/^http:\/\//gi, '');
            var currentObj = this;
            $.ajax({
                url: url,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: function(d){
                  $("#progress-bar").css("width", "50%");          
                  console.log("Local identifier: "+d.data);
                  source = d.data;
                  if(source == "nil" || source == ""){
                    $("#wait-msg").modal('hide');
                    $("#error-msg").modal('show');
                  }else{
                    var datasetInfo = {
                      id: 'my-dataset'+(counter),
                      url: source,
                      format: 'csv',
                      webstore_url: source,
                    };
                    type = 'dataproxy';
                    var dataset = null;
                    dataset = new recline.Model.Dataset(datasetInfo, type);
                    dataset.backend.dataproxy_url = dataproxy_url;
                    containerId = "mycontainer"+(counter);
                    visId = "grid"+(counter);
                    newDiv = $('<div class="viz-container" id="'+containerId+'"><div class="grid recline-read-only" id="'+(visId)+'"><div style="display:inline-block;"><button id="'+visId+'-grid" type="button" class="btn-warning btn btn-small menu-button export-dialog"><i class="icon-share"></i> Share this visualization</button></div></div></div>');
                    newDiv.appendTo('#content');
                    currentObj._addProvenance({ id: visId, visType: 'grid', source: source});
                    $("<div class='graph' id='graph"+(counter)+"'></div>").appendTo(newDiv);
                    $("<div class='map' id='map"+(counter)+"'></div>").appendTo(newDiv);

                    var $el = $('#'+visId);
                    var grid = new recline.View.Grid({
                        model: dataset,
                        state: {
                          provenance: provenance
                        }
                    });
                    $el.append(grid.el);
                    grid.render();
                    datasetCollection.add(dataset);
                    dataset.fetch().done(function() {
                        dataset.query().done(function(data) {
                            // The grid will update automatically
                            // Log some data as an example
                        });
                    });
                    $("#progress-bar").css("width", "90%");
                    newDiv.prepend('<div class="button-container"><button data-id="'+dataset.id+'" type="button" class="btn menu-button btn-small btn-danger remove-dataset" >×</button><button data-id="${id}" type="button" class="btn-small btn-info btn menu-button create-graph-dialog"><i class="icon-picture"></i> Graph</button><button type="button" class="btn-info btn btn-small menu-button create-map-dialog"><i class="icon-map-marker"></i> Map</button><div id="content"><span class="step2 hide"><img style="position:fixed; top:50px;left:160px;"src="img/step2_en.png"/></span></div>')
                    currentObj._drawEditedVisualizations();
                    $(".step2").show();
                    $("#wait-msg").modal('hide');
                  }
                },
                error: function(request,error){
                  $("#wait-msg").modal('hide');
                  $("#error-msg").modal('show');
                }
            });
        }