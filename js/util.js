'use strict';

(function () {

  var searchValueSelected = function (element) {
    var selectedIndex = element.options.selectedIndex;
    return element.options[selectedIndex].value;
  };

  var changeDisabledElements = function (elements, disabledStatus) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = disabledStatus;
    }
  };


  window.util = {
    searchValueSelected: searchValueSelected,
    changeDisabledElements: changeDisabledElements
  };

})();
