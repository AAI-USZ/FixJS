f        "use strict";
        var i;
        var dimSizes;
        var s = " ";
        var indexName, indexType;
        if ((construct === "combine") || (construct === "comprehension") || (construct === "comprehensionScalar")) {
            // The relative argumment is an index.
            if (construct === "combine") {
                indexType = funDecl.typeInfo.parameters[1];
            } else {
                // comprehensions have no this!
                indexType = funDecl.typeInfo.parameters[0];
            }
            indexName = RENAME(funDecl.params[0]);

            // the first argument is id that this call is responsible for.
            if (indexType.isObjectType("Array")) { //(formalsType === "int*") {
                dimSizes = indexType.getOpenCLShape();
                s = s + indexType.getOpenCLAddressSpace() +" const "+ RiverTrail.Helper.stripToBaseType(indexType.OpenCLType) + " " +
                    indexName+"["+ dimSizes.toString() +"] = "; 
                // Deal with array indices.
                // SAH: id may _NEVER_ be changed in this process as it is required to assign the result!
                //   CR -- RLH I think we are OK w.r.t the alert following but need to build regression.
                //   alert("make sure this deals with combine to different levels.");
                s = s + " { ";
                for (i = 0; i < dimSizes[0]; i++) { // Ususally only 2 or 3 dimensions so ignore complexity
                    //s = s + indexName + "[" + i + "] = _id_" + i + ";";
                    if (i > 0) {
                        s = s + ", ";
                    }
                    s = s + "_id_" + i;
                }
                s = s + "};";
            } else {            
                // this path is taken by scalar comprehensions
                s = s + " const "+indexType.OpenCLType+" "+ indexName+" = _id_0;"; 
            }
            } else if (construct === "map") {
                // 
                // The relative argumment is a value found in the ParallelArray.
                indexName = funDecl.params[0];
                indexType = funDecl.typeInfo.parameters[1];
                if (indexType.isScalarType()) {
                    s = s + "const " + indexType.OpenCLType+" "+ RENAME(indexName)+" = tempThis[_readoffset];"
                } else {
                    s = s + indexType.getOpenCLAddressSpace() + " " + indexType.OpenCLType+" "+ indexName+" = &(tempThis[_readoffset]);"
                }
            }
            return s;
        };
