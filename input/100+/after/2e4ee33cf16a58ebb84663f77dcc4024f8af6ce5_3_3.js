function createShadowMapScene(model) 
{
    var root = new osg.MatrixTransform();

    var models = new osg.Node();
    models.addChild(model);
    var scene = new osg.Node();
    scene.addChild(models);

    var shadowScene = new osg.MatrixTransform();
    shadowScene.addChild(models);


    var light = new osg.MatrixTransform();

    var rtt = new osg.Camera();
    rtt.setName("rtt_camera");
    rttSize = [512,512];
    
    scene.getOrCreateStateSet().setAttributeAndMode(new osg.BlendFunc('ONE','ONE_MINUS_SRC_ALPHA'));

    // important because we use linear zbuffer
    var near = 70.0;
    var far = 110.0;

    var nearShadow = new osg.Uniform.createFloat1(near, "nearShadow");
    var farShadow = new osg.Uniform.createFloat1(far, "farShadow" );

    var projectionShadow = new osg.Uniform.createMatrix4(osg.Matrix.makeIdentity(), "ProjectionShadow");
    var modelViewShadow = new osg.Uniform.createMatrix4(osg.Matrix.makeIdentity(), "ModelViewShadow");

    rtt.setProjectionMatrix(osg.Matrix.makePerspective(15, 1, near, far));
    rtt.setRenderOrder(osg.Camera.PRE_RENDER, 0);
    rtt.setReferenceFrame(osg.Transform.ABSOLUTE_RF);
    rtt.setViewport(new osg.Viewport(0,0,rttSize[0],rttSize[1]));
    rtt.setClearColor([1, 1, 1, 0.0]);

    shadowScene.getOrCreateStateSet().setAttributeAndMode(getShadowMapShaderLight(), osg.StateAttribute.ON | osg.StateAttribute.OVERRIDE);
    shadowScene.getOrCreateStateSet().addUniform(nearShadow);
    shadowScene.getOrCreateStateSet().addUniform(farShadow);

    var rttTexture = new osg.Texture();
    rttTexture.setTextureSize(rttSize[0],rttSize[1]);
    rttTexture.setMinFilter('NEAREST');
    rttTexture.setMagFilter('NEAREST');
    rtt.attachTexture(gl.COLOR_ATTACHMENT0, rttTexture, 0);
    rtt.attachRenderBuffer(gl.DEPTH_ATTACHMENT, gl.DEPTH_COMPONENT16);
    rtt.addChild(shadowScene);
    light.addChild(rtt);

    light.lightShadow = new osg.Light();
    light.getOrCreateStateSet().setAttributeAndMode(light.lightShadow);

    var q = osg.createTexturedQuad(-10,-10,-5.0,
                                  20, 0 ,0,
                                  0, 20 ,0);
    var stateSet = new osg.StateSet();
    var prg = getOgreShadowMapShader();
    stateSet.setAttributeAndMode( prg, osg.StateAttribute.ON | osg.StateAttribute.OVERRIDE);
    stateSet.setTextureAttributeAndMode(1, rttTexture, osg.StateAttribute.ON | osg.StateAttribute.OVERRIDE);

    // tracking should be automatic
    stateSet.addUniform(osg.Uniform.createInt1(1, "Texture1"));
    stateSet.addUniform(osg.Uniform.createInt1(0, "Texture0"));
    prg.trackAttributes = {};
    prg.trackAttributes.attributeKeys = [];
    prg.trackAttributes.attributeKeys.push('Material');
    prg.trackAttributes.attributeKeys.push('Light0');

    stateSet.addUniform(projectionShadow);
    stateSet.addUniform(modelViewShadow);
    stateSet.addUniform(nearShadow);
    stateSet.addUniform(farShadow);

    var ungroundUniform = osg.Uniform.createInt1(0,'ground');
    stateSet.addUniform(ungroundUniform);

    var groundUniform = osg.Uniform.createInt1(1,'ground');
    q.getOrCreateStateSet().addUniform(groundUniform);
//    q.getOrCreateStateSet().setAttributeAndMode(new osg.Depth('LESS', 0.0, 1.0, false));
    q.getOrCreateStateSet().setAttributeAndMode(new osg.BlendFunc('ONE','ONE_MINUS_SRC_ALPHA'));
    scene.setStateSet(stateSet);


    light.setUpdateCallback(new LightUpdateCallbackShadowMap( {
        'projectionShadow': projectionShadow,
        'modelViewShadow' : modelViewShadow,
        'camera': rtt,
        'shadowScene': shadowScene
    }));

    models.addChild(q);

    root.getOrCreateStateSet().setAttributeAndMode(light.lightShadow);

    root.addChild(light);
    root.addChild(scene);

    return root;
}