function (config) {
            /* Temp: map fake data to config */
            config.vol = tmp_data[config.id].vol;
            config.xs = tmp_data[config.id].xs;
            config.xs_labels = tmp_data[config.id].xs_labels;
            config.xs_label = tmp_data[config.id].xs_label;
            config.zs = tmp_data[config.id].zs;
            config.zs_labels = tmp_data[config.id].zs_labels;
            config.zs_label = tmp_data[config.id].zs_label;
            var surface = this, selector = config.selector, $selector = $(selector),
                animation_group = new THREE.Object3D(), // everything in animation_group rotates with mouse drag
                surface_top_group = new THREE.Object3D(), surface_bottom_group = new THREE.Object3D(),
                width, height, vertex_sphere,
                x_segments = config.xs.length - 1, y_segments = config.zs.length - 1, // surface segments
                renderer, camera, scene, backlight, keylight, filllight,
                projector, interactive_meshs = [], // interaction helpers
                adjusted_vol = util.scale(config.vol, 0, 50),
                adjusted_xs = util.scale(util.log(config.xs), -50, 50),
                adjusted_zs = util.scale(util.log(config.zs), -50, 50);
            /**
             * Constructor for plane with correct x / z vertex positions
             * @returns {THREE.PlaneGeometry}
             */
            var Plane = function () {
                var plane = new THREE.PlaneGeometry(100, 100, x_segments, y_segments), vertex, i, k;
                for (i = 0, k = 0; i < adjusted_vol.length; i++, k++) {
                    vertex = plane.vertices[i];
                    if (!adjusted_xs[k]) k = 0;
                    vertex.x = adjusted_xs[k];
                    vertex.z = adjusted_zs[Math.floor(i / config.xs.length)];
                }
                return plane;
            };
            /**
             * Constructor for 2d text on a 3d mesh. Creates a canvas texture, applies to mesh
             * @param {String} str String you want to create
             * @returns {THREE.Mesh}
             */
            var Text = function (str) {
                var create_texture_map = function (str) {
                    var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'),
                        size = settings.font_size;
                    ctx.font = (size + 'px ' + settings.font_face);
                    canvas.width = ctx.measureText(str).width;
                    canvas.height = Math.ceil(size * 1.25);
                    ctx.font = (size + 'px ' + settings.font_face);
                    ctx.fillStyle = 'black';
                    ctx.fillText(str, 0, size);
                    return canvas;
                },
                create_mesh = function (str) {
                    var map = create_texture_map(str),
                        plane = new THREE.PlaneGeometry(map.width, map.height),
                        texture = new THREE.Texture(map),
                        material = new THREE.MeshBasicMaterial({map: texture, color: 0xffffff, transparent: true}),
                        mesh = new THREE.Mesh(plane, material);
                    mesh.material.map.needsUpdate = true;
                    mesh.doubleSided = true;
                    return mesh;
                };
                return create_mesh(str);
            };
            surface.alive = function () {return true};
            /**
             * Rotate the group on mouse drag
             */
            surface.animate = function () {
                var mousedown = false, sx = 0, sy = 0;
                $selector
                    .on('mousedown', function (event) {
                        mousedown = true, sx = event.clientX, sy = event.clientY;
                        $(document).on('mouseup.surface.animate', function () {
                            mousedown = false;
                            $(document).off('mouseup.surface.animate');
                        });
                    })
                    .on('mousemove.surface.animate', function (event) {
                        if (!mousedown) return;
                        var dx = event.clientX - sx, dy = event.clientY - sy;
                        animation_group.rotation.y += dx * 0.01;
                        animation_group.rotation.x += dy * 0.01;
                        renderer.render(scene, camera);
                        sx += dx, sy += dy;
                    });
                return surface;
            };
            surface.create_axes = function () {
                var group = new THREE.Object3D,
                    x = {axis: 'x', spacing: adjusted_xs, labels: config.xs_labels || config.xs, label: config.xs_label},
                    z = {axis: 'z', spacing: adjusted_zs, labels: config.zs_labels || config.zs, label: config.zs_label};
                group.add(surface.create_axis(x));
                group.add(surface.create_axis(z));
                return group;
            };
            /**
             * Creates an Axis with labels for the bottom grid
             * @param {Object} config
             * config.axis {String} x or z
             * config.spacing {Array} Array of numbers adjusted to fit units of mesh
             * config.labels {Array} Array of lables
             * config.label {String} Axis label
             */
            surface.create_axis = function (config) {
                var mesh = new THREE.Object3D(), i, nth = Math.ceil(config.spacing.length / 6), scale = '0.1',
                    lbl_arr = util.thin(config.labels, nth), pos_arr = util.thin(config.spacing, nth);
                (function () { // axis values
                    var value;
                    for (i = 0; i < lbl_arr.length; i++) {
                        value = new Text(lbl_arr[i]);
                        value.scale.set(scale, scale, scale);
                        value.position.x = pos_arr[i];
                        value.position.y = 1;
                        value.position.z = 58;
                        mesh.add(value);
                    }
                }());
                (function () { // axis label
                    var label = new Text(config.label);
                    label.scale.set(scale, scale, scale);
                    label.position.x = -47;
                    label.position.y = 1;
                    label.position.z = 63;
                    mesh.add(label);
                }());
                (function () { // axis ticks
                    var canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d'),
                        plane = new THREE.PlaneGeometry(100, 5, 0, 0),
                        texture = new THREE.Texture(canvas),
                        material = new THREE.MeshBasicMaterial({map: texture, transparent: true}),
                        axis = new THREE.Mesh(plane, material),
                        labels = util.thin(config.spacing.map(function (val) {return (val + 50) * 5}), nth);
                    canvas.width = 500;
                    canvas.height = 50;
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    for (i = 0; i < labels.length; i++)
                        ctx.moveTo(labels[i] + 0.5, 25), ctx.lineTo(labels[i] + 0.5, 0);
                    ctx.moveTo(0.5, 25.5);
                    ctx.lineTo(0.5, 0.5);
                    ctx.lineTo(499.5, 0.5);
                    ctx.lineTo(499.5, 25.5);
                    ctx.stroke();
                    axis.material.map.needsUpdate = true;
                    axis.doubleSided = true;
                    axis.position.z = 55;
                    mesh.add(axis);
                }());
                if (config.axis === 'z') mesh.rotation.y = -1.57;
                return mesh;
            };
            surface.create_bottom_grid = function () {
                var mesh, material,
                    weblg_material = new THREE.MeshBasicMaterial({color: 0x999999, wireframe: true}),
                    canvas_material = new THREE.MeshBasicMaterial({color: 0xdddddd, wireframe: true});
                material = webgl ? weblg_material : canvas_material;
                mesh = new THREE.Mesh(new Plane(), material);
                mesh.overdraw = true;
                return mesh;
            };
            /**
             * Creates a line from an Array of points
             * @param {Array} points Array of Vector3's
             * @return {THREE.Mesh}
             */
            surface.create_line = function (points) {
                var path = new THREE.SplineCurve3(points),
                    tube = new THREE.TubeGeometry(path, 20, 0.2, 10, false, true); // path, segments, radius, segmentsRadius, closed, debug
                return new THREE.Mesh(tube, new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false}));
            };
            surface.create_surface = function () {
                var plane = new Plane(), group, materials, i,
                    weblg_materials = [
                        new THREE.MeshLambertMaterial({color: 0xffffff, shading: THREE.FlatShading,
                            vertexColors: THREE.VertexColors}),
                        new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true, opacity: 0.5})
                    ],
                    canvas_materials = [
                        new THREE.MeshLambertMaterial({color: 0xcccccc, shading: THREE.FlatShading}),
                        new THREE.MeshBasicMaterial({color: 0xdddddd, wireframe: true})
                    ];
                plane.verticesNeedUpdate = true;
                materials = webgl ? weblg_materials : canvas_materials;
                for (i = 0; i < adjusted_vol.length; i++) {plane.vertices[i].y = adjusted_vol[i];} // extrude
                plane.computeCentroids();
                plane.computeFaceNormals();
                (function () { // apply heatmap
                    if (!webgl) return;
                    var faces = 'abcd', face, color, vertex, index, i, k,
                        min = Math.min.apply(null, adjusted_vol), max = Math.max.apply(null, adjusted_vol),
                        color_min = 180, color_max = 0, hue;
                    for (i = 0; i < plane.faces.length; i ++) {
                        face = plane.faces[i];
                        for (k = 0; k < 4; k++) {
                            index = face[faces.charAt(k)];
                            vertex = plane.vertices[index];
                            color = new THREE.Color(0xffffff);
                            hue = ~~((vertex.y - min) / (max - min) * (color_max - color_min) + color_min) / 360;
                            color.setHSV(hue, 1, 1);
                            face.vertexColors[k] = color;
                        }
                    }
                }());
                // apply surface materials,
                // actualy duplicates the geometry and adds each material separatyle, returns the group
                group = THREE.SceneUtils.createMultiMaterialObject(plane, materials);
                group.children.forEach(function (mesh) {mesh.doubleSided = true;});
                interactive_meshs.push(group.children[0]);
                return group;
            };
            /**
             * On mouse move determin the mouse position in 3D space,
             * snap vertex_sphere to a vertex if its withing settings.snap_distance
             */
            surface.interactive = function () {
                var mouse = {x: 0, y: 0}, intersected, projector = new THREE.Projector(), xlines, zlines;
                $selector.on('mousemove.surface.interactive', function (event) {
                    event.preventDefault();
                    var vector, ray, intersects, offset = $selector.offset(),
                        object, point, faces = 'abcd', i, index, vertex, vertex_world_position;
                    mouse.x = ((event.clientX - offset.left) / width) * 2 - 1;
                    mouse.y = -((event.clientY - offset.top) / height) * 2 + 1;
                    vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
                    projector.unprojectVector(vector, camera);
                    ray = new THREE.Ray(camera.position, vector.subSelf(camera.position).normalize());
                    intersects = ray.intersectObjects(interactive_meshs);
                    if (intersects.length > 0) { // intersecting at least one object
                        point = intersects[0].point, object = intersects[0].object;
                        for (i = 0; i < 4; i++) { // loop through vertices
                            index = intersects[0].face[faces.charAt(i)];
                            vertex = object.geometry.vertices[index];
                            vertex_world_position = object.matrixWorld.multiplyVector3(vertex.clone());
                            if (vertex_world_position.distanceTo(point) < settings.snap_distance) {
                                vertex_sphere.position.copy(vertex);
                                vertex_sphere.visible = true;
                                if (xlines) surface_top_group.remove(xlines);
                                if (zlines) surface_top_group.remove(zlines);
                                (function () { // create vertex arrays for lines
                                    var x, xfrom = index - (index % 20), xto = xfrom + 20, xvertices = [],
                                        z, zfrom = index % 20, zto = 400 - (19 - zfrom), zvertices = [];
                                    for (x = xfrom; x < xto; x++) xvertices.push(object.geometry.vertices[x]);
                                    for (z = zfrom; z < zto; z += 20) zvertices.push(object.geometry.vertices[z]);
                                    xlines = surface.create_line(xvertices);
                                    zlines = surface.create_line(zvertices);
                                    surface_top_group.add(xlines);
                                    surface_top_group.add(zlines);
                                }());
                            }
                        }
                    } else { // not intersecting
                        if (xlines) surface_top_group.remove(xlines);
                        if (zlines) surface_top_group.remove(zlines);
                        vertex_sphere.visible = false;
                        intersected = null;
                    }
                    renderer.render(scene, camera);
                });
                return surface;
            };
            surface.load = function () {
                width = $selector.width(), height = $selector.height();
                // interaction
                projector = new THREE.Projector();
                vertex_sphere = surface.vertex_sphere();
                // create lights
                backlight = new THREE.DirectionalLight(0xf2f6ff, 0.3, 300);
                backlight.position.set(-150, 150, -200).normalize();
                keylight = new THREE.DirectionalLight(0xfffaf2, 0.6, 300);
                keylight.position.set(-150, 150, 150).normalize();
                filllight = new THREE.DirectionalLight(0xfffdf8, 0.6, 500);
                filllight.position.set(150, 200, 150).normalize();
                // setup actors / groups & create scene
                camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000); /* fov, aspect, near, far */
                surface_top_group.add(surface.create_surface());
                surface_top_group.add(vertex_sphere);
                surface_bottom_group.add(surface.create_bottom_grid());
                if (webgl) surface_bottom_group.add(surface.create_axes());
                animation_group.add(surface_top_group);
                animation_group.add(surface_bottom_group);
                scene = new THREE.Scene();
                scene.add(animation_group);
                scene.add(backlight);
                scene.add(keylight);
                scene.add(filllight);
                scene.add(camera);
                // positions & rotations
                surface_top_group.position.y = settings.floating_height;
                animation_group.rotation.y = 0.7;
                camera.position.x = 0;
                camera.position.y = 125;
                camera.position.z = 150;
                camera.lookAt({x: 0, y: 0, z: 0});
                // render scene
                renderer = webgl ? new THREE.WebGLRenderer({antialias: true}) : new THREE.CanvasRenderer();
                renderer.setSize(width, height);
                renderer.render(scene, camera);
                $selector.html(renderer.domElement).find('canvas').css({position: 'relative'});
                return surface;
            };
            surface.resize = function () {surface.load();};
            surface.vertex_sphere = function () {
                var sphere = new THREE.Mesh(
                    new THREE.SphereGeometry(1.5, 10, 10),
                    new THREE.MeshLambertMaterial({color: settings.interactive_color, shading: THREE.FlatShading})
                );
                sphere.visible = false;
                return sphere;
            };
            if (!config.child) og.common.gadgets.manager.register(surface);
            surface.load().animate().interactive();
        }