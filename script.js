function init(){
    /*CANVAS WIDTH AND HEIGHT*/
    var w = "150%";
    var h = 600;

    //Get map 
    var projection = d3.geoMercator()
                    .translate([610, 340])
                    .scale(220);

    //Declare the geopath as SVG PATH
    var path = d3.geoPath()
                    .projection(projection);

    // Create SVG canvas
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)

    // https://gist.github.com/piwodlaiwo/3734a1357696dcff203a94012646e932
    // https://en.wikipedia.org/wiki/ISO_3166-1_numeric

    d3.json("countries-110m.json", function(error, world) {
        
        // LOAD HEALTH EXPENDITURE DATA CSV
        d3.csv("data.csv", function(data){
            console.log(data);
        });

        // CHECK GEOJSON LOAD ERROR
        if (error) throw error;

        // GEOJSON LOAD SUCCESS
        svg.selectAll("path")
            .data(topojson.feature(world,world.objects.countries).features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "grey");
    });
}

/*
TODO:
- Mouse hover change country color (to see how hovering is with the blocky "p" element)
- Match Countries name and hover to display data
- Choropleths
- Display scale to show color (and its data) ??
- Button for each years
*/

window.onload = init;