function(i, val){
                    var clear = $('<div>').css('clear','both');
                    var container = $('<div>');
                    var s_region = $('<div>').css('float','left');
                    s_region.append('<a class="delete" class="close" onclick="javascript:return confirm(\'This action can not be undone. Items with this location associated will be deleted. Are you sure you want to continue?\');"  href="' + base_url + 'index.php?page=settings&action=locations&type=delete_city&id=' + val.pk_i_id + '"><img src="' + base_url + 'images/close.png" alt="' + s_close + '" title="' + s_close + '" /></a>');//OJO ELIMINADI ID REPEDITO
                    s_region.append('<a href="javascript:void(0);" class="edit" onclick="edit_city($(this), ' + val.pk_i_id + ');" style="padding-right: 15px;">' + val.s_name + '</a>');
                    container.append(s_region);
                    div_regions.append(container);
                    div_regions.append(clear);
                }