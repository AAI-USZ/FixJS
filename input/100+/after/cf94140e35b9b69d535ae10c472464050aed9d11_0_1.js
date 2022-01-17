function(data) {
        var orig = data;
        var needsScroll = false;
        try{
        if (!this.isAppendTop() && this.isAtBottom()) {
            needsScroll = true;
        }
        if (this.refresh && this.cmdoutputtbl) {
            try {
                this.clearTable(this.cmdoutputtbl);
            } catch(e) {
                this._log(e);
            }
        }
        if (typeof(data) == "string" && data == "") {
            return;
        }
        }catch(e){
            this.appendCmdOutputError("appendCmdOutput1 "+e);
            return;
        }
        try {
            if (typeof(data) == "string") {
                eval("data=" + data);
            }
            if (!this.cmdoutputtbl) {
                this.cmdoutputtbl = this.createTable();
            }
            if (!this.runningcmd) {
                this.runningcmd = new Object();
                this.runningcmd.count = 0;
                this.runningcmd.entries = new Array();
            }
        } catch (e) {
            this.appendCmdOutputError("appendCmdOutput,eval "+e);
            return;
        }
        if (data.error) {
            this.appendCmdOutputError("data error "+data.error);
            this.finishedExecution();
            return;
        }

        this.runningcmd.id = data.id;
        this.runningcmd.offset = data.offset;
        this.runningcmd.completed = data.completed;
        this.runningcmd.jobcompleted = data.execCompleted;
        this.runningcmd.jobstatus = data.execState;
        this.runningcmd.failednodes = data.hasFailedNodes;
        this.runningcmd.percent = data.percentLoaded;

        var entries = $A(data.entries);
        if (null != data.duration) {
            this.updateDuration(data.duration);
        }
        if (entries != null && entries.length > 0) {

            for (var i = 0 ; i < entries.length ; i++) {
                var e = entries[i];
                this.runningcmd.entries.push(e);
                this.genDataRow(e, this.cmdoutputtbl);

            }
        }


        if (this.runningcmd.completed && this.runningcmd.jobcompleted) {
            //halt timer

            if ($('viewoptionscomplete') && null != data.totalSize) {
                if ($('outfilesize')) {
                    $('outfilesize').innerHTML = data.totalSize + " bytes";
                }
                $('viewoptionscomplete').show();
            }
            if ($('taildelaycontrol')) {
                $('taildelaycontrol').hide();
            }
            this.finishDataOutput();
            this.finishedExecution(this.runningcmd.jobstatus);
            return;
        } else {
            var obj=this;
            setTimeout(function() {
                obj.loadMoreOutput(obj.runningcmd.id, obj.runningcmd.offset);
            }, (this.tailmode && this.taildelay > 0) ? this.taildelay * 1000 : 50);
        }
        if (this.runningcmd.jobcompleted && !this.runningcmd.completed) {
            this.jobFinishStatus(this.runningcmd.jobstatus);
            if ($('progressContainer')) {
                $('progressContainer').hide();
            }
            if ($('fileload')) {
                $('fileload').show();
                $('fileloadpercent').innerHTML = Math.ceil(this.runningcmd.percent) + "%";
            }
            if ($('fileload2')) {
                $('fileload2').show();
                $('fileload2percent').innerHTML = Math.ceil(this.runningcmd.percent) + "%";
            }
        }
        if (this.runningcmd.jobcompleted) {

            if ($('viewoptionscomplete') && null != data.totalSize) {
                if ($('outfilesize')) {
                    $('outfilesize').innerHTML = data.totalSize + " bytes";
                }
                $('viewoptionscomplete').show();
            }
            if ($('taildelaycontrol')) {
                $('taildelaycontrol').hide();
            }
        }

    }