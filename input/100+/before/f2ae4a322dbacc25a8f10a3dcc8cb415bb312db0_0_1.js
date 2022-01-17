function(id, name, cell_data, parent_id, comparable){
            var cells = [], insert,
                row_level,
                cell_columns = utils.keys(cell_data),
                child_list,
                has_children = models.rows.has_children(id);
 
            if( models.mode === "results" ){           
                row_level = models.rows.get_nested_level(id);
            } else {
                row_level = 3;
            }

            utils.each(models.columns, function(value, key){
                in_column = utils.include(cell_columns, key) ? true : false;
                
                if( in_column ){
                    cells.push({'in_column' : in_column, 'display' : cell_data[key]['display'], 'span' : value['span'],
                                'id' : key, 'hover' : cell_data[key]['hover'], 'comparable' : comparable });
                } else {
                    cells.push({ 'in_column' : in_column, 'id' : key, 'span' : value['span'] });
                }
            });

            add_row_header(id, name, row_level, has_children, parent_id);

            if( parent_id ){
                child_list = $('#child_list_' + parent_id);
                
                child_list.append(templates.row(id, utils.size(models.columns), cells, row_level, has_children, parent_id));
            } else {
                grid_content_el.append(templates.row(id, utils.size(models.columns), cells, row_level, has_children));
            }

            if( has_children ){
                add_row_collapse(id);
            }
        }