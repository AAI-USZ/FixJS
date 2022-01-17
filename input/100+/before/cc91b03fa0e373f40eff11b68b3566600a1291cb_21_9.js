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

                var e = cookieManager.enumerator;
                while(e.hasMoreElements())
                {
                    var cookie = e.getNext();
                    cookie = cookie.QueryInterface(Ci.nsICookie2);
                    var cookieWrapper = new Cookie(CookieUtils.makeCookieObject(cookie));
                    var cookieInfo = cookieWrapper.toText();
                    foStream.write(cookieInfo, cookieInfo.length);
                }

                foStream.close();
            }
        }
        catch (err)
        {
            if (FBTrace.DBG_COOKIES)
                FBTrace.sysout("firecookie.onExportAll EXCEPTION", err);
            alert(err.toString());
        }
    }