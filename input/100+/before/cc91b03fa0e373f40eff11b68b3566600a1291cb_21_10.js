function(context)
    {
        try 
        {
            var fp = CCIN("@mozilla.org/filepicker;1", "nsIFilePicker");
            fp.init(window, null, Ci.nsIFilePicker.modeSave);
            fp.appendFilters(Ci.nsIFilePicker.filterAll | Ci.nsIFilePicker.filterText);
            fp.filterIndex = 1;
            fp.defaultString = "cookies.txt";

            var rv = fp.show();
            if (rv == Ci.nsIFilePicker.returnOK || rv == Ci.nsIFilePicker.returnReplace)
            {
                var foStream = CCIN("@mozilla.org/network/file-output-stream;1", "nsIFileOutputStream");
                foStream.init(fp.file, 0x02 | 0x08 | 0x20, 0666, 0); // write, create, truncate

                var panel = context.getPanel(panelName, true);
                var tbody = Dom.getElementByClass(panel.panelNode, "cookieTable").firstChild;
                for (var row = tbody.firstChild; row; row = row.nextSibling)
                {
                    if (Css.hasClass(row, "cookieRow") && row.repObject)
                    {
                        var cookieInfo = row.repObject.toText();
                        foStream.write(cookieInfo, cookieInfo.length);
                    }
                }

                foStream.close();
            }
        }
        catch (err)
        {
            if (FBTrace.DBG_COOKIES)
                FBTrace.sysout("firecookie.onExportForSite EXCEPTION", err);
            alert(err.toString());
        }
    }