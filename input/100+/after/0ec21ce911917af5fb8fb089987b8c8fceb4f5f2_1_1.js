function(table, colIndex, numerical, direction)
    {
        var headerRow = table.querySelector(".netHeaderRow");

        // Remove class from the currently sorted column
        var headerSorted = Dom.getChildByClass(headerRow, "netHeaderSorted");
        Css.removeClass(headerSorted, "netHeaderSorted");
        if (headerSorted)
            headerSorted.removeAttribute("aria-sort");

        // Mark new column as sorted.
        var header = headerRow.childNodes[colIndex];
        Css.setClass(header, "netHeaderSorted");

        // If the column is already using required sort direction, bubble out.
        if ((direction == "desc" && header.sorted == 1) ||
            (direction == "asc" && header.sorted == -1))
            return;

        var newDirection = ((header.sorted && header.sorted == 1) || (!header.sorted && direction == "asc")) ? "ascending" : "descending";
        if (header)
            header.setAttribute("aria-sort", newDirection);

        var tbody = table.lastChild;
        var colID = header.getAttribute("id");

        table.setAttribute("sortcolumn", colID);
        table.setAttribute("sortdirection", newDirection);

        var values = [];
        for (var row = tbody.childNodes[1]; row; row = row.nextSibling)
        {
            if (!row.repObject)
                continue;

            if (Css.hasClass(row, "history"))
                continue;

            var cell = row.childNodes[colIndex];
            var sortFunction = function sort(a, b) { return a.value < b.value ? -1 : 1; };
            var ipSortFunction = function sort(a, b)
            {
                var aParts = reSplitIP.exec(a.value);
                var bParts = reSplitIP.exec(b.value);

                if (!aParts)
                    return -1;
                if (!bParts)
                    return 1;

                for (var i=1; i<aParts.length; ++i)
                {
                    if (parseInt(aParts[i]) != parseInt(bParts[i]))
                        return parseInt(aParts[i]) < parseInt(bParts[i]) ? -1 : 1;
                }

                return 1;
            };
            var value;

            switch (colID)
            {
                case "netTimeCol":
                    FBTrace.sysout("row.repObject", row.repObject);
                    value = row.repObject.requestNumber;
                    break;
                case "netSizeCol":
                    value = row.repObject.size;
                    break;
                case "netRemoteAddressCol":
                case "netLocalAddressCol":
                    value = cell.textContent;
                    sortFunction = ipSortFunction;
                    break;
                default:
                    value = numerical ? parseFloat(cell.textContent) : cell.textContent;
            }

            if (Css.hasClass(row, "opened"))
            {
                var netInfoRow = row.nextSibling;
                values.push({row: row, value: value, info: netInfoRow});
                row = netInfoRow;
            }
            else
            {
                values.push({row: row, value: value});
            }
        }

        values.sort(sortFunction);

        if (newDirection == "ascending")
        {
            Css.removeClass(header, "sortedDescending");
            Css.setClass(header, "sortedAscending");
            header.sorted = -1;

            for (var i = 0; i < values.length; ++i)
            {
                tbody.appendChild(values[i].row);
                if (values[i].info)
                    tbody.appendChild(values[i].info);
            }
        }
        else
        {
            Css.removeClass(header, "sortedAscending");
            Css.setClass(header, "sortedDescending");

            header.sorted = 1;

            for (var i = values.length-1; i >= 0; --i)
            {
                tbody.appendChild(values[i].row);
                if (values[i].info)
                    tbody.appendChild(values[i].info);
            }
        }

        // Make sure the summary row is again at the end.
        var summaryRow = tbody.getElementsByClassName("netSummaryRow").item(0);
        tbody.appendChild(summaryRow);
    }