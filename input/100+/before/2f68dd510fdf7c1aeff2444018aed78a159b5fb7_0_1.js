function () {
                var invokeInfo = {};

                invokeInfo.uri = document.getElementById("invoke-source-text").value;
                invokeInfo.target = document.getElementById("invoke-target-text").value;
                invokeInfo.action = document.getElementById("invoke-action-text").value;
                invokeInfo.type = document.getElementById("invoke-mime-type-text").value;
                invokeInfo.extension = document.getElementById("invoke-extension-text").value;
                invokeInfo.data = document.getElementById("invoke-data-text").value;
                if (invokeInfo.data) {
                    invokeInfo.data = window.btoa(invokeInfo.data);
                }

                event.trigger("AppInvoke", [invokeInfo]);
            }