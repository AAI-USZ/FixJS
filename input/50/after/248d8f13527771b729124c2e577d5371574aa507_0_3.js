function (wf) {
            return this.find( function (cube) {
                return cube.get('wireframe').id === (wf && wf.id);
            }) || null;
        }