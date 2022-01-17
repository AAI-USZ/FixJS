function () {
		var that = this;

		// generate the new scopes
		FloatingMenu.createScope(this.name + '.row', 'Aloha.global');
		FloatingMenu.createScope(this.name + '.column', 'Aloha.global');
		FloatingMenu.createScope(this.name + '.cell', 'Aloha.continuoustext');

		// the 'create table' button
		this.createTableButton = new Aloha.ui.Button({
			'name' : 'table',
			'iconClass' : 'aloha-button aloha-button-table',
			'size' : 'small',
			'tooltip' : i18n.t('button.createtable.tooltip'),
			'onclick' : function (element, event) {
				TablePlugin.createDialog(element.btnEl.dom);
			}
		});

		// add to floating menu
		FloatingMenu.addButton(
			'Aloha.continuoustext',
			this.createTableButton,
			i18nCore.t('floatingmenu.tab.insert'),
			1
		);

    // now the specific table buttons

    // generate formatting buttons for columns
    this.initColumnBtns();

    // generate formatting buttons for rows
    this.initRowsBtns();

    // generate formatting buttons for tables
    this.tableMSItems = [];
    
    var tableConfig = this.tableConfig;
    
    jQuery.each(tableConfig, function(j, itemConf){
      that.tableMSItems.push({
        name: itemConf.name,
        text: i18n.t(itemConf.text),
        tooltip: i18n.t(itemConf.tooltip),
        iconClass: 'aloha-button aloha-table-layout ' + itemConf.iconClass,
        click: function(){
          // set table css class
          if (that.activeTable) {
            for (var f = 0; f < tableConfig.length; f++) {
              that.activeTable.obj.removeClass(tableConfig[f].cssClass);
            }
            that.activeTable.obj.addClass(itemConf.cssClass);
          }
        }
      });
    });
    
    if(this.tableMSItems.length > 0) {
      this.tableMSItems.push({
        name: 'removeFormat',
        text: i18n.t('button.removeFormat.text'),
        tooltip: i18n.t('button.removeFormat.tooltip'),
        iconClass: 'aloha-button aloha-button-removeFormat',
        wide: true,
        click: function () {
          // remove all table classes
          if (that.activeTable) {
            for (var f = 0; f < tableConfig.length; f++) {
              that.activeTable.obj.removeClass(that.tableConfig[f].cssClass);
            }
          }
        }
      });
    }
    
    this.tableMSButton = new Aloha.ui.MultiSplitButton({
      items : this.tableMSItems,
      name : 'tableActions'
    });
    
    if(this.tableMSItems.length > 0) {
      FloatingMenu.addButton(
        this.name + '.cell',
        this.tableMSButton,
        i18n.t('floatingmenu.tab.tablelayout'),
        3
      );
    };

	this.btnMergecells = new Aloha.ui.Button({
    	  	'name' : 'mergecells',
			'iconClass' : 'aloha-button aloha-button-merge-cells',
			'size' : 'small',
			'tooltip' : i18n.t('button.mergecells.tooltip'),
			'toggle' : false,
			'onclick' : function () {
				if (that.activeTable) {
					that.activeTable.selection.mergeCells();
				}
			}
		});

	// Add merge/split cells buttons
    FloatingMenu.addButton(
      this.name + '.cell',
      this.btnMergecells,
      i18n.t('floatingmenu.tab.table'),
      1
    );

	this.btnSplitcells = new Aloha.ui.Button({
    	  	'name' : 'splitcells',
			'iconClass' : 'aloha-button aloha-button-split-cells',
			'size' : 'small',
			'tooltip' : i18n.t('button.splitcells.tooltip'),
			'toggle' : false,
			'onclick' : function () {
				if (that.activeTable) {
					that.activeTable.selection.splitCells();
				}
			}
		});

    FloatingMenu.addButton(
      this.name + '.cell',
      this.btnSplitcells,
      i18n.t('floatingmenu.tab.table'),
      1
    );

	// Add caption button
    this.captionButton = new Aloha.ui.Button({
    		'name' : 'tablecaption',
			'iconClass' : 'aloha-button aloha-button-table-caption',
			'size' : 'small',
			'tooltip' : i18n.t('button.caption.tooltip'),
			'toggle' : true,
			'onclick' : function () {
				if (that.activeTable) {
					// look if table object has a child caption
					if ( that.activeTable.obj.children("caption").is('caption') ) {
						that.activeTable.obj.children("caption").remove();
						// select first cell of table
					} else {
						var captionText = i18n.t('empty.caption');
						var c = jQuery('<caption></caption>');
						that.activeTable.obj.append(c);
						that.makeCaptionEditable(c, captionText);

						// get the editable span within the caption and select it
						var cDiv = c.find('div').eq(0);
						var captionContent = cDiv.contents().eq(0);
						if (captionContent.length > 0) {
							var newRange = new GENTICS.Utils.RangeObject();
							newRange.startContainer = newRange.endContainer = captionContent.get(0);
							newRange.startOffset = 0;
							newRange.endOffset = captionContent.text().length;

							// blur all editables within the table
							that.activeTable.obj.find('div.aloha-table-cell-editable').blur();

							cDiv.focus();
							newRange.select();
							Aloha.Selection.updateSelection();
						}
					}
				}
			}
		});

		FloatingMenu.addButton(
			this.name + '.cell',
			this.captionButton,
			i18n.t('floatingmenu.tab.table'),
			1
		);

		// for cells
		// add summary field
		this.summary = new Aloha.ui.AttributeField( {
			width : 275,
			name  : 'tableSummary'
		} );
		
		this.summary.addListener( 'keyup', function( obj, event ) {
			that.activeTable.checkWai();
		} );
		
		if(!this.settings.summaryinsidebar) {
			FloatingMenu.addButton(
				this.name + '.cell',
				this.summary,
				i18n.t('floatingmenu.tab.table'),
				1
			);
		}

	}