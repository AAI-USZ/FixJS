function()
    {
        var order = this.get("order"),
            type = this.get("type"),
            graph = this.get("graph"),
            direction = this.get("direction"),
            seriesCollection = graph.seriesTypes[type],
            firstValidIndex,
            lastValidIndex,
            xcoords = this.get("stackedXCoords"),
            ycoords = this.get("stackedYCoords"),
            previousSeries,
            previousSeriesFirstValidIndex,
            previousSeriesLastValidIndex,
            previousXCoords,
            previousYCoords,
            coords,
            closingXCoords,
            closingYCoords,
            currentIndex,
            highestValidOrder,
            oldOrder;
        if(order < 1)
        {    
          return this._getClosingPoints();
        }
        
        previousSeries = seriesCollection[order - 1];
        previousXCoords = previousSeries.get("stackedXCoords").concat();
        previousYCoords = previousSeries.get("stackedYCoords").concat();
        if(direction == "vertical")
        {
            firstValidIndex = this._getFirstValidIndex(xcoords);
            lastValidIndex = this._getLastValidIndex(xcoords);
            previousSeriesFirstValidIndex = previousSeries._getFirstValidIndex(previousXCoords);
            previousSeriesLastValidIndex = previousSeries._getLastValidIndex(previousXCoords);
        }
        else
        {
            firstValidIndex = this._getFirstValidIndex(ycoords);
            lastValidIndex = this._getLastValidIndex(ycoords);
            previousSeriesFirstValidIndex = previousSeries._getFirstValidIndex(previousYCoords);
            previousSeriesLastValidIndex = previousSeries._getLastValidIndex(previousYCoords);
        }
        if(previousSeriesLastValidIndex >= firstValidIndex && previousSeriesFirstValidIndex <= lastValidIndex)
        {
           previousSeriesFirstValidIndex = Math.max(firstValidIndex, previousSeriesFirstValidIndex);
           previousSeriesLastValidIndex = Math.min(lastValidIndex, previousSeriesLastValidIndex);
           previousXCoords = previousXCoords.slice(previousSeriesFirstValidIndex, previousSeriesLastValidIndex + 1);
           previousYCoords = previousYCoords.slice(previousSeriesFirstValidIndex, previousSeriesLastValidIndex + 1);
        }
        else
        {
            previousSeriesFirstValidIndex = firstValidIndex;
            previousSeriesLastValidIndex = lastValidIndex;
        }

        closingXCoords = [xcoords[firstValidIndex]];
        closingYCoords = [ycoords[firstValidIndex]];
        currentIndex = firstValidIndex;
        while((isNaN(highestValidOrder) || highestValidOrder < order - 1) && currentIndex <= previousSeriesFirstValidIndex)
        {
          oldOrder = highestValidOrder;
          highestValidOrder = this._getHighestValidOrder(seriesCollection, currentIndex, order, direction);
          if(!isNaN(oldOrder) && highestValidOrder > oldOrder)
          {
              coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, oldOrder, direction);
              closingXCoords.push(coords[0]);
              closingYCoords.push(coords[1]);
          }
          coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, highestValidOrder, direction);
          closingXCoords.push(coords[0]);
          closingYCoords.push(coords[1]);
          currentIndex = currentIndex + 1;
        }
        if(previousXCoords && previousXCoords.length > 0)
        {
          closingXCoords = closingXCoords.concat(previousXCoords);
          closingYCoords = closingYCoords.concat(previousYCoords);
        }
        currentIndex = previousSeriesLastValidIndex;
        order = order - 1;
        while(currentIndex <= lastValidIndex)
        {
          oldOrder = highestValidOrder;
          highestValidOrder = this._getHighestValidOrder(seriesCollection, currentIndex, order, direction);
          if(!isNaN(oldOrder) && highestValidOrder > oldOrder)
          {
              coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, oldOrder, direction);
              closingXCoords.push(coords[0]);
              closingYCoords.push(coords[1]);
          }
          coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, highestValidOrder, direction);
          closingXCoords.push(coords[0]);
          closingYCoords.push(coords[1]);
          currentIndex = currentIndex + 1;
        }
        if(currentIndex < lastValidIndex)
        {
          coords = this._getCoordsByOrderAndIndex(seriesCollection, lastValidIndex, -1, direction);
          closingXCoords.push(coords[0]);
          closingYCoords.push(coords[1]);
        }

        closingXCoords.reverse();
        closingYCoords.reverse();
        return [xcoords.concat(closingXCoords), ycoords.concat(closingYCoords)];
    }