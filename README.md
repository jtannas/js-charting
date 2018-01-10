# Project Stretch - Bar Chart API

## User Guide

### Example
https://jtannas.github.io/

### Quick Start Guide for using this on your webpage
1) Include jQuery 3.2.1 or newer in your project
2) Include every file from the charting directory in your project
3) Draw a bar chart using `drawBarChart([1, 2, 3, 4, 5], {height: '500px'}, $('body'))`
4) Keep reading this guide for more options

### Supported Options
The second parameter taken by the bar chart function is a javascript object. Its properties
affect the resulting chart.

- `options.height`: Sets the height of the resulting chart (using any CSS unit)
- `options.id`: Sets the CSS id of the outermost container of the chart. This lets you apply 
    css classes to any individual chart and its components using css selectors.
- `options.spacing`: Sets the horizontal spacing between bars (using any CSS unit)
- `options.title`: Sets the chart title.
- `options.titleOptions`: This is an object of css properties passed to the title. Eg.
    `{'font-size': '2em'}`
- `options.units`: Displays the units on the chart where appropriate
- `options.width`: Sets the width of the resulting chart (using any CSS unit)
- `options.yAxis`: Sets the scale of the yAxis
    - `options.yAxis.yMin`: Sets the minimum of the yAxis
    - `options.yAxis.yMax`: Sets the maximum of the yAxis
    - `options.yAxis.yStep`: Sets the step between yAxis lable values
    - `options.yAxis.yLabelCount`: Sets the number of yAxis labels
    - **IMPORTANT**: *Exactly* three (3) of the above options must be specified to define the yAxis

P.S. I say "supported options" instead of options because every chart is fully customizable,
but I'd recommend reading the code if you're going to do that. The gist is special options like
`options.VBarChartContainer._attributes.css` can directly impact how the chart is constructed. 


### More Options: Working with Data & MetaData
More complex chart types (e.g. stacked bar charts) require more complex data structures as input data.
These are defined within the charting/data_objects.
The main ones are:
- `_c_.dataObjects.Point` (aka. DataPoint): A single numberical value and associated metadata
- `_c_.dataObjects.Series` (aka. DataSeries): An array of data points and associated metadata
- `_c_.dataObjects.Cluster` (aka. DataCluster): An array of data serieses and associated metadata

Sample Usage:
```
var DataPoint = _c_.dataObjects.Point;
var DataSeries = _c_.dataObjects.Series;
var DataCluster = _c_.dataObjects.Cluster;

var data = DataSeries.makeFromDataPointArray([
  DataPoint.new(1, {name: 'a', 'background-color': 'red'}),
  DataPoint.new(2, {name: 'b', 'background-color': 'blue'}),
  DataPoint.new(3, {name: 'c', 'background-color': 'green'}),
  DataPoint.new(4, {name: 'd', 'background-color': 'purple'}),
  DataPoint.new(5, {name: 'e', 'background-color': 'yellow'})
]);
drawBarChart(data, options, $('body'));
```

Supported data point options are currently:
- css: This is an object of css properties passed
  to the datapoint representation (e.g. a bar chart bar)
- valueLabelCss: This is an object of css properties passed
  to the data value labels (e.g. `{'font-size': '0.5em'}`);

### A final word on options:
Any options passed into the the function are applied via HTML attributes. This is
often convenient (e.g. for bar colors where the color is associated to the data).
This doesn't play well with CSS stylesheets though, where you'll have to use
the css `!important` flag to override them.

My recommendation: Use options.id to set a unique id for each chart, and then use
stylesheets to adjust the aesthetics. Your front end designer colleagues will
thank you.

## Developer Guide
This individual README is not an exhaustive explanation - there are README
files in every directory. I'd suggest starting with ./charting/README.md
if you want to learn more about the inner workings of the library or to
become a power user.

### File & Folder Directory
Here, I will be keeping a listing of the files and folders in the base directory
and their purposes. Folders will have their own README.md files to explain them.

#### `charting/`
This is the base directory for the charting library contents. See the README inside for
more information.

#### `lighthouse_instructions/`
This is a directory where the instructions that accompanied the assignment are stored.
See the README inside for more information.

#### `sample/`
This is a directory where a sample usage of the library is given. See the README inside for
more information.

#### `.editorconfig`
This is a file given by lighthouse labs to help keep editor configurations consistent
across their students. It interacts with a plugin to common code editors to set the
editor configurations when working in the project containing it.

#### `.eslint.js`
This is a settings file for the eslint tool - a linter for javascript/ecmascript
code.

#### `.gitignore`
Tells git which files to exclude from version control.

#### `index.html`
The index.html is for demonstrating the results of calling the API. The intent
is to be able to open the file in a browser and see the results. It's in the base
directory because of how github pages works.

#### `learning-resources.yml`
This is a file listing out the various resources I used when learning how to build
this project, along with notes on each of them.

#### `package.json`
Package.json files are a feature of node.js - the server side javascript framework.
They are used to track metadata about the package (e.g. dependencies, authors, etc...).
I just have them for my linter (ESLint).

## Purpose
This is a stretch project for preparing for the Lighthouse Labs Web Development
Bootcamp. It is for students who are already comfortable with the fundamentals
of code (e.g. variables, scope, control flow, etc...). The idea of it is to build
a node module for producing html bar graphs from a given set of data and options.

Full project requirements are contained within the repo, via the file "lighthouse_instructions/
Project Stretch - Bar Chart Project Instructions.pdf".

## Known Issues
- Floating bars don't always line up perfectly to the zero axis. It seems like a css rounding error.

## To Do / Future Features:
- Clean up the code for populating bar charts
- Unit tests... So many unit tests to make...
- Add support for adding bars to existing charts (related to cleaning up the logic)
- Add an (optional) zero axis line to the bar charts
- Add support for horizontal lines that match up to the y-axis ticks
- Add support for clustered bars
- Add support for chart legends
- Add more chart types (someday)

## Acknowledgements
This was my first javascript project, my first API, my first project using OOP extensively, etc...
I would've been completely lost if not for all the great online resources available to me.
I've detailed the most significant ones in the file `learning-resources.yml`.

Many thanks to Stack Overflow, for all the people who are good at what they do
and are willing to share.
