function configureMenuDetail(){
            
            var pDetails = myMeta.protoDetails;
            var detailCount = 0;                     // Agrega un numero secuencia para marcar los tabs
            var bDetails = false;               // Indica si tiene o no detalles
            for (var vDet in pDetails) {        // Recorre y agrega los detalles al menu 

                // console.log( pDetails[vTab] + " ");
                if (pDetails[vDet].menuText === undefined ) {
                    continue; 
                } 

                if (pDetails[vDet].menuText == '-') { 
                    var item = menuDetail.add({ xtype: 'menuseparator' });
                    continue;
                }
                
                var item = menuDetail.add({
                    text: pDetails[vDet].menuText,
                    tooltip : pDetails[vDet].menuText,
                    detailKey: pDetails[vDet].conceptDetail,
                    detailField: pDetails[vDet].detailField,
                    masterField: pDetails[vDet].masterField,
                    
                    detailTitleLbl: pDetails[vDet].detailTitleLbl,
                    detailTitlePattern: pDetails[vDet].detailTitlePattern,
                    ixDetail: detailCount
                });
                
                // PreCarga los detalles  ( DGT: Esto puede ser optimizado en la carga asincrona de la pcl, por ahora lo need para la forma )
                loadPci( pDetails[vDet].conceptDetail, true )                 
                
                // Agrego el handler q activara el tab a partir del menu
                bDetails = true;
                item.on({
                    click: { fn: __MasterDetail.onTbSelectDetail,scope: __MasterDetail  }
                });                 
                detailCount += 1;
            };

            if ( ! bDetails) {
                var btAux = Ext.getCmp( ideBtDetails );
                btAux.hidden = true
            }

    
        }