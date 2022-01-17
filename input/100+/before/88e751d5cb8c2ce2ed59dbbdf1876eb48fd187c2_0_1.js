function DSRV(parameters) {
    this.m_exposedModel = parameters.exposedModel;
    this.m_key = parameters.key;

    this.m_orientation = quat4.create();
    this.m_orientation[3] = 1;

    this.m_projection = mat4.identity(mat4.create());
    this.m_modelview = mat4.identity(mat4.create());
    this.m_bbmin = vec3.createFrom(0, 0, 0);
    this.m_bbmax = vec3.createFrom(2, 2, 2);

    this.m_aspect = 1;

    this.m_state = -1;
    this.ROTATE = 0;
    this.ZOOM = 1;

    this.m_beginDirection = vec3.create();

    this.m_translateZ = 0;


    // Fix this:
    this.m_height = 500;
    this.m_width = 500;
}