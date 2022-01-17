function(){
			
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
			}