function(Obj, Firebug, Firefox, Domplate, Locale, Events, Options, Url, Css, Dom, Win, Search, Str,
    Json, Arr, ToggleBranch, DragDrop, NetUtils, NetProgress, Http) {

with (Domplate) {

// ********************************************************************************************* //
// Constants

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;

var panelName = "net";

// ********************************************************************************************* //

const reSplitIP = /^(\d+)\.(\d+)\.(\d+)\.(\d+):(\d+)$/;

/**
 * @domplate Represents a template that is used to render basic content of the net panel.
 */
Firebug.NetMonitor.NetRequestTable = domplate(Firebug.Rep, new Firebug.Listener(),
{
    inspectable: false,

    tableTag:
        TABLE({"class": "netTable", cellpadding: 0, cellspacing: 0, hiddenCols: "",
            "role": "treegrid"},
            THEAD(
                TR({"class": "netHeaderRow netRow focusRow outerFocusRow",
                    onclick: "$onClickHeader", "role": "row"},
                    TD({id: "netBreakpointBar", width: "1%", "class": "netHeaderCell",
                        "role": "columnheader"},
                        "&nbsp;"
                    ),
                    TD({id: "netHrefCol", width: "18%", "class": "netHeaderCell alphaValue a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "netHeaderCellBox",
                            title: Locale.$STR("net.header.URL Tooltip")},
                            Locale.$STR("net.header.URL")
                        )
                    ),
                    TD({id: "netStatusCol", width: "12%", "class": "netHeaderCell alphaValue a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "netHeaderCellBox",
                            title: Locale.$STR("net.header.Status Tooltip")},
                            Locale.$STR("net.header.Status")
                        )
                    ),
                    TD({id: "netProtocolCol", width: "4%", "class": "netHeaderCell alphaValue a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "netHeaderCellBox",
                            title: Locale.$STR("net.header.Protocol Tooltip")},
                            Locale.$STR("net.header.Protocol")
                        )
                    ),
                    TD({id: "netDomainCol", width: "12%", "class": "netHeaderCell alphaValue a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "netHeaderCellBox",
                            title: Locale.$STR("net.header.Domain Tooltip")},
                            Locale.$STR("net.header.Domain")
                        )
                    ),
                    TD({id: "netSizeCol", width: "4%", "class": "netHeaderCell a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "netHeaderCellBox",
                            title: Locale.$STR("net.header.Size Tooltip")},
                            Locale.$STR("net.header.Size")
                        )
                    ),
                    TD({id: "netLocalAddressCol", width: "4%", "class": "netHeaderCell a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "netHeaderCellBox",
                            title: Locale.$STR("net.header.Local IP Tooltip")},
                            Locale.$STR("net.header.Local IP")
                        )
                    ),
                    TD({id: "netRemoteAddressCol", width: "4%", "class": "netHeaderCell a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "netHeaderCellBox",
                            title: Locale.$STR("net.header.Remote IP Tooltip")},
                            Locale.$STR("net.header.Remote IP")
                        )
                    ),
                    TD({id: "netTimeCol", width: "53%", "class": "netHeaderCell a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "netHeaderCellBox",
                            title: Locale.$STR("net.header.Timeline Tooltip")},
                            Locale.$STR("net.header.Timeline")
                        )
                    )
                )
            ),
            TBODY({"class": "netTableBody", "role" : "presentation"})
        ),

    onClickHeader: function(event)
    {
        if (FBTrace.DBG_NET)
            FBTrace.sysout("net.onClickHeader\n");

        // Also support enter key for sorting
        if (!Events.isLeftClick(event) && !(event.type == "keypress" && event.keyCode == 13))
            return;

        var table = Dom.getAncestorByClass(event.target, "netTable");
        var column = Dom.getAncestorByClass(event.target, "netHeaderCell");
        this.sortColumn(table, column);
    },

    sortColumn: function(table, col, direction)
    {
        if (!col)
            return;

        var numerical = !Css.hasClass(col, "alphaValue");

        var colIndex = 0;
        for (col = col.previousSibling; col; col = col.previousSibling)
            ++colIndex;

        // the first breakpoint bar column is not sortable.
        if (colIndex == 0)
            return;

        this.sort(table, colIndex, numerical, direction);
    },

    sort: function(table, colIndex, numerical, direction)
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

        if (header)
            header.setAttribute("aria-sort", header.sorted === -1 ? "descending" : "ascending");

        var tbody = table.lastChild;
        var colID = header.getAttribute("id");

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
                    value = row.repObject.startTime;
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

        if ((header.sorted && header.sorted == 1) || (!header.sorted && direction == "asc"))
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
    },

    supportsObject: function(object, type)
    {
        return (object == this);
    },

    /**
     * Provides menu items for header context menu.
     */
    getContextMenuItems: function(object, target, context)
    {
        var popup = Firebug.chrome.$("fbContextMenu");
        if (popup.firstChild && popup.firstChild.getAttribute("command") == "cmd_copy")
            popup.removeChild(popup.firstChild);

        var items = [];

        // Iterate over all columns and create a menu item for each.
        var table = context.getPanel(panelName, true).table;
        var hiddenCols = table.getAttribute("hiddenCols");

        var lastVisibleIndex;
        var visibleColCount = 0;

        // Iterate all columns except of the first one for breakpoints.
        var header = Dom.getAncestorByClass(target, "netHeaderRow");
        var columns = Arr.cloneArray(header.childNodes);
        columns.shift();
        for (var i=0; i<columns.length; i++)
        {
            var column = columns[i];
            var columnContent = column.getElementsByClassName("netHeaderCellBox").item(0);
            var visible = (hiddenCols.indexOf(column.id) == -1);

            items.push({
                label: columnContent.textContent,
                tooltiptext: columnContent.title,
                type: "checkbox",
                checked: visible,
                nol10n: true,
                command: Obj.bindFixed(this.onShowColumn, this, context, column.id)
            });

            if (visible)
            {
                lastVisibleIndex = i;
                visibleColCount++;
            }
        }

        // If the last column is visible, disable its menu item.
        if (visibleColCount == 1)
            items[lastVisibleIndex].disabled = true;

        items.push("-");
        items.push({
            label: "net.header.Reset_Header",
            tooltiptext: "net.header.tip.Reset_Header",
            command: Obj.bindFixed(this.onResetColumns, this, context)
        });

        return items;
    },

    onShowColumn: function(context, colId)
    {
        var panel = context.getPanel(panelName, true);
        var table = panel.table;
        var hiddenCols = table.getAttribute("hiddenCols");

        // If the column is already present in the list of hidden columns,
        // remove it, otherwise append it.
        var index = hiddenCols.indexOf(colId);
        if (index >= 0)
        {
            table.setAttribute("hiddenCols", hiddenCols.substr(0,index-1) +
                hiddenCols.substr(index+colId.length));
        }
        else
        {
            table.setAttribute("hiddenCols", hiddenCols + " " + colId);
        }

        // Store current state into the preferences.
        Options.set("net.hiddenColumns", table.getAttribute("hiddenCols"));

        panel.updateHRefLabelWidth();
    },

    onResetColumns: function(context)
    {
        var panel = context.getPanel(panelName, true);
        var header = panel.panelNode.getElementsByClassName("netHeaderRow").item(0);

        // Reset widths
        var columns = header.childNodes;
        for (var i=0; i<columns.length; i++)
        {
            var col = columns[i];
            if (col.style)
                col.style.width = "";
        }

        // Reset visibility. Only the Status column is hidden by default.
        panel.table.setAttribute("hiddenCols", "colStatus");
        Options.set("net.hiddenColumns", "colStatus");
    },
});

// ********************************************************************************************* //

/**
 * @domplate Represents a template that is used to render net panel entries.
 */
Firebug.NetMonitor.NetRequestEntry = domplate(Firebug.Rep, new Firebug.Listener(),
{
    fileTag:
        FOR("file", "$files",
            TR({"class": "netRow $file.file|getCategory focusRow outerFocusRow",
                onclick: "$onClick", "role": "row", "aria-expanded": "false",
                $hasHeaders: "$file.file|hasRequestHeaders",
                $history: "$file.file.history",
                $loaded: "$file.file.loaded",
                $responseError: "$file.file|isError",
                $fromBFCache: "$file.file|isFromBFCache",
                $fromCache: "$file.file.fromCache",
                $inFrame: "$file.file|getInFrame"},
                TD({"class": "netDebugCol netCol"},
                   DIV({"class": "sourceLine netRowHeader",
                   onclick: "$onClickRowHeader"},
                        "&nbsp;"
                   )
                ),
                TD({"class": "netHrefCol netCol a11yFocus", "role": "rowheader"},
                    DIV({"class": "netHrefLabel netLabel",
                         style: "margin-left: $file.file|getIndent\\px"},
                        "$file.file|getHref"
                    ),
                    DIV({"class": "netFullHrefLabel netHrefLabel",
                         style: "margin-left: $file.file|getIndent\\px"},
                        "$file.file.href"
                    )
                ),
                TD({"class": "netStatusCol netCol a11yFocus", "role": "gridcell"},
                    DIV({"class": "netStatusLabel netLabel"}, "$file.file|getStatus")
                ),
                TD({"class": "netProtocolCol netCol a11yFocus", "role": "gridcell"},
                    DIV({"class": "netProtocolLabel netLabel"}, "$file.file|getProtocol")
                ),
                TD({"class": "netDomainCol netCol a11yFocus", "role": "gridcell" },
                    DIV({"class": "netDomainLabel netLabel"}, "$file.file|getDomain")
                ),
                TD({"class": "netSizeCol netCol a11yFocus", "role": "gridcell",
                    "aria-describedby": "fbNetSizeInfoTip"},
                    DIV({"class": "netSizeLabel netLabel"}, "$file.file|getSize")
                ),
                TD({"class": "netLocalAddressCol netCol a11yFocus", "role": "gridcell"},
                    DIV({"class": "netAddressLabel netLabel"}, "$file.file|getLocalAddress")
                ),
                TD({"class": "netRemoteAddressCol netCol a11yFocus", "role": "gridcell"},
                    DIV({"class": "netAddressLabel netLabel"}, "$file.file|getRemoteAddress")
                ),
                TD({"class": "netTimeCol netCol a11yFocus", "role": "gridcell",
                    "aria-describedby": "fbNetTimeInfoTip"  },
                    DIV({"class": "netLoadingIcon"}),
                    DIV({"class": "netBar"},
                        "&nbsp;",
                        DIV({"class": "netBlockingBar", style: "left: $file.offset"}),
                        DIV({"class": "netResolvingBar", style: "left: $file.offset"}),
                        DIV({"class": "netConnectingBar", style: "left: $file.offset"}),
                        DIV({"class": "netSendingBar", style: "left: $file.offset"}),
                        DIV({"class": "netWaitingBar", style: "left: $file.offset"}),
                        DIV({"class": "netReceivingBar", style: "left: $file.offset; width: $file.width"},
                            SPAN({"class": "netTimeLabel"}, "$file|getElapsedTime")
                        )
                        // Page timings (vertical lines) are dynamically appended here.
                    )
                )
            )
        ),

    netInfoTag:
        TR({"class": "netInfoRow $file|getCategory outerFocusRow", "role" : "row"},
            TD({"class": "sourceLine netRowHeader"}),
            TD({"class": "netInfoCol", colspan: 8, "role" : "gridcell"})
        ),

    activationTag:
        TR({"class": "netRow netActivationRow"},
            TD({"class": "netCol netActivationLabel", colspan: 9, "role": "status"},
                Locale.$STR("net.ActivationMessage")
            )
        ),

    summaryTag:
        TR({"class": "netRow netSummaryRow focusRow outerFocusRow", "role": "row",
            "aria-live": "polite"},
            TD({"class": "netCol"}, "&nbsp;"),
            TD({"class": "netCol netHrefCol a11yFocus", "role" : "rowheader"},
                DIV({"class": "netCountLabel netSummaryLabel"}, "-")
            ),
            TD({"class": "netCol netStatusCol a11yFocus", "role" : "gridcell"}),
            TD({"class": "netCol netProtocolCol a11yFocus", "role" : "gridcell"}),
            TD({"class": "netCol netDomainCol a11yFocus", "role" : "gridcell"}),
            TD({"class": "netTotalSizeCol netCol netSizeCol a11yFocus", "role": "gridcell"},
                DIV({"class": "netTotalSizeLabel netSummaryLabel"}, "0KB")
            ),
            TD({"class": "netTotalTimeCol netCol netTimeCol a11yFocus", "role":
                "gridcell", colspan: "3"},
                DIV({"class": "netSummaryBar", style: "width: 100%"},
                    DIV({"class": "netCacheSizeLabel netSummaryLabel", collapsed: "true"},
                        "(",
                        SPAN("0KB"),
                        SPAN(" " + Locale.$STR("FromCache")),
                        ")"
                    ),
                    DIV({"class": "netTimeBar"},
                        SPAN({"class": "netTotalTimeLabel netSummaryLabel"}, "0ms")
                    )
                )
            )
        ),

    footerTag:
        TR({"class": "netFooterRow", "style" : "height: 100%"},
            TD({"class": "", colspan: 9})
        ),

    onClickRowHeader: function(event)
    {
        Events.cancelEvent(event);

        var rowHeader = event.target;
        if (!Css.hasClass(rowHeader, "netRowHeader"))
            return;

        var row = Dom.getAncestorByClass(event.target, "netRow");
        if (!row)
            return;

        var context = Firebug.getElementPanel(row).context;
        var panel = context.getPanel(panelName, true);
        if (panel)
            panel.breakOnRequest(row.repObject);
    },

    onClick: function(event)
    {
        if (Events.isLeftClick(event))
        {
            var row = Dom.getAncestorByClass(event.target, "netRow");
            if (row)
            {
                // Click on the rowHeader element inserts a breakpoint.
                if (Dom.getAncestorByClass(event.target, "netRowHeader"))
                    return;

                this.toggleHeadersRow(row);
                Events.cancelEvent(event);
            }
        }
    },

    toggleHeadersRow: function(row)
    {
        if (!Css.hasClass(row, "hasHeaders"))
            return;

        var file = row.repObject;

        Css.toggleClass(row, "opened");
        if (Css.hasClass(row, "opened"))
        {
            var netInfoRow = this.netInfoTag.insertRows({file: file}, row)[0];
            var netInfoCol = netInfoRow.getElementsByClassName("netInfoCol").item(0);
            var netInfoBox = Firebug.NetMonitor.NetInfoBody.tag.replace({file: file}, netInfoCol);

            // Notify listeners so additional tabs can be created.
            Events.dispatch(Firebug.NetMonitor.NetInfoBody.fbListeners, "initTabBody",
                [netInfoBox, file]);

            // Select "Headers" tab by default, if no other tab is selected already.
            // (e.g. by a third party Firebug extension in 'initTabBody' event)
            if (!netInfoBox.selectedTab)
                Firebug.NetMonitor.NetInfoBody.selectTabByName(netInfoBox, "Headers");

            var category = NetUtils.getFileCategory(row.repObject);
            if (category)
                Css.setClass(netInfoBox, "category-" + category);
            row.setAttribute('aria-expanded', 'true');
        }
        else
        {
            var netInfoRow = row.nextSibling;
            var netInfoBox = netInfoRow.getElementsByClassName("netInfoBody").item(0);

            Events.dispatch(Firebug.NetMonitor.NetInfoBody.fbListeners, "destroyTabBody",
                [netInfoBox, file]);

            row.parentNode.removeChild(netInfoRow);
            row.setAttribute('aria-expanded', 'false');
        }
    },

    getCategory: function(file)
    {
        var category = NetUtils.getFileCategory(file);
        if (category)
            return "category-" + category;

        return "category-undefined";
    },

    getInFrame: function(file)
    {
        return !!(file.document ? file.document.parent : false);
    },

    getIndent: function(file)
    {
        // XXXjoe Turn off indenting for now, it's confusing since we don't
        // actually place nested files directly below their parent
        //return file.document.level * indentWidth;
        return 10;
    },

    isNtlmAuthorizationRequest: function(file)
    {
        if (file.responseStatus != 401)
            return false;

        //xxxsz: file.responseHeaders is undefined here for some reason
        var resp = file.responseHeadersText.match(/www-authenticate:\s(.+)/i)[1];
        return (resp && resp.search(/ntlm|negotiate/i) >= 0);
    },

    isError: function(file)
    {
        if (file.aborted)
            return true;

        if (this.isNtlmAuthorizationRequest(file))
            return false;

        var errorRange = Math.floor(file.responseStatus/100);
        return errorRange == 4 || errorRange == 5;
    },

    isFromBFCache: function(file)
    {
        return file.fromBFCache;
    },

    getHref: function(file)
    {
        return (file.method ? file.method.toUpperCase() : "?") + " " +
            Str.cropString(Url.getFileName(file.href), 40);
    },

    getProtocol: function(file)
    {
        return Url.getProtocol(file.href);
    },

    getStatus: function(file)
    {
        var text = "";

        if (file.responseStatus)
            text += file.responseStatus + " ";

        if (file.responseStatusText)
            text += file.responseStatusText;

        return text ? Str.cropString(text) : " ";
    },

    getDomain: function(file)
    {
        return Url.getPrettyDomain(file.href);
    },

    getSize: function(file)
    {
        var size = (file.size >= 0) ? file.size : 0;
        return this.formatSize(size);
    },

    getLocalAddress: function(file)
    {
        var address = file.localAddress ? file.localAddress : "";
        var port = file.localPort ? file.localPort : "";

        var result = address;
        result += result ? ":" : "";
        result += port;
        return result;
    },

    getRemoteAddress: function(file)
    {
        var address = file.remoteAddress ? file.remoteAddress : "";
        var port = file.remotePort ? file.remotePort : "";

        var result = address;
        result += result ? ":" : "";
        result += port;
        return result;
    },

    getElapsedTime: function(file)
    {
        if (!file.elapsed || file.elapsed < 0)
            return "";

        return this.formatTime(file.elapsed);
    },

    hasRequestHeaders: function(file)
    {
        return !!file.requestHeaders;
    },

    formatSize: function(bytes)
    {
        return Str.formatSize(bytes);
    },

    formatTime: function(elapsed)
    {
        return Str.formatTime(elapsed);
    }
});

// ********************************************************************************************* //

Firebug.NetMonitor.NetPage = domplate(Firebug.Rep,
{
    separatorTag:
        TR({"class": "netRow netPageSeparatorRow"},
            TD({"class": "netCol netPageSeparatorLabel", colspan: 8, "role": "separator"})
        ),

    pageTag:
        TR({"class": "netRow netPageRow", onclick: "$onPageClick"},
            TD({"class": "netCol netPageCol", colspan: 8, "role": "separator"},
                DIV({"class": "netLabel netPageLabel netPageTitle"}, "$page|getTitle")
            )
        ),

    getTitle: function(page)
    {
        return page.pageTitle;
    },

    onPageClick: function(event)
    {
        if (!Events.isLeftClick(event))
            return;

        var target = event.target;
        var pageRow = Dom.getAncestorByClass(event.target, "netPageRow");
        var panel = Firebug.getElementPanel(pageRow);

        if (!Css.hasClass(pageRow, "opened"))
        {
            Css.setClass(pageRow, "opened");

            var files = pageRow.files;

            // Move all net-rows from the persistedState to this panel.
            panel.insertRows(files, pageRow);

            for (var i=0; i<files.length; i++)
                panel.queue.push(files[i].file);

            panel.layout();
        }
        else
        {
            Css.removeClass(pageRow, "opened");

            var nextRow = pageRow.nextSibling;
            while (!Css.hasClass(nextRow, "netPageRow") &&
                !Css.hasClass(nextRow, "netPageSeparatorRow"))
            {
                var nextSibling = nextRow.nextSibling;
                nextRow.parentNode.removeChild(nextRow);
                nextRow = nextSibling;
            }
        }
    },
});

// ********************************************************************************************* //

/**
 * @domplate Represents a template that is used to render detailed info about a request.
 * This template is rendered when a request is expanded.
 */
Firebug.NetMonitor.NetInfoBody = domplate(Firebug.Rep, new Firebug.Listener(),
{
    tag:
        DIV({"class": "netInfoBody", _repObject: "$file"},
            TAG("$infoTabs", {file: "$file"}),
            TAG("$infoBodies", {file: "$file"})
        ),

    infoTabs:
        DIV({"class": "netInfoTabs focusRow subFocusRow", "role": "tablist"},
            A({"class": "netInfoParamsTab netInfoTab a11yFocus", onclick: "$onClickTab", "role": "tab",
                view: "Params",
                $collapsed: "$file|hideParams"},
                Locale.$STR("URLParameters")
            ),
            A({"class": "netInfoHeadersTab netInfoTab a11yFocus", onclick: "$onClickTab", "role": "tab",
                view: "Headers"},
                Locale.$STR("Headers")
            ),
            A({"class": "netInfoPostTab netInfoTab a11yFocus", onclick: "$onClickTab", "role": "tab",
                view: "Post",
                $collapsed: "$file|hidePost"},
                Locale.$STR("Post")
            ),
            A({"class": "netInfoPutTab netInfoTab a11yFocus", onclick: "$onClickTab", "role": "tab",
                view: "Put",
                $collapsed: "$file|hidePut"},
                Locale.$STR("Put")
            ),
            A({"class": "netInfoResponseTab netInfoTab a11yFocus", onclick: "$onClickTab", "role": "tab",
                view: "Response",
                $collapsed: "$file|hideResponse"},
                Locale.$STR("Response")
            ),
            A({"class": "netInfoCacheTab netInfoTab a11yFocus", onclick: "$onClickTab", "role": "tab",
               view: "Cache",
               $collapsed: "$file|hideCache"},
               Locale.$STR("Cache")
            ),
            A({"class": "netInfoHtmlTab netInfoTab a11yFocus", onclick: "$onClickTab", "role": "tab",
               view: "Html",
               $collapsed: "$file|hideHtml"},
               Locale.$STR("HTML")
            )
        ),

    infoBodies:
        DIV({"class": "netInfoBodies outerFocusRow"},
            TABLE({"class": "netInfoParamsText netInfoText netInfoParamsTable", "role": "tabpanel",
                    cellpadding: 0, cellspacing: 0}, TBODY()),
            DIV({"class": "netInfoHeadersText netInfoText", "role": "tabpanel"}),
            DIV({"class": "netInfoPostText netInfoText", "role": "tabpanel"}),
            DIV({"class": "netInfoPutText netInfoText", "role": "tabpanel"}),
            DIV({"class": "netInfoResponseText netInfoText", "role": "tabpanel"}),
            DIV({"class": "netInfoCacheText netInfoText", "role": "tabpanel"},
                TABLE({"class": "netInfoCacheTable", cellpadding: 0, cellspacing: 0,
                    "role": "presentation"},
                    TBODY({"role": "list", "aria-label": Locale.$STR("Cache")})
                )
            ),
            DIV({"class": "netInfoHtmlText netInfoText", "role": "tabpanel"},
                IFRAME({"class": "netInfoHtmlPreview", "role": "document"}),
                DIV({"class": "htmlPreviewResizer"})
            )
        ),

    headerDataTag:
        FOR("param", "$headers",
            TR({"role": "listitem"},
                TD({"class": "netInfoParamName", "role": "presentation"},
                    TAG("$param|getNameTag", {param: "$param"})
                ),
                TD({"class": "netInfoParamValue", "role": "list", "aria-label": "$param.name"},
                    FOR("line", "$param|getParamValueIterator",
                        CODE({"class": "focusRow subFocusRow", "role": "listitem"}, "$line")
                    )
                )
            )
        ),

    customTab:
        A({"class": "netInfo$tabId\\Tab netInfoTab", onclick: "$onClickTab",
            view: "$tabId", "role": "tab"},
            "$tabTitle"
        ),

    customBody:
        DIV({"class": "netInfo$tabId\\Text netInfoText", "role": "tabpanel"}),

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    nameTag:
        SPAN("$param|getParamName"),

    nameWithTooltipTag:
        SPAN({title: "$param.name"}, "$param|getParamName"),

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    getNameTag: function(param)
    {
        return (this.getParamName(param) == param.name) ? this.nameTag : this.nameWithTooltipTag;
    },

    getParamName: function(param)
    {
        var name = param.name;
        var limit = Firebug.netParamNameLimit;
        if (limit <= 0)
            return name;

        if (name.length > limit)
            name = name.substr(0, limit) + "...";
        return name;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    hideParams: function(file)
    {
        return !file.urlParams || !file.urlParams.length;
    },

    hidePost: function(file)
    {
        return file.method.toUpperCase() != "POST";
    },

    hidePut: function(file)
    {
        return file.method.toUpperCase() != "PUT";
    },

    hideResponse: function(file)
    {
        var headers = file.responseHeaders;
        for (var i=0; headers && i<headers.length; i++)
        {
            if (headers[i].name == "Content-Length")
                return headers[i].value == 0;
        }

        return file.category in NetUtils.binaryFileCategories || file.responseText == "";
    },

    hideCache: function(file)
    {
        //xxxHonza: I don't see any reason why not to display the cache info also for images.
        return !file.cacheEntry/* || file.category=="image"*/;
    },

    hideHtml: function(file)
    {
        if (!file.mimeType)
            return true;

        var types = ["text/html", "application/xhtml+xml"];
        return !NetUtils.matchesContentType(file.mimeType, types);
    },

    onClickTab: function(event)
    {
        this.selectTab(event.currentTarget);
    },

    getParamValueIterator: function(param)
    {
        // This value is inserted into CODE element and so, make sure the HTML isn't escaped (1210).
        // This is why the second parameter is true.
        // The CODE (with style white-space:pre) element preserves whitespaces so they are
        // displayed the same, as they come from the server (1194).
        // In case of a long header values of post parameters the value must be wrapped (2105).
        return Str.wrapText(param.value, true);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    appendTab: function(netInfoBox, tabId, tabTitle)
    {
        // Create new tab and body.
        var args = {tabId: tabId, tabTitle: tabTitle};
        this.customTab.append(args, netInfoBox.getElementsByClassName("netInfoTabs").item(0));
        this.customBody.append(args, netInfoBox.getElementsByClassName("netInfoBodies").item(0));
    },

    selectTabByName: function(netInfoBox, tabName)
    {
        var tab = Dom.getChildByClass(netInfoBox, "netInfoTabs", "netInfo"+tabName+"Tab");
        if (tab)
            this.selectTab(tab);
    },

    selectTab: function(tab)
    {
        var netInfoBox = Dom.getAncestorByClass(tab, "netInfoBody");

        var view = tab.getAttribute("view");
        if (netInfoBox.selectedTab)
        {
            netInfoBox.selectedTab.removeAttribute("selected");
            netInfoBox.selectedText.removeAttribute("selected");
            netInfoBox.selectedTab.setAttribute("aria-selected", "false");
        }

        var textBodyName = "netInfo" + view + "Text";

        netInfoBox.selectedTab = tab;
        netInfoBox.selectedText = netInfoBox.getElementsByClassName(textBodyName).item(0);

        netInfoBox.selectedTab.setAttribute("selected", "true");
        netInfoBox.selectedText.setAttribute("selected", "true");
        netInfoBox.selectedTab.setAttribute("aria-selected", "true");

        var file = Firebug.getRepObject(netInfoBox);
        var panel = Firebug.getElementPanel(netInfoBox);
        if (!panel)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("net.selectTab; ERROR no panel");
            return;
        }

        var context = panel.context;
        this.updateInfo(netInfoBox, file, context);
    },

    updateInfo: function(netInfoBox, file, context)
    {
        if (FBTrace.DBG_NET)
            FBTrace.sysout("net.updateInfo; file", file);

        if (!netInfoBox)
        {
            if (FBTrace.DBG_NET || FBTrace.DBG_ERRORS)
                FBTrace.sysout("net.updateInfo; ERROR netInfo == null " + file.href, file);
            return;
        }

        var tab = netInfoBox.selectedTab;
        if (Css.hasClass(tab, "netInfoParamsTab"))
        {
            if (file.urlParams && !netInfoBox.urlParamsPresented)
            {
                netInfoBox.urlParamsPresented = true;
                this.insertHeaderRows(netInfoBox, file.urlParams, "Params");
            }
        }

        if (Css.hasClass(tab, "netInfoHeadersTab"))
        {
            var headersText = netInfoBox.getElementsByClassName("netInfoHeadersText").item(0);

            if (file.responseHeaders && !netInfoBox.responseHeadersPresented)
            {
                netInfoBox.responseHeadersPresented = true;
                Firebug.NetMonitor.NetInfoHeaders.renderHeaders(headersText,
                    file.responseHeaders, "ResponseHeaders");
            }

            if (file.cachedResponseHeaders && !netInfoBox.cachedResponseHeadersPresented)
            {
                netInfoBox.cachedResponseHeadersPresented = true;
                Firebug.NetMonitor.NetInfoHeaders.renderHeaders(headersText,
                    file.cachedResponseHeaders, "CachedResponseHeaders");
            }

            if (file.requestHeaders && !netInfoBox.requestHeadersPresented)
            {
                netInfoBox.requestHeadersPresented = true;
                Firebug.NetMonitor.NetInfoHeaders.renderHeaders(headersText,
                    file.requestHeaders, "RequestHeaders");
            }

            if (!file.postRequestsHeaders)
            {
                var text = NetUtils.getPostText(file, context, true);
                file.postRequestsHeaders = Http.getHeadersFromPostText(file.request, text);
            }

            if (file.postRequestsHeaders && !netInfoBox.postRequestsHeadersPresented)
            {
                netInfoBox.postRequestsHeadersPresented = true;
                Firebug.NetMonitor.NetInfoHeaders.renderHeaders(headersText,
                    file.postRequestsHeaders, "PostRequestHeaders");
            }
        }

        if (Css.hasClass(tab, "netInfoPostTab"))
        {
            if (!netInfoBox.postPresented)
            {
                netInfoBox.postPresented  = true;
                var postText = netInfoBox.getElementsByClassName("netInfoPostText").item(0);
                Firebug.NetMonitor.NetInfoPostData.render(context, postText, file);
            }
        }

        if (Css.hasClass(tab, "netInfoPutTab"))
        {
            if (!netInfoBox.putPresented)
            {
                netInfoBox.putPresented  = true;
                var putText = netInfoBox.getElementsByClassName("netInfoPutText").item(0);
                Firebug.NetMonitor.NetInfoPostData.render(context, putText, file);
            }
        }

        if (Css.hasClass(tab, "netInfoResponseTab") && file.loaded && !netInfoBox.responsePresented)
        {
            var responseTextBox = netInfoBox.getElementsByClassName("netInfoResponseText").item(0);

            // Let listeners display the response
            Events.dispatch(this.fbListeners, "updateResponse", [netInfoBox, file, context]);

            if (FBTrace.DBG_NET)
                FBTrace.sysout("netInfoResponseTab", {netInfoBox: netInfoBox, file: file});
            if (!netInfoBox.responsePresented)
            {
                if (file.category == "image")
                {
                    netInfoBox.responsePresented = true;
    
                    var responseImage = netInfoBox.ownerDocument.createElement("img");
                    responseImage.src = file.href;
    
                    Dom.clearNode(responseTextBox);
                    responseTextBox.appendChild(responseImage, responseTextBox);
                }
                else if (!(NetUtils.binaryCategoryMap.hasOwnProperty(file.category)))
                {
                    this.setResponseText(file, netInfoBox, responseTextBox, context);
                }
            }
        }

        if (Css.hasClass(tab, "netInfoCacheTab") && file.loaded && !netInfoBox.cachePresented)
        {
            var responseTextBox = netInfoBox.getElementsByClassName("netInfoCacheText").item(0);
            if (file.cacheEntry) {
                netInfoBox.cachePresented = true;
                this.insertHeaderRows(netInfoBox, file.cacheEntry, "Cache");
            }
        }

        if (Css.hasClass(tab, "netInfoHtmlTab") && file.loaded && !netInfoBox.htmlPresented)
        {
            netInfoBox.htmlPresented = true;

            var text = NetUtils.getResponseText(file, context);
            this.htmlPreview = netInfoBox.getElementsByClassName("netInfoHtmlPreview").item(0);
            this.htmlPreview.contentWindow.document.body.innerHTML = text;

            var defaultHeight = parseInt(Options.get("netHtmlPreviewHeight"));
            if (!isNaN(defaultHeight))
                this.htmlPreview.style.height = defaultHeight + "px";

            var handler = netInfoBox.querySelector(".htmlPreviewResizer");
            this.resizer = new DragDrop.Tracker(handler, {
                onDragStart: Obj.bind(this.onDragStart, this),
                onDragOver: Obj.bind(this.onDragOver, this),
                onDrop: Obj.bind(this.onDrop, this)
            });
        }

        // Notify listeners about update so, content of custom tabs can be updated.
        Events.dispatch(Firebug.NetMonitor.NetInfoBody.fbListeners, "updateTabBody",
            [netInfoBox, file, context]);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // HTML Preview Resizer

    onDragStart: function(tracker)
    {
        var body = Dom.getBody(this.htmlPreview.ownerDocument);
        body.setAttribute("resizingHtmlPreview", "true");
        this.startHeight = this.htmlPreview.clientHeight;
    },

    onDragOver: function(newPos, tracker)
    {
        var newHeight = (this.startHeight + newPos.y);
        this.htmlPreview.style.height = newHeight + "px";
        Options.setPref(Firebug.prefDomain, "netHtmlPreviewHeight", newHeight);
    },

    onDrop: function(tracker)
    {
        var body = Dom.getBody(this.htmlPreview.ownerDocument);
        body.removeAttribute("resizingHtmlPreview");
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    setResponseText: function(file, netInfoBox, responseTextBox, context)
    {
        // Get response text and make sure it doesn't exceed the max limit.
        var text = NetUtils.getResponseText(file, context);
        var limit = Firebug.netDisplayedResponseLimit + 15;
        var limitReached = text ? (text.length > limit) : false;
        if (limitReached)
            text = text.substr(0, limit) + "...";

        // Insert the response into the UI.
        if (text)
            Str.insertWrappedText(text, responseTextBox);
        else
            Str.insertWrappedText("", responseTextBox);

        // Append a message informing the user that the response isn't fully displayed.
        if (limitReached)
        {
            var object = {
                text: Locale.$STR("net.responseSizeLimitMessage"),
                onClickLink: function() {
                    var panel = context.getPanel("net", true);
                    panel.openResponseInTab(file);
                }
            };
            Firebug.NetMonitor.ResponseSizeLimit.append(object, responseTextBox);
        }

        netInfoBox.responsePresented = true;

        if (FBTrace.DBG_NET)
            FBTrace.sysout("net.setResponseText; response text updated");
    },

    insertHeaderRows: function(netInfoBox, headers, tableName, rowName)
    {
        if (!headers.length)
            return;

        var headersTable = netInfoBox.getElementsByClassName("netInfo"+tableName+"Table").item(0);
        var tbody = Dom.getChildByClass(headersTable, "netInfo" + rowName + "Body");
        if (!tbody)
            tbody = headersTable.firstChild;
        var titleRow = Dom.getChildByClass(tbody, "netInfo" + rowName + "Title");

        headers.sort(function(a, b)
        {
            return a.name > b.name ? 1 : -1;
        });

        this.headerDataTag.insertRows({headers: headers}, titleRow ? titleRow : tbody);
        Css.removeClass(titleRow, "collapsed");
    },
});

// ********************************************************************************************* //

/**
 * @domplate Represents posted data within request info (the info, which is visible when
 * a request entry is expanded. This template renders content of the Post tab.
 */
Firebug.NetMonitor.NetInfoPostData = domplate(Firebug.Rep, new Firebug.Listener(),
{
    // application/x-www-form-urlencoded
    paramsTable:
        TABLE({"class": "netInfoPostParamsTable", cellpadding: 0, cellspacing: 0,
            "role": "presentation"},
            TBODY({"role": "list", "aria-label": Locale.$STR("net.label.Parameters")},
                TR({"class": "netInfoPostParamsTitle", "role": "presentation"},
                    TD({colspan: 2, "role": "presentation"},
                        DIV({"class": "netInfoPostParams"},
                            Locale.$STR("net.label.Parameters"),
                            SPAN({"class": "netInfoPostContentType"},
                                "application/x-www-form-urlencoded"
                            )
                        )
                    )
                )
            )
        ),

    // multipart/form-data
    partsTable:
        TABLE({"class": "netInfoPostPartsTable", cellpadding: 0, cellspacing: 0,
            "role": "presentation"},
            TBODY({"role": "list", "aria-label": Locale.$STR("net.label.Parts")},
                TR({"class": "netInfoPostPartsTitle", "role": "presentation"},
                    TD({colspan: 2, "role":"presentation" },
                        DIV({"class": "netInfoPostParams"},
                            Locale.$STR("net.label.Parts"),
                            SPAN({"class": "netInfoPostContentType"},
                                "multipart/form-data"
                            )
                        )
                    )
                )
            )
        ),

    // application/json
    jsonTable:
        TABLE({"class": "netInfoPostJSONTable", cellpadding: 0, cellspacing: 0,
            "role": "presentation"},
            TBODY({"role": "list", "aria-label": Locale.$STR("jsonviewer.tab.JSON")},
                TR({"class": "netInfoPostJSONTitle", "role": "presentation"},
                    TD({"role": "presentation" },
                        DIV({"class": "netInfoPostParams"},
                            Locale.$STR("jsonviewer.tab.JSON")
                        )
                    )
                ),
                TR(
                    TD({"class": "netInfoPostJSONBody"})
                )
            )
        ),

    // application/xml
    xmlTable:
        TABLE({"class": "netInfoPostXMLTable", cellpadding: 0, cellspacing: 0,
            "role": "presentation"},
            TBODY({"role": "list", "aria-label": Locale.$STR("xmlviewer.tab.XML")},
                TR({"class": "netInfoPostXMLTitle", "role": "presentation"},
                    TD({"role": "presentation" },
                        DIV({"class": "netInfoPostParams"},
                            Locale.$STR("xmlviewer.tab.XML")
                        )
                    )
                ),
                TR(
                    TD({"class": "netInfoPostXMLBody"})
                )
            )
        ),

    // image/svg+xml
    svgTable:
        TABLE({"class": "netInfoPostSVGTable", cellpadding: 0, cellspacing: 0,
            "role": "presentation"},
            TBODY({"role": "list", "aria-label": Locale.$STR("svgviewer.tab.SVG")},
                TR({"class": "netInfoPostSVGTitle", "role": "presentation"},
                    TD({"role": "presentation" },
                        DIV({"class": "netInfoPostParams"},
                            Locale.$STR("svgviewer.tab.SVG")
                        )
                    )
                ),
                TR(
                    TD({"class": "netInfoPostSVGBody"})
                )
            )
        ),

    // application/x-woff
    fontTable:
      TABLE({"class": "netInfoPostFontTable", cellpadding: 0, cellspacing: 0,
        "role": "presentation"},
          TBODY({"role": "list", "aria-label": Locale.$STR("fontviewer.tab.Font")},
              TR({"class": "netInfoPostFontTitle", "role": "presentation"},
                  TD({"role": "presentation" },
                      Locale.$STR("fontviewer.tab.Font")
                  )
              ),
              TR(
                  TD({"class": "netInfoPostFontBody"})
              )
          )
      ),

    sourceTable:
        TABLE({"class": "netInfoPostSourceTable", cellpadding: 0, cellspacing: 0,
            "role": "presentation"},
            TBODY({"role": "list", "aria-label": Locale.$STR("net.label.Source")},
                TR({"class": "netInfoPostSourceTitle", "role": "presentation"},
                    TD({colspan: 2, "role": "presentation"},
                        DIV({"class": "netInfoPostSource"},
                            Locale.$STR("net.label.Source")
                        )
                    )
                )
            )
        ),

    sourceBodyTag:
        TR({"role": "presentation"},
            TD({colspan: 2, "role": "presentation"},
                FOR("line", "$param|getParamValueIterator",
                    CODE({"class":"focusRow subFocusRow", "role": "listitem"}, "$line")
                )
            )
        ),

    getParamValueIterator: function(param)
    {
        return Firebug.NetMonitor.NetInfoBody.getParamValueIterator(param);
    },

    render: function(context, parentNode, file)
    {
        var text = NetUtils.getPostText(file, context, true);
        if (text == undefined)
            return;

        if (NetUtils.isURLEncodedRequest(file, context))
        {
            var lines = text.split("\n");
            var params = Url.parseURLEncodedText(lines[lines.length-1]);
            if (params)
                this.insertParameters(parentNode, params);
        }

        if (NetUtils.isMultiPartRequest(file, context))
        {
            var data = this.parseMultiPartText(file, context);
            if (data)
                this.insertParts(parentNode, data);
        }

        var contentType = NetUtils.findHeader(file.requestHeaders, "content-type");

        if (Firebug.JSONViewerModel.isJSON(contentType, text))
            this.insertJSON(parentNode, file, context);

        if (Firebug.XMLViewerModel.isXML(contentType))
            this.insertXML(parentNode, file, context);

        if (Firebug.SVGViewerModel.isSVG(contentType))
            this.insertSVG(parentNode, file, context);

        if (Firebug.FontViewerModel.isFont(contentType, file.href, text))
            this.insertFont(parentNode, file, context);

        var postText = NetUtils.getPostText(file, context);

        // Make sure headers are not displayed in the 'source' section.
        postText = Http.removeHeadersFromPostText(file.request, postText);
        postText = NetUtils.formatPostText(postText);
        if (postText)
            this.insertSource(parentNode, postText);
    },

    insertParameters: function(parentNode, params)
    {
        if (!params || !params.length)
            return;

        var paramTable = this.paramsTable.append(null, parentNode);
        var row = paramTable.getElementsByClassName("netInfoPostParamsTitle").item(0);

        Firebug.NetMonitor.NetInfoBody.headerDataTag.insertRows({headers: params}, row);
    },

    insertParts: function(parentNode, data)
    {
        if (!data.params || !data.params.length)
            return;

        var partsTable = this.partsTable.append(null, parentNode);
        var row = partsTable.getElementsByClassName("netInfoPostPartsTitle").item(0);

        Firebug.NetMonitor.NetInfoBody.headerDataTag.insertRows({headers: data.params}, row);
    },

    insertJSON: function(parentNode, file, context)
    {
        var text = NetUtils.getPostText(file, context);
        var data = Json.parseJSONString(text, "http://" + file.request.originalURI.host);
        if (!data)
            return;

        var jsonTable = this.jsonTable.append(null, parentNode);
        var jsonBody = jsonTable.getElementsByClassName("netInfoPostJSONBody").item(0);

        if (!this.toggles)
            this.toggles = new ToggleBranch.ToggleBranch();

        Firebug.DOMPanel.DirTable.tag.replace(
            {object: data, toggles: this.toggles}, jsonBody);
    },

    insertXML: function(parentNode, file, context)
    {
        var text = NetUtils.getPostText(file, context);

        var jsonTable = this.xmlTable.append(null, parentNode);
        var jsonBody = jsonTable.getElementsByClassName("netInfoPostXMLBody").item(0);

        Firebug.XMLViewerModel.insertXML(jsonBody, text);
    },

    insertSVG: function(parentNode, file, context)
    {
        var text = NetUtils.getPostText(file, context);

        var jsonTable = this.svgTable.append(null, parentNode);
        var jsonBody = jsonTable.getElementsByClassName("netInfoPostSVGBody").item(0);

        Firebug.SVGViewerModel.insertSVG(jsonBody, text);
    },

    insertFont: function(parentNode, file, context)
    {
        var text = NetUtils.getPostText(file, context);

        var fontTable = this.fontTable.append(null, parentNode);
        var fontBody = fontTable.getElementsByClassName("netInfoPostFontBody").item(0);

        Firebug.FontViewerModel.insertFont(fontBody, text);
    },

    insertSource: function(parentNode, text)
    {
        var sourceTable = this.sourceTable.append(null, parentNode);
        var row = sourceTable.getElementsByClassName("netInfoPostSourceTitle").item(0);

        var param = {value: text};
        this.sourceBodyTag.insertRows({param: param}, row);
    },

    parseMultiPartText: function(file, context)
    {
        var text = NetUtils.getPostText(file, context);
        if (text == undefined)
            return null;

        FBTrace.sysout("net.parseMultiPartText; boundary: ", text);

        var boundary = text.match(/\s*boundary=\s*(.*)/)[1];

        var divider = "\r\n\r\n";
        var bodyStart = text.indexOf(divider);
        var body = text.substr(bodyStart + divider.length);

        var postData = {};
        postData.mimeType = "multipart/form-data";
        postData.params = [];

        var parts = body.split("--" + boundary);
        for (var i=0; i<parts.length; i++)
        {
            var part = parts[i].split(divider);
            if (part.length != 2)
                continue;

            var m = part[0].match(/\s*name=\"(.*)\"(;|$)/);
            postData.params.push({
                name: (m && m.length > 1) ? m[1] : "",
                value: Str.trim(part[1])
            })
        }

        return postData;
    }
});

// ********************************************************************************************* //

/**
 * @domplate Used within the Net panel to display raw source of request and response headers
 * as well as pretty-formatted summary of these headers.
 */
Firebug.NetMonitor.NetInfoHeaders = domplate(Firebug.Rep, new Firebug.Listener(),
{
    tag:
        DIV({"class": "netInfoHeadersTable", "role": "tabpanel"},
            DIV({"class": "netInfoHeadersGroup netInfoResponseHeadersTitle collapsed"},
                SPAN(Locale.$STR("ResponseHeaders")),
                SPAN({"class": "netHeadersViewSource response collapsed", onclick: "$onViewSource",
                    _sourceDisplayed: false, _rowName: "ResponseHeaders"},
                    Locale.$STR("net.headers.view source")
                )
            ),
            TABLE({cellpadding: 0, cellspacing: 0},
                TBODY({"class": "netInfoResponseHeadersBody", "role": "list",
                    "aria-label": Locale.$STR("ResponseHeaders")})
            ),
            DIV({"class": "netInfoHeadersGroup netInfoRequestHeadersTitle collapsed"},
                SPAN(Locale.$STR("RequestHeaders")),
                SPAN({"class": "netHeadersViewSource request collapsed", onclick: "$onViewSource",
                    _sourceDisplayed: false, _rowName: "RequestHeaders"},
                    Locale.$STR("net.headers.view source")
                )
            ),
            TABLE({cellpadding: 0, cellspacing: 0},
                TBODY({"class": "netInfoRequestHeadersBody", "role": "list",
                    "aria-label": Locale.$STR("RequestHeaders")})
            ),
            DIV({"class": "netInfoHeadersGroup netInfoCachedResponseHeadersTitle collapsed"},
                SPAN(Locale.$STR("CachedResponseHeaders"))
            ),
            TABLE({cellpadding: 0, cellspacing: 0},
                TBODY({"class": "netInfoCachedResponseHeadersBody", "role": "list",
                    "aria-label": Locale.$STR("CachedResponseHeaders")})
            ),
            DIV({"class": "netInfoHeadersGroup netInfoPostRequestHeadersTitle collapsed"},
                SPAN(Locale.$STR("PostRequestHeaders"))
            ),
            TABLE({cellpadding: 0, cellspacing: 0},
                TBODY({"class": "netInfoPostRequestHeadersBody", "role": "list",
                    "aria-label": Locale.$STR("PostRequestHeaders")})
            )
        ),

    sourceTag:
        TR({"role": "presentation"},
            TD({colspan: 2, "role": "presentation"},
                PRE({"class": "source"})
            )
        ),

    onViewSource: function(event)
    {
        var target = event.target;
        var requestHeaders = (target.rowName == "RequestHeaders");

        var netInfoBox = Dom.getAncestorByClass(target, "netInfoBody");
        var file = netInfoBox.repObject;

        if (target.sourceDisplayed)
        {
            var headers = requestHeaders ? file.requestHeaders : file.responseHeaders;
            this.insertHeaderRows(netInfoBox, headers, target.rowName);
            target.innerHTML = Locale.$STR("net.headers.view source");
        }
        else
        {
            var source = requestHeaders ? file.requestHeadersText : file.responseHeadersText;
            this.insertSource(netInfoBox, source, target.rowName);
            target.innerHTML = Locale.$STR("net.headers.pretty print");
        }

        target.sourceDisplayed = !target.sourceDisplayed;

        Events.cancelEvent(event);
    },

    insertSource: function(netInfoBox, source, rowName)
    {
        // This breaks copy to clipboard.
        //if (source)
        //    source = source.replace(/\r\n/gm, "<span style='color:lightgray'>\\r\\n</span>\r\n");

        var tbody = netInfoBox.getElementsByClassName("netInfo" + rowName + "Body").item(0);
        var node = this.sourceTag.replace({}, tbody);
        var sourceNode = node.getElementsByClassName("source").item(0);
        sourceNode.innerHTML = source;
    },

    insertHeaderRows: function(netInfoBox, headers, rowName)
    {
        var headersTable = netInfoBox.getElementsByClassName("netInfoHeadersTable").item(0);
        var tbody = headersTable.getElementsByClassName("netInfo" + rowName + "Body").item(0);

        Dom.clearNode(tbody);

        if (headers && headers.length)
        {
            headers.sort(function(a, b)
            {
                return a.name > b.name ? 1 : -1;
            });

            Firebug.NetMonitor.NetInfoBody.headerDataTag.insertRows({headers: headers}, tbody);

            var titleRow = Dom.getChildByClass(headersTable, "netInfo" + rowName + "Title");
            Css.removeClass(titleRow, "collapsed");
        }
    },

    init: function(parent)
    {
        var rootNode = this.tag.append({}, parent);

        var netInfoBox = Dom.getAncestorByClass(parent, "netInfoBody");
        var file = netInfoBox.repObject;

        var viewSource;

        viewSource = rootNode.getElementsByClassName("netHeadersViewSource request").item(0);
        if (file.requestHeadersText)
            Css.removeClass(viewSource, "collapsed");

        viewSource = rootNode.getElementsByClassName("netHeadersViewSource response").item(0);
        if (file.responseHeadersText)
            Css.removeClass(viewSource, "collapsed");
    },

    renderHeaders: function(parent, headers, rowName)
    {
        if (!parent.firstChild)
            this.init(parent);

        this.insertHeaderRows(parent, headers, rowName);
    }
});

// ********************************************************************************************* //

/**
 * @domplate Represents a template for popup tip that displays detailed timing info about
 * a network request.
 */
Firebug.NetMonitor.TimeInfoTip = domplate(Firebug.Rep,
{
    tableTag:
        TABLE({"class": "timeInfoTip", "id": "fbNetTimeInfoTip"},
            TBODY()
        ),

    timingsTag:
        FOR("time", "$timings",
            TR({"class": "timeInfoTipRow", $collapsed: "$time|hideBar"},
                TD({"class": "$time|getBarClass timeInfoTipBar",
                    $loaded: "$time.loaded",
                    $fromCache: "$time.fromCache",
                }),
                TD({"class": "timeInfoTipCell startTime"},
                    "$time.start|formatStartTime"
                ),
                TD({"class": "timeInfoTipCell elapsedTime"},
                    "$time.elapsed|formatTime"
                ),
                TD("$time|getLabel")
            )
        ),

    startTimeTag:
        TR(
            TD(),
            TD("$startTime.time|formatStartTime"),
            TD({"class": "timeInfoTipStartLabel", "colspan": 2},
                "$startTime|getLabel"
            )
        ),

    separatorTag:
        TR(
            TD({"class": "timeInfoTipSeparator", "colspan": 4, "height": "10px"},
                SPAN("$label")
            )
        ),

    eventsTag:
        FOR("event", "$events",
            TR({"class": "timeInfoTipEventRow"},
                TD({"class": "timeInfoTipBar", align: "center"},
                    DIV({"class": "$event|getTimeStampClass timeInfoTipEventBar"})
                ),
                TD("$event.start|formatStartTime"),
                TD({"class": "timeInfotTipEventName", "colspan": 2},
                    "$event|getTimeStampLabel"
                )
            )
        ),

    hideBar: function(obj)
    {
        return !obj.elapsed && obj.bar == "Blocking";
    },

    getBarClass: function(obj)
    {
        return "net" + obj.bar + "Bar";
    },

    getTimeStampClass: function(obj)
    {
        return obj.classes;
    },

    formatTime: function(time)
    {
        return Str.formatTime(time);
    },

    formatStartTime: function(time)
    {
        var label = Str.formatTime(time);
        if (!time)
            return label;

        return (time > 0 ? "+" : "") + label;
    },

    getLabel: function(obj)
    {
        return Locale.$STR("requestinfo." + obj.bar);
    },

    getTimeStampLabel: function(obj)
    {
        return obj.name;
    },

    render: function(context, file, parentNode)
    {
        var infoTip = Firebug.NetMonitor.TimeInfoTip.tableTag.replace({}, parentNode);

        var elapsed = file.loaded ? file.endTime - file.startTime :
            file.phase.phaseEndTime - file.startTime;
        var blockingEnd = NetUtils.getBlockingEndTime(file);

        //Helper log for debugging timing problems.
        //NetUtils.traceRequestTiming("net.timeInfoTip.render;", file);

        var startTime = 0;

        var timings = [];
        timings.push({bar: "Blocking",
            elapsed: blockingEnd - file.startTime,
            start: startTime});

        timings.push({bar: "Resolving",
            elapsed: file.connectingTime - file.resolvingTime,
            start: startTime += timings[0].elapsed});

        // Connecting time is measured till the sending time in order to include
        // also SSL negotiation.
        // xxxHonza: time between "connected" and "sending" is SSL negotiation?
        timings.push({bar: "Connecting",
            elapsed: file.connectStarted ? file.sendingTime - file.connectingTime : 0,
            start: startTime += timings[1].elapsed});

        // In Fx3.6 the STATUS_SENDING_TO is always fired (nsIHttpActivityDistributor)
        // In Fx3.5 the STATUS_SENDING_TO (nsIWebProgressListener) doesn't have to come
        // This workaround is for 3.5
        var sendElapsed = file.sendStarted ? file.waitingForTime - file.sendingTime : 0;
        var sendStarted = timings[0].elapsed + timings[1].elapsed + timings[2].elapsed;

        timings.push({bar: "Sending",
            elapsed: sendElapsed,
            start: file.sendStarted ? file.sendingTime - file.startTime : sendStarted});

        timings.push({bar: "Waiting",
            elapsed: file.respondedTime - file.waitingForTime,
            start: file.waitingForTime - file.startTime});

        timings.push({bar: "Receiving",
            elapsed: file.endTime - file.respondedTime,
            start: file.respondedTime - file.startTime,
            loaded: file.loaded, fromCache: file.fromCache});

        var events = [];
        var timeStamps = file.phase.timeStamps;
        for (var i=0; i<timeStamps.length; i++)
        {
            var timeStamp = timeStamps[i];
            events.push({
                name: timeStamp.label,
                classes: timeStamp.classes,
                start: timeStamp.time - file.startTime
            })
        }

        events.sort(function(a, b) {
            return a.start < b.start ? -1 : 1;
        })

        var phases = context.netProgress.phases;

        if (FBTrace.DBG_ERROR && phases.length == 0)
            FBTrace.sysout("net.render; ERROR no phases");

        // Insert start request time. It's computed since the beginning (page load start time)
        // i.e. from the first phase start.
        var firstPhaseStartTime = (phases.length > 0) ? phases[0].startTime : file.startTime;

        var startTime = {};
        startTime.time = file.startTime - firstPhaseStartTime;
        startTime.bar = "started.label";
        this.startTimeTag.insertRows({startTime: startTime}, infoTip.firstChild);

        // Insert separator.
        this.separatorTag.insertRows({label: Locale.$STR("requestinfo.phases.label")},
            infoTip.firstChild);

        // Insert request timing info.
        this.timingsTag.insertRows({timings: timings}, infoTip.firstChild);

        // Insert events timing info.
        if (events.length)
        {
            // Insert separator.
            this.separatorTag.insertRows({label: Locale.$STR("requestinfo.timings.label")},
                infoTip.firstChild);

            this.eventsTag.insertRows({events: events}, infoTip.firstChild);
        }

        return true;
    }
});

// ********************************************************************************************* //

/**
 * @domplate Represents a template for a pupup tip with detailed size info.
 */
Firebug.NetMonitor.SizeInfoTip = domplate(Firebug.Rep,
{
    tag:
        TABLE({"class": "sizeInfoTip", "id": "fbNetSizeInfoTip", role:"presentation"},
            TBODY(
                FOR("size", "$sizeInfo",
                    TAG("$size|getRowTag", {size: "$size"})
                )
            )
        ),

    sizeTag:
        TR({"class": "sizeInfoRow", $collapsed: "$size|hideRow"},
            TD({"class": "sizeInfoLabelCol"}, "$size.label"),
            TD({"class": "sizeInfoSizeCol"}, "$size|formatSize"),
            TD({"class": "sizeInfoDetailCol"}, "$size|formatNumber")
        ),

    separatorTag:
        TR(
            TD({"colspan": 3, "height": "7px"})
        ),

    descTag:
        TR(
            TD({"colspan": 3, "class": "sizeInfoDescCol"}, "$size.label")
        ),

    getRowTag: function(size)
    {
        if (size.size == -2)
            return this.descTag;

        return (size.label == "-") ? this.separatorTag : this.sizeTag;
    },

    hideRow: function(size)
    {
        return size.size < 0;
    },

    formatSize: function(size)
    {
        return Str.formatSize(size.size);
    },

    formatNumber: function(size)
    {
        return size.size ? ("(" + Str.formatNumber(size.size) + ")") : "";
    },

    render: function(file, parentNode)
    {
        var postText = NetUtils.getPostText(file, Firebug.currentContext, true);
        postText = postText ? postText : "";

        var sizeInfo = [];
        sizeInfo.push({label: Locale.$STR("net.sizeinfo.Response Body"), size: file.size});
        sizeInfo.push({label: Locale.$STR("net.sizeinfo.Post Body"), size: postText.length});

        if (file.requestHeadersText)
        {
            var responseHeaders = file.responseHeadersText ? file.responseHeadersText : 0;
            sizeInfo.push({label: "-", size: 0});
            sizeInfo.push({label: Locale.$STR("net.sizeinfo.Total Received") + "*",
                size: (responseHeaders.length ? responseHeaders.length : 0)  + file.size});
            sizeInfo.push({label: Locale.$STR("net.sizeinfo.Total Sent") + "*",
                size: file.requestHeadersText.length + postText.length});
            sizeInfo.push({label: " ", size: -2});
            sizeInfo.push({label: "* " + Locale.$STR("net.sizeinfo.Including HTTP Headers"),
                size: -2});
        }

        this.tag.replace({sizeInfo: sizeInfo}, parentNode);
    },
});

// ********************************************************************************************* //

Firebug.NetMonitor.NetLimit = domplate(Firebug.Rep,
{
    collapsed: true,

    tableTag:
        DIV(
            TABLE({width: "100%", cellpadding: 0, cellspacing: 0},
                TBODY()
            )
        ),

    limitTag:
        TR({"class": "netRow netLimitRow", $collapsed: "$isCollapsed"},
            TD({"class": "netCol netLimitCol", colspan: 8},
                TABLE({cellpadding: 0, cellspacing: 0},
                    TBODY(
                        TR(
                            TD(
                                SPAN({"class": "netLimitLabel"},
                                    Locale.$STRP("plural.Limit_Exceeded2", [0])
                                )
                            ),
                            TD({style: "width:100%"}),
                            TD(
                                BUTTON({"class": "netLimitButton", title: "$limitPrefsTitle",
                                    onclick: "$onPreferences"},
                                  Locale.$STR("LimitPrefs")
                                )
                            ),
                            TD("&nbsp;")
                        )
                    )
                )
            )
        ),

    isCollapsed: function()
    {
        return this.collapsed;
    },

    onPreferences: function(event)
    {
        Win.openNewTab("about:config");
    },

    updateCounter: function(row)
    {
        Css.removeClass(row, "collapsed");

        // Update info within the limit row.
        var limitLabel = row.getElementsByClassName("netLimitLabel").item(0);
        limitLabel.firstChild.nodeValue = Locale.$STRP("plural.Limit_Exceeded2",
            [row.limitInfo.totalCount]);
    },

    createTable: function(parent, limitInfo)
    {
        var table = this.tableTag.replace({}, parent);
        var row = this.createRow(table.firstChild.firstChild, limitInfo);
        return [table, row];
    },

    createRow: function(parent, limitInfo)
    {
        var row = this.limitTag.insertRows(limitInfo, parent, this)[0];
        row.limitInfo = limitInfo;
        return row;
    },
});

// ********************************************************************************************* //

Firebug.NetMonitor.ResponseSizeLimit = domplate(Firebug.Rep,
{
    tag:
        DIV({"class": "netInfoResponseSizeLimit"},
            SPAN("$object.beforeLink"),
            A({"class": "objectLink", onclick: "$onClickLink"},
                "$object.linkText"
            ),
            SPAN("$object.afterLink")
        ),

    reLink: /^(.*)<a>(.*)<\/a>(.*$)/,
    append: function(obj, parent)
    {
        var m = obj.text.match(this.reLink);
        return this.tag.append({onClickLink: obj.onClickLink,
            object: {
            beforeLink: m[1],
            linkText: m[2],
            afterLink: m[3],
        }}, parent, this);
    }
});

// ********************************************************************************************* //
// Registration

Firebug.registerRep(Firebug.NetMonitor.NetRequestTable);

return Firebug.NetMonitor.NetRequestTable;

// ********************************************************************************************* //
}}