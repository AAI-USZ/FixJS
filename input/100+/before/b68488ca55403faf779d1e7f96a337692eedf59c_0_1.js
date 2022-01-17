function wpgmappity_import_alignment(data, imported_map) {

switch (imported_map.alignment) {
  case 'none' :
  data.alignment = 'none';
  break;
  case 'left' :
  data.alignment = 'left';
  jQuery('#wpgmappity_float_none').removeAttr('checked');
  jQuery('input:radio[name=wpgmappity_float]:eq(1)').attr('checked', 'checked');
  break;
  case 'center' :
  data.alignment = 'center';
  jQuery('#wpgmappity_float_none').removeAttr('checked');
  jQuery('input:radio[name=wpgmappity_float]:eq(2)').attr('checked', 'checked');
  break;
  case 'right' :
  data.alignment = 'right';
  jQuery('#wpgmappity_float_none').removeAttr('checked');
  jQuery('input:radio[name=wpgmappity_float]:eq(3)').attr('checked', 'checked');
  break;
  }
}