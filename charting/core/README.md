# Charting/Core

This is heart of the charting library, where object oriented Javascript is
translated into HTML by jQuery.

## Concept
This module provides a way for the rest of the library to abstract away the task of creating HTML objects. The end result is being able spec out an HTML element from a single Javascript object.

## Files (in load order)

#### `html-builder.js`
The `html-builder.js` file defines a Javascript object `HtmlSpec` that has a method for building an HTML element from its properties. jQuery is used to do all the heavy lifting of building the HTML.

#### `chart-object-definitions.js`
This file creates a location in the API namespace for storing `HtmlSpec` definitions. By definitions, I mean the core properties and methods for individual `HtmlSpec` objects.  This means:
- setters and getters for object properties
- css that defines the _behaviour_ of the object (e.g. flexbox properties)

This does ***not*** include visual properties. Those are left to the next file `chart-object-settings.js`.

For this file though, only common properties and a method for applying them to new definitions are given. It is up to individual chart types to define their own objects.

#### `chart-object-settings.js`
This file creates a location in the API namespace for storing `HtmlSpec` settings. By settings, I mean the aesthetic properties like:
- color
- padding
- border
- animations
- etc...

It can also be used to override any properties given in the definitions file if you're feeling like fiddling around.

The idea is that advanced users of the library can store their preferred object settings in JSON/Javascript files in lieu of runtime options or css.

##### `chart-object-factory.js`
This extends the `html-spec` into a chart object factory. Given the name of a chart object, it builds up its properties from the definitions, settings, and runtime options. This means **nothing** is hard-coded about the objects it builds. Everything can be modified at through the options that are passed in. Happy Hacking! :)

It also provides a convenience method for adding child objects & configuring their CSS. This is useful for allowing parent objects to decide where their children reside (e.g. placing a Y-Axis on the left or the right).

## Dependencies
- jQuery (tested with v3.2.1.)
- `./utils/jQuery.js`
- `./utils/objects.js`
