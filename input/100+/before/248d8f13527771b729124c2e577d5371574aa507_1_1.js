function(attr){
            var size =     attr.size    || 20
              , position = attr.origPos || new THREE.Vector3( 0, 0, 0 )
              , obj = THREE.SceneUtils.createMultiMaterialObject(
                    new THREE.CubeGeometry(size, size, size),
                    [
                        new THREE.MeshLambertMaterial({
                            color: WHITE
                        }),
                        new THREE.MeshBasicMaterial({
                            color: GREY,
                            wireframe: true
                        })
                    ]
                );

            obj.position = position;

            this.set({

                // Wireframe is used to represent the cube's mesh.
                'mesh': obj.children[1],

                // Related meshes
                'shading': obj.children[0],
                'object': obj,

                // Original position stored to be used as offset for movement
                'origPos': obj.position,

                // Cube states
                'hovered': false,
                'selected': false
            });
        }