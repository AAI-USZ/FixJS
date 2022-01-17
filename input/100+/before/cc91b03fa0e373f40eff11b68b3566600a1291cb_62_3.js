function(netInfoBox, file, context)
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
    }