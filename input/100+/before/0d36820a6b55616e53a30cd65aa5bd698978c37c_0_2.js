function(action, eventSet, datamodelForNextStep, eventsToAddToInnerQueue) {
        var _constructEventData = (function(){
            var data = {};

            if(action.content){
                //content
                data = action.content;
            }else if(action.contentexpr){
                data = this._eval(action.contentexpr, datamodelForNextStep, eventSet);
            }else{
                //namelist
                if (action.namelist) {
                    action.namelist.forEach(function(name){
                        data[name] = this._datamodel[name].get();
                    },this);
                }

                //params
                action.params.forEach(function(param){
                    if(param.expr){
                        data[param.name] = this._eval(param.expr, datamodelForNextStep, eventSet);
                    }else if(param.location){
                        data[param.name] = this._datamodel[param.location].get();
                    }
                },this);
            }

            return data;
        }).bind(this);

        switch (action.type) {
            case "raise":
                eventsToAddToInnerQueue.add({ name: action.event, data : {}});
                break;
            case "assign":
                this._datamodel[action.location].set(this._eval(action, datamodelForNextStep, eventSet));
                break;
            case "script":
                this._eval(action, datamodelForNextStep, eventSet, true);
                break;
            case "log":
                this.opts.log(this._eval(action, datamodelForNextStep, eventSet));
                break;
            case "send":
                if (this._send) {
                    this._send({
                        target: action.targetexpr ? this._eval(action.targetexpr, datamodelForNextStep, eventSet) : action.target,
                        name: action.eventexpr ? this._eval(action.eventexpr, datamodelForNextStep, eventSet) : action.event,
                        data: _constructEventData(),
                        origin: this.opts.origin,
                        type: action.typeexpr ? this._eval(action.typeexpr, datamodelForNextStep, eventSet) : action.sendType
                    }, {
                        delay: action.delayexpr ? this._eval(action.delayexpr, datamodelForNextStep, eventSet) : action.delay,
                        sendId: action.idlocation ? this._datamodel[action.idlocation].get() : action.id
                    });
                }
                break;
            case "cancel":
                if (this._cancel) this._cancel(action.sendid);
                break;
            default : break;
        }
    }