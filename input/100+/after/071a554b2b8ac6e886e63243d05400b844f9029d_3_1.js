function(child, idx){
						var params = {
							ownerDocument: _self.ownerDocument,
							parent: _self,
							indexAtStartup: startIndex + idx // Won't be updated even if there are removals/adds of repeat items after startup
						};
						params[(_self.childParams || _self[childParamsAttr] && evalParams.call(params, _self[childParamsAttr]) || {})._relTargetProp || clz.prototype._relTargetProp || "target"] = child;

						var childParams = _self.childParams || _self[childParamsAttr] && evalParams.call(params, _self[childParamsAttr]),
						 childBindings = _self.childBindings || _self[childBindingsAttr] && evalParams.call(params, _self[childBindingsAttr]);
						if(_self.templateString && !params.templateString && !clz.prototype.templateString){ params.templateString = _self.templateString; }
						if(childBindings && !params.bindings && !clz.prototype.bindings){ params.bindings = childBindings; }
						return new clz(lang.mixin(params, childParams));
					}