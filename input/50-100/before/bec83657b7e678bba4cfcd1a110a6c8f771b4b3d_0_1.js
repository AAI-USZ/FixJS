function process(cell, x) {
    switch (x) {
        case '1':
            cell.removeClass('cell-free');
            cell.addClass('cell-o');
            cell.off('click');
            break;
        case '3': 
            cell.removeClass('cell-free');
            cell.addClass('cell-x');
            cell.off('click');
            break;
    }
}