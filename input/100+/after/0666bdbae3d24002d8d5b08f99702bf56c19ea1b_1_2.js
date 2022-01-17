function() {
          expect(m.getLayerAt(0).compositeLayer).toBeTruthy();
          expect(m.getLayerAt(1).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(2).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(3).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(4).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(0).parent.style.display).not.toEqual('none');
          expect(m.getLayerAt(1).parent.style.display).toEqual('none');
          expect(m.getLayerAt(4).parent.style.display).toEqual('none');
      }