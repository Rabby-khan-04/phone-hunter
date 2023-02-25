// URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

// Example: https://openapi.programming-hero.com/api/phones?search=iphone
// Phone detail url:

// URL Format: https://openapi.programming-hero.com/api/phone/${id}

// Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089

const loadPhones = async () => {
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
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
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card">
      <img src="..." class="card-img-top" alt="product-img">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text"></p>
      </div>
    </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
};

loadPhones();
