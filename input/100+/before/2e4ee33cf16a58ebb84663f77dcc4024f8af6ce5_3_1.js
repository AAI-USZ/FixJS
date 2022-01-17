function createProjectedShadowScene()
{
    var model = osgDB.parseSceneGraph(getOgre());
    var root = new osg.MatrixTransform();
    var shadowNode = new osg.MatrixTransform();
    shadowNode.addChild(model);
    var bs = model.getBound();

    var light = new osg.MatrixTransform();
    light.lightShadow = new osg.Light();
    light.setUpdateCallback(new LightUpdateCallback(shadowNode.getMatrix()));
    light.getOrCreateStateSet().setAttributeAndMode(light.lightShadow);

    shadowNode.getOrCreateStateSet().setTextureAttributeAndMode(0, new osg.Texture(), osg.StateAttribute.OFF | osg.StateAttribute.OVERRIDE);
    shadowNode.getOrCreateStateSet().setAttributeAndMode(new osg.CullFace('DISABLE'), osg.StateAttribute.OFF | osg.StateAttribute.OVERRIDE);
    var materialDisabled = new osg.Material();
    materialDisabled.setEmission([0,0,0,1]);
    materialDisabled.setAmbient([0,0,0,1]);
    materialDisabled.setDiffuse([0,0,0,1]);
    materialDisabled.setSpecular([0,0,0,1]);
    shadowNode.getOrCreateStateSet().setAttributeAndMode(materialDisabled, osg.StateAttribute.ON | osg.StateAttribute.OVERRIDE);

    light.addChild(model);
    root.addChild(light);
    root.addChild(shadowNode);

    return root;
}