function () {
                var plane = new THREE.PlaneGeometry(100, 100, x_segments, y_segments), vertex, i, k;
                for (i = 0, k = 0; i < adjusted_vol.length; i++, k++) {
                    vertex = plane.vertices[i];
                    if (!adjusted_xs[k]) k = 0;
                    vertex.x = adjusted_xs[k];
                    vertex.z = adjusted_zs[Math.floor(i / config.xs.length)];
                }
                return plane;
            }