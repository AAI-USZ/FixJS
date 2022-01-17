function BlueSkyMaterial()
{
    // initialize the inherited members
    this.inheritedFrom = WaterMaterial;
    this.inheritedFrom();

    this._name = "Blue Sky";
    this._shaderName = "blueSky";

    this._defaultTexMap = 'assets/images/bluesky.png';
    this._propValues[this._propNames[0]] = this._defaultTexMap.slice(0);

    //this._diffuseColor = [0.5, 0.5, 0.5, 0.5];
    //this._propValues[this._propNames[1]] = this._diffuseColor.slice();

    this.init = function (world)
    {
        // save the world
        if (world) this.setWorld(world);

        // set up the shader
        this._shader = new RDGE.jshader();
        this._shader.def = waterMaterialDef;
        this._shader.init();

        // set up the material node
        this._materialNode = RDGE.createMaterialNode("blueSkyMaterial" + "_" + world.generateUniqueNodeID());
        this._materialNode.setShader(this._shader);

        this._time = 0;
        if (this._shader && this._shader['default'])
            this._shader['default'].u_time.set([this._time]);

        // set the shader values in the shader
        this.setShaderValues();
        this.setResolution([world.getViewportWidth(), world.getViewportHeight()]);
        this.update(0);
    }
}