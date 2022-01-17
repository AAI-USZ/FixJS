function RenderObjectNode()
{
      /** @type {GlobeRenderer} */
      this.globerenderer = null;
      /** @type {vec3} */
      this.camera = new vec3();
      /** @type {PoiRenderer} */
      this.poirenderer = null;
      /** @type {GeometryRenderer} */
      this.geometryrenderer = null;
      /** @type {BillboardRenderer} */
      this.billboardrenderer = null;
      /** @type {AoeImageRenderer} */
      this.aoeimagerenderer = null;
      /** @type {VectorRenderer} */
      this.vectorrenderer = null;
      /** @type {boolean} */
      this.bRenderTexture = true;
      /** @type {Texture} */
      this.texture = null;
      // todo: change to enum
      // 0: no stereo,
      // 1: render top,
      // 2: render bottom
      /** @type {number} */
      this.stereoscopic = 0;
      
      //------------------------------------------------------------------------
      this.OnChangeState = function()
      {
         
      }
     
      //------------------------------------------------------------------------
      this.OnRender = function()
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

      //------------------------------------------------------------------------
      this.OnTraverse = function(ts)
      {
          var pos = ts.GetPosition();
          this.camera.Set(pos.x, pos.y, pos.z);
      }
      
      //------------------------------------------------------------------------
      this.OnInit = function()
      {
         this.globerenderer = new GlobeRenderer(this.engine);
         this.vectorrenderer = new VectorRenderer(this.engine);
         this.poirenderer = new PoiRenderer(this.engine);
         this.geometryrenderer = new GeometryRenderer(this.engine);
         this.billboardrenderer = new BillboardRenderer(this.engine);
         this.aoeimagerenderer = new AoeImageRenderer(this.engine);
      }
      
      //------------------------------------------------------------------------
      this.OnExit = function()
      {
         this.globerenderer.Destroy(); // free all memory
         this.globerenderer = null;
      }

      //------------------------------------------------------------------------
      this.DoResize = function(w,h)
      {
         if (this.bRenderTexture)
         {
            if (this.texture == null)
            {
               this.texture = new Texture(this.engine, true, w, h, true);
            }
            else
            {
               this.texture.UpdateFBO(w, h, true);
            }
         }
      }
      //------------------------------------------------------------------------
      this.OnRegisterEvents = function(context)
      {

      }
      //------------------------------------------------------------------------
}