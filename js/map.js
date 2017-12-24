/** Class implementing the map view. */
class Map {
    /**
     * Creates a Map Object
     */
    constructor() {
        this.projection = d3.geoConicConformal().scale(150).translate([400, 350]);

    }

    /**
     * Function that clears the map
     */
    clearMap() {

        // ******* TODO: PART V*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css
        var allCountries = d3.select('#map').selectAll('path.team');
        allCountries.each(function(p) {
            d3.select(this)
                .classed('team', false)
                .classed('countries', true);
        })
        var host = d3.select('#map').select('path.host');
        host.classed('host', false)
            .classed('countries', true);
        var points = d3.select('#points').selectAll('*');
        points.remove();
        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes on and off here.

    }

    /**
     * Update Map with info for a specific FIFA World Cup
     * @param wordcupData the data for one specific world cup
     */
    updateMap(worldcupData) {

        //Clear any previous selections;
        this.clearMap();

        // ******* TODO: PART V *******

        // Add a marker for the winner and runner up to the map.

        // Hint: remember we have a conveniently labeled class called .winner
        // as well as a .silver. These have styling attributes for the two
        // markers.

        // Select the host country and change it's color accordingly.
        var host = d3.select('#' + worldcupData.host_country_code);
        host.classed('countries', false)
            .classed('host', true);
        // Iterate through all participating teams and change their color as well.
        var countries = d3.select('#map').selectAll('path.countries');
        countries.each(function(p) {
            if (worldcupData.teams_iso.indexOf(p.id) != -1) {
                d3.select(this).classed('countries', false).classed('team', true);
            }
        })
        // We strongly suggest using CSS classes to style the selected countries.

        // Add a marker for gold/silver medalists
        var co = {win: this.projection(worldcupData.win_pos), ru: this.projection(worldcupData.ru_pos)};
        var points = d3.select('#points');
        points.append('circle')
            .attr('cx', co.win[0])
            .attr('cy', co.win[1])
            .attr('r', 8)
            .classed('gold', true);
        points.append('circle')
            .attr('cx', co.ru[0])
            .attr('cy', co.ru[1])
            .attr('r', 8)
            .classed('silver', true);
        var pt = this.projection(worldcupData.win_pos);
    }
    /**
     * Renders the actual map
     * @param the json data with the shape of all countries
     */
    drawMap(world) {

        //(note that projection is a class member
        // updateMap() will need it to add the winner/runner_up markers.)

        // ******* TODO: PART IV *******

        // Draw the background (country outlines; hint: use #map)
        // Make sure and add gridlines to the map
        var geoWorld = topojson.feature(world, world.objects.countries);
        var map = d3.select('#map');
        var geoPath = d3.geoPath()
            .projection(this.projection);
        map.selectAll('path.countries')
            .data(geoWorld.features)
            .enter()
            .append('path')
            .classed('countries', true)
            .attr('id', function(d) { return d.id; })
            .attr('d', geoPath);
        var graticule = d3.geoGraticule();
        d3.select('#map').selectAll('path.grat')
            .data(graticule.lines())
            .enter()
            .append('path')
            .classed('grat', true)
            .style('fill', 'none')
            .attr('d', geoPath);
        // Hint: assign an id to each country path to make it easier to select afterwards
        // we suggest you use the variable in the data element's .id field to set the id

        // Make sure and give your paths the appropriate class (see the .css selectors at
        // the top of the provided html file)

    }


}
