function _scrollBody()
    {
        var body = document.getElementById(_id + '_body'), rowData, row, cell, i, data;
        for (i = _previousPos; i < _currentPos; i++) _deleteRow(i);
        for (i = _previousPos; i > _currentPos; i--) _deleteRow(i);
        var cnt = _countFunc();

        var firstChild = body.firstChild;
        for (i = _currentPos; i < cnt && i < _currentPos + _visibleRows; i++) {
            if (_shown[i]) continue;
            rowData = _fetchFunc(i);
            row = document.createElement('div');
            row.id = _id + '_row_' + i;
            row.style.height = _rowHeight + 'px';
            row.className = 'grid_row';

            var bgcolor = '';
            if (_colorForRowFunc) bgcolor = _colorForRowFunc(rowData, i);
            if (!bgcolor && _zebraColor && i % 2 == 0) bgcolor = _zebraColor;
            if (bgcolor) row.style.backgroundColor = bgcolor;

            for (var k in _fields) {
                cell = document.createElement('div');
                cell.className = 'grid_row_cell';
                cell.style.width = (_colWidth(k) - 5) + 'px'; // padding is 3+3 px
                cell.style.height = _rowHeight + 'px';
                cell.style.lineHeight = _rowHeight + 'px';
                data = rowData[k];
                // if data() is a function, then it must supply the corresponding DOM element
                if (typeof(data) != "function") {
                    cell.appendChild(document.createTextNode(data));
                } else {
                    cell.appendChild(data());
                }

                (function(i) {
                    cell.addEventListener('mousedown', function(e) {
                        e.preventDefault && e.preventDefault();
                        e.stopPropagation && e.stopPropagation();
                        _rowClickFunc && _rowClickFunc(_fetchFunc(i), i, e);
                        return false;
                    });
                })(i);

                row.appendChild(cell);
            }

            if (firstChild && i <= _previousPos) {
                body.insertBefore(row, firstChild);
            } else {
                body.appendChild(row);
            }

            _shown[i] = true;
        }

        var el = _rowEl(_previousPos);
        if (el) el.style.marginTop = '';
        el = _rowEl(_currentPos);
        if (el) el.style.marginTop = '-' + (_currentOffset - _currentPos * _rowHeight) + 'px';

        _previousPos = _currentPos;

    }