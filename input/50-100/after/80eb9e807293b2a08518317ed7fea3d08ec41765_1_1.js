function() {
                expect(layer.features().length).toEqual(1);
                expect(obj.callback).toHaveBeenCalled();
                expect(obj.callback).toHaveBeenCalledWith(null, layer.features(), layer);
            }