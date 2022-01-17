function() {
          expect(m.getLayerAt(0).compositeLayer).toBeTruthy();
          expect(m.getLayerAt(1).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(2).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(3).compositeLayer).toBeTruthy();
          expect(m.getLayerAt(4).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(0).parent.innerHTML).not.toEqual('');
          expect(m.getLayerAt(1).parent.innerHTML).toEqual('');
          expect(m.getLayerAt(2).parent.innerHTML).not.toEqual('');
          expect(m.getLayerAt(3).parent.innerHTML).not.toEqual('');
          expect(m.getLayerAt(4).parent.innerHTML).toEqual('');
      }