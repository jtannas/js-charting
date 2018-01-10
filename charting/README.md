# Charting Library

This is a library for drawing charts on webpages. It started out as an assignment
from Lighthouse Labs to make an API for drawing bar charts. In the process, I got
wrapped up in trying to make it modular, extensible, configurable, and object
oriented.
The result is that the tools and conventions are in place for adding more chart
types for anyone who is willing to put forth the work.

## TL;DR
- The `core` directory provides an object definition and methods for converting
Javascript objects into HTML.
- The `data_objects` directory provides standard formats for input data.
- The `chart_types` directory contains the chart definitions that build off of
 these abstractions.
- The `utils` directory has generic helper functions used in the library.


## Dependencies
- jQuery (tested with v3.2.1)

## Files & Folders Listing

#### `chart_types/`
Each subdirectory to this directory contains a type of chart (e.g.
vertical bar charts) and the code for creating & drawing them. See the README
inside for more details.

#### `core/`
This is heart of the charting library, where object oriented Javascript is
translated into HTML by jQuery. See the README inside for more details.

#### `data_objects/`
This contains js files that define various data objects (e.g. data points, data
series, data cluster) and their methods. These objects allow more information to
be passed in to graphs than raw numeric values. See the README inside for more
details.

#### `utils/`
This folder contains utility functions - generically useful functions that don't
fit in the Chart Object paradigm. Honestly, most of them could be extensions to
built-in Javascript types, but that polutes the Javascript namespace and is vulnerable
to conflicts.

#### `global-draw-functions.js`
This is for functions available in the global namespace. See the reasoning below
in the `namespace.js` listing.

#### `namespace.js`
As the project went along, it turned into a mess of global function variables. It
was a pain to figure out where stuff was coming from. Drawing inspiration from
jQuery's use of the $ variable, I decided to contain the entire library under a
a single object: _c_

This file creates that namespace object. It also adds certain sub-namespaces
for grouping unrelated individual files (e.g. utils files). 

The only exceptions to this are contained in the file `global-draw-functions.js`.
These are just convenience wrappers for the functions inside the library.
