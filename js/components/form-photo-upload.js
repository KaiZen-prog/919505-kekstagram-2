import {KeyCode} from '../const';

const form = document.querySelector('.img-upload__form');
const imgUploadInput = form.querySelector('.img-upload__input');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUploadCloseButton = form.querySelector('.img-upload__cancel');

const imgPreview = form.querySelector('.img-upload__preview img');

const updatePreview = (file) => {
  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      imgPreview.src = e.target.result;
    }

    reader.readAsDataURL(file);
  }
}

const closeButtonHandler = () => {
  closeForm();
}

const keydownHandler = (evt) => {
  if (evt.key === KeyCode.ESC) {
    closeForm();
  }
};

// Функция не стрелочная, потому что нужен хойстинг
function closeForm () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadCloseButton.removeEventListener('click', closeButtonHandler);
  document.removeEventListener('keydown', keydownHandler);
}

const imgUploadHandler = (evt) => {
  const file = evt.target.files[0]

  if (file) {
    updatePreview(file);

    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', keydownHandler);
    imgUploadCloseButton.addEventListener('click', closeButtonHandler);
  }
};

export const initUploadForm = () => {
  imgUploadInput.addEventListener('change', imgUploadHandler);
}