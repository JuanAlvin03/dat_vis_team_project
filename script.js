function init(){
    /*CANVAS WIDTH AND HEIGHT*/
    var w = "150%";
    var h = 600;

    //Get map to focus on Victoria
    var projection = d3.geoMercator()
                    //.center([145, -36.5])
                    //.translate([w / 2, h / 2])
                    .scale(200);

    //Declare the geopath as SVG PATH
    var path = d3.geoPath()
                    .projection(projection);

    // Create SVG canvas
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)

    // https://gist.github.com/piwodlaiwo/3734a1357696dcff203a94012646e932

    // try load CSV it works
    /*
    d3.csv("data.csv").then(function(data){
        console.log(data);
    })
    */

    d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function(error, world) {
  if (error) throw error;
  svg.selectAll("path")
     .data(topojson.feature(world,world.objects.countries).features)
     .enter().append("path")
     .attr("d", path);
});

    // LOAD JSON
    /*
    d3.json("LGA_VIC.json").then(function(json) {
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path);
    })
    */
}

window.onload = init;