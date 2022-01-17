function () {
        expect(store.getAt(0).data.drugname).toEqual(view.getComponent(0).store.getAt(0).data.drugname);
        expect(store.getAt(0).data.dosage).toEqual(view.getComponent(0).store.getAt(0).data.dosage);
        expect(store.getAt(0).data.disp).toEqual(view.getComponent(0).store.getAt(0).data.disp);
        expect(store.getAt(0).data.instock).toEqual(view.getComponent(0).store.getAt(0).data.instock);
        expect(store.getAt(0).data.labels).toEqual(view.getComponent(0).store.getAt(0).data.labels);
        expect(store.getAt(0).data.inhand).toEqual(view.getComponent(0).store.getAt(0).data.inhand);
    }