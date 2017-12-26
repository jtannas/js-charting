// requires jquery and create-dom-object-from-json.js

$(document).ready(function(){
  var testData = {
    'type': 'div',
    'attributes': {
      'log': 'The log function call works correctly',
      'data-test': 'test1',
      'css': {
        'width': '640px',
        'height': '480px',
        'background-color': 'lightblue',
        'border': '1px solid black'
      }
    },
    'children': [
      {
        'type': 'p',
        'attributes': {
          'data': 'test2',
          'innerHTML': 'Hello Paragraph!',
          'title': 'paragraph title'
        }
      }
    ]
  };
  $('body').append(createDomObjectFromJson(testData));
});


