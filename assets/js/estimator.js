/* =========================================================
   ESTIMATOR.JS — logic specific to estimator.html only
   (appliance data, step navigation, calculation, report)
   ========================================================= */

const APPLIANCES = [
  { id: 'led_bulb', name: 'LED Bulb', watt: 10, cat: 'Lighting' },
  {
    id: 'outdoor_light',
    name: 'Outdoor / Security Light',
    watt: 20,
    cat: 'Lighting',
  },
  { id: 'standing_fan', name: 'Standing Fan', watt: 60, cat: 'Cooling' },
  { id: 'ceiling_fan', name: 'Ceiling Fan', watt: 75, cat: 'Cooling' },
  { id: 'ac_1hp', name: 'Air Conditioner (1HP)', watt: 900, cat: 'Cooling' },
  {
    id: 'ac_15hp',
    name: 'Air Conditioner (1.5HP)',
    watt: 1300,
    cat: 'Cooling',
  },
  { id: 'fridge', name: 'Refrigerator (Standard)', watt: 150, cat: 'Kitchen' },
  { id: 'freezer', name: 'Chest Freezer', watt: 200, cat: 'Kitchen' },
  { id: 'microwave', name: 'Microwave', watt: 1000, cat: 'Kitchen' },
  { id: 'kettle', name: 'Electric Kettle', watt: 1500, cat: 'Kitchen' },
  { id: 'blender', name: 'Blender', watt: 400, cat: 'Kitchen' },
  {
    id: 'tv',
    name: 'LED TV (32"–43")',
    watt: 100,
    cat: 'Entertainment & Office',
  },
  { id: 'laptop', name: 'Laptop', watt: 65, cat: 'Entertainment & Office' },
  {
    id: 'desktop',
    name: 'Desktop Computer',
    watt: 200,
    cat: 'Entertainment & Office',
  },
  {
    id: 'router',
    name: 'WiFi Router',
    watt: 15,
    cat: 'Entertainment & Office',
  },
  {
    id: 'sound_system',
    name: 'Sound System',
    watt: 150,
    cat: 'Entertainment & Office',
  },
  {
    id: 'phone_charger',
    name: 'Phone Charger',
    watt: 10,
    cat: 'Entertainment & Office',
  },
  {
    id: 'washing_machine',
    name: 'Washing Machine',
    watt: 500,
    cat: 'Heavy Duty',
  },
  {
    id: 'water_pump',
    name: 'Water Pump (0.5HP)',
    watt: 400,
    cat: 'Heavy Duty',
  },
  { id: 'iron', name: 'Electric Iron', watt: 1000, cat: 'Heavy Duty' },
  { id: 'printer', name: 'Printer', watt: 100, cat: 'Heavy Duty' },
];
const CATEGORIES = [
  'Lighting',
  'Cooling',
  'Kitchen',
  'Entertainment & Office',
  'Heavy Duty',
];
const qty = {};
APPLIANCES.forEach((a) => (qty[a.id] = 0));

function renderAppliances() {
  const container = document.getElementById('applianceList');
  let html = '';
  CATEGORIES.forEach((cat) => {
    html += `<div class="appliance-cat"><h4>${cat}</h4>`;
    APPLIANCES.filter((a) => a.cat === cat).forEach((a) => {
      html += `<div class="appliance-row">
        <div class="appliance-info"><strong>${a.name}</strong><span>${a.watt}W each</span></div>
        <div class="qty-control">
          <button class="qty-btn" type="button" data-id="${a.id}" data-dir="-1">−</button>
          <span class="qty-val" id="qty-${a.id}">0</span>
          <button class="qty-btn" type="button" data-id="${a.id}" data-dir="1">+</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  });
  container.innerHTML = html;
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.qty-btn');
    if (!btn) return;
    const id = btn.dataset.id;
    const dir = parseInt(btn.dataset.dir);
    qty[id] = Math.max(0, Math.min(20, qty[id] + dir));
    document.getElementById('qty-' + id).textContent = qty[id];
    updateTotalWatts();
  });
}

function totalWatts() {
  return APPLIANCES.reduce((sum, a) => sum + (qty[a.id] || 0) * a.watt, 0);
}
function updateTotalWatts() {
  document.getElementById('totalWattsDisplay').textContent =
    totalWatts().toLocaleString() + ' W';
}

const STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT (Abuja)',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];
function renderStates() {
  const select = document.getElementById('stateSelect');
  select.innerHTML = STATES.map(
    (s) => `<option ${s === 'Rivers' ? 'selected' : ''}>${s}</option>`,
  ).join('');
}

let selectedSupply = null;
let selectedGoal = null;
document.querySelectorAll('.opt-grid').forEach((grid) => {
  const group = grid.dataset.group;
  grid.querySelectorAll('.opt-card').forEach((card) => {
    card.addEventListener('click', () => {
      grid
        .querySelectorAll('.opt-card')
        .forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      if (group === 'supply') selectedSupply = card.dataset.value;
      if (group === 'goal') selectedGoal = card.dataset.value;
    });
  });
});

function goToStep(n) {
  document
    .querySelectorAll('.calc-step')
    .forEach((s) => s.classList.remove('active'));
  document.getElementById('step' + n).classList.add('active');
  document.querySelectorAll('.step-node').forEach((node) => {
    const s = parseInt(node.dataset.step);
    node.classList.remove('active', 'done');
    if (s < n) node.classList.add('done');
    if (s === n) node.classList.add('active');
  });
  document.querySelectorAll('.step-line').forEach((line, idx) => {
    line.classList.toggle('done', idx < n - 1);
  });
  document
    .querySelector('.calc-page')
    .scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (n === 4) runAnalysis();
  if (n === 5) renderReport();
}

function tryGoToStep(n) {
  if (n === 2) {
    if (totalWatts() <= 0) {
      document.getElementById('error1').classList.add('show');
      return;
    }
    document.getElementById('error1').classList.remove('show');
  }
  if (n === 3) {
    if (!selectedSupply || !selectedGoal) {
      document.getElementById('error2').classList.add('show');
      return;
    }
    document.getElementById('error2').classList.remove('show');
  }
  if (n === 4) {
    const fn = document.getElementById('firstName').value.trim();
    const ln = document.getElementById('lastName').value.trim();
    const em = document.getElementById('emailInput').value.trim();
    const ph = document.getElementById('phoneInput').value.trim();
    const consent = document.getElementById('consentCheck').checked;
    const emailOk = /\S+@\S+\.\S+/.test(em);
    if (!fn || !ln || !emailOk || !ph || !consent) {
      document.getElementById('error3').classList.add('show');
      return;
    }
    document.getElementById('error3').classList.remove('show');
  }
  goToStep(n);
}

function runAnalysis() {
  const items = document.querySelectorAll('#analysisList li');
  items.forEach((li) => li.classList.remove('done'));
  const bar = document.getElementById('analysisBar');
  bar.style.width = '0%';
  let i = 0;
  const total = items.length;
  function step() {
    if (i < total) {
      items[i].classList.add('done');
      i++;
      bar.style.width = Math.round((i / total) * 100) + '%';
      setTimeout(step, 600);
    } else {
      setTimeout(() => goToStep(5), 500);
    }
  }
  step();
}

function calculateSystem() {
  const watts = totalWatts();
  let backupHours;
  const supplyBackupMap = {
    'no-grid': 20,
    occasional: 16,
    moderate: 10,
    good: 6,
  };
  if (selectedGoal === 'full-off-grid') backupHours = 24;
  else if (selectedGoal === 'nepa-backup')
    backupHours = supplyBackupMap[selectedSupply] || 12;
  else if (selectedGoal === 'hybrid-solar') backupHours = 12;
  else if (selectedGoal === 'business') backupHours = 10;
  else backupHours = 12;

  const inverterVA = watts * 1.4;
  const tiers = [1500, 2500, 3500, 5000, 7500, 10000, 15000, 20000, 30000];
  const tier = tiers.find((t) => t >= inverterVA);
  const inverterLabel = tier ? tier / 1000 + 'kVA' : '30kVA+ (Custom Build)';

  const diversity = 0.6;
  const energyWh = watts * diversity * backupHours;
  const batteryKwh = Math.ceil((energyWh / 0.8 / 1000) * 2) / 2;

  const sunHours = 5,
    panelWatt = 450,
    sysEff = 0.8;
  const panelsNeeded = Math.max(
    1,
    Math.ceil(energyWh / (sunHours * panelWatt * sysEff)),
  );

  return { watts, inverterLabel, batteryKwh, panelsNeeded, backupHours };
}

const goalLabels = {
  'nepa-backup': 'NEPA Backup',
  'hybrid-solar': 'Hybrid Solar',
  'full-off-grid': 'Full Off-Grid',
  business: 'Business / Commercial',
};

function renderReport() {
  const r = calculateSystem();
  const fn = document.getElementById('firstName').value.trim();
  document.getElementById('repGreeting').textContent = fn
    ? `Nice One, ${fn} — Here's What We Recommend`
    : `Here's What We Recommend`;
  document.getElementById('repInverter').textContent = r.inverterLabel;
  document.getElementById('repBattery').textContent =
    '~' + r.batteryKwh + ' kWh';
  document.getElementById('repPanels').textContent = r.panelsNeeded + ' × 450W';
  document.getElementById('repBackup').textContent =
    'Up to ' + r.backupHours + ' hrs/day';
  document.getElementById('repLoad').textContent =
    r.watts.toLocaleString() + ' W';

  const fullName = (
    fn +
    ' ' +
    document.getElementById('lastName').value.trim()
  ).trim();
  const state = document.getElementById('stateSelect').value;
  const summary = `Hi Jimoh Solar, I just used your Smart Load Estimator.\n\nName: ${fullName || 'N/A'}\nLocation: ${state}\nGoal: ${goalLabels[selectedGoal] || 'N/A'}\n\nEstimated system:\n- Total Load: ${r.watts}W\n- Inverter: ${r.inverterLabel}\n- Battery: ~${r.batteryKwh}kWh\n- Panels: ${r.panelsNeeded} x 450W\n- Backup: up to ${r.backupHours} hrs/day\n\nPlease send me a detailed quote.`;

  document.getElementById('waBtn').href =
    'https://wa.me/2348000000000?text=' + encodeURIComponent(summary);
  document.getElementById('emailBtn').href =
    'mailto:info@jimohsolar.com?subject=' +
    encodeURIComponent(
      'Smart Load Estimator Request - ' + (fullName || 'Website Visitor'),
    ) +
    '&body=' +
    encodeURIComponent(summary);
}

function resetCalculator() {
  APPLIANCES.forEach((a) => {
    qty[a.id] = 0;
  });
  renderAppliances();
  updateTotalWatts();
  selectedSupply = null;
  selectedGoal = null;
  document
    .querySelectorAll('.opt-card')
    .forEach((c) => c.classList.remove('active'));
  ['firstName', 'lastName', 'emailInput', 'phoneInput', 'messageInput'].forEach(
    (id) => (document.getElementById(id).value = ''),
  );
  document.getElementById('consentCheck').checked = false;
  document
    .querySelectorAll('.error-text')
    .forEach((e) => e.classList.remove('show'));
  goToStep(1);
}

renderAppliances();
renderStates();
