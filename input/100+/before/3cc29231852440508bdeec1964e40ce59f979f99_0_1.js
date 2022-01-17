function(jObj) {
            if (!jObj || !jObj.materials)  return;

            var nMaterials = jObj.nMaterials;
            var matArray = jObj.materials;
            for (var i=0;  i<nMaterials;  i++)
            {
                var mat;
                var matObj = matArray[i].material;
                var matNodeName = matArray[i].materialNodeName;
                var shaderName = matObj.material;
                switch (shaderName)
                {
                    case "flat":            mat = Object.create(NinjaCvsRt.RuntimeFlatMaterial, {});            break;
                    case "radialGradient":  mat = Object.create(NinjaCvsRt.RuntimeRadialGradientMaterial, {});  break;
                    case "linearGradient":  mat = Object.create(NinjaCvsRt.RuntimeLinearGradientMaterial, {});  break;
                    case "bumpMetal":       mat = Object.create(NinjaCvsRt.RuntimeBumpMetalMaterial, {});       break;
                    case "uber":            mat = Object.create(NinjaCvsRt.RuntimeUberMaterial, {});            break;
                    case "plasma":          mat = Object.create(NinjaCvsRt.RuntimePlasmaMaterial, {});          break;
                    case "taper":           mat = Object.create(NinjaCvsRt.RuntimeTaperMaterial, {});           break;

                    case "paris":
                    case "water":           mat = Object.create(NinjaCvsRt.RuntimeWaterMaterial, {});           break;

                    case "deform":
                    case "raiders":
                    case "tunnel":
                    case "reliefTunnel":
                    case "squareTunnel":
                    case "twist":
                    case "fly":
                    case "julia":
                    case "mandel":
                    case "star":
                    case "zinvert":
                    case "keleidoscope":
                    case "radialBlur":
                    case "pulse":
                        mat = Object.create(NinjaCvsRt.RuntimePulseMaterial, {});
                        break;

                    case "twistVert":
                        mat = Object.create(NinjaCvsRt.RuntimeTwistVertMaterial, {});
                        break;

                    case "flag":
                        mat = Object.create(NinjaCvsRt.RuntimeFlagMaterial, {});
                        break;

                    default:
                        console.log( "material type: " + shaderName + " is not supported" );
                        break;
                }

                if (mat)
                {
                    mat.importJSON( matObj );
                    mat._materialNodeName = matNodeName;
                    this._materials.push( mat );
                }
            }
        }