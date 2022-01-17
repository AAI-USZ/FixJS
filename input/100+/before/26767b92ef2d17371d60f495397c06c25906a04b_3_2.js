function() {
        var d = context;
        var vs =
            'uniform float u_float[2];' +
            'uniform vec2 u_vec2[2];' +
            'uniform vec3 u_vec3[2];' +
            'uniform vec4 u_vec4[2];' +
            'uniform int u_int[2];' +
            'uniform ivec2 u_ivec2[2];' +
            'uniform ivec3 u_ivec3[2];' +
            'uniform ivec4 u_ivec4[2];' +
            'uniform bool u_bool[2];' +
            'uniform bvec2 u_bvec2[2];' +
            'uniform bvec3 u_bvec3[2];' +
            'uniform bvec4 u_bvec4[2];' +
            'uniform mat2 u_mat2[2];' +
            'uniform mat3 u_mat3[2];' +
            'uniform mat4 u_mat4[2];' +
            'void main() { gl_Position = vec4(u_float[0]) * vec4(u_float[1]) * vec4((u_mat2[0] * u_vec2[0]), 0.0, 0.0) * vec4((u_mat2[1] * u_vec2[1]), 0.0, 0.0) * vec4((u_mat3[0] * u_vec3[0]), 0.0) * vec4((u_mat3[1] * u_vec3[1]), 0.0) * (u_mat4[0] * u_vec4[0]) * (u_mat4[1] * u_vec4[1]) * vec4(u_int[0]) * vec4(u_int[1]) * vec4(u_ivec2[0], 0.0, 0.0) * vec4(u_ivec2[1], 0.0, 0.0) * vec4(u_ivec3[0], 0.0) * vec4(u_ivec3[1], 0.0) * vec4(u_ivec4[0]) * vec4(u_ivec4[1]) * vec4(u_bool[0]) * vec4(u_bool[1]) * vec4(u_bvec2[0], 0.0, 0.0) * vec4(u_bvec2[1], 0.0, 0.0) * vec4(u_bvec3[0], 0.0) * vec4(u_bvec3[1], 0.0) * vec4(u_bvec4[0]) * vec4(u_bvec4[1]); }';
        var fs = 'void main() { gl_FragColor = vec4(1.0); }';
        sp = d.createShaderProgram(vs, fs);

        sp.getAllUniforms().u_float.value = [1.0, 2.0];
        sp.getAllUniforms().u_vec2.value = [new Cartesian2(1.0, 2.0), new Cartesian2(3.0, 4.0)];
        sp.getAllUniforms().u_vec3.value = [new Cartesian3(1.0, 2.0, 3.0), new Cartesian3(4.0, 5.0, 6.0)];
        sp.getAllUniforms().u_vec4.value = [new Cartesian4(1.0, 2.0, 3.0, 4.0), new Cartesian4(5.0, 6.0, 7.0, 8.0)];
        sp.getAllUniforms().u_int.value = [1, 2];
        sp.getAllUniforms().u_ivec2.value = [new Cartesian2(1, 2), new Cartesian2(3, 4)];
        sp.getAllUniforms().u_ivec3.value = [new Cartesian3(1, 2, 3), new Cartesian3(4, 5, 6)];
        sp.getAllUniforms().u_ivec4.value = [new Cartesian4(1, 2, 3, 4), new Cartesian4(5, 6, 7, 8)];
        sp.getAllUniforms().u_bool.value = [true, true];
        sp.getAllUniforms().u_bvec2.value = [new Cartesian2(true, true), new Cartesian2(true, true)];
        sp.getAllUniforms().u_bvec3.value = [new Cartesian3(true, true, true), new Cartesian3(true, true, true)];
        sp.getAllUniforms().u_bvec4.value = [new Cartesian4(true, true, true, true), new Cartesian4(true, true, true, true)];
        sp.getAllUniforms().u_mat2.value = [Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0), Matrix2.fromComponents(5.0, 6.0, 7.0, 8.0)];
        sp.getAllUniforms().u_mat3.value = [new Matrix3(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0), new Matrix3(9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0, 1.0)];
        sp.getAllUniforms().u_mat4.value = [new Matrix4(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0), new Matrix4(9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0, 1.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0)];

        sp._bind();
        sp._setUniforms();

        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_float._getLocations()[0])).toEqual(1.0);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_float._getLocations()[1])).toEqual(2.0);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_vec2._getLocations()[0])).toEqualArray(new Float32Array([1.0, 2.0]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_vec2._getLocations()[1])).toEqualArray(new Float32Array([3.0, 4.0]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_vec3._getLocations()[0])).toEqualArray(new Float32Array([1.0, 2.0, 3.0]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_vec3._getLocations()[1])).toEqualArray(new Float32Array([4.0, 5.0, 6.0]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_vec4._getLocations()[0])).toEqualArray(new Float32Array([1.0, 2.0, 3.0, 4.0]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_vec4._getLocations()[1])).toEqualArray(new Float32Array([5.0, 6.0, 7.0, 8.0]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_int._getLocations()[0])).toEqual(1);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_int._getLocations()[1])).toEqual(2);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_ivec2._getLocations()[0])).toEqualArray(new Int32Array([1, 2]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_ivec2._getLocations()[1])).toEqualArray(new Int32Array([3, 4]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_ivec3._getLocations()[0])).toEqualArray(new Int32Array([1, 2, 3]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_ivec3._getLocations()[1])).toEqualArray(new Int32Array([4, 5, 6]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_ivec4._getLocations()[0])).toEqualArray(new Int32Array([1, 2, 3, 4]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_ivec4._getLocations()[1])).toEqualArray(new Int32Array([5, 6, 7, 8]));
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_bool._getLocations()[0])).toEqual(true);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_bool._getLocations()[1])).toEqual(true);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_bvec2._getLocations()[0])).toEqual([true, true]);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_bvec2._getLocations()[1])).toEqual([true, true]);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_bvec3._getLocations()[0])).toEqual([true, true, true]);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_bvec3._getLocations()[1])).toEqual([true, true, true]);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_bvec4._getLocations()[0])).toEqual([true, true, true, true]);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_bvec4._getLocations()[1])).toEqual([true, true, true, true]);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_mat2._getLocations()[0])).toEqualArray((Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0)).values);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_mat2._getLocations()[1])).toEqualArray((Matrix2.fromComponents(5.0, 6.0, 7.0, 8.0)).values);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_mat3._getLocations()[0])).toEqualArray((new Matrix3(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0)).values);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_mat3._getLocations()[1])).toEqualArray((new Matrix3(9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0, 1.0)).values);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_mat4._getLocations()[0])).toEqualArray((new Matrix4(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0)).values);
        expect(d._gl.getUniform(sp._getProgram(), sp.getAllUniforms().u_mat4._getLocations()[1])).toEqualArray((new Matrix4(9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0, 1.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0)).values);
    }