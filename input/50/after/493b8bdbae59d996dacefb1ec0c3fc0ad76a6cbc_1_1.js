function(layerModel){
			layerModel.visual.remove();
			layerModel.controls.remove();
			layerModel.trigger('editor_layerExit');
		}