function (dictionary) {
        var ret = false;
        var buffer = null;
        var deflated = null;
        var image = null;

        var maxParticles = parseInt(this._valueForKey("maxParticles", dictionary));
        // self, not super
        if (this.initWithTotalParticles(maxParticles)) {
            // angle
            this._angle = parseFloat(this._valueForKey("angle", dictionary));
            this._angleVar = parseFloat(this._valueForKey("angleVariance", dictionary));

            // duration
            this._duration = parseFloat(this._valueForKey("duration", dictionary));

            // blend function
            this._blendFunc.src = parseInt(this._valueForKey("blendFuncSource", dictionary));
            this._blendFunc.dst = parseInt(this._valueForKey("blendFuncDestination", dictionary));

            // color
            this._startColor.r = parseFloat(this._valueForKey("startColorRed", dictionary));
            this._startColor.g = parseFloat(this._valueForKey("startColorGreen", dictionary));
            this._startColor.b = parseFloat(this._valueForKey("startColorBlue", dictionary));
            this._startColor.a = parseFloat(this._valueForKey("startColorAlpha", dictionary));

            this._startColorVar.r = parseFloat(this._valueForKey("startColorVarianceRed", dictionary));
            this._startColorVar.g = parseFloat(this._valueForKey("startColorVarianceGreen", dictionary));
            this._startColorVar.b = parseFloat(this._valueForKey("startColorVarianceBlue", dictionary));
            this._startColorVar.a = parseFloat(this._valueForKey("startColorVarianceAlpha", dictionary));

            this._endColor.r = parseFloat(this._valueForKey("finishColorRed", dictionary));
            this._endColor.g = parseFloat(this._valueForKey("finishColorGreen", dictionary));
            this._endColor.b = parseFloat(this._valueForKey("finishColorBlue", dictionary));
            this._endColor.a = parseFloat(this._valueForKey("finishColorAlpha", dictionary));

            this._endColorVar.r = parseFloat(this._valueForKey("finishColorVarianceRed", dictionary));
            this._endColorVar.g = parseFloat(this._valueForKey("finishColorVarianceGreen", dictionary));
            this._endColorVar.b = parseFloat(this._valueForKey("finishColorVarianceBlue", dictionary));
            this._endColorVar.a = parseFloat(this._valueForKey("finishColorVarianceAlpha", dictionary));

            // particle size
            this._startSize = parseFloat(this._valueForKey("startParticleSize", dictionary));
            this._startSizeVar = parseFloat(this._valueForKey("startParticleSizeVariance", dictionary));
            this._endSize = parseFloat(this._valueForKey("finishParticleSize", dictionary));
            this._endSizeVar = parseFloat(this._valueForKey("finishParticleSizeVariance", dictionary));

            // position
            var x = parseFloat(this._valueForKey("sourcePositionx", dictionary));
            var y = parseFloat(this._valueForKey("sourcePositiony", dictionary));
            this.setPosition(cc.ccp(x, y));
            this._posVar.x = parseFloat(this._valueForKey("sourcePositionVariancex", dictionary));
            this._posVar.y = parseFloat(this._valueForKey("sourcePositionVariancey", dictionary));

            // Spinning
            this._startSpin = parseFloat(this._valueForKey("rotationStart", dictionary));
            this._startSpinVar = parseFloat(this._valueForKey("rotationStartVariance", dictionary));
            this._endSpin = parseFloat(this._valueForKey("rotationEnd", dictionary));
            this._endSpinVar = parseFloat(this._valueForKey("rotationEndVariance", dictionary));

            this._emitterMode = parseInt(this._valueForKey("emitterType", dictionary));

            // Mode A: Gravity + tangential accel + radial accel
            if (this._emitterMode == cc.CCPARTICLE_MODE_GRAVITY) {
                // gravity
                this.modeA.gravity.x = parseFloat(this._valueForKey("gravityx", dictionary));
                this.modeA.gravity.y = parseFloat(this._valueForKey("gravityy", dictionary));

                // speed
                this.modeA.speed = parseFloat(this._valueForKey("speed", dictionary));
                this.modeA.speedVar = parseFloat(this._valueForKey("speedVariance", dictionary));

                // radial acceleration
                var pszTmp = this._valueForKey("radialAcceleration", dictionary);
                this.modeA.radialAccel = (pszTmp) ? parseFloat(pszTmp) : 0;

                pszTmp = this._valueForKey("radialAccelVariance", dictionary);
                this.modeA.radialAccelVar = (pszTmp) ? parseFloat(pszTmp) : 0;

                // tangential acceleration
                pszTmp = this._valueForKey("tangentialAcceleration", dictionary);
                this.modeA.tangentialAccel = (pszTmp) ? parseFloat(pszTmp) : 0;

                pszTmp = this._valueForKey("tangentialAccelVariance", dictionary);
                this.modeA.tangentialAccelVar = (pszTmp) ? parseFloat(pszTmp) : 0;
            } else if (this._emitterMode == cc.CCPARTICLE_MODE_RADIUS) {
                // or Mode B: radius movement
                this.modeB.startRadius = parseFloat(this._valueForKey("maxRadius", dictionary));
                this.modeB.startRadiusVar = parseFloat(this._valueForKey("maxRadiusVariance", dictionary));
                this.modeB.endRadius = parseFloat(this._valueForKey("minRadius", dictionary));
                this.modeB.endRadiusVar = 0;
                this.modeB.rotatePerSecond = parseFloat(this._valueForKey("rotatePerSecond", dictionary));
                this.modeB.rotatePerSecondVar = parseFloat(this._valueForKey("rotatePerSecondVariance", dictionary));
            } else {
                cc.Assert(false, "Invalid emitterType in config file");
                cc.BREAK_IF(true);
            }

            // life span
            this._life = parseFloat(this._valueForKey("particleLifespan", dictionary));
            this._lifeVar = parseFloat(this._valueForKey("particleLifespanVariance", dictionary));

            // emission Rate
            this._emissionRate = this._totalParticles / this._life;

            // texture
            // Try to get the texture from the cache
            var textureName = this._valueForKey("textureFileName", dictionary);
            var fullpath = cc.FileUtils.sharedFileUtils().fullPathFromRelativeFile(textureName, this._plistFile);

            var tex = null;

            if (textureName.length > 0) {
                // set not pop-up message box when load image failed
                var notify = cc.FileUtils.sharedFileUtils().isPopupNotify();
                cc.FileUtils.sharedFileUtils().setPopupNotify(false);
                tex = cc.TextureCache.sharedTextureCache().addImage(fullpath);

                // reset the value of UIImage notify
                cc.FileUtils.sharedFileUtils().setPopupNotify(notify);
            }

            if (tex) {
                this._texture = tex;
            } else {
                var textureData = this._valueForKey("textureImageData", dictionary);
                cc.Assert(textureData, "cc.ParticleSystem.initWithDictory:textureImageData is null");

                if (textureData.length != 0) {
                    //TODO base64Decode
                    // if it fails, try to get it from the base64-gzipped data
                    var decodeLen = cc.base64Decode(textureData, textureData.length, buffer);
                    cc.Assert(buffer != null, "CCParticleSystem: error decoding textureImageData");
                    if (!buffer)
                        return false

                    var deflatedLen = cc.ZipUtils.ccInflateMemory(buffer, decodeLen, deflated);
                    cc.Assert(deflated != null, "CCParticleSystem: error ungzipping textureImageData");
                    if (!deflated)
                        return false

                    image = new cc.Image();
                    var isOK = image.initWithImageData(deflated, deflatedLen);
                    cc.Assert(isOK, "CCParticleSystem: error init image with Data");
                    if (!isOK)
                        return false

                    this._texture = cc.TextureCache.sharedTextureCache().addUIImage(image, fullpath);
                }
            }
            cc.Assert(this._texture != null, "CCParticleSystem: error loading the texture");

            if (!this._texture)
                return false
            ret = true;
        }

        return ret;
    }