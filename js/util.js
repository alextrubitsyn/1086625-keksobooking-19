'use strict';

(function () {
  var getRandom = function (elements) {
    return elements[getRandomRange(0, elements.length)];
  };

  var getRandomRange = function (minElement, maxElement) {
    return Math.floor(Math.random() * (maxElement - minElement)) + minElement;
  };

  var getRandomSelection = function (elements) {
    var currentElements = elements.slice();
    var countElementsDelete = getRandomRange(0, currentElements.length);
    for (var i = 0; i < countElementsDelete; i++) {
      var selectedElement = getRandomRange(0, currentElements.length);
      currentElements[selectedElement] = currentElements[currentElements.length - 1];
      currentElements.length--;
    }
    return currentElements;
  };

  var searchValueSelected = function (element) {
    var selectedIndex = element.options.selectedIndex;
    return element.options[selectedIndex].value;
  };


  window.util = {
    getRandom: getRandom,
    getRandomRange: getRandomRange,
    getRandomSelection: getRandomSelection,
    searchValueSelected: searchValueSelected

  };

})();
