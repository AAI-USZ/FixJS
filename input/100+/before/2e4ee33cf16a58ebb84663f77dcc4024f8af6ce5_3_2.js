function createTextureProjectedShadowScene()
{
    var model = osgDB.parseSceneGraph(getOgre());
    var root = new osg.MatrixTransform();
    var shadowNode = new osg.MatrixTransform();
    shadowNode.addChild(model);
    var bs = model.getBound();

    var light = new osg.MatrixTransform();
    var rtt = new osg.Camera();
    rtt.setName("rtt_camera");
    rttSize = [512,512];
    
    rtt.setProjectionMatrix(osg.Matrix.makePerspective(15, 1, 1.0, 1000.0));
    var lightMatrix = [];
    rtt.setViewMatrix(osg.Matrix.makeLookAt([0,0,80],[0,0,0],[0,1,0]));
    rtt.setRenderOrder(osg.Camera.PRE_RENDER, 0);
    rtt.setReferenceFrame(osg.Transform.ABSOLUTE_RF);
    rtt.setViewport(new osg.Viewport(0,0,rttSize[0],rttSize[1]));
    rtt.setClearColor([0, 0, 0, 0]);

    var matDark = new osg.Material();
    var black = [0,0,0,1];
    matDark.setEmission(black);
    matDark.setAmbient(black);
    matDark.setDiffuse(black);
    matDark.setSpecular(black);
    shadowNode.getOrCreateStateSet().setAttributeAndMode(matDark, osg.StateAttribute.ON | osg.StateAttribute.OVERRIDE);

    var rttTexture = new osg.Texture();
    rttTexture.setTextureSize(rttSize[0],rttSize[1]);
    rttTexture.setMinFilter('LINEAR');
    rttTexture.setMagFilter('LINEAR');
    rtt.attachTexture(gl.COLOR_ATTACHMENT0, rttTexture, 0);
    rtt.addChild(shadowNode);
    light.addChild(rtt);

    var shadowMatrix = [];
    light.lightShadow = new osg.Light();
    light.getOrCreateStateSet().setAttributeAndMode(light.lightShadow);

    var q = osg.createTexturedQuad(-10,-10,-5.0,
                                  20, 0 ,0,
                                  0, 20 ,0);
    q.getOrCreateStateSet().setAttributeAndMode(new osg.BlendFunc('ONE', 'ONE_MINUS_SRC_ALPHA'));
    q.getOrCreateStateSet().setAttributeAndMode(new osg.Depth('LESS', 0.0, 1.0,false));

    q.getOrCreateStateSet().setTextureAttributeAndMode(0, rttTexture);
    q.getOrCreateStateSet().setAttributeAndMode(getTextureProjectedShadowShader());
    var projectionShadow = new osg.Uniform.createMatrix4(osg.Matrix.makeIdentity(), "ProjectionShadow");
    var modelViewShadow = new osg.Uniform.createMatrix4(osg.Matrix.makeIdentity(), "ModelViewShadow");
    q.getOrCreateStateSet().addUniform(projectionShadow);

    q.getOrCreateStateSet().addUniform(modelViewShadow);
    light.setUpdateCallback(new LightUpdateCallbackProjectedTexture( { 
        'projectionShadow': projectionShadow,
        'modelViewShadow' : modelViewShadow,
        'camera': rtt,
        'shadowScene': shadowNode
    }));


    var blurr = new osg.Camera();
    blurr.setProjectionMatrix(osg.Matrix.makeOrtho(0, rttSize[0], 0, rttSize[1], -5, 5));
    blurr.setRenderOrder(osg.Camera.PRE_RENDER, 0);
    blurr.setReferenceFrame(osg.Transform.ABSOLUTE_RF);
    blurr.setViewport(new osg.Viewport(0,0,rttSize[0],rttSize[1]));
    var quad = osg.createTexturedQuad(0,0,0,
                                      rttSize[0], 0 ,0,
                                      0, rttSize[1],0);
    quad.getOrCreateStateSet().setTextureAttributeAndMode(0, rttTexture);
    quad.getOrCreateStateSet().setAttributeAndMode(getBlurrShader());
    var blurredTexture = new osg.Texture();
    blurredTexture.setTextureSize(rttSize[0],rttSize[1]);
    blurredTexture.setMinFilter('LINEAR');
    blurredTexture.setMagFilter('LINEAR');
    blurr.setClearColor([0,0,0,0]);
    blurr.attachTexture(gl.COLOR_ATTACHMENT0, blurredTexture, 0);
    blurr.addChild(quad);

    // the one used for the final
    q.getOrCreateStateSet().setTextureAttributeAndMode(0, blurredTexture);

    //root.addChild(model);
    root.addChild(light);
    light.addChild(model);
    root.addChild(blurr);
    root.addChild(q);

    return root;
}