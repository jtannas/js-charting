# Vertical Bar Charts

This folder is for creating vertical bar charts (the bars are vertical).

## Dependencies
- Core dependencies
- utils/*.js
- data_objects(Point, Series, Cluster)

## Files (in load order)

#### `object-definitions.js`
Provides the HtmlSpec definitions for the vertical bar chart objects. See 
charting/core/chart-object-definitions.js for an explanation.

#### `object-settings.js`
Provides the HtmlSpec settins for the vertical bar chart objects. See 
charting/core/chart-object-settings.js for an explanation.

#### `base.js`
This assembles the individual chart objects into a chart object that is
easier to interact with than the raw HtmlSpecs, resulting in a more object
oriented style of code.

It then tacks on some extra functions to it that are useful for all vertical
bar charts.

#### `simple.js`
This is for a bar chart with individual bars representing single data points.
It takes the base bar chart assembled in base.js, then tacks on methods for
populating it from a data series object.

#### `stacked.js`
This is for a bar chart with bars that have sub-bars stacked on each other.
It takes the base bar chart assembled in base.js, then tacks on methods for
populating it from a data cluster object.
