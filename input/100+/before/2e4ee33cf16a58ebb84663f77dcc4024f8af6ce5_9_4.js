function(input, light) {
    var jsonObj = input.getJSON();
    var check = function(o) {
        if (o.LightNum !== undefined &&
            o.Ambient !== undefined &&
            o.Diffuse !== undefined &&
            o.Direction !== undefined &&
            o.Position !== undefined &&
            o.Specular !== undefined &&
            o.SpotCutoff !== undefined &&
            o.LinearAttenuation !== undefined &&
            o.ConstantAttenuation !== undefined &&
            o.QuadraticAttenuation !== undefined ) {
            return true;
        }
        return false;
    };
    if (!check(jsonObj)) {
        return;
    }

    osgDB.ObjectWrapper.serializers.osg.Object(input, light);
    light.setAmbient(jsonObj.Ambient);
    light.setConstantAttenuation(jsonObj.ConstantAttenuation);
    light.setDiffuse(jsonObj.Diffuse);
    light.setDirection(jsonObj.Direction);
    light.setLightNumber(jsonObj.LightNum);
    light.setLinearAttenuation(jsonObj.LinearAttenuation);
    light.setPosition(jsonObj.Position);
    light.setQuadraticAttenuation(jsonObj.QuadraticAttenuation);
    light.setSpecular(jsonObj.Specular);
    light.setSpotCutoff(jsonObj.SpotCutoff);
    light.setSpotBlend(0.01);
    if (jsonObj.SpotExponent !== undefined) {
        light.setSpotBlend(jsonObj.SpotExponent/128.0);
    }
}