/** Class implementing the bar chart view. */
class BarChart {

    /**
     * Create a bar chart instance and pass the other views in.
     * @param worldMap
     * @param infoPanel
     * @param allData
     */
    constructor(worldMap, infoPanel, allData) {
        this.worldMap = worldMap;
        this.infoPanel = infoPanel;
        this.allData = allData;
    }

    /**
     * Render and update the bar chart based on the selection of the data type in the drop-down box
     */
    updateBarChart(selectedDimension) {
        // ******* TODO: PART I *******
        var pad = 2;
        var barChart = d3.select('#barChart');
        var xAxisHeight = 50;
        var yAxisWidth = 70;
        var barsHeight = barChart.attr('height') - xAxisHeight - 2*pad;
        var barsWidth = barChart.attr('width') - yAxisWidth;
        var infoPanel = this.infoPanel;
        // Create the x and y scales; make
        // sure to leave room for the axes
        var xScale = d3.scaleBand()
            .domain(this.allData.map(function(d) { return d.year; }).sort())
            .range([0, barsWidth])
            .paddingInner(0.1)
            .round(true);
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(this.allData, function(d) { return d[selectedDimension]; })])
            .range([barsHeight, 0]);
        // Create colorScale
        var colorScale = d3.scaleLinear()
            .domain([0, d3.max(this.allData, function(d) { return d[selectedDimension]; })])
            .range(['cyan', 'darkblue']);
        var max = d3.max(this.allData, function(d) { return d[selectedDimension]; });
        // Create the axes (hint: use #xAxis and #yAxis)
        var xAxis = d3.select("#xAxis");
        xAxis.attr('height', xAxisHeight)
            .attr('width', barsWidth)
            .attr('transform', 'translate(' + yAxisWidth + ', ' + barsHeight + ')')
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "translate( -15, 10), rotate(-90)")
            .style('text-anchor', 'end')
            .style('margin', '1em');
        var yAxis = d3.select("#yAxis");
        yAxis.transition()
            .attr('height', barsHeight)
            .attr('width', yAxisWidth)
            .attr('transform', 'translate( '+ yAxisWidth + ', 0)')
            .call(d3.axisLeft(yScale));
        // Create the bars (hint: use #bars)
        var bars = d3.select("#bars").selectAll('rect');
        if (!bars.length) {
            d3.select("#bars").selectAll('rect')
                .data(this.allData)
                .enter()
                .append('rect');
            bars = d3.select("#bars").selectAll('rect');
        }
        bars.transition()
            .attr('x',  function(d) {
                return xScale(d.year) + yAxisWidth;
            })
            .attr('width', xScale.bandwidth())
            .attr('y', function(d) {
                return yScale(d[selectedDimension]);
            })
            .attr('height', function(d) {
                return barsHeight - yScale(d[selectedDimension]);
            })
            .style('fill', function(d) {
                return colorScale(d[selectedDimension]);
            });

        // ******* TODO: PART II *******

        // Implement how the bars respond to click events
        // Color the selected bar to indicate is has been selected.
        // Make sure only the selected bar has this new color.
        bars.on('click', function(d, i) {
            bars.style('fill', function(d) {
                return colorScale(d[selectedDimension]);
            });
            d3.select(this).transition().style('fill', 'red');
            infoPanel.updateInfo(d);
        })
        // Call the necessary update functions for when a user clicks on a bar.
        // Note: think about what you want to update when a different bar is selected.
    }

    /**
     *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
     *
     *  There are 4 attributes that can be selected:
     *  goals, matches, attendance and teams.
     */
    chooseData() {
        // ******* TODO: PART I *******
        //Changed the selected data when a user selects a different
        // menu item from the drop down.
        this.updateBarChart(d3.select("#dataset").property("value"));
    }
}