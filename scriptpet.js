let count = 30000;
const addSignature = (person) => {
  const newSignature = document.createElement('p');
  newSignature.textContent = `🖊️ ${person.name}, from ${person.hometown} supports this cause.`;

  const signaturesSection = document.querySelector(".signatures");
  signaturesSection.appendChild(newSignature);
  const oldCounter = document.querySelector('#counter');
  oldCounter.remove();

  count += 1;

  const newCounter = document.createElement('p');
  newCounter.id = 'counter';
  count = count.toLocaleString();
  newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

  const signaturesDiv = document.querySelector('.signatures');
  signaturesDiv.appendChild(newCounter);
}

const signNowButton = document.getElementById("sign-now-button");
const email = document.getElementById('Email');
const validateForm = () => {
  let containsErrors = false;

  let petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value,
  }
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }
  if (!email.value.includes('.com')) {
    containsErrors = true;
    email.classList.add('error');
  } else {
    email.classList.remove('error');
  }

  if (containsErrors == false) {
    addSignature(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
    containsErrors = false;
    toggleModal(person)
  }

}

var scaleFactor = 1;
var modalImage = document.getElementById('modal-image');

function scaleImage() {
  scaleFactor = scaleFactor === 1 ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
}

function toggleModal(person) {
  var modal = document.getElementById('thanks-modal');
  var modalContent = document.getElementById('thanks-modal-content');

  modalContent.textContent = 'Thanks you so much, ' + person.name + ' from ' + person.hometown;

  modal.style.display = 'flex';
  var intervalId = setInterval(scaleImage, 500);
  setTimeout(function() {
    clearInterval(intervalId);
  }, 3000);
}

const button = document.getElementById("close");
function hideModal() {
  const modal = document.getElementById("thanks-modal");
  modal.style.display = "none";
}

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

signNowButton.addEventListener('click', validateForm);
button.addEventListener("click", hideModal);