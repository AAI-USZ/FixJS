function(){
    var templates = KT.comparison_grid.templates,
        utils = KT.utils,
        events,
        models = KT.comparison_grid.models(),
        num_columns_shown = 0,
        grid_row_headers_el,
        grid_content_el,
        max_visible_columns = 5;

    var init = function(){
            events = KT.comparison_grid.events(this).init();
            grid_row_headers_el = $('#grid_row_headers');
            grid_content_el = $('#grid_content');
            controls = KT.comparison_grid.controls(this);
        },
        add_row = function(id, name, cell_data, parent_id, comparable){
            var cells = [], row_level,
                child_list,
                cell_columns = utils.keys(cell_data),
                has_children = models.rows.has_children(id);
 
            if( models.mode === "results" ){           
                row_level = models.rows.get_nested_level(id);
            } else {
                row_level = 3;
            }

            utils.each(models.columns, function(col){
                in_column = utils.include(cell_columns, col['id']) ? true : false;
                
                if( in_column ){
                    cells.push({'in_column' : in_column, 'display' : cell_data[key]['display'], 'span' : col['span'],
                                'id' : col['id'], 'hover' : cell_data[key]['hover'], 'comparable' : comparable, 'row_id' : id });
                } else {
                    cells.push({ 'in_column' : in_column, 'id' : col['id'], 'span' : col['span'], 'row_id' : id });
                }
            });

            add_row_header(id, name, row_level, has_children, parent_id);

            if( parent_id ){
                child_list = $('#child_list_' + parent_id);
                
                if( child_list.find('.load_row').length > 0 ){
                    child_list.find('.load_row').before(templates.row(id, models.columns.length, cells, row_level, has_children, parent_id));
                } else {
                    child_list.append(templates.row(id, models.columns.length, cells, row_level, has_children, parent_id));
                }
            } else {
                if( grid_content_el.children('.load_row').length > 0 ) {
                    grid_content_el.children('.load_row').before(templates.row(id, models.columns.length, cells, row_level, has_children));
                } else {
                    grid_content_el.append(templates.row(id, models.columns.length, cells, row_level, has_children));
                }
            }
        },
        add_metadata_row = function(id, parent_id, page_size, current, total){
            var child_list;

            if( $('.load_row[data-id="' + id + '"]').length === 0 ){
                add_metadata_row_header(id, parent_id);

                if( parent_id ){
                    child_list = $('#child_list_' + parent_id);
                    child_list.append(templates.load_more_row(id, page_size, current, total));
                } else {
                    grid_content_el.append(templates.load_more_row(id, page_size, current, total));
                }
            }
        },
        add_metadata_row_header = function(id, parent_id) {
            var child_list;

            if( parent_id ){
                child_list = $('#child_header_list_' + parent_id);
                
                child_list.append(templates.load_more_row_header(id, parent_id));
            } else {
                grid_row_headers_el.append(templates.load_more_row_header(id, parent_id));
            }
        },
        update_metadata_row = function(id, current, total){
            var metadata_row = $('.load_row[data-id="' + id + '"]');

            metadata_row.find('span').html(i18n.counts.replace('%C', current).replace('%T', total));
        },
        add_row_header = function(id, name, row_level, has_children, parent_id) {
            var child_list;

            if( parent_id ){
                child_list = $('#child_header_list_' + parent_id);
                
                if( child_list.find('.load_row_header').length > 0 ){
                    child_list.find('.load_row_header').before(templates.row_header(id, name, row_level, has_children, parent_id));
                } else {
                    child_list.append(templates.row_header(id, name, row_level, has_children, parent_id));
                }
            } else {

                if( grid_row_headers_el.children('.load_row_header').length > 0 ) {
                    grid_row_headers_el.children('.load_row_header').before(templates.row_header(id, name, row_level, has_children, parent_id));
                } else {
                    grid_row_headers_el.append(templates.row_header(id, name, row_level, has_children, parent_id));
                }
            }
        },
        add_rows = function(append) {
            append = (append === undefined) ? false : append;

            if( !append ){
                grid_content_el.empty();
                grid_row_headers_el.empty();
            }

            if( append ){
                utils.each(append, function(row, key) {
                    if( row['metadata'] ){
                        update_metadata_row(row['id'], row['current'], row['total']);
                    } else {
                        add_row(row['id'], row['name'], row['cells'], row['parent_id'], row['comparable']);
                    }
                });
            } else {
                utils.each(models.rows.get(), function(row, key) {
                    if( row['metadata'] ){
                        add_metadata_row(row['id'], row['parent_id'], row['page_size'], row['current'], row['total']);
                    } else {
                        add_row(row['id'], row['name'], row['cells'], row['parent_id'], row['comparable']);
                    }
                });
            }

            utils.each(models.columns, function(column){
                if( column['shown'] ){
                    $('.cell_' + column['id']).show();
                } else {
                    $('.cell_' + column['id']).hide();
                }
            });
            
            if( models.columns.length > max_visible_columns ){
                $('.grid_row').css('width', 
                    utils.reduce(models.columns, function(memo, col){ return ((parseInt(col['span'], 10) * 100) + memo); }, 0));
            } else {
                $('.grid_row').css('width', 500);
            }

            $('.load_row').find('.spinner').css('visibility', 'hidden');
            $('.load_row').find('a').removeClass('disabled');

            set_loading(false);
        },
        set_rows = function(data, initial) {
            var append_rows, insert;

            if( initial ){
                models.rows.clear();
            } else {
                append_rows = []
            }

            utils.each(data, function(item) {
                if( item['metadata'] ){
                    insert = models.rows.insert_metadata(item['id'], item['parent_id'], item['page_size'], item['current_count'], item['total'], item['data']);

                    if( !initial ){
                        append_rows.push(insert);
                    }
                } else {
                    insert = models.rows.insert(item['id'], item['name'], item['cols'], item['parent_id'], item['comparable']);

                    if( !initial ){
                        append_rows.push(insert);
                    }
                }
            });

            if( initial ){
                add_rows();
            } else {
                add_rows(append_rows);
            }
        },
        add_columns = function() {
            $('#column_headers').empty();

            utils.each(models.columns, function(column) {
                add_column_header(column['id'], column['to_display'], column['span']);
            });
        },
        add_column_header = function(id, to_display, span) {
            var column_headers = $('#column_headers');

            column_headers.append(templates.column_header(id, to_display, span));
        },
        set_columns = function(data){
            models.columns = [];

            utils.each(data, function(col) {
                models.columns.push({ 'id' : col['id'], 'to_display' : col['name'], 
                                            'span' : col['span'] ? col['span'] : 1 });
            });

            add_columns();
        },
        show_columns = function(data){
            var last_visible,
                previous_num_shown = num_columns_shown;

            num_columns_shown = 0;

            utils.each(models.columns, function(column){
                if( data[column['id']] ){
                    column['shown'] = true;
                    num_columns_shown += parseInt(column['span'], 10);
                    $('.cell_' + column['id']).show();
                    $('#column_' + column['id']).show();
                } else {
                    column['shown'] = false;
                    $('#column_' + column['id']).hide();
                    $('.cell_' + column['id']).hide();
                }
            });

            $('#column_headers').width(num_columns_shown * 100);

            if( num_columns_shown > max_visible_columns ){

                if( previous_num_shown > num_columns_shown ){
                    if( $('#column_headers').find(':not(:hidden)').last().position().left + 100 === -($('#column_headers').position().left) + 400 ){
                        controls.horizontal_scroll.slide('right');
                    }
                }
                controls.horizontal_scroll.show();            
                $('#column_headers_window').width(100 * max_visible_columns);
            } else {
                controls.horizontal_scroll.reset();
                controls.horizontal_scroll.hide();
                $('#column_headers_window').width(num_columns_shown * 100);
            }
        },
        set_loading = function(show){
            if( show ){
                $('#grid_loading_screen').height($('#grid_content_window').height()).show();
            } else {
                $('#grid_loading_screen').hide();
            }
        },
        set_mode = function(mode, options){
            var columns_to_show = {};
                
            models.mode = (mode === undefined) ? models.mode : mode;

            if( models.mode === 'results' ){
                controls.column_selector.show();
                utils.each(
                    utils.filter(models.columns, 
                        function(col){
                            return col['shown'] === true;
                        }
                    ),
                    function(element, index) {
                        columns_to_show[element['id']] = {};
                    }
                );
                show_columns(columns_to_show);
                $('#grid_header').find('header h2[data-title="results"]').show();
                $('#grid_header').find('header h2[data-title="details"]').hide();
                $('#return_to_results_btn').hide();
                controls.change_content_select.hide();
            } else if( models.mode === 'details' ){
                controls.column_selector.hide();
                show_columns(models.columns);
                $('#grid_header').find('header h2[data-title="results"]').hide();
                $('#grid_header').find('header h2[data-title="details"]').show();
                $('#grid_header').find('header .button').show();
                controls.change_content_select.show();
            }
            if(options){
                if(options['show_compare_btn']){
                    controls.comparison.show();
                }
                else{
                    controls.comparison.hide();
                }
            }
        },
        set_content_select = function(options, selected){
            controls.change_content_select.set(options, selected);
        },
        set_title = function(title){
            $('#grid_header').find('header h2[data-title="details"]').html(title);
        };

    return {
        init                    : init,
        controls                : function(){return controls;},
        models                  : models,
        export_data             : models.export_data,
        import_data             : models.import_data,
        add_rows                : add_rows,
        set_rows                : set_rows,
        set_columns             : set_columns,
        add_columns             : add_columns,
        show_columns            : show_columns,
        set_loading             : set_loading,
        set_mode                : set_mode,
        set_content_select      : set_content_select,
        set_title               : set_title,
        get_num_columns_shown   : function(){ return num_columns_shown; },
        get_max_visible_columns : function(){ return max_visible_columns; }
    };
}