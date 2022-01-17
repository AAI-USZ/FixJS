function(event) {
		//set parameters to global array
		CubeViz_Parameters_Component = CubeViz_Controller_Main.retrievedCubeVizParameters;
		//get observations for the retrieved parameters
		CubeViz_Controller_Main.getResultObservations(CubeViz_Link_Chosen_Component);
	}