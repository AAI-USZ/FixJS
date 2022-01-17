function(data, filename){

  var codeLines = data.split('\n');

  var sections = [];



  // Fetch language-specific parameters for this code file

  var params = this.languageParams(filename);

  var section = {

    docs: '',

    code: ''

  };

  var inMultiLineComment = false;

  var multiLine = '';

  var doxData;



  function md(a, stripParas){

    var h = showdown.makeHtml(a.replace(/(^\s*|\s*$)/,''));

    return stripParas ? h.replace(/<\/?p>/g,'') : h;

  }



  var commentRegex = new RegExp('^\\s*' + params.comment + '\\s?');



  // Loop through all the lines, and parse into sections

  for(var i = 0; i < codeLines.length; i += 1){

    var line = codeLines[i];



    // Only match against parts of the line that don't appear in strings

    var matchable = line.replace(/(["'])(?:\\.|(?!\1).)*\1/g,'');



    if(params.multiLine){

      // If we are currently in a multiline comment, behave differently

      if(inMultiLineComment){



        // End-multiline comments should match regardless of whether they're 'quoted'

        if(line.match(params.multiLine[1])){

          // Once we have reached the end of the multiline, take the whole content

          // of the multiline comment, and pass it through **dox**, which will then

          // extract any **jsDoc** parameters that are present.

          inMultiLineComment = false;

          if(params.dox){

            multiLine += line;

            try{

              // Slightly-hacky-but-hey-it-works way of persuading Dox to work with

              // non-javascript comments by [brynbellomy](https://github.com/brynbellomy)



              // standardize the comment block delimiters to the only ones that

              // dox seems to understand, namely, /* and */

              multiLine = multiLine

                .replace(params.multiLine[0], "/**")

                .replace(params.multiLine[1], "*/")

                .replace(/\n (?:[^\*])/g, "\n * ");



              doxData = dox.parseComments(multiLine, {raw: true})[0];

              // Don't let dox do any markdown parsing. We'll do that all ourselves with md above

              doxData.md = md;

              section.docs += this.doxTemplate(doxData);

            }catch(e){

              console.log("Dox error: " + e);

              multiLine += line.replace(params.multiLine[1],'') + '\n';

              section.docs += '\n' + multiLine.replace(params.multiLine[0],'') + '\n';

            }

          }else{

            multiLine += line.replace(params.multiLine[1],'') + '\n';

            section.docs += '\n' + multiLine.replace(params.multiLine[0],'') + '\n';

          }

          multiLine = '';

        }else{

          multiLine += line + '\n';

        }

        continue;

      }else if(

        // We want to match the start of a multiline comment only if the line doesn't also match the

        // end of the same comment, or if a single-line comment is started before the multiline

        // So for example the following would not be treated as a multiline starter:

        // ```js

        //  alert('foo'); // Alert some foo /* Random open comment thing

        // ```

        matchable.match(params.multiLine[0]) &&

        !matchable.replace(params.multiLine[0],'').match(params.multiLine[1]) &&

        !matchable.split(params.multiLine[0])[0].match(commentRegex)){

        // Here we start parsing a multiline comment. Store away the current section and start a new one

        if(section.code){

          if(!section.code.match(/^\s*$/) || !section.docs.match(/^\s*$/)) sections.push(section);

          section = { docs: '', code: '' };

        }

        inMultiLineComment = true;

        multiLine = line + "\n";

        continue;

      }

    }

    if(matchable.match(commentRegex) && (!params.commentsIgnore || !matchable.match(params.commentsIgnore)) && !matchable.match(/#!/)){

      // This is for single-line comments. Again, store away the last section and start a new one

      if(section.code){

        if(!section.code.match(/^\s*$/) || !section.docs.match(/^\s*$/)) sections.push(section);

        section = { docs: '', code: '' };

      }

      section.docs += line.replace(commentRegex, '') + '\n';

    }else if(!params.commentsIgnore || !line.match(params.commentsIgnore)){

      section.code += line + '\n';

    }

  }

  sections.push(section);

  return sections;

}