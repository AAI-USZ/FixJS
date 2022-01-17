function(done){
			
			var values = {
				main: {
					bg: "#1b56e0"
				},
				all: {
					bg: "#46e01b",
					font: {
						color:"#58b6b8",
						name:"verdana"
					},
					border:{
						color: "#b858b4",
						radius: "10",
						size: "1"
					}
				},
				chapter: {
					bg: "#b87a58",
					font: {
						color:"#b8b658",
						name:"times new roman"
					},
					border:{
						color: "#58b87d",
						radius: "20",
						size: "2"
					}
				}
			};
			
			function setSelector(idx, type, selector, value){
				return "$('.style-container').eq(" + idx + ").find('div." + type + " " + selector + "').val('" + value.toLowerCase() + "').trigger('blur').trigger('change');";
			}
			
			//Main background
			browser.evaluate(setSelector(1, 'background', '.color-field', values.main.bg));
			
			//All
			browser.evaluate(setSelector(2, 'background', '.color-field', values.all.bg));
			
			browser.evaluate(setSelector(2, 'font', '.color-field', values.all.font.color));
			browser.evaluate(setSelector(2, 'font', '.fontName-field', values.all.font.name));
			
			browser.evaluate(setSelector(2, 'border', '.color-field', values.all.border.color));
			browser.evaluate(setSelector(2, 'border', '.radius-field', values.all.border.radius));
			browser.evaluate(setSelector(2, 'border', '.size-field', values.all.border.size));
			
			//Chapter
			browser.evaluate(setSelector(3, 'background', '.color-field', values.chapter.bg));
			
			browser.evaluate(setSelector(3, 'font', '.color-field', values.chapter.font.color));
			browser.evaluate(setSelector(3, 'font', '.fontName-field', values.chapter.font.name));
			
			browser.evaluate(setSelector(3, 'border', '.color-field', values.chapter.border.color));
			browser.evaluate(setSelector(3, 'border', '.radius-field', values.chapter.border.radius));
			browser.evaluate(setSelector(3, 'border', '.size-field', values.chapter.border.size));
				
			browser.clickLink('a.save', function(){
				browser.wait(2000, function(){
				 browser
					.fill("passcode", newSlider.passcode)
					.pressButton("OK", function(){
				
						function getSelector(idx, type, selector){
							return "$('.style-container').eq(" + idx + ").find('div." + type + " " + selector + "').val().toLowerCase();";
						}
						
						//Main background
						expect(browser.evaluate(getSelector(1, 'background', '.color-field'))).to.eql(values.main.bg);
						
						//All
						expect(browser.evaluate(getSelector(2, 'background', '.color-field'))).to.eql(values.all.bg);
						
						expect(browser.evaluate(getSelector(2, 'font', '.color-field'))).to.eql(values.all.font.color);
						expect(browser.evaluate(getSelector(2, 'font', '.fontName-field'))).to.eql(values.all.font.name);
						
						expect(browser.evaluate(getSelector(2, 'border', '.color-field'))).to.eql(values.all.border.color);
						expect(browser.evaluate(getSelector(2, 'border', '.radius-field'))).to.eql(values.all.border.radius);
						expect(browser.evaluate(getSelector(2, 'border', '.size-field'))).to.eql(values.all.border.size);
						
						//Chapter
						expect(browser.evaluate(getSelector(3, 'background', '.color-field'))).to.eql(values.chapter.bg);
						
						expect(browser.evaluate(getSelector(3, 'font', '.color-field'))).to.eql(values.chapter.font.color);
						expect(browser.evaluate(getSelector(3, 'font', '.fontName-field'))).to.eql(values.chapter.font.name);
						
						expect(browser.evaluate(getSelector(3, 'border', '.color-field'))).to.eql(values.chapter.border.color);
						expect(browser.evaluate(getSelector(3, 'border', '.radius-field'))).to.eql(values.chapter.border.radius);
						expect(browser.evaluate(getSelector(3, 'border', '.size-field'))).to.eql(values.chapter.border.size);
						
						done();
					
					});
				});
			});
		}