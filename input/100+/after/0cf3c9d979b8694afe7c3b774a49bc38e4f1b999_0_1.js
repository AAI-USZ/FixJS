function (item){
			var _this=this;
			_this.itemImg=coly.$("img",item)[0];
			_this.itemContent=coly.$(".popContent",item)[0];
			_this.itemContentText=coly.$(".text",_this.itemContent)[0];
			_this.itemContentComs=coly.$(".com_content",_this.itemContent)[0];
			if(!(_this.itemContentText.innerHTML)){
				_this.itemContentText.css("display","none");
			}
			if(!(_this.itemContentComs.innerHTML)){
				_this.itemContentComs.css("display","none");
			}
			_this.itemWid=coly.getImgSize(_this.itemImg).width;
			_this.itemHe=coly.getImgSize(_this.itemImg).height;
			_this.itemContent.css("visibility","hidden");
			_this.com=coly.$(".comDiv",item);
			this.comDiv=coly.$(".comDiv",this.pop_box);
			coly.each(_this.comDiv,function (){
					this.css("display","none");
			});
			/*
				清除当前还在进行的动画
				防止用户点击过快而导致动画混乱
			*/
			_this.anima1 &&_this.anima1();
			_this.anima2 &&_this.anima2();
			_this.anima3 &&_this.anima3();
			_this.anima4 &&_this.anima4();
			_this.anima5 &&_this.anima5();
			_this.anima6 &&_this.anima6();
			_this.img_all.css({
				"background":"none",
				"width":"auto",
				"height":"auto"
			});
			_this.popNav.css({
					"left":_this.popNav.offsetWidth?(_this.pageWidth-_this.popNav.offsetWidth)/2+"px":"227px"
			});
			_this.box_content.css({
				"width":"auto",
				"height":"auto"
			});
			item.css({
				"display":"block",
				"opacity":"100"
			});
			_this.itemImg.css({
				"display":"block",
				"opacity":"0"
			});
			_this.prevBtn.css("top",_this.itemHe/2+"px");
			_this.nextBtn.css("top",_this.itemHe/2+"px");
			coly.each(item.siblings(),function (){
				var o=this;
				if(o.nodeName==="LI"){
					o.css({
						"display":"none",
						"opacity":"0"
					});
				}
			});
			this.pop_box.css({
				"left":(_this.pageWidth-_this.itemWid-20)/2+"px",
				"top":110+"px",
				"display":"block"
			});
			if(!this.maskDiv){
				this.maskDiv=coly.$("<div><div id='mask' style='position:relative;'>mask</div></div>");
				this.loadingDiv=coly.$("<div><img src='view/front/images/loading.gif'/></div>");
				this.pop_box.appendChild(this.maskDiv);
				this.mask=coly.$("#mask");
				this.maskDivLeft=coly.$("<div>this.maskDivRigh</div>");
				this.maskDivRight=coly.$("<div>this.maskDivRight</div>");
				this.mask.appendChild(this.maskDivLeft);
				this.mask.appendChild(this.maskDivRight);
				this.mask.appendChild(this.loadingDiv);
			}
			this.loadingDiv.css({
				"position":"absolute",
				"left":(_this.itemWid+20)/2+"px",
				"top":(_this.itemHe+10)/3+"px",
				"display":"none"
			});
			this.maskDiv.css({
				"id":"mask",
				"position":"absolute",
				"top":"0",
				"left":"0",
				"font-size":"0px",
				"display":"block"
			});
			this.mask.css({
					"width":_this.itemWid+20+"px",
					"height":_this.itemHe+10+"px"
			});
			this.maskDivLeft.css({
				"position":"absolute",
				"right":(_this.itemWid+20)/2+"px",
				"top":"0px",
				"display":"block",
				"background":"#fff",
				"text-indent":"-9999px"
			});
			this.maskDivRight.css({
				"position":"absolute",
				"left":(_this.itemWid+20)/2+"px",
				"top":"0px",
				"display":"block",
				"background":"#fff",
				"text-indent":"-9999px"
			});
			if(_this.navFlag){
				_this.toogle_bg();
				this.maskDivLeft.css({
					"width":(_this.itemWid+20)/2*2/3+"px",
					"height":(_this.itemHe+10)*2/3+"px",
					"opacity":"0"
				});
				this.maskDivRight.css({
					"width":(_this.itemWid+20)/2*2/3+"px",
					"height":(_this.itemHe+10)*2/3+"px",
					"opacity":"0"
				});
				this.maskDivLeft.animate({"opacity":0},{"opacity":100},200,function (){
					_this.toggleMask(item,1);
				});
				_this.anima3=this.maskDivRight.animate({"opacity":0},{"opacity":100},200,function (){
					this.animate({"width":parseInt(this.css("width")),"height":parseInt(this.css("height"))},{"width":(_this.itemWid+20)/2/3,"height":(_this.itemHe+10)/3},800,function (){
						_this.maskDiv.css({
							"display":"none"
						});
					});
				});
			}else{
				_this.toggleMask(item);
				_this.anima4=this.maskDivRight.animate({"width":(_this.curWid+20)/2,"height":(_this.curHe+10)},{"width":(_this.itemWid-_this.curWid)/2,"height":_this.itemHe-_this.curHe},800,function (){
				});
			}
		}