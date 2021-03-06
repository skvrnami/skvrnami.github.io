function renderChart(data, selectedYear) {
  d3.select("svg").remove();

  var margin = { top: 20, right: 20, bottom: 70, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  var x = d3.scale.linear().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(20);

  var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

  var svg = d3.select("body").append("div").attr("class", "content").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("class", "chart").append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  ages = d3.extent(data, function (d) {
    return d.age;
  });
  maxN = d3.max(data, function (d) {
    return d.n;
  });
  chartData = data.filter(function (d) {
    return d.year == selectedYear;
  });

  x.domain([18, 103]);
  y.domain([0, maxN]);

  svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).selectAll("text").style("text-anchor", "center");

  svg.append("text").attr("class", "axis label").attr("text-anchor", "end").attr("x", width).attr("y", height - 6).text("Věk");

  svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.9em").style("text-anchor", "end").text("Počet členů kandidujících ve volbách");

  svg.selectAll("bar").data(chartData).enter().append("rect").style("fill", "red").attr("x", function (d) {
    return x(d.age);
  }).attr("width", 6).attr("y", function (d) {
    return y(d.n);
  }).attr("height", function (d) {
    return height - y(d.n);
  });
}