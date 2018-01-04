// requires jquery and create-dom-object-from-json.js
function DataPoint(value, name, color){
  this.value = (value || null);
  this.name = (name || '');
  this.color = (color || 'white');
}


var makeDataSeries = function(dataArray){
  var data = [];
  for (var i = 0; i < dataArray.length; i++){
    if (dataArray[i].constructor === Array) {
      data.push(makeDataSeries(dataArray[i]));
    } else {
      var dp = new DataPoint(
        dataArray[i].value || dataArray[i],
        dataArray[i].name || i.toString(),
        dataArray[i].color
      );
      data.push(dp);
    }
  }
  return data;
};

var getMaxDataValue = function(dataSeries){
  var maxValue = -Infinity;
  for (var i = 0; i < dataSeries.length; i++){
    if (dataSeries[i].constructor === Array) {
      maxValue = Math.max(maxValue, getMax(dataSeries[i]));
    } else {
      maxValue = Math.max(maxValue, dataSeries[i].value);
    }
  }
  return maxValue;
};


function BarChartBarUnits(options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'units',
      'css': {
        'text-align': 'center',
        'width': '100%'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartBarUnits'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartBarUnits);
  HtmlSpec.call(this, objSettings);
}
BarChartBarUnits.prototype = new HtmlSpec();


function BarChartBarDescription(options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'description',
      'css': {
        'text-align': 'center',
        'width': '100%'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartBarDescription'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartBarDescription);
  HtmlSpec.call(this, objSettings);
}
BarChartBarDescription.prototype = new HtmlSpec();


function BarChartInnerBar(percentHeight, color, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'bar',
      'css': {
        'box-sizing': 'border-box',
        'flex-grow': '1',
        'flex-basis': '0',
        'height': percentHeight.toString() + '%',
        'background-color': color
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartInnerBar'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartInnerBar);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartBarDescription(options));
  this.children.push(new BarChartBarUnits(options));
}
BarChartInnerBar.prototype = new HtmlSpec();


function BarChartSingleBar(percentHeight, dataPoint, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'single-bar',
      'css': {
        'flex-grow': '1',
        'flex-basis': '0',
        'height': percentHeight.toString() + '%'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartSingleBar'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartSingleBar);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartInnerBar(100, dataPoint.color, options));
}
BarChartSingleBar.prototype = new HtmlSpec();


function BarChartStackedBar(options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'stacked-bar',
      'css': {
        'display': 'flexbox',
        'flex-grow': '1',
        'flex-basis': '0',
        'flex-direction': 'column'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartStackedBar'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartStackedBar);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartInnerBar(options));
  this.children.push(new BarChartInnerBar(options));
  this.children.push(new BarChartInnerBar(options));
  this.children.push(new BarChartInnerBar(options));
  this.children.push(new BarChartInnerBar(options));
}
BarChartStackedBar.prototype = new HtmlSpec();

function BarChartClusterBar(options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'cluster-bar',
      'css': {
        'display': 'flex',
        'flex-grow': '1',
        'flex-basis': '0',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartClusterBar'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartClusterBar);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartInnerBar(options));
  this.children.push(new BarChartInnerBar(options));
  this.children.push(new BarChartInnerBar(options));
  this.children.push(new BarChartInnerBar(options));
  this.children.push(new BarChartInnerBar(options));
}
BarChartClusterBar.prototype = new HtmlSpec();

function BarChartBarArea(data, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'bar-area',
      'css': {
        'grid-column': '2',
        'grid-row': '1',
        'display': 'flex',
        'justify-content': 'space-around',
        'align-items': 'flex-end'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartBarArea'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartBarArea);
  HtmlSpec.call(this, objSettings);

  var me = this;
  var max = getMaxDataValue(data);
  data.forEach(function(dataPoint){
    var percentHeight = dataPoint.value / max * 100
    me.children.push(new BarChartSingleBar(percentHeight, dataPoint, options));
  });
}
BarChartBarArea.prototype = new HtmlSpec();


function BarChartYAxisLabel(text, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'y-axis-label',
      'innerHTML': text
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartYAxisLabel'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartYAxisLabel);
  HtmlSpec.call(this, objSettings);
}
BarChartYAxisLabel.prototype = new HtmlSpec();


function BarChartYAxis(data, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'y-axis',
      'css': {
        'box-sizing': 'border-box',
        'height': '100%',
        'grid-row': '1',
        'grid-column': '1',
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'space-between',
        'text-align': 'right'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartYAxis'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartYAxis);
  HtmlSpec.call(this, objSettings);

  var max = getMaxDataValue(data);
  var divisions = 5;
  var min = 0;
  var step = (max - min) / divisions;
  for (var labelVal = max; labelVal >= min; labelVal -= step){
    this.children.push(new BarChartYAxisLabel(labelVal.toString(), options));
  }
}
BarChartYAxis.prototype = new HtmlSpec();

function BarChartXAxisLabel(name, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'x-axis-label',
      'css': {
        'box-sizing': 'border-box',
        'flex': '1'
      },
      'innerHTML': name
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartXAxisLabel'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartXAxisLabel);
  HtmlSpec.call(this, objSettings);
}
BarChartXAxisLabel.prototype = new HtmlSpec();


function BarChartXAxis(data, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'x-axis',
      'css': {
        'box-sizing': 'border-box',
        'height': '100%',
        'grid-row': '2',
        'grid-column': '2',
        'display': 'flex',
        'flex-direction': 'row',
        'justify-content': 'space-around',
        'text-align': 'center'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartXAxis'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartXAxis);
  HtmlSpec.call(this, objSettings);

  var me = this;
  data.forEach(function(dataPoint){
    me.children.push(new BarChartXAxisLabel(dataPoint.name, options));
  });
}
BarChartXAxis.prototype = new HtmlSpec();


function BarChartContents(data, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'contents',
      'css': {
        'display': 'grid',
        'grid-template-columns': 'max-content auto',
        'grid-template-rows': 'auto max-content'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartContents'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartContents);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartYAxis(data, options));
  this.children.push(new BarChartBarArea(data, options));
  this.children.push(new BarChartXAxis(data, options));
}
BarChartContents.prototype = new HtmlSpec();


function BarChartTitle(options){
  var defaults = {
    'type': 'title',
    'attributes': {
      'class': 'title'
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartTitle'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartTitle);
  HtmlSpec.call(this, objSettings);
}
BarChartTitle.prototype = new HtmlSpec();



function BarChart(data, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'bar_chart',
      'css': {
        'box-sizing': 'border-box',
        'display': 'flex',
        'flex-direction': 'column'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChart'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChart);
  HtmlSpec.call(this, objSettings);

  if (options.title) { this.children.push(new BarChartTitle(options)); }
  this.children.push(new BarChartContents(data, options));
}
BarChart.prototype = new HtmlSpec();


var drawBarChart = function(data, options, element){
  var dataSeries = makeDataSeries(data);
  var $chart = new BarChart(dataSeries, options);
  element.append($chart.createElement());
  return $chart;
};
