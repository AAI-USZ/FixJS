function(mesh, projection) {
        if (mesh && mesh.attributes && mesh.attributes.position) {
            projection = projection || new EquidistantCylindricalProjection();
            var ellipsoid = projection.getEllipsoid();

            // Project original positions to 2D.
            var wgs84Positions = mesh.attributes.position.values;
            var projectedPositions = [];

            for ( var i = 0; i < wgs84Positions.length; i += 3) {
                var lonLat = ellipsoid.cartesianToCartographic(new Cartesian3(wgs84Positions[i], wgs84Positions[i + 1], wgs84Positions[i + 2]));
                var projectedLonLat = projection.project(lonLat);
                projectedPositions.push(projectedLonLat.x, projectedLonLat.y);
            }

            // Rename original positions to WGS84 Positions.
            mesh.attributes.position3D = mesh.attributes.position;

            // Replace original positions with 2D projected positions
            mesh.attributes.position2D = {
                componentDatatype : ComponentDatatype.FLOAT,
                componentsPerAttribute : 2,
                values : projectedPositions
            };
            delete mesh.attributes.position;
        }

        return mesh;
    }