function()
      {
         if (this.bRenderTexture)
         {
            this.engine.PushRenderTarget(this.texture);
            this.engine.SetupDepthTextureTarget();
         }


         this.globerenderer.Render(this.camera, this.engine.matModelViewProjection);
         this.vectorrenderer.Render(this.camera, this.engine.matModelViewProjection);
         this.poirenderer.Render(this.camera, this.engine.matModelViewProjection);
         this.geometryrenderer.Render(this.camera, this.engine.matModelViewProjection);
         this.billboardrenderer.Render(this.camera, this.engine.matModelViewProjection);
         this.aoeimagerenderer.Render(this.camera, this.engine.matModelViewProjection);

         if (this.bRenderTexture)
         {
            this.engine.PopRenderTarget();

            var numpix = 10;

            var scalex = this.texture.width / (this.texture.width+numpix);
            var scaley = this.texture.height / (this.texture.height+numpix);
            if (this.stereoscopic == 0)
            {
               this.texture.Blit(numpix,numpix, 0, 0, scalex, scaley, true, true, 1.0);
               this.texture.Blit(0,0, 0, 0, 1, 1, true, true, 1.0);
            }
            else if (this.stereoscopic == 1) // top
            {
               this.texture.Blit(numpix,this.texture.height/2+numpix/2, 0, 0, scalex, scaley/2, true, true, 1.0);
               this.texture.Blit(0,this.texture.height/2, 0, 0, 1, 0.5, true, true, 1.0);
            }
            else if (this.stereoscopic == 2) // bottom
            {
               this.texture.Blit(numpix,numpix/2, 0, 0, scalex, scaley/2, true, true, 1.0);
               this.texture.Blit(0,0, 0, 0, 1, 0.5, true, true, 1.0);
            }
         }
      }