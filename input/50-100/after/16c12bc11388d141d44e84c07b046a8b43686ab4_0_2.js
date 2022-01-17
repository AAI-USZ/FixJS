function () {
            var loader,
                shaderUniforms;

            this.shaderUniforms = shaderUniforms = {
                normalMap: {
                    type: "t",
                    value: 0,
                    texture: THREE.ImageUtils.loadTexture("resources/normalmap.png")
                },
                time: {
                    type: "f",
                    value: 1.0
                }
            };

            loader = new THREE.CTMLoader(this.renderer.context);
            loader.load("resources/map.ctm", this.onMeshLoaded, false, false);
        }