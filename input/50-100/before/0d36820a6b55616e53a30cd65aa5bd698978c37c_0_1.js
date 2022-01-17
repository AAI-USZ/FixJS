function(param){
                    if(param.expr){
                        data[param.name] = this._eval(param.expr, datamodelForNextStep, eventSet);
                    }else if(param.location){
                        data[param.name] = this._datamodel[param.location].get();
                    }
                }