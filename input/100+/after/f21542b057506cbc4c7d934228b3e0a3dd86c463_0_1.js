function createSprite3D(model, node, geometry){
                    var mesh = geometry.meshes[0];
                    var ep_mesh = new Sprite3D();
                    ep_mesh.mesh = new Mesh();
                    var texture = ep_mesh.mesh.texture;
                    var material = mesh.material;
                    if (material) {
                        texture.src = material.src;
                    }
                    if(node.instance_material_target){
                        var target = node.instance_material_target;
                        var material = collada.getMaterialById(target);
                        if(material){
                            var instanceEffectUrl = material.instanceEffect.url;
                            var effect = collada.getEffectById(instanceEffectUrl);
                            if (effect && effect.profileCommon && effect.profileCommon.surface &&
                                effect.profileCommon.surface.initFrom) {
                                var img = collada.getImageById(effect.profileCommon.surface.initFrom)
                                if (img) {
                                    texture.src = img.initFrom;
                                }
                            }
                            if(effect && effect.profileCommon && effect.profileCommon.technique &&
                                effect.profileCommon.technique.phong){
                                texture.emission = effect.profileCommon.technique.phong.emission;
                                texture.ambient = effect.profileCommon.technique.phong.ambient;
                                texture.diffuse = effect.profileCommon.technique.phong.diffuse;
                                texture.specular = effect.profileCommon.technique.phong.specular;
                                texture.shininess = effect.profileCommon.technique.phong.shininess;
                            }
                        }
                    }

                    ep_mesh.mesh.vertices = mesh.vertices;
                    var colors = [];
                    for(var i = 0; i < ep_mesh.mesh.vertices.length / 3; i++){
                        colors[colors.length] = 1.0;
                        colors[colors.length] = 1.0;
                        colors[colors.length] = 1.0;
                        colors[colors.length] = 1.0;
                    }
                    ep_mesh.mesh.colors = colors;
                    ep_mesh.mesh.normals = mesh.normals;
                    ep_mesh.mesh.texCoords = mesh.uv;
                    ep_mesh.mesh.indices = mesh.indices;
                    if(node.translate){
                        ep_mesh.x = node.translate[0];
                        ep_mesh.y = node.translate[1];
                        ep_mesh.z = node.translate[2];
                    }else{
                        ep_mesh.x = ep_mesh.y = ep_mesh.z = 0;
                    }
                    var rotation = new Array();
                    if (node.rotateX && node.rotateY && node.rotateZ) {
                        rotation.push(node.rotateX[0], node.rotateY[0], node.rotateZ[0], 0);
                        rotation.push(node.rotateX[1], node.rotateY[1], node.rotateZ[1], 0);
                        rotation.push(node.rotateX[2], node.rotateY[2], node.rotateZ[2], 0);
                    } else {
                        rotation.push(1,0,0,0,0,1,0,0,0,0,1,0);
                    }
                    rotation.push(0, 0, 0, 1);
                    ep_mesh.rotation = rotation;

                    if(node.matrix){
                        var transposed = [
                            node.matrix[0], node.matrix[4], node.matrix[8], node.matrix[12],
                            node.matrix[1], node.matrix[5], node.matrix[9], node.matrix[13],
                            node.matrix[2], node.matrix[6], node.matrix[10], node.matrix[14],
                            node.matrix[3], node.matrix[7], node.matrix[11], node.matrix[15],
                        ];
                        ep_mesh.matrix = transposed;
                    }else{
                        ep_mesh.matrix = [
                            1, 0, 0, 0,
                            0, 1, 0, 0,
                            0, 0, 1, 0,
                            0, 0, 0, 1];
                    }
                    if(node.scale){
                        ep_mesh.scaleX = node.scale[0];
                        ep_mesh.scaleY = node.scale[1];
                        ep_mesh.scaleZ = node.scale[2];
                    }else{
                        ep_mesh.scaleX = ep_mesh.scaleY = ep_mesh.scaleZ = 1;
                    }
                    ep_mesh.name = geometry.id;
                    if(node.nodes){
                        for(var i = 0; i < node.nodes.length; i++){
                            var childNode = node.nodes[i];
                            var childGeometry = model.getCorrespondingGeometry(childNode);
                            if(childGeometry) ep_mesh.addChild(createSprite3D(model, childNode, childGeometry));
                        }
                    }
                    return ep_mesh;
                }