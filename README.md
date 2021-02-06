# Tingsong Ou - Week 1 Assignment

Github Page Link: https://tingsong-ou.github.io/Week-1-assignment/

1. Data Processing: 

     (1) I first reduced the mort.csv file size with RStudio by filter out the redundant data, only preserved "Location," "FIPS," "Category," and "% Change in Mortality Rate, 1980-2014" columns. The file size reduced from 15M to 5M. 

     (2) The Eric Tech provides a smaller version of US Counties GeoJSON data with far fewer polygon vertices; this compact GeoJSON file helps to reduce the map loading time from tens of seconds to around 1 second. 

     (3) To match both datasets, the IP value is more reliable than the county name, as county names always overlapped while IP is unique. In mort.csv, "FIPS" represent each county's IP value; in the GeoJSON file, the IP value can be retrieved by combining the State Code (d.property.STATR) and (d.property.COUNTY).

2. Interactive:

     (1) There are 21 categories of mortality rate, so I tried to include all the categories into a dropdown menu, enabling the viewer to make selections. 

     (2) By applying the pattern: d3.select("ELEMENT ID").on("change", function(){}), the visualization will read the data of the selected category, generate new extend and color scale, shade and present the map with the updated the colors.



## Following are the assignment requirements:

Create a choropleth map for every US county using Geo Albers projection, with the column
'% Change in Mortality Rate, 1980-2014' in the file data/mort.csv

Please feel free to export a smaller csv file using R or whatever tools you find more comfortable, in order to reduce the file size. You are also encouraged to aesthetically improve the page with usage of better fonts and colors.

## Resources

##### Maps (geo-json files)

https://github.com/johan/world.geo.json
https://eric.clst.org/tech/usgeojson/

_The required geojson file for this assignment is already present in the /data/maps/ folder_

##### D3 documentation that might be resourceful here
[Projections](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projections)
[Color schemes in D3](https://github.com/d3/d3-scale-chromatic/tree/v2.0.0)
