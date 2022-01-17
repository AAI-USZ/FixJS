function createScene() 
{
    var group = new osg.Node();

    var size = 250;
    var ground = osg.createTexturedBoxGeometry(0,0,0,
                                               size,size,size);
    ground = getModel();

    ground.getOrCreateStateSet().setAttributeAndMode(getShader());

    osgDB.Promise.all([
        osgDB.readImage('textures/posx.jpg'),
        osgDB.readImage('textures/negx.jpg'),

        osgDB.readImage('textures/posy.jpg'),
        osgDB.readImage('textures/negy.jpg'),

        osgDB.readImage('textures/posz.jpg'),
        osgDB.readImage('textures/negz.jpg')]).then(function ( images) {

            var texture = new osg.TextureCubeMap();

            texture.setImage('TEXTURE_CUBE_MAP_POSITIVE_X', images[0]);
            texture.setImage('TEXTURE_CUBE_MAP_NEGATIVE_X', images[1]);

            texture.setImage('TEXTURE_CUBE_MAP_POSITIVE_Y', images[2]);
            texture.setImage('TEXTURE_CUBE_MAP_NEGATIVE_Y', images[3]);

            texture.setImage('TEXTURE_CUBE_MAP_POSITIVE_Z', images[4]);
            texture.setImage('TEXTURE_CUBE_MAP_NEGATIVE_Z', images[5]);

            texture.setMinFilter('LINEAR_MIPMAP_LINEAR');

            ground.getOrCreateStateSet().setTextureAttributeAndMode(0, texture);
            ground.getOrCreateStateSet().addUniform(osg.Uniform.createInt1(0,'Texture0'));
        });

    group.addChild(ground);
    return group;
}