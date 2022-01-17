function() {
  describe("when jQuery matcher hides original Jasmine matcher", function() {
    describe("and tested item is jQuery object", function() {
      it("should invoke jQuery version of matcher", function() {
        expect($('<div />')).toBe('div')
      })
    })

    describe("and tested item is not jQuery object", function() {
      it("should invoke original version of matcher", function() {
        expect(true).toBe(true)
      })
    })
    
    describe("and tested item is a dom object", function() {
      it("should invoke jquery version of matcher", function() {
        expect($('<div />').get(0)).toBe('div')
      })
    })
  })

  describe("when jQuery matcher does not hide any original Jasmine matcher", function() {
    describe("and tested item in not jQuery object", function() {
      it("should pass negated", function() {
        expect({}).not.toHaveClass("some-class")
      })
    })
  })

  describe("when invoked multiple times on the same fixture", function() {
    it("should not reset fixture after first call", function() {
      setFixtures(sandbox())
      expect($('#sandbox')).toExist()
      expect($('#sandbox')).toExist()
    })
  })

  describe("toHaveClass", function() {
    var className = "some-class"

    it("should pass when class found", function() {
      setFixtures(sandbox({'class': className}))
      expect($('#sandbox')).toHaveClass(className)
      expect($('#sandbox').get(0)).toHaveClass(className)
    })

    it("should pass negated when class not found", function() {
      setFixtures(sandbox())
      expect($('#sandbox')).not.toHaveClass(className)
      expect($('#sandbox').get(0)).not.toHaveClass(className)
    })

	it("should not crash when documentElement provided", function(){
	  var doc = $(document.documentElement).addClass(className)
	  expect(doc).toHaveClass(className)
	  doc.removeClass(className)
	  expect(doc).not.toHaveClass(className)
	})
  })

  describe("toHaveAttr", function() {
    var attributeName = 'attr1'
    var attributeValue = 'attr1 value'
    var wrongAttributeName = 'wrongName'
    var wrongAttributeValue = 'wrong value'

    beforeEach(function() {
      var attributes = {}
      attributes[attributeName] = attributeValue
      setFixtures(sandbox(attributes))
    })

    describe("when only attribute name is provided", function() {
      it("should pass if element has matching attribute", function() {
        expect($('#sandbox')).toHaveAttr(attributeName)
        expect($('#sandbox').get(0)).toHaveAttr(attributeName)
      })

      it("should pass negated if element has no matching attribute", function() {
        expect($('#sandbox')).not.toHaveAttr(wrongAttributeName)
        expect($('#sandbox').get(0)).not.toHaveAttr(wrongAttributeName)
      })
    })

    describe("when both attribute name and value are provided", function() {
      it("should pass if element has matching attribute with matching value", function() {
        expect($('#sandbox')).toHaveAttr(attributeName, attributeValue)
        expect($('#sandbox').get(0)).toHaveAttr(attributeName, attributeValue)
      })

      it("should pass negated if element has matching attribute but with wrong value", function() {
        expect($('#sandbox')).not.toHaveAttr(attributeName, wrongAttributeValue)
        expect($('#sandbox').get(0)).not.toHaveAttr(attributeName, wrongAttributeValue)
      })

      it("should pass negated if element has no matching attribute", function() {
        expect($('#sandbox')).not.toHaveAttr(wrongAttributeName, attributeValue)
        expect($('#sandbox').get(0)).not.toHaveAttr(wrongAttributeName, attributeValue)
      })
    })
  })

  describe("toHaveProp", function() {
      var propertyName = 'prop1'
      var propertyValue = 'prop1 value'
      var wrongPropertyName = 'wrongName'
      var wrongPropertyValue = 'wrong value'

      beforeEach(function() {
        setFixtures(sandbox())
        var element = $('#sandbox')[0]
        element[propertyName] = propertyValue
      })

      describe("when only property name is provided", function() {
        it("should pass if element has matching property", function() {
          expect($('#sandbox')).toHaveProp(propertyName)
        })

        it("should pass negated if element has no matching property", function() {
          expect($('#sandbox')).not.toHaveProp(wrongPropertyName)
        })
      })

      describe("when both property name and value are provided", function() {
        it("should pass if element has matching property with matching value", function() {
          expect($('#sandbox')).toHaveProp(propertyName, propertyValue)
        })

        it("should pass negated if element has matching property but with wrong value", function() {
          expect($('#sandbox')).not.toHaveProp(propertyName, wrongPropertyValue)
        })

        it("should pass negated if element has no matching property", function() {
          expect($('#sandbox')).not.toHaveProp(wrongPropertyName, propertyValue)
        })
      })
  })

  describe("toHaveCss", function(){
    beforeEach(function(){
      setFixtures(sandbox())
    })

    it("should pass if the element has matching css", function(){
      $("#sandbox").css("display", "none")
      $("#sandbox").css("margin", "10px")
      expect($("#sandbox")).toHaveCss({display: "none", margin: "10px"})
    })

    it("should be able to check a subset of element's css", function(){
      $("#sandbox").css("display", "none")
      $("#sandbox").css("margin", "10px")
      expect($("#sandbox")).toHaveCss({margin: "10px"})
    })

    it("should fail if the element doesn't have matching css", function(){
      $("#sandbox").css("display", "none")
      $("#sandbox").css("margin", "20px")
      expect($("#sandbox")).not.toHaveCss({display: "none", margin: "10px"})
    })
  })

  describe("toHaveId", function() {
    beforeEach(function() {
      setFixtures(sandbox())
    })

    it("should pass if id attribute matches expectation", function() {
      expect($('#sandbox')).toHaveId('sandbox')
      expect($('#sandbox').get(0)).toHaveId('sandbox')
    })

    it("should pass negated if id attribute does not match expectation", function() {
      expect($('#sandbox')).not.toHaveId('wrongId')
      expect($('#sandbox').get(0)).not.toHaveId('wrongId')
    })

    it("should pass negated if id attribute is not present", function() {
      expect($('<div />')).not.toHaveId('sandbox')
      expect($('<div />').get(0)).not.toHaveId('sandbox')
    })
  })

  describe("toHaveHtml", function() {
    var html = '<div>some text</div>'
    var wrongHtml = '<span>some text</span>'
    var element

    beforeEach(function() {
      element = $('<div/>').append(html)
    })

    it("should pass when html matches", function() {
      expect(element).toHaveHtml(html)
      expect(element.get(0)).toHaveHtml(html)
    })

    it("should pass negated when html does not match", function() {
      expect(element).not.toHaveHtml(wrongHtml)
      expect(element.get(0)).not.toHaveHtml(wrongHtml)
    })
  })

  describe("toContainHtml", function(){
    beforeEach(function(){
      setFixtures(sandbox())
    })

    it("should pass when the element contains given html", function(){
      $("#sandbox").html("<div><ul></ul><h1>foo</h1></div>")
      expect($("#sandbox")).toContainHtml("<ul></ul>")
    })

    it("should fail when the element doesn't contain given html", function(){
      $("#sandbox").html("<div><h1>foo</h1></div>")
      expect($("#sandbox")).not.toContainHtml("<ul></ul>")
    })
  })

  describe("toHaveText", function() {
    var text = 'some text'
    var wrongText = 'some other text'
    var element

    beforeEach(function() {
      element = $('<div/>').append(text)
    })

    it("should pass when text matches", function() {
      expect(element).toHaveText(text)
      expect(element.get(0)).toHaveText(text)
    })

    it("should ignore surrounding whitespace", function() {
      element = $('<div>\n' + text + '\n</div>')
      expect(element).toHaveText(text)
      expect(element.get(0)).toHaveText(text)
    })

    it("should pass negated when text does not match", function() {
      expect(element).not.toHaveText(wrongText)
      expect(element.get(0)).not.toHaveText(wrongText)
    })

    it('should pass when text matches a regex', function() {
      expect(element).toHaveText(/some/)
      expect(element.get(0)).toHaveText(/some/)
    })

    it('should pass negated when text does not match a regex', function() {
      expect(element).not.toHaveText(/other/)
      expect(element.get(0)).not.toHaveText(/other/)
    })
  })

  describe("toHaveValue", function() {
    var value = 'some value'
    var differentValue = 'different value'

    beforeEach(function() {
      setFixtures($('<input id="sandbox" type="text" />').val(value))
    })

    it("should pass if value matches expectation", function() {
      expect($('#sandbox')).toHaveValue(value)
      expect($('#sandbox').get(0)).toHaveValue(value)
    })

    it("should pass negated if value does not match expectation", function() {
      expect($('#sandbox')).not.toHaveValue(differentValue)
      expect($('#sandbox').get(0)).not.toHaveValue(differentValue)
    })

    it("should pass negated if value attribute is not present", function() {
      expect(sandbox()).not.toHaveValue(value)
      expect(sandbox().get(0)).not.toHaveValue(value)
    })
  })

  describe("toHaveData", function() {
    var key = 'some key'
    var value = 'some value'
    var wrongKey = 'wrong key'
    var wrongValue = 'wrong value'

    beforeEach(function() {
      setFixtures(sandbox().data(key, value))
    })

    describe("when only key is provided", function() {
      it("should pass if element has matching data key", function() {
        expect($('#sandbox')).toHaveData(key)
        expect($('#sandbox').get(0)).toHaveData(key)
      })

      it("should pass negated if element has no matching data key", function() {
        expect($('#sandbox')).not.toHaveData(wrongKey)
        expect($('#sandbox').get(0)).not.toHaveData(wrongKey)
      })
    })

    describe("when both key and value are provided", function() {
      it("should pass if element has matching key with matching value", function() {
        expect($('#sandbox')).toHaveData(key, value)
        expect($('#sandbox').get(0)).toHaveData(key, value)
      })

      it("should pass negated if element has matching key but with wrong value", function() {
        expect($('#sandbox')).not.toHaveData(key, wrongValue)
        expect($('#sandbox').get(0)).not.toHaveData(key, wrongValue)
      })

      it("should pass negated if element has no matching key", function() {
        expect($('#sandbox')).not.toHaveData(wrongKey, value)
        expect($('#sandbox').get(0)).not.toHaveData(wrongKey, value)
      })
    })
  })

  describe("toBeVisible", function() {
    it("should pass on visible element", function() {
      setFixtures(sandbox())
      expect($('#sandbox')).toBeVisible()
      expect($('#sandbox').get(0)).toBeVisible()
    })

    it("should pass negated on hidden element", function() {
      setFixtures(sandbox().hide())
      expect($('#sandbox')).not.toBeVisible()
      expect($('#sandbox').get(0)).not.toBeVisible()
    })
  })

  describe("toBeHidden", function() {
    it("should pass on hidden element", function() {
      setFixtures(sandbox().hide())
      expect($('#sandbox')).toBeHidden()
      expect($('#sandbox').get(0)).toBeHidden()
    })

    it("should pass negated on visible element", function() {
      setFixtures(sandbox())
      expect($('#sandbox')).not.toBeHidden()
      expect($('#sandbox').get(0)).not.toBeHidden()
    })
  })

  describe("toBeSelected", function() {
    beforeEach(function() {
      setFixtures('\
        <select>\n\
          <option id="not-selected"></option>\n\
          <option id="selected" selected="selected"></option>\n\
        </select>')
    })

    it("should pass on selected element", function() {
      expect($('#selected')).toBeSelected()
      expect($('#selected').get(0)).toBeSelected()
    })

    it("should pass negated on not selected element", function() {
      expect($('#not-selected')).not.toBeSelected()
      expect($('#not-selected').get(0)).not.toBeSelected()
    })
  })

  describe("toBeChecked", function() {
    beforeEach(function() {
      setFixtures('\
        <input type="checkbox" id="checked" checked="checked" />\n\
        <input type="checkbox" id="not-checked" />')
    })

    it("should pass on checked element", function() {
      expect($('#checked')).toBeChecked()
      expect($('#checked').get(0)).toBeChecked()
    })

    it("should pass negated on not checked element", function() {
      expect($('#not-checked')).not.toBeChecked()
      expect($('#not-checked').get(0)).not.toBeChecked()
    })
  })

  describe("toBeEmpty", function() {
    it("should pass on empty element", function() {
      setFixtures(sandbox())
      expect($('#sandbox')).toBeEmpty()
      expect($('#sandbox').get(0)).toBeEmpty()
    })

    it("should pass negated on element with a tag inside", function() {
      setFixtures(sandbox().html($('<span />')))
      expect($('#sandbox')).not.toBeEmpty()
      expect($('#sandbox').get(0)).not.toBeEmpty()
    })

    it("should pass negated on element with text inside", function() {
      setFixtures(sandbox().text('some text'))
      expect($('#sandbox')).not.toBeEmpty()
      expect($('#sandbox').get(0)).not.toBeEmpty()
    })
  })

  describe("toExist", function() {
    it("should pass on visible element", function() {
      setFixtures(sandbox())
      expect($('#sandbox')).toExist()
      expect($('#sandbox').get(0)).toExist()
    })

    it("should pass on hidden element", function() {
      setFixtures(sandbox().hide())
      expect($('#sandbox')).toExist()
      expect($('#sandbox').get(0)).toExist()
    })

    it("should pass negated if element is not present in DOM", function() {
      expect($('#non-existent-element')).not.toExist()
      expect($('#non-existent-element').get(0)).not.toExist()
    })

    it("should pass on negated removed element", function(){
      setFixtures(sandbox())
      var el = $("#sandbox")
      el.remove()
      expect(el).not.toExist()
    })
  })

  describe("toBe", function() {
    beforeEach(function() {
      setFixtures(sandbox())
    })

    it("should pass if object matches selector", function() {
      expect($('#sandbox')).toBe('#sandbox')
      expect($('#sandbox').get(0)).toBe('#sandbox')
    })

    it("should pass negated if object does not match selector", function() {
      expect($('#sandbox')).not.toBe('#wrong-id')
      expect($('#sandbox').get(0)).not.toBe('#wrong-id')
    })
  })

  describe("toContain", function() {
    beforeEach(function() {
      setFixtures(sandbox().html('<span />'))
    })

    it("should pass if object contains selector", function() {
      expect($('#sandbox')).toContain('span')
      expect($('#sandbox').get(0)).toContain('span')
    })

    it("should pass negated if object does not contain selector", function() {
      expect($('#sandbox')).not.toContain('div')
      expect($('#sandbox').get(0)).not.toContain('div')
    })
  })

  describe("toBeDisabled", function() {
    beforeEach(function() {
      setFixtures('\
        <input type="text" disabled="disabled" id="disabled"/>\n\
        <input type="text" id="enabled"/>')
    })

    it("should pass on disabled element", function() {
      expect($('#disabled')).toBeDisabled()
      expect($('#disabled').get(0)).toBeDisabled()
    })

    it("should pass negated on not selected element", function() {
      expect($('#enabled')).not.toBeDisabled()
      expect($('#enabled').get(0)).not.toBeDisabled()
    })
  })

  describe("toBeFocused", function() {

    beforeEach(function() {
      setFixtures('<input type="text" id="focused"/>')
    })

    it("should pass on focused element", function() {
      expect($('#focused').focus()).toBeFocused()
    })

    it("should pass negated on not focused element", function() {
      expect($('#focused')).not.toBeFocused()
    })

  })

  describe('toHaveBeenTriggeredOn', function() {
    beforeEach(function() {
      setFixtures(sandbox().html('<a id="clickme">Click Me</a> <a id="otherlink">Other Link</a>'))
      spyOnEvent($('#clickme'), 'click')
      spyOnEvent($('#otherlink'), 'click')
    })

    it('should pass if the event was triggered on the object', function() {
      $('#clickme').click()
      expect('click').toHaveBeenTriggeredOn($('#clickme'))
      expect('click').toHaveBeenTriggeredOn('#clickme')
    })

    it('should pass negated if the event was never triggered', function() {
      expect('click').not.toHaveBeenTriggeredOn($('#clickme'))
      expect('click').not.toHaveBeenTriggeredOn('#clickme')
    })

    it('should pass negated if the event was triggered on another non-descendant object', function() {
      $('#otherlink').click()
      expect('click').not.toHaveBeenTriggeredOn($('#clickme'))
      expect('click').not.toHaveBeenTriggeredOn('#clickme')
    })
  })

  describe('toHaveBeenTriggered', function() {
    var spyEvents = {}
    beforeEach(function() {
      setFixtures(sandbox().html('<a id="clickme">Click Me</a> <a id="otherlink">Other Link</a>'))
      spyEvents['#clickme'] = spyOnEvent($('#clickme'), 'click')
      spyEvents['#otherlink'] = spyOnEvent($('#otherlink'), 'click')
    })

    it('should pass if the event was triggered on the object', function() {
      $('#clickme').click()
      expect(spyEvents['#clickme']).toHaveBeenTriggered()
    })

    it('should pass negated if the event was never triggered', function() {
      expect(spyEvents['#clickme']).not.toHaveBeenTriggered()
    })

    it('should pass negated if the event was triggered on another non-descendant object', function() {
      $('#otherlink').click()
      expect(spyEvents['#clickme']).not.toHaveBeenTriggered()
    })

    it('should pass negated if the spy event was reset', function(){
      $('#clickme').click()
      expect('click').toHaveBeenTriggeredOn($('#clickme'))
      expect('click').toHaveBeenTriggeredOn('#clickme')
      expect(spyEvents['#clickme']).toHaveBeenTriggered()
      spyEvents['#clickme'].reset()
      expect('click').not.toHaveBeenTriggeredOn($('#clickme'))
      expect('click').not.toHaveBeenTriggeredOn('#clickme')
      expect(spyEvents['#clickme']).not.toHaveBeenTriggered()
    })
  })

  describe('toHaveBeenPreventedOn', function() {
    beforeEach(function() {
      setFixtures(sandbox().html('<a id="clickme">Click Me</a> <a id="otherlink">Other Link</a>'))
      spyOnEvent($('#clickme'), 'click')
      spyOnEvent($('#otherlink'), 'click')
    })

    it('should pass if the event was prevented on the object', function() {
      $('#clickme').bind('click', function(event) {
        event.preventDefault()
      })
      $('#clickme').click()
      expect('click').toHaveBeenPreventedOn($('#clickme'))
      expect('click').toHaveBeenPreventedOn('#clickme')
    })

    it('should pass negated if the event was never prevented', function() {
      $('#clickme').click()
      expect('click').not.toHaveBeenPreventedOn($('#clickme'))
      expect('click').not.toHaveBeenPreventedOn('#clickme')
    })

    it('should pass negated if the event was prevented on another non-descendant object', function() {
      $('#otherlink').bind('click', function(event) {
        event.preventDefault()
      })
      $('#clickme').click()
      expect('click').not.toHaveBeenPreventedOn($('#clickme'))
    })
  })

  describe('toHaveBeenPrevented', function() {
    var spyEvents = {}
    beforeEach(function() {
      setFixtures(sandbox().html('<a id="clickme">Click Me</a> <a id="otherlink">Other Link</a>'))
      spyEvents['#clickme'] = spyOnEvent($('#clickme'), 'click')
      spyEvents['#otherlink'] = spyOnEvent($('#otherlink'), 'click')
    })

    it('should pass if the event was prevented on the object', function() {
      $('#clickme').bind('click', function(event) {
        event.preventDefault()
      })
      $('#clickme').click()
      expect(spyEvents['#clickme']).toHaveBeenPrevented()
    })

    it('should pass negated if the event was never prevented', function() {
      $('#clickme').click()
      expect(spyEvents['#clickme']).not.toHaveBeenPrevented()
    })

    it('should pass negated if the event was prevented on another non-descendant object', function() {
      $('#otherlink').bind('click', function(event) {
        event.preventDefault()
      })
      $('#clickme').click()
      expect(spyEvents['#clickme']).not.toHaveBeenPrevented()
    })

  })

  describe('toHandle', function() {
    var handler
    beforeEach(function() {
      setFixtures(sandbox().html('<a id="clickme">Click Me</a> <a id="otherlink">Other Link</a>'))
      handler = function(){ }; // noop
    })

    it("should handle events on the window object", function(){
      $(window).bind("resize", handler)
      expect($(window)).toHandle("resize")
    })

    it('should pass if the event is bound', function() {
      $('#clickme').bind("click", handler)
      expect($('#clickme')).toHandle("click")
      expect($('#clickme').get(0)).toHandle("click")
    })
    
    it('should pass if the event is not bound', function() {
      expect($('#clickme')).not.toHandle("click")
      expect($('#clickme').get(0)).not.toHandle("click")
    })
    
    it('should pass if the namespaced event is bound', function(){
      $('#clickme').bind("click", handler); //another event for the click array
      $('#clickme').bind("click.NameSpace", handler)
      expect($('#clickme')).toHandle("click.NameSpace")
    })

    it('should not fail when events is empty', function() {
      $('#clickme').change(function() { })
      expect($('#clickme')).not.toHandle('click')
    })
  
    it('should recognize an event with multiple namespaces', function(){
      $('#clickme').bind("click.NSone.NStwo.NSthree", handler)
      expect($('#clickme')).toHandle("click.NSone")
      expect($('#clickme')).toHandle("click.NStwo")
      expect($('#clickme')).toHandle("click.NSthree")
      expect($('#clickme')).toHandle("click.NSthree.NStwo")
      expect($('#clickme')).toHandle("click.NStwo.NSone")
      expect($('#clickme')).toHandle("click")
    })

    it('should pass if a namespaced event is not bound', function() {
      $('#clickme').bind("click", handler); //non namespaced event
      $('#clickme').bind("click.OtherNameSpace", handler); //different namespaced event
      expect($('#clickme')).not.toHandle("click.NameSpace")
    })

    it('should handle event on any object', function(){
      var object = new function(){ }; // noop
      $(object).bind('click', function(){})
      expect($(object)).toHandle('click')
    })
  })
  
  describe('toHandleWith', function() {
    beforeEach(function() {
      setFixtures(sandbox().html('<a id="clickme">Click Me</a> <a id="otherlink">Other Link</a>'))
    })

    it('should pass if the event is bound with the given handler', function() {
      var handler = function(){ }; // noop
      $('#clickme').bind("click", handler)
      expect($('#clickme')).toHandleWith("click", handler)
      expect($('#clickme').get(0)).toHandleWith("click", handler)
    })
    
    it('should pass if the event is not bound with the given handler', function() {
      var handler = function(){ }
      $('#clickme').bind("click", handler)
      
      var aDifferentHandler = function(){ }
      expect($('#clickme')).not.toHandleWith("click", aDifferentHandler)
      expect($('#clickme').get(0)).not.toHandleWith("click", aDifferentHandler)
    })
    
    it('should pass if the event is not bound at all', function() {
      expect($('#clickme')).not.toHandle("click")
      expect($('#clickme').get(0)).not.toHandle("click")
    })

    it("should pass if the event on window is bound with the given handler", function(){
      var handler = function(){ }
      $(window).bind("resize", handler)
      expect($(window)).toHandleWith("resize", handler)
    })

    it("should pass if the event on any object is bound with the given handler", function(){
      var object = new function(){ }; // noop
      var handler = function(){ }
      $(object).bind('click', handler)
      expect($(object)).toHandleWith('click', handler)
    })
  })
}