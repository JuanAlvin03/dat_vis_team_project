function init(){
    /*CANVAS WIDTH AND HEIGHT*/
    var w = "150%";
    var h = 600;

    //Get map 
    var projection = d3.geoMercator()
                    .translate([610, 350])
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
        console.log(world);

        var healthData = [];

        // 50 Country data from CSV
        // 336 field from csv matches the name
        // supposed to be 380

        // Turkiye = turkey = 8
        // South Korea = Korea = 8
        // United States of America = United States = 8
        // Slovak republic = slovakia = 8
        // China = china(people republic of) = 6
        // 1 more

        // LOAD HEALTH EXPENDITURE DATA CSV
        d3.csv("data.csv", function(data){
            
            console.log(data);

            for (let i = 0; i < data.length; i++) {

                for (let j = 0; j < world.objects.countries.geometries.length; j++) {
                    
                    if(data[i].Country == world.objects.countries.geometries[j].properties.name){
                        
                        var temp = {country:data[i].Country, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);

                    }
                    
                }
                
            }

            console.log(healthData);
            
        });

        // CHECK GEOJSON LOAD ERROR
        if (error) throw error;

        // GEOJSON LOAD SUCCESS
        svg.selectAll("path")
            .data(topojson.feature(world,world.objects.countries).features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "grey")
            .on("mouseover", function(event, d) { // effect when mouse over
                // change bar color to orange
                d3.select( this ) 
                    .attr("fill", "orange"); 
                //calculate x aand y coord for text
                //var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                //var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
    
                //generate and display text
                //svg.append("text")
                    //.attr("id", "tooltip") // create id for text
                    //.attr("x", xPosition) // x coord of text
                    //.attr("y", yPosition) // y coord of text
                    //.attr("text-anchor", "middle")
                    //.attr("font-family", "sans-serif")
                    //.attr("font-size", "11px")
                    //.attr("fill", "black")
                    //.attr("font-weight", "bold")
                    //.text(d); // value/label/data
            })
            .on("mouseout", function () { // effect when mouse move, not over anymore
                //change bar to original color
                d3.select( this ) 
                    //.transition()
                    //.duration(250)
                    .attr("fill", "grey"); 
                //remove text
                //d3.select("#tooltip").remove();
            });
    });
}

/*
TODO:
- Match Countries name and hover to display data
- Choropleths
- Display scale to show color (and its data) ??
- Button for each years
*/

window.onload = init;