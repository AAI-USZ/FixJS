function DSRV(parameters) {
    this.m_exposedModel = parameters.exposedModel;
    this.m_key = parameters.key;

    this.m_orientation = quat4.create();
    this.m_orientation[3] = 1;

    this.m_projection = mat4.identity(mat4.create());
    this.m_modelview = mat4.identity(mat4.create());
    this.m_bbmin = vec3.create([-1.1, -1.1, -1.1]);

    this.m_bbmax = vec3.create([1.1, 1.1, 1.1]);

    this.m_aspect = 1;

    this.m_state = -1;
    this.ROTATE = 0;
    this.ZOOM = 1;

    this.m_beginDirection = vec3.create();

    this.m_translateZ = 4;

    // Get width and height:
    this.setSize(this.m_exposedModel.getElementValue(this.m_key).getElementValue("width"),
            this.m_exposedModel.getElementValue(this.m_key).getElementValue("height"));
}