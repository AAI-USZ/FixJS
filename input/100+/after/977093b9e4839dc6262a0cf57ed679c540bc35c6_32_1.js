function() {
        var p1 = new Cartesian3(1, 2, 3);
        var p2 = new Cartesian3(4, 5, 6);

        var mesh = {};
        mesh.attributes = {};
        mesh.attributes.position = {
            componentDatatype : ComponentDatatype.FLOAT,
            componentsPerAttribute : 3,
            values : [p1.x, p1.y, p1.z, p2.x, p2.y, p2.z]
        };

        mesh = MeshFilters.projectTo2D(mesh);

        var ellipsoid = Ellipsoid.WGS84;
        var projection = new EquidistantCylindricalProjection();
        var projectedP1 = projection.project(ellipsoid.toCartographic3(p1));
        var projectedP2 = projection.project(ellipsoid.toCartographic3(p2));

        expect(mesh.attributes.position2D.values[0]).toEqual(projectedP1.x);
        expect(mesh.attributes.position2D.values[1]).toEqual(projectedP1.y);
        expect(mesh.attributes.position2D.values[2]).toEqual(projectedP2.x);
        expect(mesh.attributes.position2D.values[3]).toEqual(projectedP2.y);

        expect(mesh.attributes.position3D.values[0]).toEqual(p1.x);
        expect(mesh.attributes.position3D.values[1]).toEqual(p1.y);
        expect(mesh.attributes.position3D.values[2]).toEqual(p1.z);
        expect(mesh.attributes.position3D.values[3]).toEqual(p2.x);
        expect(mesh.attributes.position3D.values[4]).toEqual(p2.y);
        expect(mesh.attributes.position3D.values[5]).toEqual(p2.z);
    }