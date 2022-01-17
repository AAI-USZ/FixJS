function(type) {
        var str = "";
        switch (type) {
        case osg.ShaderGeneratorType.VertexInit:
            str = [ "",
                    "varying vec3 FragNormal;",
                    "varying vec3 FragEyeVector;",
                    "",
                    "" ].join('\n');
            break;
        case osg.ShaderGeneratorType.VertexFunction:
            str = [ "",
                    "vec3 computeNormal() {",
                    "   return vec3(NormalMatrix * vec4(Normal, 0.0));",
                    "}",
                    "",
                    "vec3 computeEyeVertex() {",
                    "   return vec3(ModelViewMatrix * vec4(Vertex,1.0));",
                    "}",
                    "",
                    "float getLightAttenuation(vec3 lightDir, float constant, float linear, float quadratic) {",
                    "    ",
                    "    float d = length(lightDir);",
                    "    float att = 1.0 / ( constant + linear*d + quadratic*d*d);",
                    "    return att;",
                    "}",
                    ""].join('\n');
            break;
        case osg.ShaderGeneratorType.VertexMain:
            str = [ "",
                    "  vec3 vertexEye = computeEyeVertex();",
                    "  FragEyeVector = -vertexEye;",
                    "  FragNormal = computeNormal();",
                    "" ].join('\n');
            break;
        case osg.ShaderGeneratorType.FragmentInit:
            str = [ "varying vec3 FragNormal;",
                    "varying vec3 FragEyeVector;",
                    "vec4 LightColor = vec4(0.0);",
                    "" ].join('\n');
            break;

        case osg.ShaderGeneratorType.FragmentFunction:
            str = [ "",
                    "vec4 computeLightContribution(vec4 materialEmission,",
                    "                              vec4 materialAmbient,",
                    "                              vec4 materialDiffuse,",
                    "                              vec4 materialSpecular,",
                    "                              float materialShininess,",
                    "                              vec4 lightAmbient,",
                    "                              vec4 lightDiffuse,",
                    "                              vec4 lightSpecular,",
                    "                              vec3 normal,",
                    "                              vec3 eye,",
                    "                              vec3 lightDirection,",
                    "                              vec3 lightSpotDirection,",
                    "                              float lightCosSpotCutoff,",
                    "                              float lightCosSpotCutoffEnd,",
                    "                              float lightAttenuation)",
                    "{",
                    "    vec3 L = lightDirection;",
                    "    vec3 N = normal;",
                    "    float NdotL = max(dot(L, N), 0.0);",
                    "    vec4 ambient = lightAmbient;",
                    "    vec4 diffuse = vec4(0.0);",
                    "    vec4 specular = vec4(0.0);",
                    "    float spot = 0.0;",
                    "",
                    "    if (NdotL > 0.0) {",
                    "        vec3 E = eye;",
                    "        vec3 R = reflect(-L, N);",
                    "        float RdotE = pow( max(dot(R, E), 0.0), materialShininess );",
                    "",
                    "        vec3 D = lightSpotDirection;",
                    "        spot = 1.0;",
                    "        if (lightCosSpotCutoff > 0.0) {",
                    "          float cosCurAngle = dot(L, D);",
                    "          float cosInnerMinusOuterAngle = lightCosSpotCutoff - lightCosSpotCutoffEnd;",
                    "",
                    "          spot = clamp((cosCurAngle - lightCosSpotCutoffEnd) / cosInnerMinusOuterAngle, 0.0, 1.0);",
                    "        }",

                    "        diffuse = lightDiffuse * NdotL;",
                    "        specular = lightSpecular * RdotE;",
                    "    }",
                    "",
                    "    return materialEmission + (materialAmbient*ambient + (materialDiffuse*diffuse + materialSpecular*specular) * spot) * lightAttenuation;",
                    "}",
                    "" ].join('\n');
            break;
        case osg.ShaderGeneratorType.FragmentMain:
            str = [ "",
                    "  vec3 normal = normalize(FragNormal);",
                    "  vec3 eyeVector = normalize(FragEyeVector);",
                    ""].join("\n");
            break;
        case osg.ShaderGeneratorType.FragmentEnd:
            str = [ "",
                    "  fragColor *= LightColor;",
                    ""].join('\n');
            break;
        }
        return str;
    }