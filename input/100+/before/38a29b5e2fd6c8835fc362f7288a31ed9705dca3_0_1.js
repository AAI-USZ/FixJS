function(dynamic)
		{
			if(this.loading===true){return false;}
			var thm = this.tab.display==="vertical"?"":"H";
			var tb =this.elements.tabOptions[this.tabSelected];
			tb.className="panel_tabOptionSelected"+thm+"___"+this.getTheme("tabOptionSelected");
			//tb.onmouseover	= this.styles.tabCSS.sover.args(tb);
			//tb.onmouseout	= this.styles.tabCSS.sout.args(tb);
			tb.onmouseover	= function(o,j){
				o = window.event?o:j;
				o.a.className=o.b;
			}.args({a:tb,b:"panel_tabOptionSelectedOver"+thm+"___"+this.getTheme("tabOptionSelectedOver")});
			tb.onmouseout	= function(o,j){
				o = window.event?o:j;
				o.a.className=o.b;
			}.args({a:tb,b:"panel_tabOptionSelected"+thm+"___"+this.getTheme("tabOptionSelected")});
			var tc = (typeof this.tab.options[this.tabSelected].content);
			if(!dynamic)
			{
				/*this.parent.dom.setStyle(tb,this.styles.tabCSS.sel.concat({
				width		:parseInt(this.parent.dom.getStyle(tb,"width"),10)-((!this.parent.browser.isIE)?3:0),
				borderLeftWidth	:4
				}));*/
				if(this.tab.display==="vertical")
				{
					var hj = (parseInt(this.parent.dom.getStyle(tb,"width"),10)-((!this.parent.browser.isIE)?3:0));
					this.parent.dom.setStyle(tb,{
						width		:hj,
						borderLeftWidth	:4
					});
				}
				else
				{
					this.parent.dom.setStyle(tb,{
						//height		:parseInt(this.parent.dom.getStyle(tb,"height"),10)-((!this.parent.browser.isIE)?3:0),
						//borderTopWidth	:4,
						//paddingTop	:5
					});
				}
			}
			tb.onmouseup=function(){return false;};
			if(this.tabLastSelected!==false)
			{
				var tls =this.elements.tabOptions[this.tabLastSelected];
				tls.className="panel_tabOption"+thm+"___"+this.getTheme("tabOption");
				//tls.onmouseover	= this.styles.tabCSS.over.args(tls);
				tls.onmouseover	= function(o,j){
					o = window.event?o:j;
					o.a.className=o.b;
				}.args({a:tls,b:"panel_tabOptionOver"+thm+"___"+this.getTheme("tabOptionOver")});
				//tls.onmouseout	= this.styles.tabCSS.out.args(tls);
				tls.onmouseout	= function(o,j){
					o = window.event?o:j;
					o.a.className=o.b;
				}.args({a:tls,b:"panel_tabOption"+thm+"___"+this.getTheme("tabOption")});
				tls.onmouseup=function(event,tabID){
					if(this.tab.manualDisabled){return false;}
					this.tabSelected=(this.parent.browser.isIE)?event:tabID;
					this.makeTab();
					//this.resize();
					return false;
				}.extend(this,this.tabLastSelected);

				/*this.parent.dom.setStyle(tls,this.styles.tabCSS.def.concat({
				width		:parseInt(this.parent.dom.getStyle(tb,"width"),10)+((!this.parent.browser.isIE)?3:0),
				borderLeftWidth	:1
				}));*/

				if(this.tab.display==="vertical")
				{
					this.parent.dom.setStyle(tls,{
						width		:parseInt(this.parent.dom.getStyle(tb,"width"),10)+((!this.parent.browser.isIE)?3:0),
						borderLeftWidth	:1
					});
				}
				else
				{
					this.parent.dom.setStyle(tls,{
						//height		:parseInt(this.parent.dom.getStyle(tb,"height"),10)+((!this.parent.browser.isIE)?3:0),
						//borderTopWidth	:1,
						//paddingTop	:10
					});
				}
				this.parent.dom.setStyle(tls,this.setStyle.tabOption || {});
			}
			this.parent.dom.setStyle(tb,this.setStyle.tabOptionSelected || {});
			if(!this.tab.options[this.tabSelected].noClear)
			{
				this.clearContent();
			}
			this.addContent(this.tab.options[this.tabSelected].content);

			this.tabLastSelected=this.tabSelected;
			return true;
		}