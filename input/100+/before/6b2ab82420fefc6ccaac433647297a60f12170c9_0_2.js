function annotationAdded(evt) {    
    var wkt_data = evt.feature.geometry.toString();
    
    // reinitialize title and body, and copy WKT data as well as bounds
    $("#annotation_body").attr("value", "Add your annotation here!");
    $("#annotation_wkt_data").attr("value", wkt_data);
    
    $("#annotation_boundary_attributes_ne_x").attr("value", evt.feature.geometry.bounds.right);
    $("#annotation_boundary_attributes_ne_y").attr("value", evt.feature.geometry.bounds.top);
    $("#annotation_boundary_attributes_sw_x").attr("value", evt.feature.geometry.bounds.left);
    $("#annotation_boundary_attributes_sw_y").attr("value", evt.feature.geometry.bounds.bottom);
    
    // clear the existing tags
    $("#modal-annotation-tags").empty();
    $("#tagging-help").hide();
    $("#no-tags").show();
    
    // show the popup
    $("#modal-annotation").modal();
    $("#annotation_body").focus();
    $("#annotation_body").select();
  }