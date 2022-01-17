function wpgmappity_set_alignment_event(map, data) {
  jQuery("input[name='wpgmappity_float']").change(function(){
    data.alignment = jQuery(this).attr("value");
  });
}