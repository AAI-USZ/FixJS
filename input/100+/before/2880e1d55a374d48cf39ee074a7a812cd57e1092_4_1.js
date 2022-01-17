function TwistVertMaterial()
{
    // initialize the inherited members
    this.inheritedFrom = Material;
    this.inheritedFrom();

    ///////////////////////////////////////////////////////////////////////
    // Instance variables
    ///////////////////////////////////////////////////////////////////////
    this._name = "Twist Vertex";
    this._shaderName = "twistVert";

    this._tex0 = 'assets/images/rocky-normal.jpg';
    this._tex1 = 'assets/images/metal.png';

    this._angle = 0.0;
    this._deltaTime = 0.01;
    this._speed = 1.0;

    ///////////////////////////////////////////////////////////////////////
    // Property Accessors
    ///////////////////////////////////////////////////////////////////////
    this.getShaderName = function () { return this._shaderName; };
    this.isAnimated = function () { return true; };
    this.getShaderDef   = function()    {  return twistVertShaderDef;   };
    this.getTechniqueName   = function() { return 'twistMe' };

    this.hasVertexDeformation = function () { return this._hasVertexDeformation; };
    this._hasVertexDeformation = true;
    this._vertexDeformationTolerance = 0.02; // should be a property

    ///////////////////////////////////////////////////////////////////////
    // Material Property Accessors
    ///////////////////////////////////////////////////////////////////////
    this._propNames = [ "u_limit1",             "u_limit2",         "u_twistAmount",    "speed",        "u_tex0",                       "u_tex1"];
    this._propLabels = [ "Start Parameter",     "End Paramater",    "Twist Amount",     "Speed",        "Front facing texture map",     "Back facing texture map"];
    this._propTypes = [ "float",                "float",            "angle",            "float",        "file",                         "file"];
    this._propValues = [];

    // initialize the property values
    this._propValues[this._propNames[0]] = 0.0;
    this._propValues[this._propNames[1]] = 1.0;
    this._propValues[this._propNames[2]] = 2.0 * Math.PI;
    this._propValues[this._propNames[3]] = this._speed;
    this._propValues[this._propNames[4]] = this._tex0.slice();
    this._propValues[this._propNames[5]] = this._tex1.slice();
    ///////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////
    // Methods
    ///////////////////////////////////////////////////////////////////////

    this.init = function (world)
    {
        this.setWorld(world);

        // set up the shader
        this._shader = new RDGE.jshader();
        this._shader.def = twistVertShaderDef;
        this._shader.init();

        // set up the material node
        this._materialNode = RDGE.createMaterialNode("twistVertMaterial" + "_" + world.generateUniqueNodeID());
        this._materialNode.setShader(this._shader);


        // initialize the twist vert properties
        this.setShaderValues();
    };

	this.resetToDefault = function()
	{
		this._propValues[this._propNames[0]] = 0.0;
		this._propValues[this._propNames[1]] = 1.0;
		this._propValues[this._propNames[2]] = 2.0 * Math.PI;
		this._propValues[this._propNames[3]] = this._speed;
		this._propValues[this._propNames[4]] = this._tex0.slice();
		this._propValues[this._propNames[5]] = this._tex1.slice();

		var nProps = this._propNames.length;
		for (var i=0; i<nProps;  i++)
			this.setProperty( this._propNames[i],  this._propValues[this._propNames[i]]  );
	};

    this.update = function (time)
    {
        if (this._shader && this._shader.twistMe)
        {
            var technique = this._shader.twistMe;

            var angle = this._angle;
            angle += this._deltaTime * this._propValues["speed"];
            if (angle > this._propValues["u_twistAmount"])
            {
                angle = this._propValues["u_twistAmount"];
                this._deltaTime = -this._deltaTime;
            }
            else if (angle < 0.0)
            {
                angle = 0;
                this._deltaTime = -this._deltaTime;
            }
            this._angle = angle;
            this._shader.twistMe["u_twistAmount"].set([angle]);

            var tex;
            var glTex = this._glTextures["u_tex0"];
            if (glTex)
            {
                //if (glTex.isAnimated())
                    glTex.render();
                tex = glTex.getTexture();
                if (tex)
                    technique.u_tex0.set( tex );
            }

            glTex = this._glTextures["u_tex1"];
            if (glTex)
            {
                //if (glTex.isAnimated())
                    glTex.render();
                tex = glTex.getTexture();
                if (tex)
                    technique.u_tex1.set( tex );
            }

        }
    }
}