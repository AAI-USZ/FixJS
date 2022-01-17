function() {

var el, res, sel, val,
    options = {
        asHtmlID: 'autosuggest',
        selectedItemProp: "name",
        searchObjProps: "name"
    },
    data = [
        {value: "21", name: "Mick Jagger"},
        {value: "43", name: "Johnny Storm"},
        {value: "46", name: "Richard Hatch"},
        {value: "54", name: "Kelly Slater"},
        {value: "55", name: "Rudy Hamilton"},
        {value: "79", name: "Michael Jordan"},
        {value: "76", name: "姚明"}
    ],
    keyCode = {
        DEL:    8,
        TAB:    9,
        ENTER:  13,
        ESC:    27,
        UP:     38,
        DOWN:   40,
        J:      74,
        COMMA:  188
    };

function create(d, opts) {
    data = d || data;
    options = opts || options;

    return $('<input type="text" name="autosuggest" value=""></input>')
        .appendTo("#container").autoSuggest(data, options);
}

function selections() {
    return $("#as-selections-autosuggest li.as-selection-item");
}

function results() {
    return $("#as-results-autosuggest li.as-result-item");
}

function value() {
    return $("#as-values-autosuggest");
}

function remove() {
    $("#as-results-autosuggest, #as-selections-autosuggest").remove();
}

function debug() {
    window.console && console.debug.apply(console, arguments);
}

module("AutoSuggest TestCases");

test("Type J and select \"Michael Jordan\"", function() {
    el = create();
    // Type "J"
    // NOTE: Keydown event does not actually change the value of input,
    // You have to do this manually, and trigger the event later.
    el.focus();
    el.val("J");
    el.simulate("keydown", {"keyCode": keyCode.J});

    // Wait for building results
    stop();
    setTimeout(function() {
        // Here goes three suggestions
        res = results();
        equals(res.length, 3, "Should suggest three names");
        equals($(res[0]).text(), "Mick Jagger", "Should be Mick Jagger");
        equals($(res[1]).text(), "Johnny Storm", "Should be Johnny Storm");
        equals($(res[2]).text(), "Michael Jordan", "Should be Michael Jordan");

        // Select Michael Jordan
        $(res[2]).simulate("click");
        sel = selections();
        equals(sel.length, 1, "Should have one name");
        equals($(sel[0]).text(), "×Michael Jordan", "Should be Michael Jordan");
        equals($(sel[0]).attr('data-value'), "79", "Should set data-value on selection");
        equals(value().val(), ",79,", "Should be 79");

        start();
        remove();
    }, 500);
});

test("Type \"Yao Ming\" and select it by COMMA", function() {
    el = create();
    // Type "Yap Ming" and ","
    el.focus();
    el.val("Yao Ming");
    el.simulate("keydown", {"keyCode": keyCode.COMMA});

    sel = selections();
    equals(sel.length, 1, "Should have one name");
    equals($(sel[0]).text(), "×Yao Ming", "Should be Yao Ming");
    equals(value().val(), ",Yao Ming,", "Should be Yao Ming");
    remove();
});

test("Type \"Yao Ming\" and select it by TAB", function() {
    el = create();
    // Type "Yap Ming" and "\t"
    el.focus();
    el.val("Yao Ming");
    el.simulate("keydown", {"keyCode": keyCode.TAB});

    sel = selections();
    equals(sel.length, 1, "Should have one name");
    equals($(sel[0]).text(), "×Yao Ming", "Should be Yao Ming");
    equals(value().val(), ",Yao Ming,", "Should be Yao Ming");
    remove();
});

test("Press enter to select suggestion", function() {
    el = create();

    el.focus();
    el.val("J");
    el.simulate("keydown", {"keyCode": keyCode.J});

    stop();
    setTimeout(function() {
        res = results();

        // Mouse over the suggestion
        $(res[1]).simulate("mouseover");
        ok($(res[1]).hasClass("active"), "Should be highlighted");

        // Press enter key to select it
        el.simulate("keydown", {"keyCode": keyCode.ENTER});

        sel = selections();
        equals(sel.length, 1, "Should have one name");
        equals($(sel[0]).text(), "×Johnny Storm", "Should be Johnny Storm");
        equals(value().val(), ",43,", "Should be 43");

        start();
        remove();
    }, 500);
});

test("Press arrow keys to move the selection up and down", function() {
    el = create();

    el.focus();
    el.val("J");
    el.simulate("keydown", {"keyCode": keyCode.J});

    stop();
    setTimeout(function() {
        res = results();

        // Move down to first suggest result
        el.simulate("keydown", {"keyCode": keyCode.DOWN});
        ok($(res[0]).hasClass('active'), "Should be highlighted");

        // Move down to last suggest result
        el.simulate("keydown", {"keyCode": keyCode.DOWN});
        el.simulate("keydown", {"keyCode": keyCode.DOWN});
        ok($(res[2]).hasClass("active"), "Should be highlighted");

        // None of results should be highlighted
        el.simulate("keydown", {"keyCode": keyCode.DOWN});
        $.each(res, function() {
            ok(!$(this).hasClass("active"), "Should not be highlighted");
        });

        // Move back to first suggest result
        el.simulate("keydown", {"keyCode": keyCode.DOWN});
        ok($(res[0]).hasClass('active'), "Should be highlighted");

        // Now we move up...
        el.simulate("keydown", {"keyCode": keyCode.UP});
        $.each(res, function() {
            ok(!$(this).hasClass("active"), "Should not be highlighted");
        });

        // Move back to last suggest result
        el.simulate("keydown", {"keyCode": keyCode.UP});
        ok($(res[2]).hasClass("active"), "Should be highlighted");

        start();
        remove();
    }, 500);
});

test("Click close button to remove a name", function() {
    el = create();

    el.focus();
    el.val("Yao Ming");
    el.simulate("keydown", {"keyCode": keyCode.TAB});

    sel = selections();
    equals(sel.length, 1, "Should have one name");

    // Click the close button
    $(sel[0]).find("a.as-close").simulate("click");

    sel = selections();
    equals(sel.length, 0, "Should have no name left");
    equals(value().val(), ",", "Should have no name left");
    remove();
});

test("Press delete key twice to remove a name", function() {
    el = create();

    el.focus();
    el.val("Yao Ming");
    el.simulate("keydown", {"keyCode": keyCode.COMMA});

    sel = selections();
    equals(sel.length, 1, "Should have one name");

    // First time press delete key
    el.simulate("keydown", {"keyCode": keyCode.DEL});

    sel = selections();
    ok($(sel[0]).hasClass("selected"), "Should be selected");

    // Second time press delete key
    el.simulate("keydown", {"keyCode": keyCode.DEL});

    sel = selections();
    equals(sel.length, 0, "Should have no name left");
    equals(value().val(), ",", "Should have no name left");
    remove();
});

test("Use function for data source", function() {
    var wasCalled = false;
    function get_data(query, next) {
        wasCalled = true;
        next([{value: '123', name: 'zzzfffgg'}], query);
    }

    el = $('<input type="text" name="autosuggest" value=""></input>')
        .appendTo("#container").autoSuggest(get_data, options);

    el.focus();
    el.val("Y")
    el.simulate("keydown", {"keyCode": keyCode.Y});
    stop();
    setTimeout(function() {
      equals(wasCalled, true, "Was the callback called?");
      start();
      remove();
    }, 500);
});

test("Add and remove from code", function() {
    var callbacks;
    var opts = $.extend({}, options, {
        start: function(_callbacks) {
            callbacks = _callbacks;
        }
    });
    el = create('', opts);

    callbacks.add(data[0]);
    equals(selections().length, 1, "Should select using a callback.");

    callbacks.remove(data[1].value);
    equals(selections().length, 1, "Should not remove anything when unselected value is removed.");

    callbacks.remove(data[0].value);
    equals(selections().length, 0, "Should remove using a callback.");
});

test("Add extraParams with function (instead of ONLY a string)", function() {


    $('#container').append('<input type="checkbox" id="test-as-location" value="1" checked="checked" />');

    var opts = $.extend({}, options, {
        extraParams: function()
        {
            var checked = $('#test-as-location').is(':checked') ? 1 : 0;
            return '&specific_location=' + checked;
        }
    });

    var old_getJSON = $.getJSON;

    $.getJSON = function(url){
        equals(url, "data.html?q=J&specific_location=1");
        return old_getJSON.apply(this, arguments);
    }

    stop();

    $(document).bind('ajaxStop.extraParams', function(){
        start();
        // Restore it for later tests.
        $.getJSON = old_getJSON
        // Cleanup
        remove();
        $('#test-as-location').remove();
        $(document).unbind('ajaxStop.extraParams');
    });

    el = create('data.html', opts);

    el.focus();
    el.val("J");
    el.simulate("keydown", {"keyCode": keyCode.J});





});

test("Type \"Yao Ming\" but press ESC. No value should be selected.", function() {
    el = create();
    // Type "Yap Ming" and ","
    el.focus();
    el.val("Yao Ming");
    el.simulate("keydown", {"keyCode": keyCode.ESC});

    sel = selections();
    equals(sel.length, 0, "Should have no name");
    remove();
});

/**
 * XSS Check
 * 
 * This checks if the plugin works correctly with values which contains special 
 * html chairs like ", <, > or &.
 * Both situations (unescaped content from the server and unescaped content 
 * from the user) have to be handled the right way.
 * 
 * The injected code itself will store an single unique information right 
 * into the element's dataset under the key name "test". 
 */
test("XSS: Type a complete injectable fragment. The selection have to be selected, but no execution is allowed due XSS problems.", function() {
    var xssString = "\"><script type=\"text/javascript\">$('#autosuggest').data({test:'Injection works :('})</script>";
    el = create();

    el.data('test', 'No injection :)');
    equals($('#autosuggest').data('test'), 'No injection :)', "Element's injection marker should be initial.");

    el.focus();
    el.val(xssString);
    el.simulate("keydown", {"keyCode": keyCode.COMMA});

    var sel = selections();
    equals(sel.length, 1, "Should have one value");
    equals(el.data('test'), 'No injection :)', "The injected should not be executed. It must NEVER happen.");
    equals($(sel[0]).text(), "×"+xssString, "Should be the string with special chars");
    equals(value().val(), ","+xssString+",", "Should be the correct id.");
    remove();
});

/**
 * XSS
 *
 * This checks if the plugin works correctly with values which contains special 
 * html chairs like ", <, > or &.
 * Both situations (unescaped content from the server and unescaped content 
 * from the user) have to be handled the right way.
 * 
 * The injected code itself will store an single unique information right 
 * into the element's dataset under the key name "test". 
 */
test("XSS: Type \"script\" to match an injectable fragment. The selection have to be selected, but no execution is allowed due XSS problems.", function() {
    var xssString = "\"><script type=\"text/javascript\">$('#autosuggest').data({test:'Injection works :('})</script>";
    var xssId = "4711"
    var el = create([{value : xssId, name : xssString}]);

    el.data('test', 'No injection :)');
    equals($('#autosuggest').data('test'), 'No injection :)', "Element's injection marker should be initial.");

    el.focus();
    el.val("script");

    // Wait for building results
    stop();

    setTimeout(function(){
        var res = results();
        equals(res.length, 1, "Should suggest one value.");
        equals($(res[0]).text(), xssString, "Should be the injectable code.");

        el.simulate("keydown", {"keyCode": keyCode.DOWN});
        el.simulate("keydown", {"keyCode": keyCode.ENTER});

        var sel = selections();
        equals(sel.length, 1, "Should have one value");
        equals(el.data('test'), 'No injection :)', "The injected should not be executed. It must NEVER happen.");
        equals($(sel[0]).text(), "×"+xssString, "Should be the string with special chars");
        equals(value().val(), ","+xssId+",", "Should be the correct id.");
        start();
        remove();
    }, 500);
});


/**
 * XSS
 *
 * This checks if the plugin works correctly with values which contains special 
 * html chairs like ", <, > or &.
 * Both situations (unescaped content from the server and unescaped content 
 * from the user) have to be handled the right way.
 * 
 * The injected code itself will store an single unique information right 
 * into the element's dataset under the key name "test". 
 */
test("XSS: Type \"\\\">\" to match an injectable fragment. The selection have to be selected, but no execution is allowed due XSS problems.", function() {
    var xssString = "\"><script type=\"text/javascript\">$('#autosuggest').data({test:'Injection works :('})</script>";
    var xssSelectionEscaped = '<em>\"&gt;&lt;</em>script type=\"text/javascript\"&gt;$(\'#autosuggest\').data({test:\'Injection works :(\'})&lt;/script&gt;';
    var xssId = "4711";
    var query = "\"><";
    var queryEscaped = $('<span/>').text(query).html();
    var el = create([{value : xssId, name : xssString}]);

    el.data('test', 'No injection :)');
    equals($('#autosuggest').data('test'), 'No injection :)', "Element's injection marker should be initial.");

    el.focus();
    el.val(query);

    // Wait for building results
    stop();

    setTimeout(function(){
        var res = results();
        equals(res.length, 1, "Should suggest one value.");
        equals($(res[0]).html(), xssSelectionEscaped, "Should be the injectable code.");

        el.simulate("keydown", {"keyCode": keyCode.DOWN});
        el.simulate("keydown", {"keyCode": keyCode.ENTER});

        var sel = selections();
        equals(sel.length, 1, "Should have one value");
        equals(el.data('test'), 'No injection :)', "The injected should not be executed. It must NEVER happen.");
        equals($(sel[0]).text(), "×"+xssString, "Should be the string with special chars");
        equals(value().val(), ","+xssId+",", "Should be the correct id.");
        start();
        remove();
    }, 500);
});

/**
 * Extended test case with a custom html renderer.
 */
test("Extended example", function() {
    var data = [{
        value : '4711', 
        img : 'john.png',
        name : 'John Doe'
    }];
    var opts = {
        asHtmlID: 'autosuggest', 
        selectedItemProp: "name", 
        searchObjProps: "name",
        formatList : function(data, elem) {
            return elem.append('<div><img src="'+data.img+'"/><span>'+data.name+'</span></div>');
        }
    };
    var query = 'Doe';
    el = create(data, opts);

    el.focus();
    el.val(query);

    // Wait for building results
    stop();

    setTimeout(function(){
        var res = results();
        equals(res.length, 1, "Should suggest one value.");
        equals($(res[0]).html(), '<div><img src="john.png"><span>John <em>Doe</em></span></div>', "Should be rendered output.");

        el.simulate("keydown", {"keyCode": keyCode.DOWN});
        el.simulate("keydown", {"keyCode": keyCode.ENTER});

        var sel = selections();
        equals(sel.length, 1, "Should have one value");
        equals($(sel[0]).text(), '×John Doe', "Should be John Doe.");
        equals(value().val(), ",4711,", "Should be 4711.");
        start();
        remove();
    }, 500);
});


/**
 * Extended test case with a custom html renderer and a prefilled entry.
 */
test("Extended example with Prefill", function() {
    var data = [{
        value : '4711', 
        img : 'john.png',
        name : 'John Doe'
    }];
    var opts = {
        asHtmlID: 'autosuggest', 
        selectedItemProp: "name", 
        searchObjProps: "name",
        formatList : function(data, elem) {
            return elem.append('<div><img src="'+data.img+'"/><span>'+data.name+'</span></div>');
        },
        preFill : [{
            value : '123',
            img : 'donald.png',
            name : 'Donald Duck'
        }]
    };
    var query = 'Doe';
    el = create(data, opts);

	var sel = selections();
    equals(sel.length, 1, "Prefill: The number of selections should be exactly one.");
    equals(value().val(), ",123,", "Prefill: Value should be 123.");

    el.focus();
    el.val(query);

    // Wait for building results
    stop();

    setTimeout(function(){
        var res = results();
        equals(res.length, 1, "Should suggest one value.");
        equals($(res[0]).html(), '<div><img src="john.png"><span>John <em>Doe</em></span></div>', "Should be rendered output.");

        el.simulate("keydown", {"keyCode": keyCode.DOWN});
        el.simulate("keydown", {"keyCode": keyCode.ENTER});

        sel = selections();
        equals(sel.length, 2, "Should have two values");
        equals($(sel[0]).text(), '×Donald Duck', "#1 should be Donald Duck.");
        equals($(sel[1]).text(), '×John Doe', "#2 should be John Doe.");
        equals(value().val(), ",123,4711,", "Should be 123,4711.");
        start();
        remove();
    }, 500);
});


/**
 * Extended test case with a custom html renderer and a prefilled entry.
 * Additionally, this customize the selection tokens w/ an additional image.
 */
test("Extended example with Prefill, with image in selection tokens.", function() {
    var renderer = function(data) {
        return $('<div><img src="'+data.img+'" height=16 width=16 style="float:left"/><span>'+data.name+'</span></div>');
    }, applyRenderer = function(data){
        data.item = renderer(data);
        return data;
    };
    var data = [applyRenderer({
        value : '4711', 
        img : 'john.png',
        name : 'John Doe'
    })];
    var opts = {
        asHtmlID: 'autosuggest', 
        selectedItemProp: "item", 
        searchObjProps: "name",
        formatList : function(data, elem) {
            return elem.append(data.item);
        },
        preFill : [applyRenderer({
            value : '123',
            img : 'donald.png',
            name : 'Donald Duck'
        })]
    };
    var query = 'Doe';
    el = create(data, opts);

    var sel = selections();
    equals(sel.length, 1, "Prefill: The number of selections should be exactly one.");
    equals($(sel[0]).html(), '<a class="as-close">×</a><div><img src="donald.png" height="16" width="16" style="float:left"><span>Donald Duck</span></div>', "#1 should be Donald Duck.");
    equals(value().val(), ",123,", "Prefill: Value should be 123.");

    el.focus();
    el.val(query);

    // Wait for building results
    stop();

    setTimeout(function(){
        var res = results();
        equals(res.length, 1, "Should suggest one value.");
        equals($(res[0]).html(), '<div><img src="john.png" height="16" width="16" style="float:left"><span>John <em>Doe</em></span></div>', "Should be rendered output.");

        el.simulate("keydown", {"keyCode": keyCode.DOWN});
        el.simulate("keydown", {"keyCode": keyCode.ENTER});

        sel = selections();
        equals(sel.length, 2, "Should have two values");
        equals($(sel[0]).text(), '×Donald Duck', "#1 should be Donald Duck.");
        equals($(sel[1]).text(), '×John Doe', "#2 should be John Doe.");
        equals(value().val(), ",123,4711,", "Should be 123,4711.");
        start();
        remove();
    }, 500);
});

test("XSS: Extended example with Prefill, with image in selection tokens.", function() {
    var renderer = function(data) {
        var escaped = $('<span/>').text(data.name).html();
        return $('<div><img src="'+data.img+'" height=16 width=16 style="float:left"/><span>'+escaped+'</span></div>');
    }, applyRenderer = function(data){
        data.item = renderer(data);
        return data;
    };
    var data = [applyRenderer({
        value : '4711', 
        img : 'john.png',
        name : "Bad John\"><script type=\"text/javascript\">$('#autosuggest').data({test:'Injection works (John) :('})</script>"
    })];
    var opts = {
        asHtmlID: 'autosuggest', 
        selectedItemProp: "item", 
        searchObjProps: "name",
        formatList : function(data, elem) {
            return elem.append(data.item);
        },
        preFill : [applyRenderer({
            value : '123',
            img : 'donald.png',
            name : "Bad Donald\"><script type=\"text/javascript\">$('#autosuggest').data({test:'Injection works (Donald) :('})</script>"
        })]
    };
    var query = 'john';
    el = create(data, opts);
    el.data('test', 'No injection :)');

    var sel = selections();
    equals(sel.length, 1, "Prefill: The number of selections should be exactly one.");
    equals($(sel[0]).html(), '<a class="as-close">×</a><div><img src="donald.png" height="16" width="16" style="float:left"><span>Bad Donald\"&gt;&lt;script type=\"text/javascript\"&gt;$(\'#autosuggest\').data({test:\'Injection works (Donald) :(\'})&lt;/script&gt;</span></div>', "#1 should be Donald Duck.");
    equals(value().val(), ",123,", "Prefill: Value should be 123.");

    el.focus();
    el.val(query);

    // Wait for building results
    stop();

    setTimeout(function(){
        var res = results();
        equals(res.length, 1, "Should suggest one value.");
        equals($(res[0]).html(), '<div><img src="john.png" height="16" width="16" style="float:left"><span>Bad <em>John</em>\"&gt;&lt;script type=\"text/javascript\"&gt;$(\'#autosuggest\').data({test:\'Injection works (<em>John</em>) :(\'})&lt;/script&gt;</span></div>', "Should be rendered output.");

        el.simulate("keydown", {"keyCode": keyCode.DOWN});
        el.simulate("keydown", {"keyCode": keyCode.ENTER});

        sel = selections();
        equals(el.data('test'), 'No injection :)', "The injected should not be executed. It must NEVER happen.");
        equals(sel.length, 2, "Should have two values");
        equals($(sel[0]).text(), '×Bad Donald\"><script type=\"text/javascript\">$(\'#autosuggest\').data({test:\'Injection works (Donald) :(\'})</script>', "#1 should be Donald Duck.");
        equals($(sel[1]).text(), '×Bad John\"><script type=\"text/javascript\">$(\'#autosuggest\').data({test:\'Injection works (John) :(\'})</script>', "#2 should be John Doe.");
        equals(value().val(), ",123,4711,", "Should be 123,4711.");
        start();
        remove();
    }, 500);
});

}