# Project Stretch - Bar Chart API

This is a stretch project for preparing for the Lighthouse Labs Web Development
Bootcamp. It is for students who are already comfortable with the fundamentals
of code (e.g. variables, scope, control flow, etc...). The idea of it is to build
a node module for producing html bar graphs from a given set of data and options.

Full instructions are contained within the gist, via the file "Project Stretch -
 Bar Chart Project Instructions.pdf".

## Components
Here, I will be keeping a listing of the files and their purposes.

### ` Lighthouse Prep - Bar Chart API`
Github gists take their name from the first file in them, taken in alphanumerical
order. This filename starts with a space. It is purely to give the gist a nicer name.

### `create-dom-object-from-json.js`
Drawing a bar chart is a more specialized version of the problem "draw an object on a
webpage from a specification". JQuery is great for this, but I wanted a generic 
function for building an object from a JSON specification. I then use this to draw
the core portions of the bar chart.

### `draw-bar-chart.js`
This implements the drawBarChart API and the helper functions that are specific to
drawing bar charts.

### `.editorconfig`
This is a file given by lighthouse labs to help keep editor configurations consistent
across their students. It interacts with a plugin to common code editors to set the
editor configurations when working in the project containing it.

### `.eslint.js`
This is a settings file for the eslint tool - a linter for javascript/ecmascript
code.

### `.gitignore`
Tells git which files to exclude from version control.

### `index.html`
The index.html is for demonstrating the API once it is built. The intent is to be
able to open the file in a browser and see the results.

### `index.js`
This is the javascript for index html file. It is for making example charts - the
actual API is not implemented here

### `learning-resources.yml`
This is a file listing out the various resources I used when learning how to build
this project, along with notes on each of them.

### `package.json`
Package.json files are a feature of node.js - the server side javascript framework.
They are used to track metadata about the package (e.g. dependencies, authors, etc...).
I just have them for my linter (ESLint).

### `Project Stretch - Bar Chart Project Evaluation Criteria.pdf`
These are the instructions given to me for the project.

### `Project Stretch - Bar Chart Project Instructions.pdf`
These are the criteria by which I will be evaluated.

### `README.md`
The instruction manual for a codebase.
