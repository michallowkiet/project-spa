const btnHamburger = document.querySelector(".mobile-hamburger");
const btnClose = document.querySelector(".mobile-close");
const mainNavMenu = document.querySelector(".main-nav-menu");

const appointmentForm = document.querySelector("#appointmentForm");
const errors = document.querySelector(".errors");

function sendData(data) {
  fetch("https://akademia108.pl/api/ajax/post-appointment.php", {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((resData) => {
      errors.innerText = `Dziękujemy ${resData.appointment.name}. Zostałeś zapisany`;
    })
    .catch((error) => console.error(error));
}

btnHamburger.addEventListener("click", () => mainNavMenu.classList.add("open"));
btnClose.addEventListener("click", () => mainNavMenu.classList.remove("open"));

mainNavMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mainNavMenu.classList.remove("open");
  }
});

appointmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let allFields = false;
  errors.innerText = "";
  const appointment = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    service: document.querySelector("#service").value,
    phone: document.querySelector("#phone").value,
    date: document.querySelector("#date").value,
    time: document.querySelector("#time").value,
    message: document.querySelector("#note").value,
  };

  const formFields = document.querySelectorAll(".form-field");

  formFields.forEach((field) => {
    if (field.value === "") {
      field.classList.add("error");
      allFields = false;
    } else {
      field.classList.remove("error");
      allFields = true;
    }
  });

  if (allFields) {
    sendData(appointment);
    appointmentForm.reset();
  } else {
    errors.innerText = "Fill in the required fields";
  }
});
