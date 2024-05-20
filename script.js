function init(){
    /*CANVAS WIDTH AND HEIGHT*/
    var w = "150%";
    var h = 600;

    //Get map 
    var projection = d3.geoMercator()
                    .translate([610, 350])
                    .scale(210);

    //Declare the geopath as SVG PATH
    var path = d3.geoPath()
                    .projection(projection);

    // Picking range of colour (rgbs from color brewer)
    var color = d3.scaleQuantize()
                    .range([
                    "rgb(237, 248, 233)",
                    "rgb(186, 228, 179)",
                    "rgb(116, 196, 118)",
                    "rgb(49, 163, 84)",
                    "rgb(0, 109, 44)"
                    ]);

    // Create SVG canvas
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)

    // https://gist.github.com/piwodlaiwo/3734a1357696dcff203a94012646e932

    d3.json("countries-110m.json", function(error, world) {
        console.log(world);

        var healthData = [];
        var data2015 = [];
        // 50 Country data from CSV
        // 336 field from csv matches the name
        // supposed to be 380

        // Turkiye = turkey = 8
        // South Korea = Korea = 8
        // United States of America = United States = 8
        // Slovak republic = slovakia = 8
        // China = china(people republic of) = 6

        // Malta is not on the map = 6

        // LOAD HEALTH EXPENDITURE DATA CSV
        d3.csv("data.csv", function(data){
            
            /*
            color.domain([
                d3.min(data, function(d) { return d.value; }),  
                d3.max(data, function(d) { return d.value; })
            ])
            */

            for (let i = 0; i < data.length; i++) 
            {
                /*
                if(data[i].Country === "Malta")
                {
                    var temp = {country:data[i].Country, year:data[i].Year, value:data[i].Value};
                    healthData.push(temp);
                }
                */
                for (let j = 0; j < world.objects.countries.geometries.length; j++) 
                {
                    if(data[i].Country == world.objects.countries.geometries[j].properties.name)
                    {
                        if(data[i].Year == "2015"){
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            data2015.push(temp);
                        }
                        var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);
                    }

                    if(data[i].Country === "Türkiye" && world.objects.countries.geometries[j].properties.name === "Turkey")
                    {
                        if(data[i].Year == "2015"){
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            data2015.push(temp);
                        }
                        var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);
                    }

                    if(data[i].Country === "Korea" && world.objects.countries.geometries[j].properties.name === "South Korea")
                    {
                        if(data[i].Year == "2015"){
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            data2015.push(temp);
                        }
                        var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);
                    }

                    if(data[i].Country === "United States" && world.objects.countries.geometries[j].properties.name === "United States of America")
                    {
                        if(data[i].Year == "2015"){
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            data2015.push(temp);
                        }
                        var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);
                    }

                    if(data[i].Country === "Slovak Republic" && world.objects.countries.geometries[j].properties.name === "Slovakia")
                    {
                        if(data[i].Year == "2015"){
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            data2015.push(temp);
                        }
                        var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);
                    }

                    if(data[i].Country === "China (People's Republic of)" && world.objects.countries.geometries[j].properties.name === "China")
                    {
                        if(data[i].Year == "2015"){
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            data2015.push(temp);
                        }
                        var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);
                    }
                }
            }

            //console.log(healthData);
            
            // CHECK GEOJSON LOAD ERROR
            if (error) throw error;

            //append multiple elements at once
            //https://stackoverflow.com/questions/13203897/d3-nested-appends-and-data-flow
            
            // create popups
            //https://www.w3schools.com/howto/howto_js_popup.asp

            //TEMPORARY
            //GET 2015 DAT ONLY

            function findDataByCountryName(name){
                for(i = 0; i<data2015.length; i++){
                    if(data2015[i].country == name){
                        return data2015[i].value;
                    }
                }
                return "No Data";
            }

            // https://d3-graph-gallery.com/graph/density_slider.html

            var tooltip = d3.select("#tooltip");

            // GEOJSON LOAD SUCCESS
            svg.selectAll("path")
                .data(topojson.feature(world,world.objects.countries).features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", "grey")
                /*
                .style("fill", function(d) {
                    
                    var value = d.properties.value;
                
                    if(value){
                        return color(value); // use the color based on the data
                    } else {
                        return "#ccc" // if there is no value
                    }
                })
                */
                .each(function(d){
                    /*
                    d3.select(this)
                        .append("span")
                        .attr("class", "popuptext");
                    */

                    /*
                    d3.select(this)
                        .selectAll("span")
                        .text(d.properties.name + " " + findDataByCountryName(d.properties.name));
                    */

                   /*

                    d3.select(this)
                        .append("div")
                            .style("width", 400)
                            .style("height", 400)
                            .style("position", "absolute")
                            .style("visibility", "visible")
                            .style("background-color", "black")
                            .style("border", "solid")
                            .style("border-width", "1px")
                            .style("border-radius", "5px")
                            .style("padding", "10px")
                            .html("<p>" + d.properties.name + " : " + findDataByCountryName(d.properties.name) + "</p>");
                    */


                    //var tooltip = d3.select(this)
                        
                })
                .on("mouseover", function(d) { // effect when mouse over
                    // change path color to orange
                    
                    d3.select(this)
                        .attr("fill", "orange")

                    var value = findDataByCountryName(d.properties.name);
                    tooltip.style("visibility", "visible")
                           .html("<strong>Country:</strong> " + d.properties.name + "<br><strong>Year:</strong> 2015<br><strong>Value:</strong> " + value);
                    
                    /*
                    var hoveredDiv = d3.select(this).select("div");

                    return hoveredDiv.style("visibility", "visible");
                    */


                    /*
                    var hovered = d3.select(this)
                                    .select(".popuptext");

                    //https://d3-graph-gallery.com/graph/interactivity_tooltip.html

                    hovered._groups[0][0].classList.toggle("show");      
                    */     

                })
                .on("mousemove", function(event) {
                    tooltip.style("top", (event.pageY - 10) + "px")
                           .style("left", (event.pageX + 10) + "px");
                })
                .on("mouseout", function () { // effect when mouse move, not over anymore
                    //change bar to original color
                    d3.select(this) 
                        .attr("fill", "grey"); 

                    tooltip.style("visibility", "hidden");
                    
                    /*
                    var hoveredDiv = d3.select(this).select("div");

                    return hoveredDiv.style("visibility", "hidden");
                    */
                    
                    //remove text
                    //d3.select("#tooltip").remove();
                });

        // END OF CSV LOAD        
        });
    // END OF JSON LOAD
    });
}

/*
TODO:
- Match Countries name and hover to display data
- Choropleths
- Display scale to show color (and its data) ?? // scale must be recounted
- SLIDERS for each years
*/

window.onload = init;