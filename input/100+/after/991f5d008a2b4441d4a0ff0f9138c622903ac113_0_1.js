function(host, tab) {
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
    }