function(button, e, options) {
        var nouvChamp=button.up().getComponent(1).cloneConfig();
        nouvChamp.anchor = '90%';
        nouvChamp.style = '{float:left;}';
        var enrobage =Ext.widget('ChampTC');
        enrobage.add(nouvChamp);
        enrobage.getComponent('helpBouton').setTooltip(nouvChamp.tooltip);
        enrobage.getComponent(2).destroy();
        enrobage.getComponent(1).destroy();
        enrobage.getComponent(0).destroy();
        var supprimeur = Ext.widget('button', {iconCls: 'close', margin: '0 0 0 5', tooltip: 'Enlever', itemId: 'boutonEffaceurChamps'});
        supprimeur.on('click', function(){
            button.valeursM--;
            this.up().destroy();
        });
        enrobage.add(supprimeur);
        button.up().up().insert(button.up().up().items.indexOf(button.up())+button.valeursM, enrobage);
        button.valeursM++;
    }