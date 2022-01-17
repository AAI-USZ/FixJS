function(context) { return function(shader,opt) {
                var material = opt.material;
                var texIndex = opt.textureIndex;
                
                shader.spatImage.set(texIndex++,context.sourceTex);
                shader.spatOffset.set(context.spatOffset);

                if (spats[0]) shader.spat0.set(texIndex++,spats[0]);
                if (spats[1]) shader.spat1.set(texIndex++,spats[1]);
                if (spats[2]) shader.spat2.set(texIndex++,spats[2]);
                if (spats[3]) shader.spat3.set(texIndex++,spats[3]);
                if (spats[4]) shader.spat4.set(texIndex++,spats[4]);
            }; }