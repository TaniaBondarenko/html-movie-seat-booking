const SEATS = document.querySelector(".seats");
let inputs = Array.from(document.querySelectorAll("input"));
let bookingButton;
let shopContainer;
let ticketChosen;
let ticketValue;
let ticketClass;
let totalPrice = 0;
let row;
let count = 0;
let bookTicket;

function createShopContainer() {
  shopContainer = document.createElement("div");
  shopContainer.setAttribute("class", "shopContainer");
  SEATS.appendChild(shopContainer);
}

SEATS.addEventListener("click", chooseTicket);
SEATS.addEventListener("click", createBookingButton, { once: true });

function chooseTicket({ target }) {
  if (!target.matches("input") || bookingButton.classList.contains("checked")) {
    return;
  } else if (!target.classList.contains("clicked")) {
    ticketChosen = target;
    ticketValue = ticketChosen.value;
    rowSeat = ticketValue.split("-");
    ticketChosen.classList.add("clicked");
    addTicket();
  } else if (target.classList.contains("clicked")) {
    target.classList.remove("clicked");
    let ticketForDelete = document.getElementsByClassName(`${target.value}`)[0];
    ticketForDelete.remove();
    totalPrice -= price;
    count -= 1;
  }
}

function addTicket() {
  defineTicketClass();
  bookTicket = document.createElement("div");
  bookTicket.setAttribute("class", `bookTicket ${ticketValue}`);
  shopContainer.appendChild(bookTicket);
  bookTicket.innerHTML += `
                    <span class="bookTicketRow">Row ${rowSeat[0]} </span>
                    <span class="bookTicketSeat">Seat ${rowSeat[1]} </span> 
                    <span class="BookTicketClass">${ticketClass} </span> 
                    <span class="price">${price} usd.</span>
                   `;
}

function defineTicketClass() {
  row = ticketChosen.parentElement.parentElement;
  if (row.classList.contains("rowVip")) {
    ticketClass = "VIP";
    price = 300;
  } else {
    ticketClass = "LUX";
    price = 100;
  }
  totalPrice += price;
  count += 1;
}

function createBookingButton() {
  bookingButton = document.createElement("div");
  bookingButton.setAttribute("class", "submitButton");
  bookingButton.innerHTML = `<button class="booking" type="submit">Continue</button>`;
  SEATS.appendChild(bookingButton);
  createShopContainer();
  bookingButton.addEventListener("click", buyTicket, { once: true });
}

function buyTicket() {
  let paidDiv = document.createElement("div");
  shopContainer.appendChild(paidDiv);
  paidDiv.innerHTML = `<hr>Total price for ${count} tickets - ${totalPrice}usd`;
  bookingButton.classList.add("checked");
  stopNextActions();
  createPaidButton();
}

function stopNextActions() {
  inputs.forEach((element) => element.setAttribute("disabled", "disabled"));
  bookingButton.remove();
}

function createPaidButton() {
  paidButton = document.createElement("div");
  paidButton.setAttribute("class", "paidButton");
  paidButton.innerHTML = `<button class="lastButton" type="submit">Pay</button>`;
  shopContainer.appendChild(paidButton);
}
