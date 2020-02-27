'use strict';

(function () {
  var FILE_TYPE = ['png', 'jpg', 'jpeg', 'gif'];

  var inputAvatar = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var emptyAvatar = avatarPreview.src;
  var inputHousing = document.querySelector('#images');
  var photoHousing = document.querySelector('.ad-form__photo');

  var renderPhoto = function (inputElement, srcElement) {
    var file = inputElement.files[0];
    var fileName = file.name.toLowerCase();

    var typeCheck = FILE_TYPE.some(function (ext) {
      return fileName.endsWith(ext);
    });

    if (typeCheck) {
      var reader = new FileReader();

      var onFileLoad = function () {
        srcElement.src = reader.result;
        reader.removeEventListener('load', onFileLoad);
      };

      reader.addEventListener('load', onFileLoad);
      reader.readAsDataURL(file);
    }

    return typeCheck;
  };

  var onAvatarChange = function () {
    renderPhoto(inputAvatar, avatarPreview);
  };

  var onHousingChange = function () {
    var newPhoto = document.createElement('img');
    if (renderPhoto(inputHousing, newPhoto)) {
      newPhoto.alt = 'Фотография жилья';
      photoHousing.append(newPhoto);
    } else {
      newPhoto = null;
    }
  };

  var activate = function () {
    inputAvatar.addEventListener('change', onAvatarChange);
    inputHousing.addEventListener('change', onHousingChange);
  };

  var disactivate = function () {
    inputAvatar.removeEventListener('change', onAvatarChange);
    inputHousing.removeEventListener('change', onHousingChange);
    photoHousing.innerHTML = '';
    avatarPreview.src = emptyAvatar;
  };

  window.photos = {
    activate: activate,
    disactivate: disactivate
  };

})();
