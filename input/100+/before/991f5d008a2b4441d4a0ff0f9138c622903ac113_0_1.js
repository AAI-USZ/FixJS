function(){

    this.$host = null;
    this.$debugger = null;

    this.autoAttachComingIn = false;

    this.$supportedProperties.push("state-running", "state-attached",
        "model-sources", "model-stacks", "model-breakpoints", "activeframe");

    this.$createModelPropHandler = function(name, xml, callback) {
        return function(value) {
            if (!value) return;
            //#ifdef __WITH_NAMESERVER
            this[name] = apf.setReference(value,
                apf.nameserver.register("model", value, new apf.model()));

            // set the root node for this model
            this[name].id = this[name].name = value;
            this[name].load(xml);
            //#endif
        }
    };

    this.$createStatePropHandler = function(name) {
        return function(value) {
            if (!value) return;
            //#ifdef __WITH_NAMESERVER
            this[name] = apf.setReference(value,
                    apf.nameserver.register("state", value, new apf.state()));

            // set the root node for this model
            this[name].id = this[name].name = value;
            this[name].deactivate();
            //#endif
        }
    };

    this.$propHandlers["model-sources"] = this.$createModelPropHandler("$mdlSources", "<sources />");
    this.$propHandlers["model-stack"] = this.$createModelPropHandler("$mdlStack", "<frames />");
    this.$propHandlers["model-breakpoints"] = this.$createModelPropHandler("$mdlBreakpoints", "<breakpoints />");

    this.$propHandlers["state-running"] = this.$createStatePropHandler("$stRunning");
    this.$propHandlers["state-attached"] = this.$createStatePropHandler("$stAttached");

    this.$propHandlers["activeframe"] = function(value) {
        if (this.$debugger) {
            this.$ignoreFrameEvent = true;
            this.$debugger.setFrame(value);
            this.$ignoreFrameEvent = false;
        }
        this.dispatchEvent("changeframe", {data: value});
    };

    /**
     * If you are auto attaching, please announce yourself here
     */
    this.registerAutoAttach = function () {
        this.autoAttachComingIn = true;
    };

    /**
     * Manual click on the run button?
     * Youll get special behavior!
     */
    this.registerManualAttach = function () {
        this.autoAttachComingIn = false;
    };

    /**
     * If you are auto attaching, please announce yourself here
     */
    this.registerAutoAttach = function () {
        this.autoAttachComingIn = true;
    };

    /**
     * Manual click on the run button?
     * Youll get special behavior!
     */
    this.registerManualAttach = function () {
        this.autoAttachComingIn = false;
    };

    this.attach = function(host, tab) {
        var _self = this;

        host.$attach(this, tab, function(err, dbgImpl) {
            _self.$host = host;
            _self.$debugger = dbgImpl;

            _self.$loadSources(function() {
                dbgImpl.setBreakpoints(_self.$mdlBreakpoints, function() {
                    var backtraceModel = new apf.model();
                    backtraceModel.load("<frames></frames>");

                    _self.$debugger.backtrace(backtraceModel, function() {
                        var frame = backtraceModel.queryNode("frame[1]");
                        var allowAttach = _self.$allowAttaching(frame);
                        
                        if (!allowAttach) {
                            _self.$debugger.continueScript();
                        }
                        else {
                            _self.$mdlStack.load(backtraceModel.data);
                            // throw out a nice break statement so others know that it fired
                            _self.dispatchEvent("break");
                        }

                        dbgImpl.addEventListener("afterCompile", _self.$onAfterCompile.bind(_self));

                        _self.$stAttached.activate();
                        _self.$stRunning.setProperty("active", dbgImpl.isRunning());

                        dbgImpl.addEventListener("changeRunning", _self.$onChangeRunning.bind(_self));
                        dbgImpl.addEventListener("break", _self.$onBreak.bind(_self));
                        dbgImpl.addEventListener("detach", _self.$onDetach.bind(_self));
                        
                        // monitor the first incoming event to verify whether it's allowed
                        // to attach here
                        var firstChangeFrame = function () {
                            if (_self.$allowAttaching(_self.$debugger.getActiveFrame())) {
                                _self.$onChangeFrame();
                                // now bind to the real changeFrame method
                                dbgImpl.addEventListener("changeFrame", _self.$onChangeFrame.bind(_self));
                                dbgImpl.removeEventListener("changeFrame", firstChangeFrame);
                            }
                        };
                        dbgImpl.addEventListener("changeFrame", firstChangeFrame);
                        
                        if (allowAttach) {
                            _self.setProperty("activeframe", frame);
                        }
                        
                        _self.autoAttachComingIn = false;
                    });
                });
            });
        });
    };

    this.$allowAttaching = function (frame) {
        var _self = this;

        if (this.autoAttachComingIn) return true;

        if (frame) {
            var scriptId = frame.getAttribute("scriptid");
            var scriptName = _self.$mdlSources.queryValue("file[@scriptid='" + scriptId + "']/@scriptname");

            if (scriptName) {
                var line = frame.getAttribute("line");
                var bp = _self.$mdlBreakpoints.queryNode("breakpoint[@script='" + scriptName + "' and @line='" + line + "']");
            }
            if (!scriptName || !bp) {
               return false;
            }

            return true;
        }

        return false;
    };

    this.$onChangeRunning = function() {
        var isRunning = this.$debugger && this.$debugger.isRunning();
        if (this.$stRunning.active && !isRunning)
            this.$onBreak();

        this.$stRunning.setProperty("active", isRunning);

        //if (isRunning)
            //this.$mdlStack.load("<frames />");
    };

    this.$onBreak = function() {
        var _self = this;
        if (!this.$debugger || this.$debugger.isRunning())
            return;

        this.$debugger.backtrace(this.$mdlStack, function() {
            if (_self.activeframe && !_self.$updateMarkerPrerequisite()) {
                _self.continueScript();
                return;
            }
            _self.dispatchEvent("break");
        });
    };

    this.$updateMarkerPrerequisite = function () {
        return this.activeframe;
    };
    this.$onAfterCompile = function(e) {
        var id = e.script.getAttribute("id");
        var oldNode = this.$mdlSources.queryNode("//file[@id='" + id + "']");
        if (oldNode)
            this.$mdlSources.removeXml(oldNode);
        this.$mdlSources.appendXml(e.script);
    };

    this.$onDetach = function() {
        var _self = this;
        
        if (this.$debugger) {
            // destroy doesnt destroy the event listeners
            // so do that by hand
            Object.keys(_self.$debugger.$eventsStack).forEach(function (evname) { 
                _self.$debugger.$eventsStack[evname].forEach(function (fn) {
                    _self.$debugger.removeEventListener(evname, fn);
                });
            });
            
            this.$debugger.destroy();
            this.$debugger = null;
        }

        this.$host = null;

        this.$mdlSources.load("<sources />");
        this.$mdlStack.load("<frames />");
        this.$stAttached.deactivate();
        this.setProperty("activeframe", null);
    };

    this.$onChangeFrame = function() {
        if (!this.$ignoreFrameEvent) {
            this.setProperty("activeframe", this.$debugger.getActiveFrame());
        }
    };

    this.changeFrame = function(frame) {
        this.$debugger.setFrame(frame);
    };

    this.detach = function(callback) {
        var _self = this;

        this.continueScript();
        if (this.$host) {
            this.$host.$detach(this.$debugger, function () {
                if (typeof callback === "function")
                    callback();


                // always detach, so we won't get into limbo state
                _self.$onDetach();
            });
        }
        else {
            this.$onDetach();
        }
    };

    this.$loadSources = function(callback) {
        this.$debugger.scripts(this.$mdlSources, callback);
    };

    this.loadScript = function(script, callback) {
        this.$debugger.loadScript(script, callback);
    };

    this.loadObjects = function(item, callback) {
        this.$debugger.loadObjects(item, callback);
    };

    this.loadFrame = function(frame, callback) {
        this.$debugger.loadFrame(frame, callback);
    };

    this.toggleBreakpoint = function(script, row, content) {
        var model = this.$mdlBreakpoints;
        if (this.$debugger) {
            this.$debugger.toggleBreakpoint(script, row, model, content);
        }
        else {
            var scriptName = script.getAttribute("scriptname");
            var bp = model.queryNode("breakpoint[@script='" + scriptName 
                + "' and @line='" + row + "']");
            if (bp) {
                apf.xmldb.removeNode(bp);
            }
            else {
                // filename is something like blah/blah/workspace/realdir/file
                // we are only interested in the part after workspace for display purposes
                var tofind = "/workspace/";
                var path = script.getAttribute("path");
                var displayText = path;
                if (path.indexOf(tofind) > -1) {
                    displayText = path.substring(path.indexOf(tofind) + tofind.length);
                }

                var bp = apf.n("<breakpoint/>")
                    .attr("script", scriptName)
                    .attr("line", row)
                    .attr("text", displayText + ":" + (parseInt(row, 10) + 1))
                    .attr("lineoffset", 0)
                    .attr("content", content)
                    .attr("enabled", "true")
                    .node();
                model.appendXml(bp);
            }
        }
    };
    
    this.setBreakPointEnabled = function(node, value){
        if (this.$debugger) {
            this.$debugger.setBreakPointEnabled(node, value);
        }
        else {
            node.setAttribute("enabled", value ? true : false);
        }
    },

    this.continueScript = function(callback) {
        this.dispatchEvent("beforecontinue");

        if (this.$debugger)
            this.$debugger.continueScript(callback);
        else
            callback && callback();
    };

    this.stepInto = function() {
        this.dispatchEvent("beforecontinue");

        this.$debugger && this.$debugger.stepInto();
    };

    this.stepNext = function() {
        this.dispatchEvent("beforecontinue");

        this.$debugger && this.$debugger.stepNext();
    };

    this.stepOut = function() {
        this.dispatchEvent("beforecontinue");

        this.$debugger && this.$debugger.stepOut();
    };

    this.suspend = function() {
        this.$debugger && this.$debugger.suspend();
    };

    this.evaluate = function(expression, frame, global, disableBreak, callback){
        this.$debugger && this.$debugger.evaluate(expression, frame, global, disableBreak, callback);
    };

    this.changeLive = function(scriptId, newSource, previewOnly, callback) {
        this.$debugger && this.$debugger.changeLive(scriptId, newSource, previewOnly, callback);
    };

}