var _ = require('lodash');
var DEFAULTS = require('./graphing-defaults.json');

module.exports = {
  drawBarChart: function(data,  options,  element){
    var settings = _.merge({}, DEFAULTS, options);
  }
};
