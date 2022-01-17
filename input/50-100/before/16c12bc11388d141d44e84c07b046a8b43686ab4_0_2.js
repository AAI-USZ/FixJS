function () {
            var loader,
                shaderUniforms;

            this.shaderUniforms = shaderUniforms = {
                normal: {
                    type: "t",
                    value: 0,
                    texture: THREE.ImageUtils.loadTexture("resources/normal.png")
                },
                time: {
                    type: "f",
                    value: 1.0
                }
            };

            loader = new THREE.CTMLoader(this.renderer.context);
            loader.load("resources/map1.ctm", this.onMeshLoaded, false, false);
        }