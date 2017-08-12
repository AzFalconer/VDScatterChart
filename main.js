//Requirements
//Can see performance time visualized in a scatterplot graph.
//Can mouse over a plot to see a tooltip with additional details.

$(document).ready(function() {

  //Variables
  const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
  let dataArr= [],
      padding = 50,
      width = 860,
      height = 860;

  //Listen
  //Execute
  makeChart ();

  //Functions
  let div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

function makeChart() {
  d3.json(url, function (data) {console.log(data);
  let time = data[0].Seconds; //Chart seconds behind the leader, not total time...
  let canvas = d3.select(".chartWrap").append("svg").attr("width", width).attr("height", height);

  let xScale = d3.scaleLinear() //Create X scale
   .domain([0, d3.max(data, function(d) { return d.Seconds-time;})])
   .range([width-padding*2, padding]); //To reverse plot use [padding, width-padding*2] (*2 because labels were getting cut off)
  let yScale = d3.scaleLinear() //Create Y scale
   .domain([0, d3.max(data, function(d) { return (d.Place);})])
   .range([padding, height-padding]);
  canvas.selectAll("circle") //Create "Dots" (data points)
   .data(data)
   .enter()
   .append("circle")
   .attr("cx", function(d) {return xScale(d.Seconds-time);})
   .attr("cy", function(d) {return yScale(d.Place);})
   .attr("r", 6)
   .attr("fill", function(d) {if (d.Doping == "") {return "black"} else {return "red"};})
   //Use .on to popup tooltip div... Not perfect but it works...
   .on("mouseover", function(d) {
      div.transition().duration(200).style("opacity", .9);
      div.html("<b>" + d.Name + " (" + d.Nationality + ")</b><br />Time: " + d.Time + ", " + d.Year + "<br />" + d.Doping)
         .style("left", "+50px").style("top", "-425px");
   })
   .on("mouseout", function(d) {div.transition().duration(500).style("opacity", 0);});
  canvas.selectAll("text") //Create "Dots" labels
   .data(data)
   .enter()
   .append("text")
   .text(function(d) {return d.Name})
   .attr("x", function(d) {return xScale(d.Seconds-time)+8})
   .attr("y", function(d) {return yScale(d.Place)+3})
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", function(d) {if (d.Doping == "") {return "black"} else {return "red"};})
  let xAxis = d3.axisBottom(xScale)
    .ticks(10) //Set # of ticks
  let yAxis = d3.axisLeft(yScale)
    .ticks(10) //Set # of ticks
  canvas.append("g") //Create group for xAxis
    .attr("class", "axis") //Assigns "axis" class so we can use CSS to format
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);
  canvas.append("g") //Create group for yAxis
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
  //Create Titles & Axis Labels
  let chartTitle = canvas.append("text").text("Doping in Professional Bicycle Racing")
   .attr("x", 400).attr("y", 40)
   .attr("text-anchor", "middle")
   .attr("font-size", 36)
   .attr("class", "chartTitle");
  let chartSubTitle = canvas.append("text").text("35 Fastest times up Alpe d'Huez")
   .attr("x", 400).attr("y", 75)
   .attr("text-anchor", "middle")
   .attr("font-size", 28)
   .attr("class", "chartTitle");
  let chartSubTitle2 = canvas.append("text").text("(Normalized to 13.8km distance)")
   .attr("x", 400).attr("y", 100)
   .attr("text-anchor", "middle")
   .attr("font-size", 18)
   .attr("class", "chartTitle");
  let chartYAxis = canvas.append("text").text("Ranking - Fastest Time")
   .attr("x", -400).attr("y", 75) //400,5 Had to adjust because of "rotate"... not sure why...
   .attr("text-anchor", "middle")
   .attr("font-size", 18)
   .attr("class", "chartTitle")
   .attr("transform", "rotate(-90)");
  let chartXAxis = canvas.append("text").text("Seconds Off The Fastest Time")
   .attr("x", 400).attr("y", 800)
   .attr("text-anchor", "middle")
   .attr("font-size", 18)
   .attr("class", "chartTitle");
  //Create Legend
  let legendDope = canvas.append("text").text("Doping alegations")
   .attr("x", 650).attr("y", 380)
   .attr("text-anchor", "start")
   .attr("font-size", 12)
   .attr("fill", "red");
  let legendDopeCircle = canvas.append("circle")
   .attr("cx", 640)
   .attr("cy", 376)
   .attr("r", 5)
   .attr("fill", "red")
  let legendNoDope = canvas.append("text").text("No Doping alegations")
   .attr("x", 650).attr("y", 400)
   .attr("text-anchor", "start")
   .attr("font-size", 12)
   .attr("fill", "Black");
  let legendNoDopeCircle = canvas.append("circle")
   .attr("cx", 640)
   .attr("cy", 396)
   .attr("r", 5)
   .attr("fill", "black")
  })
}

});
