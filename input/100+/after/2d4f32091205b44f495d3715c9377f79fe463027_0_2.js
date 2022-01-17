function (input) {
    /*
    Each autocomplete instance should have a unique identifier, so that the
    jQuery plugin can keep a registry of instances, but also to compose some
    unique attributes for the generated autocomplete.

    By default, assume that the input has a unique id attribute that can be
    re-used. Otherwise, the jQuery plugin will yell.
    */
    this.id = input.attr('id');

    /*
    The text input element that should have an autocomplete. It should have
    a unique id attribute, or you'd have to override this.id as described
    above.
    */
    this.input = input;

    // The value of the input. It is kept as an attribute for optimisation
    // purposes.
    this.value = '';

    // When the input is empty, show this text.
    this.placeholder = 'type your search here';

    /*
    It is possible to wait until a certain number of characters have been
    typed in the input before making a request to the server, to limit the
    number of requests.

    However, you may want the autocomplete to behave like a select. If you
    want that a simple click shows the autocomplete, set this to 0.
     */
    this.minimumCharacters = 2;

    /*
    The autocomplete should be above any other element in the page. If your
    autocomplete is hidden by another element, overriding this attribute
    could fix it.
     */
    this.autocompleteZIndex = 999999;

    /*
    The autocomplete HTML. Because of CSS limitations, it is wrapped in 3
    divs, the outermost being the 'outer container' and the innermost the
    'inner container'.

    The server-side generate autocomplete HTML will be set in the inner
    container.
     */
    this.autocompleteContainerHtml = [
        '<div id="id-'+this.id+'"',
        'class="yourlabs-autocomplete outer-container id-'+this.id+'"',
        'style="display:none; position:absolute;z-index:',
        this.autocompleteZIndex+';">',
        '   <div class="yourlabs-autocomplete id-'+this.id+'">',
                '<div class="',
                'yourlabs-autocomplete inner-container  id-'+this.id,
                '"',
                'style="display:none;">',
                '</div>',
            '</div>',
        '</div>',
    ].join(' ')

    /*
    The autocomplete is placed in position:absolute. Thus, it doesn't really
    matter where this script appends the autocomplete container.
     */
    this.appendAutocompleteTo = $('body');

    /*
    In a perfect world, we would hide the autocomplete when the input looses
    focus (on blur). But in reality, if the user clicks on a choice, the
    input looses focus, and that would hide the autocomplete, *before* we
    can intercept the click on the choice.

    When the input looses focus, wait for this number of milliseconds before
    hiding the autocomplete.
     */
    this.hideAfter = 500;

    /*
    The server should have a URL that takes the input value, and responds
    with the list of choices as HTML. In most cases, an absolute URL is
    better.
     */
    this.url = false;

    /*
    As the server responds with plain HTML, we need a selector to find the
    choices that it contains.

    For example, if the URL returns an HTML body where every result is in a
    div of class "choice", then this should be set to '.choice'.
     */
    this.choiceSelector = '.choice';

    /*
    When the user hovers a choice, it is nice to hilight it, for
    example by changing it's background color. That's the job of CSS code.

    However, the CSS can not depend on the :hover because the user can
    hilight choices with the keyboard by pressing the up and down
    keys.

    To counter that problem, we specify a particular class that will be set
    on a choice when it's 'hilighted', and unset when it's
    'dehilighted'.
     */
    this.hilightClass = 'hilight';

    /*
    The value of the input is passed to the server via a GET variable. This
    is the name of the variable.
     */
    this.queryVariable = 'q';

    /*
    This dict will also be passed to the server as GET variables.

    If this autocomplete depends on another user defined value, then the
    other user defined value should be set in this dict.

    Consider a country select and a city autocomplete. The city autocomplete
    should only fetch city choices that are in the selected country. To
    achieve this, update the data with the value of the country select:

        $('select[name=country]').change(function() {
            $('city[name=country]').yourlabsAutocomplete().data = {
                country: $(this).val(),
            }
        });
     */
    this.data = {};

    /*
    To avoid several requests to be pending at the same time, the current
    request is aborted before a new one is sent. This attribute will hold the
    current XMLHttpRequest.
     */
    this.xhr = false;

    /*
    fetch() keeps a copy of the data sent to the server in this attribute. This
    avoids double fetching the same autocomplete.
     */
    this.lastData = {};

    /*
    Rather than directly setting up the autocomplete (DOM events etc ...) in
    the constructor, setup is done in this method. This allows to:

    - instanciate an Autocomplete,
    - override attribute/methods of the instance,
    - and *then* setup the instance.
     */
    this.initialize = function() {
        // Selector for choices of this autocomplete.
        this.autocompleteChoiceSelector = [
            '.yourlabs-autocomplete.inner-container.id-' + this.id,
            this.choiceSelector,
        ].join(' ')

        // Selector for hilighted choices of this autocomplete.
        this.hilightedChoiceSelector = [
            this.autocompleteChoiceSelector,
            '.',
            this.hilightClass,
        ].join('')

        // 'this' is going to be out of scope some times, so we reference it in
        // a local variable.
        var autocomplete = this;

        // Append the container HTML somewhere so that it exists in the DOM.
        $(this.autocompleteContainerHtml).appendTo(
            this.appendAutocompleteTo);

        // Cache the references to the container elements for performance.
        this.innerContainer = $('.yourlabs-autocomplete.inner-container.id-'+this.id);
        this.outerContainer = $('.yourlabs-autocomplete.outer-container.id-'+this.id);

        // Set the initial input value using the placeholder string.
        this.input.val(this.placeholder);

        this.input.live({
            // Empty the input if it contains the placeholder string so that
            // the user can type his stuff.
            focus: function() {
                if ($(this).val() == autocomplete.placeholder) {
                    $(this).val('');
                }
            },
            blur: function() {
                // Put the placeholder back in the input when the user leaves the
                // input empty.
                if ($(this).val() == '') {
                    $(this).val(autocomplete.placeholder);
                }

                // And hide the autocomplete after a short while.
                window.setTimeout(function() { autocomplete.hide(); },
                    autocomplete.hideAfter);
            },
            click: function() {
                // Show the autocomplete when the user clicks on the input,
                // assuming it contains enought characters.
                if ($(this).val().length >= autocomplete.minimumCharacters)
                    autocomplete.show();
            }
        });

        /*
        Bind mouse events to fire signals. Because the same signals will be
        sent if the user uses keyboard to work with the autocomplete.
         */
        $(this.autocompleteChoiceSelector).live({
            // When the mouse enters a choice ...
            mouseenter: function(e) {
                // ... the first thing we want is to send the dehilight signal
                // for any hilighted choice ...
                $(autocomplete.hilightedChoiceSelector).each(function() {
                    autocomplete.input.trigger('dehilightChoice',
                        [$(this), autocomplete]);
                });
                // ... and then sent the hilight signal for the choice.
                autocomplete.input.trigger('hilightChoice',
                    [$(this), autocomplete]);
            },
            mouseleave: function(e) {
                // Send dehilightChoice when the mouse leaves a choice.
                autocomplete.input.trigger('dehilightChoice',
                    [$(this), autocomplete]);
            },
            click: function(e) {
                // Send selectChoice when the user clicks on a choice.
                e.preventDefault();
                e.stopPropagation();
                autocomplete.input.trigger('selectChoice',
                    [$(this), autocomplete]);
            },
        });

        // Bind keyup in the input to call this.refresh()
        this.input.keyup(function(e) { autocomplete.refresh(); });

        // Bind keyboard events to call this.keypress(), which handles keyboard
        // navigation.
        if (window.opera) {
            this.input.keypress(function(e) { autocomplete.keypress(e); });
        } else {
            this.input.keydown(function(e) { autocomplete.keypress(e); });
        }
    }

    // This function is in charge of keyboard usage.
    this.keypress = function(e) {
        var choice;

        switch (e.keyCode) {
            // KEY_ESC pressed hide the autocomplete.
            case 27:
                this.hide();
                break;
            // KEY_RETURN or KEY_TAB pressed, trigger select-choice if a
            // choice is hilighted.
            case 9:
            case 13:
                choice = $(this.hilightedChoiceSelector);

                if (choice.length) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.input.trigger('selectChoice',
                        [choice, this]);
                    this.hide();
                }
                break;
            // On KEY_UP, call move()
            case 38:
                this.move('up');
                break;
            // On KEY_DOWN, call move()
            case 40: //KEY_DOWN:
                this.move('down');
                break;
            // Ignore other keypresses.
            default:
                return;
        }

        // We handled our cases, prevent the browser from doing anything
        // unexpected.
        e.stopImmediatePropagation();
        e.preventDefault();
    }

    // This function is in charge of ensuring that a relevant autocomplete is
    // shown.
    this.show = function(html) {
        // First recalculate the absolute position since the autocomplete may
        // have changed position.
        this.fixPosition();

        // If the inner container is empty and there is no current pending
        // request, rely on fetch(), which should show the
        // autocomplete as soon as it's done fetching.
        if ($.trim(this.innerContainer.html()).length == 0 && !this.xhr) {
            this.fetch();
            return;
        }

        // And actually, fetch() will call show() with the response
        // body as argument.
        if (html) {
            this.innerContainer.html(html);
        }

        // Show the inner and outer container only if necessary.
        if (!this.innerContainer.is(':visible')) {
            this.outerContainer.show();
            this.innerContainer.show();
        }
    }

    // This function is in charge of the opposite.
    this.hide = function() {
        this.outerContainer.hide();
        this.innerContainer.hide();
    }

    // This function is in charge of hilighting the right result from keyboard
    // navigation.
    this.move = function(way) {
        // The current choice if any.
        var current = $(this.hilightedChoiceSelector);
        // The first and last choices. If the user presses down on the last
        // choice, then the first one will be hilighted.
        var first = $(this.autocompleteChoiceSelector + ':first');
        var last = $(this.autocompleteChoiceSelector + ':last');

        // The choice that should be hilighted after the move.
        var target;

        // The autocomplete must be shown so that the user sees what choice
        // he is hilighting.
        this.show();

        // If a choice is currently hilighted:
        if (current.length) {
            if (way == 'up') {
                // The target choice becomes the first previous choice.
                target = current.prevAll(this.choiceSelector + ':first');

                // If none, then the last choice becomes the target.
                if (!target.length) target = last;
            } else {
                // The target choice becomes the first  next** choice.
                target = current.nextAll(this.choiceSelector + ':first');

                // If none, then the first choice becomes the target.
                if (!target.length) target = first;
            }

            // Trigger dehilightChoice on the currently hilighted choice.
            this.input.trigger('dehilightChoice',
                [current, this]);
        } else {
            target = way == 'up' ? last : first;
        }

        // Trigger hilightChoice on the target choice.
        this.input.trigger('hilightChoice',
            [target, this]);
    }

    // Calculate and set the outer container's absolute positionning.
    this.fixPosition = function() {
        var css = {
            'top': Math.floor(this.input.offset()['top']),
            'left': Math.floor(this.input.offset()['left']),
            'position': 'absolute',
        }

        css['top'] += Math.floor(this.input.innerHeight());

        this.outerContainer.css(css);
    }

    // Proxy fetch(), with some sanity checks.
    this.refresh = function() {
        // Set the new current value.
        this.value = this.input.val();

        // If the input contains the placehold then abort.
        if (this.value == this.placeholder) return false;

        // If the input doesn't contain enought characters then abort.
        if (this.value.length < this.minimumCharacters) return false;

        // All clear, continue on refreshing the autocomplete.
        this.fetch();
    }

    // Manage requests to this.url.
    this.fetch = function() {
        // Abort any current request.
        if (this.xhr) this.xhr.abort();

        // Again we need this from another scope.
        var autocomplete = this;

        // Add the current value to the data dict.
        this.data[this.queryVariable] = this.value;

        // Ensure that this request is different from the previous one
        changed = false;
        for(var key in this.data) {
            if (!key in this.lastData || this.data[key] != this.lastData[key]) {
                changed = true;
                break;
            }
        }

        if (!changed) return true;

        this.lastData = {};
        for(var key in this.data) {
            this.lastData[key] = this.data[key];
        }

        // Make an asynchronous GET request to this.url.
        this.xhr = $.ajax(this.url, {
            data: this.data,
            complete: function(jqXHR, textStatus) {
                // Update and show the autocomplete.
                autocomplete.show(jqXHR.responseText);
                // Clear the current request keeper.
                autocomplete.xhr = false;
            },
        });
    }
}