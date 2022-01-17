function(nada, target)
    {
        var items = [];

        var file = Firebug.getRepObject(target);
        if (!file || !(file instanceof Firebug.NetFile))
            return items;

        var object = Firebug.getObjectByURL(this.context, file.href);
        var isPost = NetUtils.isURLEncodedRequest(file, this.context);
        var params = Url.parseURLParams(file.href);

        items.push(
            {
                label: "CopyLocation",
                tooltiptext: "clipboard.tip.Copy_Location",
                command: Obj.bindFixed(System.copyToClipboard, System, file.href)
            }
        );
        
        if(params)
        {
        	items.push(
            	{
            	    label: "CopyRequestParameters",
                	tooltiptext: "clipboard.tip.Copy_Request_Parameters",
                	command: Obj.bindFixed(this.copyUrlParams, this, file)
            	}
        	);
		}
		
        if (isPost)
        {
            items.push(
                {
                    label: "CopyLocationParameters",
                    tooltiptext: "net.tip.Copy_Location_Parameters",
                    command: Obj.bindFixed(this.copyParams, this, file)
                }
            );
        }

        items.push(
            {
                label: "CopyRequestHeaders",
                tooltiptext: "net.tip.Copy_Request_Headers",
                command: Obj.bindFixed(this.copyRequestHeaders, this, file)
            },
            {
                label: "CopyResponseHeaders",
                tooltiptext: "net.tip.Copy_Response_Headers",
                command: Obj.bindFixed(this.copyResponseHeaders, this, file)
            }
        );

        if (NetUtils.textFileCategories.hasOwnProperty(file.category))
        {
            items.push(
                {
                    label: "CopyResponse",
                    tooltiptext: "net.tip.Copy_Response",
                    command: Obj.bindFixed(this.copyResponse, this, file)
                }
            );
        }

        items.push(
            "-",
            {
                label: "OpenInTab",
                tooltiptext: "firebug.tip.Open_In_Tab",
                command: Obj.bindFixed(this.openRequestInTab, this, file)
            }
        );

        if (NetUtils.textFileCategories.hasOwnProperty(file.category))
        {
            items.push(
                {
                    label: "Open_Response_In_New_Tab",
                    tooltiptext: "net.tip.Open_Response_In_New_Tab",
                    command: Obj.bindFixed(NetUtils.openResponseInTab, this, file)
                }
            );
        }

        if (!file.loaded)
        {
            items.push(
                "-",
                {
                    label: "StopLoading",
                    tooltiptext: "net.tip.Stop_Loading",
                    command: Obj.bindFixed(this.stopLoading, this, file)
                }
            );
        }

        if (object)
        {
            var subItems = Firebug.chrome.getInspectMenuItems(object);
            if (subItems.length)
            {
                items.push("-");
                items.push.apply(items, subItems);
            }
        }

        if (file.isXHR)
        {
            var bp = this.context.netProgress.breakpoints.findBreakpoint(file.getFileURL());

            items.push(
                "-",
                {
                    label: "net.label.Break_On_XHR",
                    tooltiptext: "net.tip.Break_On_XHR",
                    type: "checkbox",
                    checked: !!bp,
                    command: Obj.bindFixed(this.breakOnRequest, this, file)
                }
            );

            if (bp)
            {
                items.push(
                    {
                        label: "EditBreakpointCondition",
                        tooltiptext: "breakpoints.tip.Edit_Breakpoint_Condition",
                        command: Obj.bindFixed(this.editBreakpointCondition, this, file)
                    }
                );
            }
        }

        items.push("-");
        items.push(
            {
                label: "net.label.Resend",
                tooltiptext: "net.tip.Resend",
                id: "fbNetResend",
                command: Obj.bindFixed(Firebug.Spy.XHR.resend, Firebug.Spy.XHR, file, this.context)
            }
        );

        return items;
    }