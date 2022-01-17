function(context, sceneState) {
        var width = context.getCanvas().clientWidth;
        var height = context.getCanvas().clientHeight;

        if (width === 0 || height === 0) {
            return;
        }

        var mode = sceneState.mode;
        var projection = sceneState.scene2D.projection;

        if (this._dayTileProvider !== this.dayTileProvider) {
            this._dayTileProvider = this.dayTileProvider;

            // destroy logo
            this._quadLogo = this._quadLogo && this._quadLogo.destroy();

            // stop loading everything
            this._imageQueue.clear();
            this._textureQueue.clear();
            this._reprojectQueue.clear();

            // destroy tiles
            this._destroyTileTree();

            // destroy resources
            this._texturePool = this._texturePool && this._texturePool.destroy();
            this._textureCache = this._textureCache && this._textureCache.destroy();

            // create new tile tree
            this._rootTile = new Tile({
                extent : this._dayTileProvider.maxExtent || this._maxExtent,
                zoom : 0,
                ellipsoid : this._ellipsoid
            });

            this._prefetchImages();
        }

        var hasLogo = this._dayTileProvider && this._dayTileProvider.getLogo;
        var imageLogo =  (hasLogo) ? this._dayTileProvider.getLogo() : undefined;
        var createLogo = !this._quadLogo || this._quadLogo.isDestroyed();
        var updateLogo = createLogo || this._imageLogo !== imageLogo;
        if (updateLogo) {
            if (typeof imageLogo === 'undefined') {
                this._quadLogo = this._quadLogo && this._quadLogo.destroy();
            }
            else {
                this._quadLogo = new ViewportQuad(new Rectangle(this.logoOffset.x, this.logoOffset.y, imageLogo.width, imageLogo.height));
                this._quadLogo.setTexture(context.createTexture2D({
                    source : imageLogo,
                    pixelFormat : PixelFormat.RGBA
                }));
                this._quadLogo.enableBlending = true;
            }
            this._imageLogo = imageLogo;
        } else if (this._quadLogo && this._imageLogo && !this.logoOffset.equals(this._logoOffset)) {
            this._quadLogo.setRectangle(new Rectangle(this.logoOffset.x, this.logoOffset.y, this._imageLogo.width, this._imageLogo.height));
            this._logoOffset = this.logoOffset;
        }

        if (!this._textureCache || this._textureCache.isDestroyed()) {
            this._createTextureCache(context);
        }

        var createFBO = !this._fb || this._fb.isDestroyed();
        var fboDimensionsChanged = this._fb && (this._fb.getColorTexture().getWidth() !== width || this._fb.getColorTexture().getHeight() !== height);

        if (createFBO || fboDimensionsChanged ||
            (!this._quadV || this._quadV.isDestroyed()) ||
            (!this._quadH || this._quadH.isDestroyed())) {

            this._minTileDistance = this._createTileDistanceFunction(sceneState, width, height);

            this._fb = this._fb && this._fb.destroy();
            this._quadV = this._quadV && this._quadV.destroy();
            this._quadH = this._quadH && this._quadH.destroy();

            // create FBO and texture render targets
            this._fb = context.createFramebuffer({
                colorTexture : context.createTexture2D({
                    width : width,
                    height : height,
                    pixelFormat : PixelFormat.RGBA
                })
            });

            // create viewport quad for vertical gaussian blur pass
            this._quadV = new ViewportQuad(new Rectangle(0.0, 0.0, width, height));
            this._quadV.vertexShader = '#define VERTICAL 1\n' + CentralBodyVSFilter;
            this._quadV.fragmentShader = CentralBodyFSFilter;
            this._quadV.uniforms.u_height = function() {
                return height;
            };
            this._quadV.setTexture(this._fb.getColorTexture());
            this._quadV.setDestroyTexture(false);
            this._quadV.setFramebuffer(context.createFramebuffer({
                colorTexture : context.createTexture2D({
                    width : width,
                    height : height,
                    pixelFormat : PixelFormat.RGBA
                })
            }));
            this._quadV.setDestroyFramebuffer(true);

            // create viewport quad for horizontal gaussian blur pass
            this._quadH = new ViewportQuad(new Rectangle(0.0, 0.0, width, height));
            this._quadH.vertexShader = CentralBodyVSFilter;
            this._quadH.fragmentShader = CentralBodyFSFilter;
            this._quadH.uniforms.u_width = function() {
                return width;
            };
            this._quadH.setTexture(this._quadV.getFramebuffer().getColorTexture());
            this._quadH.setDestroyTexture(false);
        }

        this._quadV.update(context, sceneState);
        this._quadH.update(context, sceneState);

        if (this._quadLogo && !this._quadLogo.isDestroyed()) {
            this._quadLogo.update(context, sceneState);
        }

        var vs, fs;

        if (this.showSkyAtmosphere && !this._vaSky) {
            // PERFORMANCE_IDEA:  Is 60 the right amount to tessellate?  I think scaling the original
            // geometry in a vertex is a bad idea; at least, because it introduces a draw call per tile.
            var skyMesh = CubeMapEllipsoidTessellator.compute(new Ellipsoid(this._ellipsoid.getRadii().multiplyWithScalar(1.025)), 60);
            this._vaSky = context.createVertexArrayFromMesh({
                mesh : skyMesh,
                attributeIndices : MeshFilters.createAttributeIndices(skyMesh),
                bufferUsage : BufferUsage.STATIC_DRAW
            });

            vs = '#define SKY_FROM_SPACE \n' +
                 '#line 0 \n' +
                 SkyAtmosphereVS;

            fs = '#line 0\n' +
                 SkyAtmosphereFS;

            this._spSkyFromSpace = context.getShaderCache().getShaderProgram(vs, fs);

            vs = '#define SKY_FROM_ATMOSPHERE' +
                 '#line 0 \n' +
                 SkyAtmosphereVS;

            this._spSkyFromAtmosphere = context.getShaderCache().getShaderProgram(vs, fs);
            this._rsSky = context.createRenderState({
                cull : {
                    enabled : true,
                    face : CullFace.FRONT
                }
            // TODO: revisit when multi-frustum/depth test is ready
            /*depthTest : {
                enabled : true
            },
            depthMask : false*/
            });
        }

        if (CentralBody._isModeTransition(this._mode, mode) || this._projection !== projection) {
            if (mode === SceneMode.SCENE3D) {
                this._rsColor = context.createRenderState({ // Write color, not depth
                    cull : {
                        enabled : true
                    }
                });
                this._rsDepth = context.createRenderState({ // Write depth, not color
                    cull : {
                        enabled : true
                    },
                    depthTest : {
                        enabled : true,
                        func : DepthFunction.ALWAYS
                    },
                    colorMask : {
                        red : false,
                        green : false,
                        blue : false,
                        alpha : false
                    }
                });
            } else {
                this._rsColor = context.createRenderState();
                this._rsDepth = context.createRenderState();
            }
        }

        // TODO: Wait until multi-frustum
        //this._rsColor.depthTest.enabled = (mode === SceneMode.MORPHING);  // Depth test during morph
        var cull = (mode === SceneMode.SCENE3D) || (mode === SceneMode.MORPHING);
        this._rsColor.cull.enabled = cull;
        this._rsDepth.cull.enabled = cull;

        // update scisor/depth plane
        var depthQuad = this._computeDepthQuad(sceneState);

        // TODO: re-enable scissorTest
        /*if (mode === SceneMode.SCENE3D) {
            var uniformState = context.getUniformState();
            var mvp = uniformState.getModelViewProjection();
            var scissorTest = {
                enabled : true,
                rectangle : this._createScissorRectangle({
                    quad : depthQuad,
                    modelViewProjection : mvp,
                    viewportTransformation : uniformState.getViewportTransformation()
                })
            };

            this._rsColor.scissorTest = scissorTest;
            this._rsDepth.scissorTest = scissorTest;
            this._quadV.renderState.scissorTest = scissorTest;
            this._quadH.renderState.scissorTest = scissorTest;
        }*/

        // depth plane
        if (!this._vaDepth) {
            var mesh = {
                attributes : {
                    position : {
                        componentDatatype : ComponentDatatype.FLOAT,
                        componentsPerAttribute : 3,
                        values : depthQuad
                    }
                },
                indexLists : [{
                    primitiveType : PrimitiveType.TRIANGLES,
                    values : [0, 1, 2, 2, 1, 3]
                }]
            };
            this._vaDepth = context.createVertexArrayFromMesh({
                mesh : mesh,
                attributeIndices : {
                    position : 0
                },
                bufferUsage : BufferUsage.DYNAMIC_DRAW
            });
        } else {
            var datatype = ComponentDatatype.FLOAT;
            this._vaDepth.getAttribute(0).vertexBuffer.copyFromArrayView(datatype.toTypedArray(depthQuad));
        }

        if (!this._spDepth) {
            this._spDepth = context.getShaderCache().getShaderProgram(
                    CentralBodyVSDepth,
                    '#line 0\n' +
                    CentralBodyFSDepth, {
                        position : 0
                    });
        }

        var that = this;

        // Throw exception if there was a problem asynchronously loading an image.
        if (this._exception) {
            var message = this._exception;
            this._exception = undefined;
            throw new RuntimeError(message);
        }

        // PERFORMANCE_IDEA:  Once a texture is created, it is not destroyed if
        // the corresponding show flag is turned off.  This will waste memory
        // if a user loads every texture, then sets all the flags to false.

        if (this._nightImageSource !== this.nightImageSource) {
            this._nightImageSource = this.nightImageSource;

            var nightImage = new Image();
            nightImage.onload = function() {
                that._nightTexture = that._nightTexture && that._nightTexture.destroy();
                that._nightTexture = context.createTexture2D({
                    source : nightImage,
                    pixelFormat : PixelFormat.RGB
                });
            };
            nightImage.onerror = function() {
                that._exception = 'Could not load image: ' + this.src + '.';
            };
            nightImage.src = this.nightImageSource;
        }

        if (this._specularMapSource !== this.specularMapSource) {
            this._specularMapSource = this.specularMapSource;

            var specularImage = new Image();
            specularImage.onload = function() {
                that._specularTexture = that._specularTexture && that._specularTexture.destroy();
                that._specularTexture = context.createTexture2D({
                    source : specularImage,
                    pixelFormat : PixelFormat.LUMINANCE
                });
            };
            specularImage.onerror = function() {
                that._exception = 'Could not load image: ' + this.src + '.';
            };
            specularImage.src = this.specularMapSource;
        }

        if (this._cloudsMapSource !== this.cloudsMapSource) {
            this._cloudsMapSource = this.cloudsMapSource;

            var cloudsImage = new Image();
            cloudsImage.onload = function() {
                that._cloudsTexture = that._cloudsTexture && that._cloudsTexture.destroy();
                that._cloudsTexture = context.createTexture2D({
                    source : cloudsImage,
                    pixelFormat : PixelFormat.LUMINANCE
                });
            };
            cloudsImage.onerror = function() {
                that._exception = 'Could not load image: ' + this.src + '.';
            };
            cloudsImage.src = this.cloudsMapSource;
        }

        if (this._bumpMapSource !== this.bumpMapSource) {
            this._bumpMapSource = this.bumpMapSource;

            var bumpImage = new Image();
            bumpImage.onload = function() {
                that._bumpTexture = that._bumpTexture && that._bumpTexture.destroy();
                that._bumpTexture = context.createTexture2D({
                    source : bumpImage,
                    pixelFormat : PixelFormat.LUMINANCE
                });
            };
            bumpImage.onerror = function() {
                that._exception = 'Could not load image: ' + this.src + '.';
            };
            bumpImage.src = this.bumpMapSource;
        }

        // Initial compile or re-compile if uber-shader parameters changed
        var dayChanged = ((this._showDay !== this.showDay) && (!this.showDay || this._dayTileProvider));
        var nightChanged = ((this._showNight !== this.showNight) && (!this.showNight || this._nightTexture));
        var cloudsChanged = ((this._showClouds !== this.showClouds) && (!this.showClouds || this._cloudsTexture));
        var cloudShadowsChanged = ((this._showCloudShadows !== this.showCloudShadows) && (!this.showCloudShadows || this._cloudsTexture));
        var specularChanged = ((this._showSpecular !== this.showSpecular) && (!this.showSpecular || this._specularTexture));
        var bumpsChanged = ((this._showBumps !== this.showBumps) && (!this.showBumps || this._bumpTexture));

        if (typeof this._sp === 'undefined' || typeof this._spPoles === 'undefined' ||
            (dayChanged || nightChanged || cloudsChanged || cloudShadowsChanged || specularChanged || bumpsChanged) ||
            (this._showTerminator !== this.showTerminator) ||
            (this._affectedByLighting !== this.affectedByLighting)) {

            var fsPrepend = ((this.showDay && this._dayTileProvider) ? '#define SHOW_DAY 1\n' : '') +
                ((this.showNight && this._nightTexture) ? '#define SHOW_NIGHT 1\n' : '') +
                ((this.showClouds && this._cloudsTexture) ? '#define SHOW_CLOUDS 1\n' : '') +
                ((this.showCloudShadows && this._cloudsTexture) ? '#define SHOW_CLOUD_SHADOWS 1\n' : '') +
                ((this.showSpecular && this._specularTexture) ? '#define SHOW_SPECULAR 1\n' : '') +
                ((this.showBumps && this._bumpTexture) ? '#define SHOW_BUMPS 1\n' : '') +
                (this.showTerminator ? '#define SHOW_TERMINATOR 1\n' : '') +
                (this.affectedByLighting ? '#define AFFECTED_BY_LIGHTING 1\n' : '') +
                '#line 0\n' +
                CentralBodyFSCommon;
            var groundFromSpacePrepend = '#define SHOW_GROUND_ATMOSPHERE 1\n' +
                '#define SHOW_GROUND_ATMOSPHERE_FROM_SPACE 1\n';
            var groundFromAtmospherePrepend = '#define SHOW_GROUND_ATMOSPHERE 1\n' +
                '#define SHOW_GROUND_ATMOSPHERE_FROM_ATMOSPHERE 1\n';

            vs = '#line 0\n' +
                 GroundAtmosphere +
                 CentralBodyVS;

            fs = fsPrepend + CentralBodyFS;

            this._spWithoutAtmosphere = this._spWithoutAtmosphere && this._spWithoutAtmosphere.release();
            this._spGroundFromSpace = this._spGroundFromSpace && this._spGroundFromSpace.release();
            this._spGroundFromAtmosphere = this._spGroundFromAtmosphere && this._spGroundFromAtmosphere.release();

            this._spWithoutAtmosphere = context.getShaderCache().getShaderProgram(vs, fs, attributeIndices);
            this._spGroundFromSpace = context.getShaderCache().getShaderProgram(
                    groundFromSpacePrepend + vs,
                    groundFromSpacePrepend + fs,
                    attributeIndices);
            this._spGroundFromAtmosphere = context.getShaderCache().getShaderProgram(
                    groundFromAtmospherePrepend + vs,
                    groundFromAtmospherePrepend + fs,
                    attributeIndices);

            vs = CentralBodyVSPole;
            fs = fsPrepend + GroundAtmosphere + CentralBodyFSPole;

            this._spPolesWithoutAtmosphere = this._spPolesWithoutAtmosphere && this._spPolesWithoutAtmosphere.release();
            this._spPolesGroundFromSpace = this._spPolesGroundFromSpace && this._spPolesGroundFromSpace.release();
            this._spPolesGroundFromAtmosphere = this._spPolesGroundFromAtmosphere && this._spPolesGroundFromAtmosphere.release();

            this._spPolesWithoutAtmosphere = context.getShaderCache().getShaderProgram(vs, fs, attributeIndices);
            this._spPolesGroundFromSpace = context.getShaderCache().getShaderProgram(
                    vs,
                    groundFromSpacePrepend + fs,
                    attributeIndices);
            this._spPolesGroundFromAtmosphere = context.getShaderCache().getShaderProgram(
                    vs,
                    groundFromAtmospherePrepend + fs,
                    attributeIndices);

            // Sync to public state
            this._showDay = dayChanged ? this.showDay : this._showDay;
            this._showNight = nightChanged ? this.showNight : this._showNight;
            this._showClouds = cloudsChanged ? this.showClouds : this._showClouds;
            this._showCloudShadows = cloudShadowsChanged ? this.showCloudShadows : this._showCloudShadows;
            this._showSpecular = specularChanged ? this.showSpecular : this._showSpecular;
            this._showBumps = bumpsChanged ? this.showBumps : this._showBumps;
            this._showTerminator = this.showTerminator;
            this._affectedByLighting = this.affectedByLighting;
        }

        var camera = sceneState.camera;
        var cameraPosition = camera.getPositionWC();

        this._fCameraHeight2 = cameraPosition.magnitudeSquared();
        this._fCameraHeight = Math.sqrt(this._fCameraHeight2);

        if (this._fCameraHeight > this._outerRadius) {
            // Viewer in space
            this._spSky = this._spSkyFromSpace;
            if (this.showGroundAtmosphere) {
                this._sp = this._spGroundFromSpace;
                this._spPoles = this._spPolesGroundFromSpace;
            } else {
                this._sp = this._spWithoutAtmosphere;
                this._spPoles = this._spPolesWithoutAtmosphere;
            }
        } else {
            // after the camera passes the minimum height, there is no ground atmosphere effect
            var showAtmosphere = this._ellipsoid.toCartographic3(cameraPosition).height >= this._minGroundFromAtmosphereHeight;
            if (this.showGroundAtmosphere && showAtmosphere) {
                this._sp = this._spGroundFromAtmosphere;
                this._spPoles = this._spPolesGroundFromAtmosphere;
            } else {
                this._sp = this._spWithoutAtmosphere;
                this._spPoles = this._spPolesWithoutAtmosphere;
            }
            this._spSky = this._spSkyFromAtmosphere;
        }

        this._occluder.setCameraPosition(cameraPosition);

        // TODO: refactor
        this._fillPoles(context, sceneState);

        this._throttleImages(sceneState);
        this._throttleReprojection(sceneState);
        this._throttleTextures(context, sceneState);

        var stack = [this._rootTile];
        while (stack.length !== 0) {
            var tile = stack.pop();

            if (this._cull(tile, sceneState)) {
                continue;
            }

            if (!this._dayTileProvider || (tile.state === TileState.TEXTURE_LOADED && tile.texture && !tile.texture.isDestroyed())) {
                if ((this._dayTileProvider && tile.zoom + 1 > this._dayTileProvider.zoomMax) || !this._refine(tile, context, sceneState)) {
                    this._enqueueTile(tile, context, sceneState);
                } else {
                    var children = tile.getChildren();
                    for (var i = 0; i < children.length; ++i) {
                        var child = children[i];
                        if ((child.state === TileState.TEXTURE_LOADED && child.texture && !child.texture.isDestroyed())) {
                            stack.push(child);
                        } else {
                            this._enqueueTile(tile, context, sceneState);
                            this._processTile(child);
                        }
                    }
                }
            } else {
                this._processTile(tile);
            }
        }

        this._mode = mode;
        this._projection = projection;
    }