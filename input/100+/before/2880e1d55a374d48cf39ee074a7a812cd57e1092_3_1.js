function TaperMaterial()
{
    // initialize the inherited members
    this.inheritedFrom = Material;
    this.inheritedFrom();

    ///////////////////////////////////////////////////////////////////////
    // Instance variables
    ///////////////////////////////////////////////////////////////////////
    this._name = "Taper";
    this._shaderName = "taper";

    this._deltaTime = 0.0;

    ///////////////////////////////////////////////////////////////////////
    // Property Accessors
    ///////////////////////////////////////////////////////////////////////
    this.getShaderName = function () { return this._shaderName; };

    this.isAnimated = function () { return true; };
    this.getShaderDef   = function()    {  return taperShaderDef;   };
    this.getTechniqueName   = function() {  return 'colorMe'  };

    this.hasVertexDeformation = function () { return this._hasVertexDeformation; };
    this._hasVertexDeformation = true;
    this._vertexDeformationTolerance = 0.02; // should be a property

	this.getVertexDeformationTolerance = function()	{  return  this._propValues[this._propNames[7]];  };

    ///////////////////////////////////////////////////////////////////////
    // Methods
    ///////////////////////////////////////////////////////////////////////
    this.init = function (world) {
        this.setWorld(world);

        // set up the shader
        this._shader = new RDGE.jshader();
        this._shader.def = taperShaderDef;
        this._shader.init();

        // set up the material node
        this._materialNode = RDGE.createMaterialNode("taperMaterial" + "_" + world.generateUniqueNodeID());
        this._materialNode.setShader(this._shader);

        this._time = 0;
        if (this._shader && this._shader['default']) {
            this._shader['default'].u_time.set([this._time]);
        }

        // initialize the taper properties
        this.setShaderValues();
    };

	this.resetToDefault = function()
	{
		this._propValues[this._propNames[0]] = 0.25;
		this._propValues[this._propNames[1]] = 0.50;
		this._propValues[this._propNames[2]] = 0.75;
		this._propValues[this._propNames[3]] = -1;
		this._propValues[this._propNames[4]] = 1;
		this._propValues[this._propNames[5]] = 0.0;
		this._propValues[this._propNames[6]] = 0.9;
		this._propValues[this._propNames[7]] = this._vertexDeformationTolerance;
		this._propValues[this._propNames[8]] = 1.0;

		var nProps = this._propNames.length;
		for (var i=0; i<nProps;  i++)
			this.setProperty( this._propNames[i],  this._propValues[this._propNames[i]]  );
	};


    ///////////////////////////////////////////////////////////////////////
    // Material Property Accessors
    ///////////////////////////////////////////////////////////////////////
    this._propNames = [ "u_limit1", "u_limit2", "u_limit3", "u_minVal", "u_maxVal", "u_center", "u_taperAmount",  "facettol",  "u_speed" ];
    this._propLabels = [ "Minimum Parameter Value", "Center Paramater Value", "Maximum Parameter Value", "Minimum Data Bounds", "Maximum Data Bounds", "Center", "Taper Amount",  "Faceting Tolerance", "Speed" ];
    this._propTypes = [ "float", "float", "float", "float", "float", "float", "float", "float", "float" ];
    this._propValues = [];

    // initialize the property values
    this._propValues[this._propNames[0]] = 0.25;
    this._propValues[this._propNames[1]] = 0.50;
    this._propValues[this._propNames[2]] = 0.75;
    this._propValues[this._propNames[3]] = -1;
    this._propValues[this._propNames[4]] = 1;
    this._propValues[this._propNames[5]] = 0.0;
    this._propValues[this._propNames[6]] = 0.9;
    this._propValues[this._propNames[7]] = this._vertexDeformationTolerance;
    this._propValues[this._propNames[8]] = 1.0;

    this.update = function (time) {
        var speed = this._propValues["u_speed"];
        this._deltaTime += 0.01 * speed;

        if (this._shader && this._shader.colorMe) {
            var t3 = this._propValues["u_limit3"] - this._deltaTime;
            if (t3 < 0) {
                this._deltaTime = this._propValues["u_limit1"] - 1.0;
                t3 = this._propValues["u_limit3"] - this._deltaTime;
            }

            var t1 = this._propValues["u_limit1"] - this._deltaTime,
                t2 = this._propValues["u_limit2"] - this._deltaTime;


            this._shader.colorMe["u_limit1"].set([t1]);
            this._shader.colorMe["u_limit2"].set([t2]);
            this._shader.colorMe["u_limit3"].set([t3]);
        }
    };
}