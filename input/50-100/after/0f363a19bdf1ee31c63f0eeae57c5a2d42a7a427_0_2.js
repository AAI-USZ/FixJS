function (ctx) {

            x3dom.nodeTypes.Inline.superClass.call(this, ctx);



            this.addField_MFString(ctx, 'url', []);

            this.addField_SFBool(ctx, 'load', true);

			this.addField_MFString(ctx, 'nameSpaceName', []);

			this.addField_SFBool(ctx, 'mapDEFToID', false);

            

			this.count = 0;

       }