function(result) {

        ok(result.getStateSet() !== undefined, "check last StateSet");
        ok(result.getStateSet().getAttribute('BlendFunc') !== undefined, "check BlendFunc");
        var material = result.getStateSet().getAttribute('Material');
        var materialCheck = ( material !== undefined &&
                              check_near(material.getAmbient(), [0.5, 0.5, 0.5, 1]) && 
                              check_near(material.getDiffuse(), [0.1, 0.1, 0.1, 0.1]) && 
                              check_near(material.getEmission(), [0.0, 0.0, 0.0, 0.5]) && 
                              check_near(material.getSpecular(), [0.5, 0.7, 0.5, 1]) &&
                              check_near(material.getShininess(), 2.5) && 
                              material.getName() === "FloorBorder1");

        ok(materialCheck, "check Material");
        var texture = result.getStateSet().getTextureAttribute(0,"Texture");
        ok( texture !== undefined, "Check texture");
        ok( texture.getWrapS() === osg.Texture.REPEAT, "Check wraps texture");
        ok( texture.getWrapT() === osg.Texture.CLAMP_TO_EDGE, "Check wrapt texture");
        ok( texture.getMinFilter() === osg.Texture.LINEAR_MIPMAP_LINEAR, "Check min filter texture");
        ok( texture.getMagFilter() === osg.Texture.LINEAR, "Check mag filter texture");
        start();
    }