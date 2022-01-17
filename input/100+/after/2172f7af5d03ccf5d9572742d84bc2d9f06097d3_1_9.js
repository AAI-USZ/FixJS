f        sourceData = _sourceData;
        dispatcher.post('newSourceData', [sourceData]);
        data = new DocumentData(sourceData.text);

        // collect annotation data
        $.each(sourceData.entities, function(entityNo, entity) {
          // offsets given as array of (start, end) pairs
          var span =
              //      (id,        type,      offsets,   generalType)
              new Span(entity[0], entity[1], entity[2], 'entity');
          data.spans[entity[0]] = span;
        });
        var triggerHash = {};
        $.each(sourceData.triggers, function(triggerNo, trigger) {
          triggerHash[trigger[0]] =
              //       (id,         type,       offsets,    generalType), eventList
              [new Span(trigger[0], trigger[1], trigger[2], 'trigger'), []];
        });
        $.each(sourceData.events, function(eventNo, eventRow) {
          var eventDesc = data.eventDescs[eventRow[0]] =
              //           (id,          triggerId,   roles,        klass)
              new EventDesc(eventRow[0], eventRow[1], eventRow[2]);
          var trigger = triggerHash[eventDesc.triggerId];
          var span = trigger[0].copy(eventDesc.id);
          trigger[1].push(span);
          data.spans[eventDesc.id] = span;
        });

        // XXX modifications: delete later
        $.each(sourceData.modifications, function(modNo, mod) {
          // mod: [id, spanId, modification]
          if (!data.spans[mod[2]]) {
            dispatcher.post('messages', [[['<strong>ERROR</strong><br/>Event ' + mod[2] + ' (referenced from modification ' + mod[0] + ') does not occur in document ' + data.document + '<br/>(please correct the source data)', 'error', 5]]]);
            return;
          }
          data.spans[mod[2]][mod[1]] = true;
        });

        var midpointComparator = function(a, b) {
          var tmp = a.from + a.to - b.from - b.to;
          if (tmp) {
            return tmp < 0 ? -1 : 1;
          }
        };
        // split spans into span fragments (for discontinuous spans)
        $.each(data.spans, function(spanNo, span) {
          $.each(span.offsets, function(offsetsNo, offsets) {
            var from = parseInt(offsets[0], 10);
            var to = parseInt(offsets[1], 10);
            var fragment = new Fragment(span, from, to);
            span.fragments.push(fragment);
          });
          // ensure ascending order
          span.fragments.sort(midpointComparator);
          span.wholeFrom = span.fragments[0].from;
          span.wholeTo = span.fragments[span.fragments.length - 1].to;
          span.headFragment = span.fragments[(true) ? span.fragments.length - 1 : 0]; // TODO configurable!
        });

        var spanComparator = function(a, b) {
          var aSpan = data.spans[a];
          var bSpan = data.spans[b];
          var tmp = aSpan.headFragment.from + aSpan.headFragment.to - bSpan.headFragment.from - bSpan.headFragment.to;
          if (tmp) {
            return tmp < 0 ? -1 : 1;
          }
          return 0;
        };
        $.each(sourceData.equivs, function(equivNo, equiv) {
          // equiv: ['*', 'Equiv', spanId...]
          equiv[0] = "*" + equivNo;
          var equivSpans = equiv.slice(2);
          var okEquivSpans = [];
          // collect the equiv spans in an array
          $.each(equivSpans, function(equivSpanNo, equivSpan) {
            if (data.spans[equivSpan]) okEquivSpans.push(equivSpan);
            // TODO: #404, inform the user with a message?
          });
          // sort spans in the equiv by their midpoint
          okEquivSpans.sort(spanComparator);
          // generate the arcs
          var len = okEquivSpans.length;
          for (var i = 1; i < len; i++) {
            var eventDesc = data.eventDescs[equiv[0] + '*' + i] =
                //           (id,                  triggerId,           roles,                         klass)
                new EventDesc(okEquivSpans[i - 1], okEquivSpans[i - 1], [[equiv[1], okEquivSpans[i]]], 'equiv');
            eventDesc.leftSpans = okEquivSpans.slice(0, i);
            eventDesc.rightSpans = okEquivSpans.slice(i);
          }
        });
        $.each(sourceData.relations, function(relNo, rel) {
          data.eventDescs[rel[0]] =
              //           (id,     triggerId, roles,              klass)
              new EventDesc(rel[2], rel[2],    [[rel[1], rel[3]]], 'relation');
        });

        // attributes
        $.each(sourceData.attributes, function(attrNo, attr) {
          // attr: [id, name, spanId, value, cueSpanId

          // TODO: might wish to check what's appropriate for the type
          // instead of using the first attribute def found
          var attrType = (eventAttributeTypes[attr[1]] || 
                          entityAttributeTypes[attr[1]]);
          var attrValue = attrType && attrType.values[attrType.bool || attr[3]];
          var span = data.spans[attr[2]];
          if (!span) {
            dispatcher.post('messages', [[['Annotation ' + attr[2] + ', referenced from attribute ' + attr[0] + ', does not exist.', 'error']]]);
            return;
          }
          var valText = (attrValue && attrValue.name) || attr[3];
          var attrText = attrType
            ? (attrType.bool ? attrType.name : (attrType.name + ': ' + valText))
            : (attr[3] == true ? attr[1] : attr[1] + ': ' + attr[3]);
          span.attributeText.push(attrText);
          span.attributes[attr[1]] = attr[3];
          if (attr[4]) { // cue
            span.attributeCues[attr[1]] = attr[4];
            var cueSpan = data.spans[attr[4]];
            cueSpan.attributeCueFor[data.spans[1]] = attr[2];
            cueSpan.cue = 'CUE'; // special css type
          }
          $.extend(span.attributeMerge, attrValue);
        });

        // comments
        $.each(sourceData.comments, function(commentNo, comment) {
          // comment: [entityId, type, text]
          
          // TODO error handling

          // sentence id: ['sent', sentId]
          if (comment[0] instanceof Array && comment[0][0] == 'sent') {
            // sentence comment
            var sent = comment[0][1];
            var text = comment[2];
            if (data.sentComment[sent]) {
              text = data.sentComment[sent].text + '<br/>' + text;
            }
            data.sentComment[sent] = { type: comment[1], text: text };
          } else {
            var id = comment[0];
            var trigger = triggerHash[id];
            var eventDesc = data.eventDescs[id];
            var commentEntities =
                trigger
                ? trigger[1] // trigger: [span, ...]
                : id in data.spans
                  ? [data.spans[id]] // span: [span]
                  : id in data.eventDescs
                    ? [data.eventDescs[id]] // arc: [eventDesc]
                    : [];
            $.each(commentEntities, function(entityId, entity) {
              // if duplicate comment for entity:
              // overwrite type, concatenate comment with a newline
              if (!entity.comment) {
                entity.comment = { type: comment[1], text: comment[2] };
              } else {
                entity.comment.type = comment[1];
                entity.comment.text += "\n" + comment[2];
              }
              // partially duplicate marking of annotator note comments
              if (comment[1] == "AnnotatorNotes") {
                entity.annotatorNotes = comment[2];
              }
              // prioritize type setting when multiple comments are present
              if (commentPriority(comment[1]) > commentPriority(entity.shadowClass)) {
                entity.shadowClass = comment[1];
              }
            });
          }
        });

        // prepare span boundaries for token containment testing
        var sortedFragments = [];
        $.each(data.spans, function(spanNo, span) {
          $.each(span.fragments, function(fragmentNo, fragment) {
            sortedFragments.push(fragment);
          });
        });
        // sort fragments by beginning, then by end
        sortedFragments.sort(function(a, b) {
          var x = a.from;
          var y = b.from;
          if (x == y) {
            x = a.to;
            y = b.to;
          }
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        var currentFragmentId = 0;
        var startFragmentId = 0;
        var numFragments = sortedFragments.length;
        var lastTo = 0;
        var firstFrom = null;
        var chunkNo = 0;
        var space;
        var chunk = null;
        // token containment testing (chunk recognition)
        $.each(sourceData.token_offsets, function() {
          var from = this[0];
          var to = this[1];
          if (firstFrom === null) firstFrom = from;

          // Replaced for speedup; TODO check correctness
          // inSpan = false;
          // $.each(data.spans, function(spanNo, span) {
          //   if (span.from < to && to < span.to) {
          //     // it does; no word break
          //     inSpan = true;
          //     return false;
          //   }
          // });

          // Is the token end inside a span?
          if (startFragmentId && to > sortedFragments[startFragmentId - 1].to) {
            while (startFragmentId < numFragments && to > sortedFragments[startFragmentId].from) {
              startFragmentId++;
            }
          }
          currentFragmentId = startFragmentId;
          while (currentFragmentId < numFragments && to >= sortedFragments[currentFragmentId].to) {
            currentFragmentId++;
          }
          // if yes, the next token is in the same chunk
          if (currentFragmentId < numFragments && to > sortedFragments[currentFragmentId].from) {
            return;
          }

          // otherwise, create the chunk found so far
          space = data.text.substring(lastTo, firstFrom);
          var text = data.text.substring(firstFrom, to);
          if (chunk) chunk.nextSpace = space;
          //               (index,     text, from,      to, space) {
          chunk = new Chunk(chunkNo++, text, firstFrom, to, space);
          data.chunks.push(chunk);
          lastTo = to;
          firstFrom = null;
        });
        var numChunks = chunkNo;

        // find sentence boundaries in relation to chunks
        chunkNo = 0;
        var sentenceNo = 0;
        var pastFirst = false;
        $.each(sourceData.sentence_offsets, function() {
          var from = this[0];
          if (chunkNo >= numChunks) return false;
          if (data.chunks[chunkNo].from > from) return;
          var chunk;
          while (chunkNo < numChunks && (chunk = data.chunks[chunkNo]).from < from) {
            chunkNo++;
          }
          chunkNo++;
          if (pastFirst && from <= chunk.from) {
            var numNL = chunk.space.split("\n").length - 1;
            if (!numNL) numNL = 1;
            sentenceNo += numNL;
            chunk.sentence = sentenceNo;
          } else {
            pastFirst = true;
          }
        });

        // assign fragments to appropriate chunks
        var currentChunkId = 0;
        var chunk;
        $.each(sortedFragments, function(fragmentId, fragment) {
          while (fragment.to > (chunk = data.chunks[currentChunkId]).to) currentChunkId++;
          chunk.fragments.push(fragment);
          fragment.text = chunk.text.substring(fragment.from - chunk.from, fragment.to - chunk.from);
          fragment.chunk = chunk;
        });

        // assign arcs to spans; calculate arc distances
        $.each(data.eventDescs, function(eventNo, eventDesc) {
          var dist = 0;
          var origin = data.spans[eventDesc.id];
          if (!origin) {
            // TODO: include missing trigger ID in error message
            dispatcher.post('messages', [[['<strong>ERROR</strong><br/>Trigger for event "' + eventDesc.id + '" not found in ' + data.document + '<br/>(please correct the source data)', 'error', 5]]]);
            return;
          }
          var here = origin.headFragment.chunk.index;
          $.each(eventDesc.roles, function(roleNo, role) {
            var target = data.spans[role.targetId];
            if (!target) {
              dispatcher.post('messages', [[['<strong>ERROR</strong><br/>"' + role.targetId + '" (referenced from "' + eventDesc.id + '") not found in ' + data.document + '<br/>(please correct the source data)', 'error', 5]]]);
              return;
            }
            var there = target.headFragment.chunk.index;
            var dist = Math.abs(here - there);
            var arc = new Arc(eventDesc, role, dist, eventNo);
            origin.totalDist += dist;
            origin.numArcs++;
            target.totalDist += dist;
            target.numArcs++;
            data.arcs.push(arc);
            target.incoming.push(arc);
            origin.outgoing.push(arc);
          }); // roles
        }); // eventDescs

        // highlighting
        markedText = [];
        setMarked('edited'); // set by editing process
        setMarked('focus'); // set by URL
        setMarked('matchfocus'); // set by search process, focused match
        setMarked('match'); // set by search process, other (non-focused) match

        // resort the spans for linear order by center
        sortedFragments.sort(midpointComparator);

        // sort fragments into towers, calculate average arc distances
        var lastFragment = null;
        var towerId = -1;
        $.each(sortedFragments, function(i, fragment) {
          if (!lastFragment || (lastFragment.from != fragment.from || lastFragment.to != fragment.to)) {
            towerId++;
          }
          fragment.towerId = towerId;
        }); // sortedFragments

        $.each(data.spans, function(spanId, span) {
          // calculate average arc distances
          // average distance of arcs (0 for no arcs)
          span.avgDist = span.numArcs ? span.totalDist / span.numArcs : 0;
          lastSpan = span;

          // collect fragment texts into span texts
          var fragmentTexts = [];
          $.each(span.fragments, function(fragmentNo, fragment) {
            // TODO heuristics
            fragmentTexts.push(fragment.text);
          });
          span.text = fragmentTexts.join(' ');
        }); // data.spans

        for (var i = 0; i < 2; i++) {
          // preliminary sort to assign heights for basic cases
          // (first round) and cases resolved in the previous
          // round(s).
          $.each(data.chunks, function(chunkNo, chunk) {
            // sort
            chunk.fragments.sort(fragmentComparator);
            // renumber
            $.each(chunk.fragments, function(fragmentNo, fragment) {
              fragment.indexNumber = fragmentNo;
              fragment.refedIndexSum = 0;
            });
          });
          // resolved cases will now have indexNumber set
          // to indicate their relative order. Sum those for referencing cases
          // for use in iterative resorting
          $.each(data.arcs, function(arcNo, arc) {
            data.spans[arc.origin].refedIndexSum += data.spans[arc.target].headFragment.indexNumber;
          });
        }

        var spanAnnTexts = {};
        // Final sort of fragments in chunks for drawing purposes
        // Also identify the marked text boundaries regarding chunks
        $.each(data.chunks, function(chunkNo, chunk) {
          // and make the next sort take this into account. Note that this will
          // now resolve first-order dependencies between sort orders but not
          // second-order or higher.
          chunk.fragments.sort(fragmentComparator);

          chunk.markedTextStart = [];
          chunk.markedTextEnd = [];

          $.each(chunk.fragments, function(fragmentNo, fragment) {
            if (!data.towers[fragment.towerId]) {
              data.towers[fragment.towerId] = [];
              fragment.drawCurly = true;
              fragment.span.drawCurly = true;
            }
            data.towers[fragment.towerId].push(fragment);

            var spanLabels = Util.getSpanLabels(spanTypes, fragment.span.type);
            fragment.labelText = Util.spanDisplayForm(spanTypes, fragment.span.type);
            // Find the most appropriate label according to text width
            if (Configuration.abbrevsOn && spanLabels) {
              var labelIdx = 1; // first abbrev
              var maxLength = (fragment.to - fragment.from) / 0.8;
              while (fragment.labelText.length > maxLength &&
                  spanLabels[labelIdx]) {
                fragment.labelText = spanLabels[labelIdx];
                labelIdx++;
              }
            }

            var svgtext = svg.createText(); // one "text" element per row
            var postfixArray = [];
            var prefix = '';
            var postfix = '';
            var warning = false;
            $.each(fragment.span.attributes, function(attrType, valType) {
              // TODO: might wish to check what's appropriate for the type
              // instead of using the first attribute def found
              var attr = (eventAttributeTypes[attrType] ||
                          entityAttributeTypes[attrType]);
              if (!attr) {
                // non-existent type
                warning = true;
                return;
              }
              var val = attr.values[attr.bool || valType];
              if (!val) {
                // non-existent value
                warning = true;
                return;
              }
              if ($.isEmptyObject(val)) {
                // defined, but lacks any visual presentation
                warning = true;
                return;
              }
              if (val.glyph) {
                if (val.position == "left") {
                  prefix = val.glyph + prefix;
                  var css = 'glyph';
                  if (attr.css) css += ' glyph_' + Util.escapeQuotes(attr.css);
                  svgtext.span(val.glyph, { 'class': css });
                } else { // XXX right is implied - maybe change
                  postfixArray.push([attr, val]);
                  postfix += val.glyph;
                }
              }
            });
            var text = fragment.labelText;
            if (prefix !== '') {
              text = prefix + ' ' + text;
              svgtext.string(' ');
            }
            svgtext.string(fragment.labelText);
            if (postfixArray.length) {
              text += ' ' + postfix;
              svgtext.string(' ');
              $.each(postfixArray, function(elNo, el) {
                var css = 'glyph';
                if (el[0].css) css += ' glyph_' + Util.escapeQuotes(el[0].css);
                svgtext.span(el[1].glyph, { 'class': css });
              });
            }
            if (warning) {
              svgtext.span("#", { 'class': 'glyph attribute_warning' });
              text += ' #';
            }
            fragment.glyphedLabelText = text;

            if (!spanAnnTexts[text]) {
              spanAnnTexts[text] = true;
              data.spanAnnTexts[text] = svgtext;
            }
          }); // chunk.fragments
        }); // chunks

        var numChunks = data.chunks.length;
        // note the location of marked text with respect to chunks
        var startChunk = 0;
        var currentChunk;
        // sort by "from"; we don't need to sort by "to" as well,
        // because unlike spans, chunks are disjunct
        markedText.sort(function(a, b) { 
          return Util.cmp(a[0], b[0]);
        });
        $.each(markedText, function(textNo, textPos) {
          var from = textPos[0];
          var to = textPos[1];
          var markedType = textPos[2];
          if (from < 0) from = 0;
          if (to < 0) to = 0;
          if (to >= data.text.length) to = data.text.length - 1;
          if (from > to) from = to;
          while (startChunk < numChunks) {
            var chunk = data.chunks[startChunk];
            if (from <= chunk.to) {
              chunk.markedTextStart.push([textNo, true, from - chunk.from, null, markedType]);
              break;
            }
            startChunk++;
          }
          if (startChunk == numChunks) {
            dispatcher.post('messages', [[['Wrong text offset', 'error']]]);
            return;
          }
          currentChunk = startChunk;
          while (currentChunk < numChunks) {
            var chunk = data.chunks[currentChunk];
            if (to <= chunk.to) {
              chunk.markedTextEnd.push([textNo, false, to - chunk.from]);
              break
            }
            currentChunk++;
          }
          if (currentChunk == numChunks) {
            dispatcher.post('messages', [[['Wrong text offset', 'error']]]);
            var chunk = data.chunks[data.chunks.length - 1];
            chunk.markedTextEnd.push([textNo, false, chunk.text.length]);
            return;
          }
        }); // markedText

        // TODO: can fragment.lineIndex be different from fragment.towerId?
        // If not, this piece of code should replace the towerId piece above
        var realFragmentNo = -1;
        var lastFragment;
        $.each(sortedFragments, function(fragmentNo, fragment) {
          if (!lastFragment || fragment.from != lastFragment.from || fragment.to != lastFragment.to) realFragmentNo++;
          fragment.lineIndex = realFragmentNo;
          if (fragment.chunk.firstFragmentIndex == undefined) fragment.chunk.firstFragmentIndex = realFragmentNo;
          fragment.chunk.lastFragmentIndex = realFragmentNo;
          lastFragment = fragment;
        });
        data.lastLineIndex = lastFragment ? lastFragment.lineIndex : -1;
        dispatcher.post('dataReady', [data]);
      };
