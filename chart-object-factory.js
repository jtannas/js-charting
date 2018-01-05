function createChartObject(typeName, options){
  var defaults = ('CHART_DEFAULTS' in window) ? CHART_DEFAULTS[typeName] || {} : {};
  var settings = ('CHART_SETTINGS' in window) ? CHART_SETTINGS[typeName] || {} : {};
  var objOptions = options[typeName] || {};
  return HtmlSpec.createUsingExtendedOptions(typeName, [defaults, settings, objOptions]);
}
