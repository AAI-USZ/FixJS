function size(aWidth, aHeight, aMode) {
        if (size3DCalled) {
          throw "Multiple calls to size() for 3D renders are not allowed.";
        }
        size3DCalled = true;

        function getGLContext(canvas) {
          var ctxNames = ['experimental-webgl', 'webgl', 'webkit-3d'],
              gl;

          for (var i=0, l=ctxNames.length; i<l; i++) {
            gl = canvas.getContext(ctxNames[i], {antialias: false});
            if (gl) {
              break;
            }
          }

          return gl;
        }

        // get the 3D rendering context
        try {
          // If the HTML <canvas> dimensions differ from the
          // dimensions specified in the size() call in the sketch, for
          // 3D sketches, browsers will either not render or render the
          // scene incorrectly. To fix this, we need to adjust the
          // width and height attributes of the canvas.
          curElement.width = p.width = aWidth || 100;
          curElement.height = p.height = aHeight || 100;
          curContext = getGLContext(curElement);
          canTex = curContext.createTexture(); // texture
          textTex = curContext.createTexture(); // texture
        } catch(e_size) {
          Processing.debug(e_size);
        }

        if (!curContext) {
          throw "WebGL context is not supported on this browser.";
        }

        // Set defaults
        curContext.viewport(0, 0, curElement.width, curElement.height);
        curContext.enable(curContext.DEPTH_TEST);
        curContext.enable(curContext.BLEND);
        curContext.blendFunc(curContext.SRC_ALPHA, curContext.ONE_MINUS_SRC_ALPHA);

        // Create the program objects to render 2D (points, lines) and
        // 3D (spheres, boxes) shapes. Because 2D shapes are not lit,
        // lighting calculations could be ommitted from that program object.
        programObject2D = createProgramObject(curContext, vertexShaderSource2D, fragmentShaderSource2D);

        programObjectUnlitShape = createProgramObject(curContext, vShaderSrcUnlitShape, fShaderSrcUnlitShape);

        // Set the default point and line width for the 2D and unlit shapes.
        p.strokeWeight(1.0);

        // Now that the programs have been compiled, we can set the default
        // states for the lights.
        programObject3D = createProgramObject(curContext, vertexShaderSource3D, fragmentShaderSource3D);
        curContext.useProgram(programObject3D);

        // assume we aren't using textures by default
        uniformi("usingTexture3d", programObject3D, "usingTexture", usingTexture);
        // assume that we arn't tinting by default
        p.lightFalloff(1, 0, 0);
        p.shininess(1);
        p.ambient(255, 255, 255);
        p.specular(0, 0, 0);
        p.emissive(0, 0, 0);

        // Create buffers for 3D primitives
        boxBuffer = curContext.createBuffer();
        curContext.bindBuffer(curContext.ARRAY_BUFFER, boxBuffer);
        curContext.bufferData(curContext.ARRAY_BUFFER, boxVerts, curContext.STATIC_DRAW);

        boxNormBuffer = curContext.createBuffer();
        curContext.bindBuffer(curContext.ARRAY_BUFFER, boxNormBuffer);
        curContext.bufferData(curContext.ARRAY_BUFFER, boxNorms, curContext.STATIC_DRAW);

        boxOutlineBuffer = curContext.createBuffer();
        curContext.bindBuffer(curContext.ARRAY_BUFFER, boxOutlineBuffer);
        curContext.bufferData(curContext.ARRAY_BUFFER, boxOutlineVerts, curContext.STATIC_DRAW);

        // used to draw the rectangle and the outline
        rectBuffer = curContext.createBuffer();
        curContext.bindBuffer(curContext.ARRAY_BUFFER, rectBuffer);
        curContext.bufferData(curContext.ARRAY_BUFFER, rectVerts, curContext.STATIC_DRAW);

        rectNormBuffer = curContext.createBuffer();
        curContext.bindBuffer(curContext.ARRAY_BUFFER, rectNormBuffer);
        curContext.bufferData(curContext.ARRAY_BUFFER, rectNorms, curContext.STATIC_DRAW);

        // The sphere vertices are specified dynamically since the user
        // can change the level of detail. Everytime the user does that
        // using sphereDetail(), the new vertices are calculated.
        sphereBuffer = curContext.createBuffer();

        lineBuffer = curContext.createBuffer();

        // Shape buffers
        fillBuffer = curContext.createBuffer();
        fillColorBuffer = curContext.createBuffer();
        strokeColorBuffer = curContext.createBuffer();
        shapeTexVBO = curContext.createBuffer();

        pointBuffer = curContext.createBuffer();
        curContext.bindBuffer(curContext.ARRAY_BUFFER, pointBuffer);
        curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array([0, 0, 0]), curContext.STATIC_DRAW);

        textBuffer = curContext.createBuffer();
        curContext.bindBuffer(curContext.ARRAY_BUFFER, textBuffer );
        curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array([1,1,0,-1,1,0,-1,-1,0,1,-1,0]), curContext.STATIC_DRAW);

        textureBuffer = curContext.createBuffer();
        curContext.bindBuffer(curContext.ARRAY_BUFFER, textureBuffer);
        curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array([0,0,1,0,1,1,0,1]), curContext.STATIC_DRAW);

        indexBuffer = curContext.createBuffer();
        curContext.bindBuffer(curContext.ELEMENT_ARRAY_BUFFER, indexBuffer);
        curContext.bufferData(curContext.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,2,3,0]), curContext.STATIC_DRAW);

        cam = new PMatrix3D();
        cameraInv = new PMatrix3D();
        modelView = new PMatrix3D();
        modelViewInv = new PMatrix3D();
        projection = new PMatrix3D();
        p.camera();
        p.perspective();

        userMatrixStack = new PMatrixStack();
        userReverseMatrixStack = new PMatrixStack();
        // used by both curve and bezier, so just init here
        curveBasisMatrix = new PMatrix3D();
        curveToBezierMatrix = new PMatrix3D();
        curveDrawMatrix = new PMatrix3D();
        bezierDrawMatrix = new PMatrix3D();
        bezierBasisInverse = new PMatrix3D();
        bezierBasisMatrix = new PMatrix3D();
        bezierBasisMatrix.set(-1, 3, -3, 1, 3, -6, 3, 0, -3, 3, 0, 0, 1, 0, 0, 0);

        DrawingShared.prototype.size.apply(this, arguments);
      }