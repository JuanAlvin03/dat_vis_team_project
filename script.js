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

            console.log(healthData);
            
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
                return "Data not Found";
            }

            // https://d3-graph-gallery.com/graph/density_slider.html


            // GEOJSON LOAD SUCCESS
            svg.selectAll("path")
                .data(topojson.feature(world,world.objects.countries).features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", "grey")
                .each(function(d){
                    d3.select(this)
                        .append("span")
                        .attr("class", "popuptext");

                    d3.select(this)
                        .selectAll("span")
                        .text(d.properties.name + " " + findDataByCountryName(d.properties.name));

                    
                })
                .on("mouseover", function(event, d) { // effect when mouse over
                    // change path color to orange
                    d3.select(this)
                        .attr("fill", "orange")

                    var hovered = d3.select(this)
                                    .select(".popuptext");

                    //https://d3-graph-gallery.com/graph/interactivity_tooltip.html

                    hovered._groups[0][0].classList.toggle("show");           
                })
                .on("mouseout", function () { // effect when mouse move, not over anymore
                    //change bar to original color
                    d3.select(this) 
                        .attr("fill", "grey"); 

                    //remove text
                    d3.select("#tooltip").remove();
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
- Display scale to show color (and its data) ??
- SLIDERS for each years
*/

window.onload = init;