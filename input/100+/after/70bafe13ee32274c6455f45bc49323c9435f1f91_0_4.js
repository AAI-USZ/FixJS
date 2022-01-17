function () {
    this.textboxes = $();
    var ce = sagecell.util.createElement;
    var table = ce("table");
    for (var row = 0; row < this.control.nrows; row++) {
        var tr = ce("tr");
        for (var col = 0; col < this.control.ncols; col++) {
            var textbox = ce("input", {"value": this.control["default"][row][col],
                                       "size": this.control.width});
            this.textboxes = this.textboxes.add(textbox);
            tr.appendChild(ce("td", {}, [textbox]));
        }
        table.appendChild(tr);
    }
    return table;
}