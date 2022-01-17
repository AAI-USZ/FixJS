function() {
        // args: [0]size, [1]divisions_w, [2]divisions_h, [3]matRef 
        // todo: fix examples for single argument constructor
        if (arguments.length>1) {   // Transitional condition...
            this.hField = new base.HeightField({
                size: arguments[0], 
                divX: arguments[1], 
                divZ: arguments[2],
            });
            
            this.hfMesh = new base.HeightFieldMesh({
                hField: this.hField,
                size: arguments[0],
                divX: arguments[1],
                divZ: arguments[2],
                material: arguments[3],
                ofsX: this.hField.getCellSize()/2,
                ofsZ: this.hField.getCellSize()/2
            });
            this.hfMesh.prepare();
            
            base.SceneObject.apply(this,[{mesh:this.hfMesh,shadowCast:false}]);
        } else {
            var opt = arguments[0]||{};
            
            this.size = opt.size||128;
            this.divX = opt.divX||128;
            this.divZ = opt.divZ||128;
            this.tiles = [];
            this.tileMeshes = [];
            this.tileMaterials = [];
            this.tileSpats = [];
            this.tileX = opt.tileX||this.divX;
            this.tileZ = opt.tileZ||this.divZ;
            this.tileChanged = [];
            this.tileSpatChanged = [];
            this.hField = new base.HeightField({
                size: this.size, 
                divX: this.divX, 
                divZ: this.divZ
            });
            
            if (this.divX > this.divZ) {
                this.sizeX = this.size;
                this.sizeZ = (this.size / this.divX) * this.divZ;
            } else if (this.divZ > this.divX) {
                this.sizeX = (this.size / this.divZ) * this.divX;
                this.sizeZ = this.size;
            } else {
                this.sizeX = this.size;
                this.sizeZ = this.size;
            }

            this.cellSize = this.sizeX/(this.divX);
            this.tileSize = this.cellSize*(this.tileX);
            this.spatResolution = opt.spatResolution||256;
            this.spats = opt.spats||[];

            base.SceneObject.apply(this,[{mesh:null,shadowCast:false}]);
            
            // var tileUV = new CubicVR.UVMapper({
            //     projectionMode: "planar",
            //     projectionAxis: "y",
            //     scale: [this.tileSize,0,this.tileSize],
            // });            

            
            var x=0, z=0;
            for (var j = 0; j < this.divZ; j+= this.tileZ) {
                x = 0;

                for (var i = 0; i < this.divX; i+=this.tileX) {
                    var spatImage = new base.DrawBufferTexture({width:this.spatResolution,height:this.spatResolution});

                    var edgeX = (i+1!=this.tileX)?1:0;
                    var edgeZ = (j+1!=this.tileZ)?1:0;

                    var spatOffset = [this.divX/(this.divX+edgeX),this.divZ/(this.divZ+edgeZ),1];

                    var spatMaterial = new base.SpatMaterial({
                       color: [1,1,1],
                       specular: [0.05,0.05,0.05],
                       spats: this.spats,
                       sourceTexture: spatImage,
                       spatResolution: this.spatResolution,
                       spatOffset: spatOffset,
//                       spatOffset: [edgeX*(1.0+1.0/((this.spatResolution/this.tileX)/this.spatResolution)),0,edgeZ*(1.0+1.0/((this.spatResolution/this.tileZ)/this.spatResolution))]
                       // spatOffset: [1.0+edgeX*(1.0/this.cellSize/this.tileSize),0,1.0+edgeZ*(1.0/this.cellSize/this.tileSize)]
                       // spatOffset: (this.cellSize/th)
                    });
                    var tileMesh = new base.HeightFieldMesh({
                        hField: this.hField,
                        size: this.tileSize, 
                        divX: this.tileX,
                        divZ: this.tileZ,
                        viewX: i,
                        viewZ: j,
                        edgeX: edgeX,
                        edgeZ: edgeZ,
                        material: spatMaterial
                    });
 
                    // tileUV.apply(tileMesh, spatMaterial);
                    tileMesh.prepare();

                    var tile = new base.SceneObject({mesh:tileMesh});
                    var startX = this.hField.getStartX();
                    var startZ = this.hField.getStartZ();
                    
                    tile.position[0] = startX+(this.tileSize*x)+(this.tileSize/2.0);
                    tile.position[2] = startZ+(this.tileSize*z)+(this.tileSize/2.0);
                    this.bindChild(tile);
                    this.tiles.push(tile);
                    this.tileMeshes.push(tileMesh);
                    this.tileMaterials.push(spatMaterial);
                    this.tileSpats.push(spatImage);
                    this.tileChanged.push(false);
                    this.tileSpatChanged.push(false);
                    x++;
                    // this.tileSpats.push(spatMaterial?);
                }
                z++;
            }
        }
    }