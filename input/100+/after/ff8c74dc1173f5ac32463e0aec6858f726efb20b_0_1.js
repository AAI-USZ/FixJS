function(appender, objects, className, rep, sourceLink, noRow)
    {
        var row;
        var container = this.getTopContainer();

        if (noRow)
        {
            appender.apply(this, [objects]);
        }
        else
        {
            var msgId = this.getMessageId(objects);
            var previousMsgId = this.getMessageId(this.lastLogObjects);

FBTrace.sysout("previousMsgId " + previousMsgId + ", " + msgId);

            if (msgId && msgId == previousMsgId)
            {
                this.increaseRowCount(container.lastChild);

                row = container.lastChild;
            }
            else
            {
                row = this.createRow("logRow", className);
                var logContent = row.getElementsByClassName("logContent").item(0);
                appender.apply(this, [objects, logContent, rep]);

                if (!sourceLink && objects && objects.getSourceLink)
                    sourceLink = objects.getSourceLink();

                if (sourceLink)
                    FirebugReps.SourceLink.tag.append({object: sourceLink}, row.firstChild);

                container.appendChild(row);
            }

            this.lastLogObjects = objects;

            this.filterLogRow(row, this.wasScrolledToBottom);

            if (FBTrace.DBG_CONSOLE)
                FBTrace.sysout("console.append; wasScrolledToBottom " + this.wasScrolledToBottom +
                    " " + row.textContent);

            if (this.wasScrolledToBottom)
                Dom.scrollToBottom(this.panelNode);

            return row;
        }
    }