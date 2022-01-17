function(){
                            cur_index = $(this).attr('data-index');
                            info.data.values[cur_index] = {
                                'val':info.data.orig_select[cur_index].val,
                                'txt':info.data.orig_select[cur_index].txt
                            };
                        }