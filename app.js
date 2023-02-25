// URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

// Example: https://openapi.programming-hero.com/api/phones?search=iphone
// Phone detail url:

// URL Format: https://openapi.programming-hero.com/api/phone/${id}

// Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089

const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displayPhones = (phones) => {
  console.log(phones);
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.innerHTML = "";
  // phones = phones.slice(0, 9);

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
        <div class="card-body">
          <h5 class="card-title text-center">${phone_name}</h5>
          <p class="card-text text-center">Brand: ${brand}</p>
        </div>
      </div>
      `;
      phonesContainer.appendChild(phoneDiv);
    });
  }
  toggleSpinner(false);
};

document.getElementById("search-btn").addEventListener("click", () => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  loadPhones(searchText);
  searchField.value = "";
});

const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// loadPhones("samsung");
