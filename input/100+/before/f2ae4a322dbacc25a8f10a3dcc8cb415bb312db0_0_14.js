function(i18n) {
    var cell = function(data) {
            var display,                
                hover = data['hover'] ? data['hover'] : "",
                html = "";

            if( data['in_column'] ){
                if( data['display'] !== undefined ){
                    display = data['display'];
                } else {
                    display = '<i class="dot-icon-black" />';
                }
            } else {
                 display = "<span>--</span>";
            }

            if( hover !== "" ){
                html += '<div data-span="' + data['span'] + '" class="grid_cell cell_' + data['id'] + '" data-hover=true>';
            } else {
                html += '<div data-span="' + data['span'] + '" class="grid_cell one-line-ellipsis cell_' + data['id'] + '">';
            }

            html += display; 
            if( hover !== "" ){
                html += '<span class="hidden grid_cell_hover">' + hover + '</span>';
            }

            if( data['comparable'] && data['in_column'] ){
                html += '<input type="checkbox" name="compare" value="" />';
            }
            html += '</div>';

            return html;
        },
        row = function(id, num_columns, cell_data, row_level, has_children, parent_id) {
            var i,
                html ='<div ';
            
            if( parent_id !== undefined ){
                html += 'data-parent_id="' + parent_id + '" ';
            }

            html += 'id="grid_row_' + id  + '" class="grid_row grid_row_level_' + row_level + '"'; 

            if( has_children ){
                html += ' collapsed="false"';
            }

            html += '>';

            for(i = 0; i < num_columns; i += 1){
                html += cell(cell_data[i]);
            }
            html += '</div>';            

            if( has_children ){
                html += '<ul id="child_list_' + id + '"></ul>';
            }

            return html;
        },
        row_header = function(id, name, row_level, has_children, parent_id) {
            var html = '<li data-id="' + id + '" id="row_header_' + id + '" class="one-line-ellipsis row_header grid_row_level_' + row_level + '" ';

            if( parent_id !== undefined ){
                html += 'data-parent_id="' + parent_id + '"';
            }
            
            if( has_children ){
                html += ' data-collapsed="false"';
            }

            html += '>';
            html += '<span>' + name + '</span>';
            html += '</li>';

            if( has_children ){
                html += '<ul id="child_header_list_' + id + '"></ul>';
            }
    
            return html;
        },
        column = function() {
        },
        column_header = function(id, to_display, span) {
            var html = '';
 
            html += '<li data-id="' + id  + '" id="column_' + id + '" data-span="' + span + '" class="one-line-ellipsis column_header hidden">';
            html += to_display;
            html += '</li>';

            return html;
        },
        collapse_arrow = function(){
            return '<i class="down_arrow-icon-black"/><i class="right_arrow-icon-black" style="display:none;"/>';
        },
        load_more_row = function(id, load_size){
            var html = '<div class="load_row grid_row" data-id="' + id + '">';
                
            html += '<a class="load_row_link" href="" >' + i18n.show_more.replace('%P', load_size) + '</a>';
            html += '<i class="down_arrow-icon-black"/>';
            html += '</div>';

            return html;
        };

    return {
        cell            : cell,
        row             : row,
        column_header   : column_header,
        row_header      : row_header,
        load_more_row   : load_more_row,
        collapse_arrow  : collapse_arrow
    }
}