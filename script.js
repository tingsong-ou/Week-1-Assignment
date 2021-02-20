const canvasWidth = document.querySelector('.container').clientWidth;

const margin = {t: 50, r:0, b: 50, l: 0};
const size = {w: canvasWidth, h: 720};
const svg = d3.select('svg');

svg.attr('width', size.w)
    .attr('height', size.h);

//Creating visualization
Promise.all(
    [d3.json("data/maps/us-counties-least.json"),
    d3.csv('data/MortData_reduced.csv')]
).then(function(d){

    const mapData = d[0];
    const mortData = d[1];

    //Creating a list of mortality category
    const mortCategory = [];
    for(d of d[1]){
        if(!mortCategory.includes(d.Category)) mortCategory.push(d.Category);
    }

    //Creating a dropdowm form
    dropdowm('selectACategory',mortCategory)
    
    let selectedCategory = mortCategory[0];
    let mortFiltered = mortData.filter(d => d.Category == selectedCategory);

    let mapG = svg.append('g').classed('map', true);
    let countyPaths = drawMap(mapData, mapG, size);
    colorMap(countyPaths, mortFiltered);

    //Updating visualization
    d3.select("#selectACategory").on('change', function(){
        selectedCategory = d3.select(this).property('value');
        mortFiltered = mortData.filter(d => d.Category == selectedCategory);
        colorMap(countyPaths, mortFiltered);
    });
});



//Draw Map Function
function drawMap (mapData, ele, size) {
    let projection = d3.geoAlbersUsa()
        .fitSize([size.w, size.h], mapData);
    
    let path = d3.geoPath(projection);

    let pathSel = ele.selectAll("path")
        .data(mapData.features)
        .enter()
        .append('path')
        .attr('id', d => `${d.properties.STATE}${d.properties.COUNTY}`)
        .attr('d', d => path(d));
    
    return pathSel;
}

//Shade Map Function
function colorMap(paths, inputData){
    let extent = d3.extent(inputData, d => +d['% Change in Mortality Rate, 1980-2014']);
    let colorScale = d3.scaleSequential()
        .domain([extent[1],extent[0]])
        .interpolator(d3.interpolateRdYlBu);

    paths
        .transition()
        .duration(1000)
        .style('fill', function(d){
            let countyID = `${d.properties.STATE}${d.properties.COUNTY}`;
            let value = inputData.filter(d => d.FIPS.padStart(5,'0') === countyID);
            if(value.length > 0){
                value = value[0];
                return colorScale(value['% Change in Mortality Rate, 1980-2014']);
            }else return '#ccc';        
        });
}


//Dropdown Form Function
//reference: https://stackoverflow.com/questions/9895082/javascript-populate-drop-down-list-with-array
function dropdowm(id, array){
    let selection = document.getElementById(id);

    for (let i = 0; i<array.length; i++){
        let value = array[i];
        let element = document.createElement("option");
        element.textContent = value;
        element.value = value;
        selection.appendChild(element);
    }
}