function(cell, record, column, data) {
            cell.innerHTML =  '<a href="' + record.getData('url') + '" title="' + data + '">' + record.getData('class_icon') + '</a>' + '&nbsp;' + '<a href="' + record.getData('url') + '" title="' + data + '">' + data + '</a>';
        }