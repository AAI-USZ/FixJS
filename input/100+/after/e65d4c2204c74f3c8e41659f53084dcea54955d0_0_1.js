function create_layout() {
    // add left cell
    layout.col_left = create_cell({
        parent : 'body',
        id : 'left-column'
    })
    $(layout.col_left.id).html(
    ' \
        <h1>torch7 ></h1> \
        <ul> \
            <li><a href="http://www.torch.ch" target="_blank">Torch7 Home Page</a></li> \
            <li><a href="http://www.torch.ch/manual/index" target="_blank">Documentation</a></li> \
            <li><a href="https://github.com/andresy/torch" target="_blank">Github</a></li> \
            <li><a href="https://github.com/andresy/torch/issues" target="_blank">Issues</a></li> \
            <li><a href="http://groups.google.com/group/torch7" target="_blank">Google Group</a></li> \
        </ul> \
        <h2>Tutorials</h2> \
        <ul> \
            <li><a href="http://code.cogbits.com/tutorials/0_getstarted/README.html" target="_blank">Getting Started</a></li> \
            <li><a href="http://code.cogbits.com/tutorials/1_supervised/README.html" target="_blank">Supervised Learning</a></li> \
            <li><a href="http://code.cogbits.com/tutorials/2_unsupervised/README.html" target="_blank">Unsupervised Learning</a></li> \
        </ul> \
        <h2>Color Scheme</h2> \
        <select id="color-scheme-picker"> </select> \
        <h2>Quick Reference</h2> \
        <p>For help, try one of these:</p> \
          <code>help()</code></br> \
          <code>help(func)</code></br> \
          <code>?func</code></br> \
          <code>who()</code></br> \
        <p>Visualization:</p> \
          <code>display(image)</code></br> \
          <code>plot(vector)</code></br> \
          <code>hist(vector)</code></br> \
    '
    )

    // add right cell
    layout.col_right = create_cell({
        parent : 'body',
        id : 'right-column'
    })
    $(layout.col_right.id).html(
    ' \
        <form id="terminal-form"> \
            <div id="terminal"><span class="color-scheme-message">&lt;initializing&gt;<br /><br /></span></div> \
            <div> \
                <div id="prompt"><span class="color-scheme-prompt">t7&gt;&nbsp;</span></div> \
                <textarea id="terminal-input" spellcheck="false" rows="1" cols="20" disabled="disabled" /></textarea> \
            </div> \
        </form> \
    '
    )

    // create cell to encapsulate terminal
    layout.terminalform = {
        class: "",
        content: "",
        css: {},
        id: "#terminal-form"
    }
    layout.terminal = {
        class: "",
        content: "",
        css: {},
        id: "#terminal"
    }

    // resize columns
    set_column_heights();
}