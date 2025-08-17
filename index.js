/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// === State ===
const freelancers = Array.from({ length: NUM_FREELANCERS }, makeFreelancer);
const averagePrice = getAveragePrice();

console.log(freelancers, averagePrice);

//** @returns {Freelancer} a Freelancer from constants by index */
function makeFreelancer(_, index) {
  return {
    name: NAMES[index % NAMES.length],
    occupation: OCCUPATIONS[index % OCCUPATIONS.length],
    rate: Math.floor(
      Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1) + PRICE_RANGE.min
    ),
  };
}

/** returns {number} the average rate of all freelancers */
function getAveragePrice() {
  const total = freelancers.reduce((accum, currentFreelancer) => {
    return accum + currentFreelancer.rate;
  }, 0);

  return total / freelancers.length;
}

// ====== Components =====
function AveragePrice() {
  const $p = document.createElement("p");
  $p.textContent = `Average Price: $${averagePrice.toFixed(2)}`;
  return $p;
}

function FreelancerRow({ name, occupation, rate }) {
  const $tr = document.createElement("tr");
  $tr.innerHTML = `
     <td>${name}</td>
     <td>${occupation}</td>
     <td>$${rate}</td>
  `;
  return $tr;
}

function FreelancerRows() {
  const $tbody = document.createElement("tbody");
  const $rows = freelancers.map(FreelancerRow);
  $tbody.replaceChildren(...$rows);
  return $tbody;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
   <h1>Freelancer Table</h1>
   <AveragePrice></AveragePrice>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Occupation</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody id="FreelancerRows"></tbody>
    </table>
  `;

  $app.querySelector("AveragePrice").replaceWith(AveragePrice());
  $app.querySelector("#FreelancerRows").replaceWith(FreelancerRows());
}

render();