function(surface, data){
    var dt = this;
    if (!("dynamictables" in window)){
        window.dynamictables = [];
    }
    dynamictables.push(dt);

    dt.surface = $(surface);
    dt.columns = data.columns;
    dt.data = {};
    dt.row_divs_by_uri = {};

    dt.next_css_class = 1;
    dt.uri_to_css_class = {};

    dt.class_prefix = "dyntab_"; // TODO allow customisable
    dt.min_col_width = 50; // TODO allow customisable

    dt.render(); // render basic table
    dt.add_data(data.data); // add data and save into object
    dt.add_resizers(); // add the column resizers
}