function scrollToValid(cell, val, i, dir) {
            // Process invalid cells
            if (!cell.hasClass('dw-v')) {
                var cell1 = cell,
                    cell2 = cell,
                    dist1 = 0,
                    dist2 = 0;
                while (cell1.prev().length && !cell1.hasClass('dw-v')) {
                    cell1 = cell1.prev();
                    dist1++;
                }
                while (cell2.next().length && !cell2.hasClass('dw-v')) {
                    cell2 = cell2.next();
                    dist2++;
                }
                // If we have direction (+/- or mouse wheel), the distance does not count
                if (((dist2 < dist1 && dist2 && !dir == 1) || !dist1 || !cell1.hasClass('dw-v') || dir == 1) && cell2.hasClass('dw-v')) {
                    cell = cell2;
                    val = val + dist2;
                }
                else {
                    cell = cell1;
                    val = val - dist1;
                }
                that.temp[i] = cell.attr('data-val').replace(/^_/, '');
            }
            return val;
        }