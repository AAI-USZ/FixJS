function(i, val){
                    var clear = $('<div>').css('clear','both');
                    var container = $('<div>');
                    var s_country = $('<div>').css('float','left');
                    var more_region = $('<div>').css('float','right');
                    var link = $('<a>').addClass('view-more');

                    s_country.append('<a class="close" onclick="return delete_dialog(\'' + val.pk_i_id + '\', \'delete_region\');" href="' + base_url + 'index.php?page=settings&action=locations&type=delete_region&id=' + val.pk_i_id + '"><img src="' + base_url + 'images/close.png" alt="' + s_close + '" title="' + s_close + '" /></a>');
                    s_country.append('<a href="javascript:void(0);" class="edit" onclick="edit_region($(this), ' + val.pk_i_id + ');" style="padding-right: 15px;">' + val.s_name + '</a>');
                    link.attr('href', 'javascript:void(0)');
                    link.click(function(){
                        show_city(val.pk_i_id);
                    });
                    link.append(s_view_more + ' &raquo;');
                    more_region.append(link);
                    container.append(s_country).append(more_region);
                    div_regions.append(container);
                    div_regions.append(clear);
                }