const form = document.querySelector('form');
const input = document.querySelector('input[type=tel]');
const blacklist = document.getElementById('blacklist');
var blacklist_items = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const phoneNumber = input.value;
  //if (isValidPhoneNumber(phoneNumber)) {
    addPhoneNumberToBlacklist(phoneNumber);
  //} else {
  //  alert('Please enter a valid phone number.');
 // }
});

function isValidPhoneNumber(phoneNumber) {
  // Check if the phone number is a valid US phone number
  const regex = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
  return regex.test(phoneNumber);
}

function addPhoneNumberToBlacklist(phoneNumber) {
    if (blacklist_items.includes(phoneNumber)) {
      alert("Este número ya está en la lista!");
      return;
    }
    blacklist_items.push(phoneNumber);
    localStorage.setItem("blacklist", JSON.stringify(blacklist_items));
    displayBlacklist();
}


// Add the ability to view all the numbers in the blacklist
function viewAllBlacklistedNumbers() {
  const blacklistedNumbers = Array.from(blacklist.children).map((li) => li.textContent);
  alert(`Blacklisted numbers:\n${blacklistedNumbers.join('\n')}`);
}

function displayBlacklist() {
    const blacklistElement = document.getElementById("blacklist");
    let html = "";
    if (blacklist_items.length > 0) {
      html += "<h3>Mi lista de Numeros Molestos</h3>";
      html += "<ul>";
      blacklist_items.forEach(function (phoneNumber) {
        html += `<li>${phoneNumber}</li>`;
      });
      html += "</ul>";
    } else {
      html += "<p>No hay números en la lista de numeros molestos.</p>";
    }
    blacklistElement.innerHTML = html;
  }

  
window.onload = function () {
    blacklist_items = JSON.parse(localStorage.getItem("blacklist")) || [];
    displayBlacklist();
  };

  function verifyNumber() {
    const number = document.getElementById('phone-number').value;
    const blacklist = JSON.parse(localStorage.getItem('blacklist')) || [];
  
    if (blacklist.includes(number)) {
      alert('Este número ya está en la lista y pertenece a XXXXXX');
    } else {
      alert('Este número NO está en la lista!');
    }
  }
  
  

// Add a button to view all the numbers in the blacklist
const viewButton = document.createElement('button');
viewButton.textContent = 'View all blacklisted numbers';
viewButton.addEventListener('click', viewAllBlacklistedNumbers);
document.getElementById('verify-button').addEventListener('click', verifyNumber);
