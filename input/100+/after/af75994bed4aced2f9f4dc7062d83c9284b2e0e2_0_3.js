function (config) {
                var mesh = new THREE.Object3D(), i, nth = Math.ceil(config.spacing.length / 6), scale = '0.1',
                    lbl_arr = util.thin(config.labels, nth), pos_arr = util.thin(config.spacing, nth),
                    axis_len = settings['surface_' + config.axis],
                    other_axis_len = config.axis === 'x' ? settings['surface_z'] : settings['surface_x'];
                (function () { // axis values
                    var value;
                    for (i = 0; i < lbl_arr.length; i++) {
                        value = new Text(lbl_arr[i]);
                        value.scale.set(scale, scale, scale);
                        value.position.x = pos_arr[i];
                        value.position.y = 1;
                        value.position.z = (other_axis_len / 2) + 8;
                        mesh.add(value);
                    }
                }());
                (function () { // axis label
                    var label = new Text(config.label);
                    label.scale.set(scale, scale, scale);
                    label.position.x = -(axis_len / 2) + 4;
                    label.position.y = 1;
                    label.position.z = (other_axis_len / 2) + 13;
                    mesh.add(label);
                }());
                (function () { // axis ticks
                    var canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d'),
                        plane = new THREE.PlaneGeometry(axis_len, 5, 0, 0),
                        texture = new THREE.Texture(canvas),
                        material = new THREE.MeshBasicMaterial({map: texture, transparent: true}),
                        axis = new THREE.Mesh(plane, material),
                        labels = util.thin(config.spacing.map(function (val) {return (val + (axis_len / 2)) * 5}), nth);
                    canvas.width = axis_len * 5;
                    canvas.height = 50;
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    for (i = 0; i < labels.length; i++) ctx.moveTo(labels[i] + 0.5, 25), ctx.lineTo(labels[i] + 0.5, 0);
                    ctx.moveTo(0.5, 25.5);
                    ctx.lineTo(0.5, 0.5);
                    ctx.lineTo(canvas.width - .5, 0.5);
                    ctx.lineTo(canvas.width - .5, 25.5);
                    ctx.stroke();
                    axis.material.map.needsUpdate = true;
                    axis.doubleSided = true;
                    axis.position.z = other_axis_len / 2 + 5;
                    mesh.add(axis);
                }());
                if (config.axis === 'z') mesh.rotation.y = -1.57;
                return mesh;
            }