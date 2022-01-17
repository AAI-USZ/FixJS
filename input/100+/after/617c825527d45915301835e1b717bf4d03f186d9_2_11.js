function(panel, pvMark, keyArgs){
    this.chart  = panel.chart;
    this.panel  = panel;
    this.pvMark = pvMark;
    
    this.extensionId = def.get(keyArgs, 'extensionId');
    this.isActiveSeriesAware = !!this.chart.visualRoles('series', {assertExists: false}) &&
                               def.get(keyArgs, 'activeSeriesAware', true);
            
    /* Extend the pv mark */
    pvMark
        .localProperty('_scene', Object)
        .localProperty('group',  Object);
    
    this.lock('_scene', function(){ 
            return this.scene; 
        })
        /* TODO: remove these when possible and favor access through scene */
        .lock('group', function(){ 
            return this.scene.group; 
        })
        .lock('datum', function(){ 
            return this.scene.datum; 
        });
        
    pvMark.sign = def.fun.constant(this);
    
    /* Intercept the protovis mark's buildInstance */
    pvMark.buildInstance = this._buildInstance.bind(this, pvMark.buildInstance);
}