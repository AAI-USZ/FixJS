function() {

    (function() {
        var state = {};
        var attributes = [];
        var textures = [[], []];
        attributes.push(new osg.BlenderLight(0));
        attributes.push(new osg.BlenderLight(1));
        attributes.push(new osg.BlenderMaterial());
        textures[0].push(new osg.BlenderTextureMaterial());
        textures[1].push(new osg.BlenderTextureMaterial());
        
        var shaderContext = new ShaderNode.ShaderContext(state, attributes, textures);
        shaderContext.createVertexShader();
        shaderContext.createFragmentShader();
    })();

    (function() {
        var canvas = createCanvas();
        var viewer = new osgViewer.Viewer(canvas);
        viewer.init();

        var state = viewer.getState();
        state.setGraphicContext(createFakeRenderer());

        var l0 = new osg.BlenderLight(0);
        var l1 = new osg.BlenderLight(1);

        var node0 = new osg.LightSource();
        node0.setLight(l0);
        var node1 = new osg.LightSource();
        node1.setLight(l1);
        var root = new osg.Node();

        var geom = osg.createTexturedBoxGeometry(0,0,0, 2, 2, 2);

        root.addChild(node0);
        root.addChild(node1);
        root.addChild(geom);
        

        var material = new osg.BlenderMaterial();
        material.setDiffuseColor([1,0,1]);
        material.setDiffuseIntensity(0.5);
        material.setSpecularColor([0.4,0.4,0.4]);
        material.setDiffuseIntensity(0.68);

        var texture0 = new osg.BlenderTextureMaterial(new osg.Texture(), 'DiffuseColor', 'DiffuseIntensity');
        var texture1 = new osg.BlenderTextureMaterial(new osg.Texture(),'DiffuseColor');
        var texture2 = new osg.BlenderTextureMaterial(new osg.Texture(),'SpecularColor');
        var texture3 = new osg.BlenderTextureMaterial(new osg.Texture(),'DiffuseIntensity');

        var stateSet = new osg.StateSet();
        stateSet.setTextureAttributeAndModes(0, texture0);
        stateSet.setTextureAttributeAndModes(1, texture1);
        stateSet.setTextureAttributeAndModes(2, texture2);
        stateSet.setTextureAttributeAndModes(3, texture3);
        stateSet.setAttributeAndModes(material);

        stateSet.setShaderGenerator(new osg.BlenderShaderGenerator());
        geom.setStateSet(stateSet);

        viewer.setSceneData(root);
        viewer.frame();
        
//        var shaderContext = new ShaderNode.ShaderContext(state, attributes, textures);
//        shaderContext.createVertexShader();
//        shaderContext.createFragmentShader();
    })();
    
}