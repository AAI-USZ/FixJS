function(jObj) {
            MaterialsModel = require("js/models/materials-model").MaterialsModel;

            this._materialArray = [];
            this._materialTypeArray = [];

            if (!jObj)  return;

            var nMaterials = jObj.nMaterials;
            var matArray = jObj.materials;
            for (var i = 0; i < nMaterials; i++) {
                var mat;
                var matObj = matArray[i].material;
                var shaderName = matObj.material;
                switch (shaderName) {
                    case "flat":
                    case "radialGradient":
                    case "linearGradient":
                    case "bumpMetal":
                    case "uber":
                    case "plasma":
                    case "deform":
                    case "water":
                    case "paris":
                    case "raiders":
                    case "tunnel":
                    case "reliefTunnel":
                    case "squareTunnel":
                    case "flag":
                    case "twist":
                    case "fly":
                    case "julia":
                    case "mandel":
                    case "star":
                    case "zinvert":
                    case "keleidoscope":
                    case "radialBlur":
                    case "pulse":
                    case "twistVert":
                    case "taper":
                        mat = MaterialsModel.getMaterialByShader(shaderName);
                        if (mat)  mat = mat.dup();
                        break;

                    default:
                        console.log("material type: " + shaderName + " is not supported");
                        break;
                }

                if (mat) {
                    mat.importJSON(matObj);
                    this._materialArray.push(mat);
                    this._materialTypeArray.push(matObj.type);
                    var type = matArray[i].type;
                    if (type == "fill")  this._fillMaterial = mat;
                    else  this._strokeMaterial = mat;
                }
            }
        }