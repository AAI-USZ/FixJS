function() {
        var d = context;
        var vs =
            'uniform float u_float;' +
            'uniform vec2 u_vec2;' +
            'uniform vec3 u_vec3;' +
            'uniform vec4 u_vec4;' +
            'uniform int u_int;' +
            'uniform ivec2 u_ivec2;' +
            'uniform ivec3 u_ivec3;' +
            'uniform ivec4 u_ivec4;' +
            'uniform bool u_bool;' +
            'uniform bvec2 u_bvec2;' +
            'uniform bvec3 u_bvec3;' +
            'uniform bvec4 u_bvec4;' +
            'uniform mat2 u_mat2;' +
            'uniform mat3 u_mat3;' +
            'uniform mat4 u_mat4;' +
            'void main() { gl_Position = vec4(u_float) * vec4((u_mat2 * u_vec2), 0.0, 0.0) * vec4((u_mat3 * u_vec3), 0.0) * (u_mat4 * u_vec4) * vec4(u_int) * vec4(u_ivec2, 0.0, 0.0) * vec4(u_ivec3, 0.0) * vec4(u_ivec4) * vec4(u_bool) * vec4(u_bvec2, 0.0, 0.0) * vec4(u_bvec3, 0.0) * vec4(u_bvec4); }';
        var fs = 'void main() { gl_FragColor = vec4(1.0); }';
        sp = d.createShaderProgram(vs, fs);
        sp.getAllUniforms().u_float.value = 1.0;
        sp.getAllUniforms().u_vec2.value = new Cartesian2(1.0, 2.0);
        sp.getAllUniforms().u_vec3.value = new Cartesian3(1.0, 2.0, 3.0);
        sp.getAllUniforms().u_vec4.value = new Cartesian4(1.0, 2.0, 3.0, 4.0);
        sp.getAllUniforms().u_int.value = 1;
        sp.getAllUniforms().u_ivec2.value = new Cartesian2(1, 2);
        sp.getAllUniforms().u_ivec3.value = new Cartesian3(1, 2, 3);
        sp.getAllUniforms().u_ivec4.value = new Cartesian4(1, 2, 3, 4);
        sp.getAllUniforms().u_bool.value = true;
        sp.getAllUniforms().u_bvec2.value = new Cartesian2(true, true);
        sp.getAllUniforms().u_bvec3.value = new Cartesian3(true, true, true);
        sp.getAllUniforms().u_bvec4.value = new Cartesian4(true, true, true, true);
        sp.getAllUniforms().u_mat2.value = new Matrix2(1.0, 2.0, 3.0, 4.0);
        sp.getAllUniforms().u_mat3.value = new Matrix3(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0);
        sp.getAllUniforms().u_mat4.value = new Matrix4(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0);

        sp._bind();
        sp._setUniforms();

        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_float._getLocation())).toEqual(1.0);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_vec2._getLocation())).toEqualArray(new Float32Array([1.0, 2.0]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_vec3._getLocation())).toEqualArray(new Float32Array([1.0, 2.0, 3.0]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_vec4._getLocation())).toEqualArray(new Float32Array([1.0, 2.0, 3.0, 4.0]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_int._getLocation())).toEqual(1);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_ivec2._getLocation())).toEqualArray(new Int32Array([1, 2]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_ivec3._getLocation())).toEqualArray(new Int32Array([1, 2, 3]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_ivec4._getLocation())).toEqualArray(new Int32Array([1, 2, 3, 4]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_bool._getLocation())).toEqual(true);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_bvec2._getLocation())).toEqual([true, true]);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_bvec3._getLocation())).toEqual([true, true, true]);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_bvec4._getLocation())).toEqual([true, true, true, true]);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_mat2._getLocation())).toEqualArray((new Matrix2(1.0, 2.0, 3.0, 4.0)).values);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_mat3._getLocation())).toEqualArray((new Matrix3(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0)).values);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_mat4._getLocation())).toEqualArray((new Matrix4(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0)).values);
    }