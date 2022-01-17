function(){
	var _model = new model();
	var _mainController = new mainController(_model);
	var _mainView = new mainView($("#mainView"),_model,_mainController);
	
	
	
}