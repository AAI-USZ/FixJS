function(){

    // replace textareas with <pre> elements

    $("textarea").each(function(){

      // 1: don't convert if told not to

      if(this.getAttribute("data-noconvert")) return;



      // 2: convert otherwise

      var parent = this.parentNode,

          lines = this.value.replace(/[\s+\n?]$/,'').split("\n"),

          i, last=lines.length,

          pre, div, container = document.createElement("div");



      // 4: build a new codeblock for the content

      container.setAttribute("class","codeblock");

      for(i=0; i<last; i++) {

        div = document.createElement("div"),



        // line number

        pre = document.createElement("pre");

        pre.setAttribute("class","code-linenumber");

        pre.innerHTML = (i+1);

        div.appendChild(pre);

        

        // process each line as a <pre> block

        pre = document.createElement("pre");

        pre.setAttribute("class","code-line");



        if(lines[i]==='') { pre.innerHTML = "&nbsp;"; }

        else { pre.innerHTML = syntax_highlight(lines[i]); }

        div.appendChild(pre);

        container.appendChild(div);

      }



      // 5: replace original textarea

      parent.insertBefore(container, this);

      parent.removeChild(this);

    });

  }