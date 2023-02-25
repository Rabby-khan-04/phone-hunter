// URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

// Example: https://openapi.programming-hero.com/api/phones?search=iphone
// Phone detail url:

// URL Format: https://openapi.programming-hero.com/api/phone/${id}

// Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089

const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
  } catch (error) {
    console.log(error);
  }
};

const displayPhones = (phones, dataLimit) => {
  // console.log(phones);
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.innerHTML = "";

  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 9);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  const noPhoneMsg = document.getElementById("no-phone-message");

  if (phones.length == 0) {
    noPhoneMsg.classList.remove("d-none");
  } else {
    noPhoneMsg.classList.add("d-none");
    phones.forEach((phone) => {
      const { brand, phone_name, slug, image } = phone;
      const phoneDiv = document.createElement("div");
      phoneDiv.classList.add("col");
      phoneDiv.innerHTML = `
      <div class="card p-4">
        <img src="${image}" class="card-img-top" alt="product-img">
        <div class="card-body text-center">
          <h5 class="card-title">${phone_name}</h5>
          <p class="card-text">Brand: ${brand}</p>
          <button data-bs-toggle="modal" data-bs-target="#phone-detalis" onclick="showDetails('${slug}')" class="btn btn-warning">View Details</button>
        </div>
      </div>
      `;
      phonesContainer.appendChild(phoneDiv);
    });
  }
  toggleSpinner(false);
};

const processAndDisplay = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  loadPhones(searchText, dataLimit);
};

document.getElementById("search-btn").addEventListener("click", () => {
  processAndDisplay(10);
});

const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

document.getElementById("view-all-btn").addEventListener("click", () => {
  processAndDisplay();
  document.getElementById("vshow-all").classList.add("d-none");
});

document.getElementById("search-field").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    processAndDisplay(10);
  }
});

const showDetails = async (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;

  const res = await fetch(url);
  const data = await res.json();
  showPhoneDetails(data.data);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const { name, releaseDate, brand, image, mainFeatures, others } = phone;

  const { chipSet, displaySize, memory, sensors, storage } = mainFeatures;

  const { Bluetooth, GPS, NFC, Radio, USB, WLAN } = others;

  document.getElementById("modal-title").innerText = name;
  document.getElementById("main-fetures").innerHTML = `
  <h3>Main Features</h3>
  <ul>
  <li>${chipSet ? chipSet : "Data Not Found"}</li>
  <li>${displaySize ? displaySize : "Data Not Found"}</li>
  <li>${memory ? memory : "Data Not Found"}</li>
  <li>${storage ? storage : "Data Not Found"}</li>
  </ul>
  `;
  const sensorsDiv = document.createElement("div");
  const sensorUl = document.createElement("ul");
  sensorsDiv.innerHTML = `<h3>Main Features</h3>`;
  sensorsDiv.appendChild(sensorUl);
  sensors.forEach((sensor) => {
    const sensorLi = document.createElement("li");
    sensorLi.innerText = sensor;
    sensorUl.appendChild(sensorLi);
  });
  document.getElementById("main-fetures").appendChild(sensorsDiv);
};

loadPhones("samsung", 10);
