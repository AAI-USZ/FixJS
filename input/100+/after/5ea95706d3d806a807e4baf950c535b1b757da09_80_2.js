function(){this.holder.css("visibility","hidden")},enable:function(){this.holder.css("visibility","")},sync:function(){var a;a=this.draftLimit;var b=this.timeTip,c=this.versions,d=this._getDrafts(),e;d.length>a&&d.splice(0,d.length-a);for(a=0;a<d.length;a++)e=d[a],e=(e.auto?"自动":"手动")+"保存于 : "+k(e.date),c.addItem({xclass:"menuitem",content:e,value:a});b.html(e);g.setItem(this._getSaveKey(),g==window.localStorage?encodeURIComponent(p.stringify(d)):d)},save:function(a){var b=this._getDrafts(),
c=this.editor.get("formatData");c&&(b[b.length-1]&&c==b[b.length-1].content&&(b.length-=1),this.drafts=b.concat({content:c,date:(new Date).getTime(),auto:a}),this.sync())},recover:function(a){var b=this.editor,c=this._getDrafts(),d=a.target.get("value");confirm("确认恢复 "+k(c[d].date)+" 的编辑历史？")&&(b.execCommand("save"),b.set("data",c[d].content),b.execCommand("save"));a.halt()},destroy:function(){t.call(this)}});e.augment(n,{