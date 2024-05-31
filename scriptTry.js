function init(){
    /*CANVAS WIDTH AND HEIGHT*/
    var w = "150%";
    var h = 600;

    d3.select("#mySlider").on("change", function(d){
        selectedValue = this.value
        
        d3.json("countries-110m.json", function(error, world) {

            var healthData = [];
            var yearlyData = [];
    
            // LOAD HEALTH EXPENDITURE DATA CSV
            d3.csv("data.csv", function(data){

                var onlyValue = [];
    
                for (let i = 0; i < data.length; i++) 
                {
                    for (let j = 0; j < world.objects.countries.geometries.length; j++) 
                    {
                        if(data[i].Country == world.objects.countries.geometries[j].properties.name)
                        {
                            if(data[i].Year == selectedValue){
                                var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                                yearlyData.push(temp);
                            }
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            healthData.push(temp);
                        }
    
                        if(data[i].Country === "Türkiye" && world.objects.countries.geometries[j].properties.name === "Turkey")
                        {
                            if(data[i].Year == selectedValue){
                                var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                                yearlyData.push(temp);
                            }
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            healthData.push(temp);
                        }
    
                        if(data[i].Country === "Korea" && world.objects.countries.geometries[j].properties.name === "South Korea")
                        {
                            if(data[i].Year == selectedValue){
                                var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                                yearlyData.push(temp);
                            }
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            healthData.push(temp);
                        }
    
                        if(data[i].Country === "United States" && world.objects.countries.geometries[j].properties.name === "United States of America")
                        {
                            if(data[i].Year == selectedValue){
                                var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                                yearlyData.push(temp);
                            }
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            healthData.push(temp);
                        }
    
                        if(data[i].Country === "Slovak Republic" && world.objects.countries.geometries[j].properties.name === "Slovakia")
                        {
                            if(data[i].Year == selectedValue){
                                var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                                yearlyData.push(temp);
                            }
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            healthData.push(temp);
                        }
    
                        if(data[i].Country === "China (People's Republic of)" && world.objects.countries.geometries[j].properties.name === "China")
                        {
                            if(data[i].Year == selectedValue){
                                var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                                yearlyData.push(temp);
                            }
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            healthData.push(temp);
                        }                 
                    }
                    // GET THE VALUE TO SET THE DOMAIN of choropleth
                    // NEED TO BE PARSED TO FLOAT SO THAT IT CAN BE used in d3.min and d3.max
                    onlyValue.push(parseFloat(data[i].Value));
                }
   
                color.domain([
                    d3.min(onlyValue),  
                    d3.max(onlyValue)
                ])

                // CHECK GEOJSON LOAD ERROR
                if (error) throw error;
    
                function findDataByCountryName(name){
                    for(i = 0; i < yearlyData.length; i++){
                        if(yearlyData[i].country == name){
                            return parseFloat(yearlyData[i].value);
                        }
                    }
                    return "No Data";
                }
    
                var tooltip = d3.select("#tooltip");
    
                // GEOJSON LOAD SUCCESS
                svg.selectAll("path")
                    .data(topojson.feature(world,world.objects.countries).features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    //.attr("fill", "grey")
                    
                    .attr("fill", function(d) {
                        var value = findDataByCountryName(d.properties.name);
                    
                        if(value === "No Data"){  
                            return "#ccc" // if there is no value
                        } else {
                            console.log(value);
                            return color(value); // use the color based on the data
                        }
                    })
                    
                    .on("mouseover", function(d) { // effect when mouse over
                        // change path color to orange
                        
                        d3.select(this)
                            .attr("fill", "orange")
    
                        var value = findDataByCountryName(d.properties.name);
                        tooltip.style("visibility", "visible")
                               .html("<strong>Country:</strong> " + d.properties.name + "<br><strong>Year:</strong> " + selectedValue + "<br><strong>Value:</strong> " + value); 
    
                    })
                    .on("mousemove", function(event) {
                        tooltip.style("top", (event.clientX - 10) + "px")
                                .style("left", (event.clientY + 10) + "px");
                    })
                    .on("mouseout", function () { // effect when mouse move, not over anymore
                        //change bar to original color
                        d3.select(this) 
                            .attr("fill", function(d) {
                                var value = findDataByCountryName(d.properties.name);
                            
                                if(value === "No Data"){  
                                    return "#ccc" // if there is no value
                                } else {
                                    console.log(value);
                                    return color(value); // use the color based on the data
                                }
                            })
    
                        tooltip.style("visibility", "hidden");
                    });
                
            // END OF CSV LOAD        
            });
        // END OF JSON LOAD
        });
    })

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
                .style("background-color", "blue")

    // https://gist.github.com/piwodlaiwo/3734a1357696dcff203a94012646e932

    d3.json("countries-110m.json", function(error, world) {
        console.log(world);

        var healthData = [];
        var yearlyData = [];
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
            
            var selectedYear = "2015";
            var onlyValue = [];

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
                        if(data[i].Year == selectedYear){
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            yearlyData.push(temp);
                        }
                        var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);
                    }

                    if(data[i].Country === "Türkiye" && world.objects.countries.geometries[j].properties.name === "Turkey")
                    {
                        if(data[i].Year == selectedYear){
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            yearlyData.push(temp);
                        }
                        var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);
                    }

                    if(data[i].Country === "Korea" && world.objects.countries.geometries[j].properties.name === "South Korea")
                    {
                        if(data[i].Year == selectedYear){
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            yearlyData.push(temp);
                        }
                        var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);
                    }

                    if(data[i].Country === "United States" && world.objects.countries.geometries[j].properties.name === "United States of America")
                    {
                        if(data[i].Year == selectedYear){
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            yearlyData.push(temp);
                        }
                        var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);
                    }

                    if(data[i].Country === "Slovak Republic" && world.objects.countries.geometries[j].properties.name === "Slovakia")
                    {
                        if(data[i].Year == selectedYear){
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            yearlyData.push(temp);
                        }
                        var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);
                    }

                    if(data[i].Country === "China (People's Republic of)" && world.objects.countries.geometries[j].properties.name === "China")
                    {
                        if(data[i].Year == selectedYear){
                            var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                            yearlyData.push(temp);
                        }
                        var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                        healthData.push(temp);
                    }                 
                }
                // GET THE VALUE TO SET THE DOMAIN of choropleth
                // NEED TO BE PARSED TO FLOAT SO THAT IT CAN BE used in d3.min and d3.max
                onlyValue.push(parseFloat(data[i].Value));
            }

            
            color.domain([
                d3.min(onlyValue),  
                d3.max(onlyValue)
            ])
            

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
                for(i = 0; i < yearlyData.length; i++){
                    if(yearlyData[i].country == name){
                        return parseFloat(yearlyData[i].value);
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
                //.attr("fill", "grey")
                
                .attr("fill", function(d) {
                    var value = findDataByCountryName(d.properties.name);
                
                    if(value === "No Data"){  
                        return "#ccc" // if there is no value
                    } else {
                        console.log(value);
                        return color(value); // use the color based on the data
                    }
                })
                
                .on("mouseover", function(d) { // effect when mouse over
                    // change path color to orange
                    
                    d3.select(this)
                        .attr("fill", "orange")

                    var value = findDataByCountryName(d.properties.name);
                    tooltip.style("visibility", "visible")
                           .html("<strong>Country:</strong> " + d.properties.name + "<br><strong>Year:</strong> " + selectedYear + "<br><strong>Value:</strong> " + value); 

                })
                .on("mousemove", function(event) {
                    tooltip.style("top", (event.clientX - 10) + "px")
                            .style("left", (event.clientY + 10) + "px");
                    
                    //tooltip.style("top", (event.pageY - 10) + "px")
                           //.style("left", (event.pageX + 10) + "px");
                })
                .on("mouseout", function () { // effect when mouse move, not over anymore
                    //change bar to original color
                    d3.select(this) 
                        .attr("fill", function(d) {
                            var value = findDataByCountryName(d.properties.name);
                        
                            if(value === "No Data"){  
                                return "#ccc" // if there is no value
                            } else {
                                console.log(value);
                                return color(value); // use the color based on the data
                            }
                        })

                    tooltip.style("visibility", "hidden");
                    
                    /*
                    var hoveredDiv = d3.select(this).select("div");

                    return hoveredDiv.style("visibility", "hidden");
                    */
                    
                    //remove text
                    //d3.select("#tooltip").remove();
                });

            function updateChart(year){
                selectedYear = year; // get the selected year
                yearlyData = []; // empty the array of yearly data, to be replaced with selected year data

                /*
                color.domain([
                    d3.min(data, function(d) { return d.value; }),  
                    d3.max(data, function(d) { return d.value; })
                ])
                */

                for (let i = 0; i < data.length; i++) 
                {
                    for (let j = 0; j < world.objects.countries.geometries.length; j++) 
                    {
                        if(data[i].Country == world.objects.countries.geometries[j].properties.name)
                        {
                            if(data[i].Year == selectedYear){
                                var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                                yearlyData.push(temp);
                            }
                        }

                        if(data[i].Country === "Türkiye" && world.objects.countries.geometries[j].properties.name === "Turkey")
                        {
                            if(data[i].Year == selectedYear){
                                var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                                yearlyData.push(temp);
                            }
                        }

                        if(data[i].Country === "Korea" && world.objects.countries.geometries[j].properties.name === "South Korea")
                        {
                            if(data[i].Year == selectedYear){
                                var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                                yearlyData.push(temp);
                            }
                        }

                        if(data[i].Country === "United States" && world.objects.countries.geometries[j].properties.name === "United States of America")
                        {
                            if(data[i].Year == selectedYear){
                                var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                                yearlyData.push(temp);
                            }
                        }

                        if(data[i].Country === "Slovak Republic" && world.objects.countries.geometries[j].properties.name === "Slovakia")
                        {
                            if(data[i].Year == selectedYear){
                                var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                                yearlyData.push(temp);
                            }
                        }

                        if(data[i].Country === "China (People's Republic of)" && world.objects.countries.geometries[j].properties.name === "China")
                        {
                            if(data[i].Year == selectedYear){
                                var temp = {country:world.objects.countries.geometries[j].properties.name, year:data[i].Year, value:data[i].Value};
                                yearlyData.push(temp);
                            }
                        }
                    }
                }

                // CHECK GEOJSON LOAD ERROR
                if (error) throw error;

                var tooltip = d3.select("#tooltip");

                // GEOJSON LOAD SUCCESS
                svg.selectAll("path")
                    .data(topojson.feature(world,world.objects.countries).features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    //.attr("fill", "grey")
                    .attr("fill", function(d) {
                        var value = findDataByCountryName(d.properties.name);
                    
                        if(value === "No Data"){  
                            return "#ccc" // if there is no value
                        } else {
                            console.log(value);
                            return color(value); // use the color based on the data
                        }
                    })

                    .on("mouseover", function(d) { // effect when mouse over
                        // change path color to orange

                        d3.select(this)
                            .attr("fill", "orange")

                        var value = findDataByCountryName(d.properties.name);
                        tooltip.style("visibility", "visible")
                               .html("<strong>Country:</strong> " + d.properties.name + "<br><strong>Year:</strong> " + selectedYear + "<br><strong>Value:</strong> " + value);
                    })
                    .on("mousemove", function(event) {
                        tooltip.style("top", (event.clientX - 10) + "px")
                               .style("left", (event.clientY + 10) + "px");
                        
                        //tooltip.style("top", (event.pageY - 10) + "px")
                               //.style("left", (event.pageX + 10) + "px");
                    })
                    .on("mouseout", function () { // effect when mouse move, not over anymore
                        //change bar to original color
                        d3.select(this) 
                            .attr("fill", function(d) {
                                var value = findDataByCountryName(d.properties.name);
                            
                                if(value === "No Data"){  
                                    return "#ccc" // if there is no value
                                } else {
                                    console.log(value);
                                    return color(value); // use the color based on the data
                                }
                            }) 

                        tooltip.style("visibility", "hidden");
                    });
            }

            // Get slider value change        
            d3.select("#mySlider").on("change", function(d){
                selectedValue = this.value
                updateChart(selectedValue)
            })
            
        // END OF CSV LOAD        
        });
    // END OF JSON LOAD
    });
}

/*
TODO:

- try to get pop up to be close to cursor???
- Choropleths
- Display scale to show color (and its data) ?? // scale must be recounted


*/

window.onload = init;