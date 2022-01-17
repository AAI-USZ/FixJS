function createScene() 
{
    var group = new osg.Node();

    var size = 250;
    var ground = osg.createTexturedBoxGeometry(0,0,0,
                                               size,size,size);
    ground = getModel();

    ground.getOrCreateStateSet().setAttributeAndMode(getShader());
    //ground.getOrCreateStateSet().setAttributeAndMode(new osg.CullFace('DISABLE'));

    var texture = new osg.TextureCubeMap();
    texture.setImage('TEXTURE_CUBE_MAP_POSITIVE_X', osgDB.readImage('textures/posx.jpg'));
    texture.setImage('TEXTURE_CUBE_MAP_NEGATIVE_X', osgDB.readImage('textures/negx.jpg'));

    texture.setImage('TEXTURE_CUBE_MAP_POSITIVE_Y', osgDB.readImage('textures/posy.jpg'));
    texture.setImage('TEXTURE_CUBE_MAP_NEGATIVE_Y', osgDB.readImage('textures/negy.jpg'));

    texture.setImage('TEXTURE_CUBE_MAP_POSITIVE_Z', osgDB.readImage('textures/posz.jpg'));
    texture.setImage('TEXTURE_CUBE_MAP_NEGATIVE_Z', osgDB.readImage('textures/negz.jpg'));

    texture.setMinFilter('LINEAR_MIPMAP_LINEAR');
    ground.getOrCreateStateSet().setTextureAttributeAndMode(0, texture);
    ground.getOrCreateStateSet().addUniform(osg.Uniform.createInt1(0,'Texture0'));
    
    group.addChild(ground);
    return group;
}