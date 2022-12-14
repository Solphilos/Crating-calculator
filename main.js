// tab navigation control
const tabNav = (() => {
  const input1 = document.getElementById('input1');
  const input2 = document.getElementById('input2');
  const homepage = document.getElementById('homepage');
  const totalsWindow = document.getElementById('totals_window');
  const unboxed = document.querySelector('.unboxed');
  const boxed = document.querySelector('.boxed');
  const home = document.querySelector('.home');
  const totals = document.querySelector('.totals');

  // sets properties that allow tabs to display or close windows
  const setDisplay = (element1, element2, element3, element4) => {
    const e1 = element1;
    const e2 = element2;
    const e3 = element3;
    const e4 = element4;
    e1.style.display = 'none';
    e2.style.display = 'none';
    e3.style.display = 'none';
    e4.style.display = 'flex';
  };

  // sets and removes id names for tabs, rendering them active or inactive
  const setAndRemove = (ele1, ele2, ele3, ele4) => {
    const id1 = ele1.className;
    const id2 = ele2.className;
    const id3 = ele3.className;
    const id4 = ele4.className;
    ele1.removeAttribute('id', id1);
    ele2.removeAttribute('id', id2);
    ele3.removeAttribute('id', id3);
    ele4.setAttribute('id', id4);
  };

  // "unboxed" tab
  const turnPage = () => {
    setDisplay(input1, homepage, totalsWindow, input2);
    setAndRemove(boxed, home, totals, unboxed);
  };

  // "boxed" tab
  const turnPage2 = () => {
    setDisplay(input2, homepage, totalsWindow, input1);
    setAndRemove(unboxed, home, totals, boxed);
  };
  // "home" tab
  const turnpageHome = () => {
    setDisplay(input2, input1, totalsWindow, homepage);
    setAndRemove(unboxed, boxed, totals, home);
  };

  // "results" tab
  const turnpageResults = () => {
    setDisplay(input2, input1, homepage, totalsWindow);
    setAndRemove(unboxed, boxed, home, totals);
  };

  return {
    turnPage,
    turnPage2,
    turnpageHome,
    turnpageResults,
  };
})();

const homeNextButton = () => {
  const buttonValue = document.querySelector('input[name="boxedOrNot"]:checked').value;
  if (buttonValue === 'yes') {
    tabNav.turnPage2();
  } else if (buttonValue === 'no') {
    tabNav.turnPage();
  }
};

document.getElementById('nextButton').addEventListener('click', homeNextButton);

// sets table results to zero as default. Also returns all caculated values back to zero.
const resetValues = (() => {
  function reset() {
    document.getElementById('bases').value = '';
    document.querySelector('input[name="new"]').value = '';
    document.querySelector('input[name="old"]').value = '';
    document.getElementById('result-panel').removeChild(document.getElementById('tableContainer'));
    document.getElementById('subButton').removeAttribute('disabled', 'true');
    crateNum = 1;
  }

  return {
    reset,
  };
})();

// creates click events that allow tab/window navigation.
const addListeners = (() => {
  document.querySelector('.unboxed').addEventListener('click', tabNav.turnPage);
  document.querySelector('.boxed').addEventListener('click', tabNav.turnPage2);
  document.querySelector('.home').addEventListener('click', tabNav.turnpageHome);
  document.querySelector('.totals').addEventListener('click', tabNav.turnpageResults);
})();

/// ////////////// Calculator Logic Module /////////////////////////////

/* this will be the logic for calculating the dimensions and materials of crates
  based on amount of boxes. When user inputs number of boxes + box type, return width,
  length and height
  and amount of wood used. */

function sectionFactory(height, width) {
  return { height, width };
}

const newBox = sectionFactory(5, 6);
const oldBox = sectionFactory(4.5, 11);
const alumBase = sectionFactory(2, 5);
const alumMid = sectionFactory(1.85, 3.85);
const alumTip = sectionFactory(1.75, 2.5);
const fGBase = sectionFactory();
const fGSecond = sectionFactory();
const fGMid = sectionFactory();

let newBoxSpread;
let oldBoxSpread;
let alumBaseSpread;
let alumMidSpread;
let alumTipSpread;
let fGBaseSpread;
let fGSecondSpread;
let fGMidSpread;
let combinedSpread;
let skidHeight;
let newAmount;
let oldAmount;
let boxNumNew;
let boxNumOld;
let newRowsHigh;
let oldRowsHigh;
let skidWidth;
let length;
let pallets;
let twoByFour;
let plywood;
let crateNum = 1;
let tempNewAmount;

// returns width of specified number of new boxes placed side by side.
const addNewBoxes = (amount) => {
  newAmount = amount;
  newBoxSpread = newBox.width * amount;
  return {
    newBoxSpread,
  };
};

// returns width of specified number of old boxes placed side by side.
const addOldBoxes = (amount) => {
  oldAmount = amount;
  oldBoxSpread = oldBox.width * amount;
  return {
    oldBoxSpread,
  };
};

// returns the combined width of specified number of old and new boxes placed side by side.
const boxCombinator = (amountNew, amountOld) => {
  addNewBoxes(amountNew);
  addOldBoxes(amountOld);
  combinedSpread = newBoxSpread + oldBoxSpread;
  return {
    combinedSpread,
  };
};

const findCrateHeight = (amount1, amount2, crateWidth, high) => {
  const x = amount1 / crateWidth;
  const y = amount2 / crateWidth;
  const rowsHigh = x + y;
  const m = Math.ceil(rowsHigh);
  skidHeight = m * high;
};

// This function calculates the amount of 2x4 lumber used in each crate.

const getWoodAmount = () => {
  let sideBoards;

  if (skidWidth === '43"') {
    sideBoards = (skidHeight * 8) / 12;
    twoByFour = `${Math.ceil(sideBoards) + 59} feet`;
  } else if (skidWidth === '18"') {
    sideBoards = ((skidHeight + 3) * 6) / 12;
    twoByFour = `${Math.ceil(sideBoards) + 50} feet`;
  } else if (skidWidth === '12"') {
    sideBoards = ((skidHeight + 3) * 6) / 12;
    twoByFour = `${Math.ceil(sideBoards) + 44} feet`;
  }
};

// This function calculates the amount of plywood used in each crate.

const getPlyAmount = () => {
  let sidePanels;

  if (skidWidth === '43"') {
    sidePanels = skidHeight * 4 / 48;
    plywood = `${Math.ceil(sidePanels) + 4} sheets`;
  } else if (skidWidth === '18"') {
    sidePanels = skidHeight * 4 / 48;
    plywood = Math.ceil(sidePanels) + 1 + ' sheets';
  } else if (skidWidth === '12"') {
    sidePanels = skidHeight * 4 / 48;
    plywood = Math.ceil(sidePanels) + 1 + ' sheets';
  }
};

// This function gets the values of the "crate type" select element.

const getEnclosedValues = () => {
  const select = document.getElementById('crate_type');
  const values = select.options[select.selectedIndex].value;
  if (values === 'Fully enclosed') {
    getPlyAmount();
  } else if (values === 'Minimal - No plywood') {
    plywood = 0;
  }
};

// DOM table creation:  Save and delete table element from HTML.
const createTable = (width, height, length, boards, ply, crateNumb, pallets, newboxes, oldboxes) => {
  const tableContainer = document.createElement('div');
  tableContainer.setAttribute('id', 'tableContainer');
  const resultPanel = document.getElementById('result-panel');
  resultPanel.appendChild(tableContainer);
  const header = document.createElement('div');
  header.setAttribute('id', 'tableHeader');
  tableContainer.appendChild(header);
  tableContainer.style.width = '90%';
  tableContainer.style.display = 'flex';
  tableContainer.style.justifyContent = 'center';
  header.textContent = `Crate ${crateNumb}`;
  header.style.border = 'solid black 1px';
  header.style.backgroundColor = 'white';
  header.style.textAlign = 'center';
  header.style.width = '4%';
  const table = document.createElement('TABLE');
  tableContainer.appendChild(table);
  table.setAttribute('id', 'resultTable');
  const row0 = document.createElement('TR');
  const rowB = document.createElement('TR');
  const row1 = document.createElement('TR');
  const row2 = document.createElement('TR');
  const row3 = document.createElement('TR');
  const row4 = document.createElement('TR');
  row0.setAttribute('id', 'row0');
  row1.setAttribute('id', 'row1');
  row2.setAttribute('id', 'row2');
  row3.setAttribute('id', 'row3');
  row4.setAttribute('id', 'row4');
  table.appendChild(row0);
  table.appendChild(rowB);
  table.appendChild(row1);
  table.appendChild(row2);
  table.appendChild(row3);
  table.appendChild(row4);
  const th0 = document.createElement('TH');
  const thNew = document.createElement('TH');
  const thOld = document.createElement('TH');
  const th1 = document.createElement('TH');
  const th2 = document.createElement('TH');
  const th3 = document.createElement('TH');
  const th4 = document.createElement('TH');
  th0.style.backgroundColor = '24507C';
  th0.textContent = 'Boxes';
  th0.style.backgroundColor = '#93c5fd';
  th0.rowSpan = '2';
  th0.colSpan = '2';
  thNew.textContent = 'New boxes';
  thOld.textContent = 'Old Boxes';
  thNew.style.backgroundColor = '#93c5fd';
  thOld.style.backgroundColor = '#93c5fd';
  th1.rowSpan = '2';
  th1.classList.add('dimensions');
  th1.style.backgroundColor = '#24507C';
  th1.style.color = 'white';
  th1.textContent = 'Dimensions';
  th2.style.backgroundColor = '#24507C';
  th2.style.color = 'white';
  th2.textContent = 'Length';
  th3.style.backgroundColor = '#24507C';
  th3.style.color = 'white';
  th3.textContent = 'Width';
  th4.style.backgroundColor = '#24507C';
  th4.style.color = 'white';
  th4.textContent = 'Height';
  row0.appendChild(th0);
  row0.appendChild(thNew);
  row0.appendChild(thOld);
  row1.appendChild(th1);
  row1.appendChild(th2);
  row1.appendChild(th3);
  row1.appendChild(th4);
  const newboxs = document.createElement('TD');
  const oldboxs = document.createElement('TD');
  const tdLength = document.createElement('TD');
  const tdWidth = document.createElement('TD');
  const tdHeight = document.createElement('TD');
  tdLength.setAttribute('id', 'length');
  tdWidth.setAttribute('id', 'width');
  tdHeight.setAttribute('id', 'height');
  newboxs.setAttribute('id', 'newboxs');
  oldboxs.setAttribute('id', 'oldboxs');
  row2.appendChild(tdLength);
  row2.appendChild(tdWidth);
  row2.appendChild(tdHeight);
  rowB.appendChild(newboxs);
  rowB.appendChild(oldboxs);
  const th5 = document.createElement('TH');
  const th6 = document.createElement('TH');
  const th7 = document.createElement('TH');
  const th8 = document.createElement('TH');
  th5.rowSpan = '2';
  th5.colSpan = '1';
  th5.style.backgroundColor = '#4b4b4b';
  th5.style.color = 'white';
  th5.textContent = 'Materials';
  th6.style.backgroundColor = '#4b4b4b';
  th6.style.color = 'white';
  th6.textContent = '2x4';
  th7.style.backgroundColor = '#4b4b4b';
  th7.style.color = 'white';
  th7.textContent = 'Plywood';
  th8.style.backgroundColor = '#4b4b4b';
  th8.style.color = 'white';
  th8.textContent = 'Pallets';
  row3.appendChild(th5);
  row3.appendChild(th6);
  row3.appendChild(th7);
  row3.appendChild(th8);
  const tdTwoByFour = document.createElement('TD');
  const tdPly = document.createElement('TD');
  const tdPallet = document.createElement('TD');
  tdTwoByFour.setAttribute('id', '2x4');
  tdPly.setAttribute('id', 'ply');
  tdPallet.setAttribute('id', 'pallets');
  row4.appendChild(tdTwoByFour);
  row4.appendChild(tdPly);
  row4.appendChild(tdPallet);
  tdWidth.innerHTML = width;
  tdHeight.innerHTML = height;
  tdLength.innerHTML = length;
  tdTwoByFour.innerHTML = boards;
  tdPly.innerHTML = ply;
  tdPallet.innerHTML = pallets;
  newboxs.innerHTML = newboxes;
  oldboxs.innerHTML = oldboxes;
};

// dictates how table element is displayed, depending on how many tables pop the containing div.
function resultPanelMod() {
  if (crateNum < 3) {
    document.getElementById('result-panel').style.justifyContent = 'space-evenly';
  } else if (crateNum >= 3) {
    document.getElementById('result-panel').style.removeProperty('justify-content');
  }
}

// this function will be used exclusively for mixed boxes

const getSkidSizeMixed = () => {
  if (combinedSpread > 40 && combinedSpread < 235 && newBoxSpread < 217 && oldBoxSpread < 199) {
    skidWidth = '43"';
    findCrateHeight(newBoxSpread, oldBoxSpread, 40, 5);
    getEnclosedValues();
    getWoodAmount();
    createTable(skidWidth, skidHeight + 8, '16\'', twoByFour, plywood, crateNum, 3, newAmount, oldAmount);
  } else if (combinedSpread > 0 && combinedSpread <= 24) {
    skidWidth = '12"';
    findCrateHeight(newBoxSpread, oldBoxSpread, 12, 5);
    getEnclosedValues();
    getWoodAmount();
    
  } else if (combinedSpread > 24 && combinedSpread <= 40) {
    skidWidth = '18"';
    findCrateHeight(newBoxSpread, oldBoxSpread, 18, 5);
    getEnclosedValues();
    getWoodAmount();
    
  } else if (newBoxSpread > 216 && oldBoxSpread < 1) {
    alert('newBoxFilter');
    // new boxes only
    
   

   
    
    // need to return combinedspread to its original number before continuing
    const remainder = combinedSpread - 216;
    combinedSpread = remainder;
    newBoxSpread = remainder;
    const boxRemainder = remainder / newBox.width;
    tempNewAmount = boxRemainder;   
    getSkidSizeMixed();

    combinedSpread = 216;
    newBoxSpread = 216;
    newAmount = 36;
    oldAmount = 0;
    crateNum += 1;
    getSkidSizeMixed();

    
   
  } else if (oldBoxSpread > 198) {
    alert('oldBoxFilter');
    // old boxes only
    const remainder = combinedSpread - 198;
    combinedSpread = remainder;
    oldBoxSpread = remainder;
    const boxRemainder = remainder / oldBox.width;
    oldAmount = boxRemainder;
    getSkidSizeMixed();
    combinedSpread = 198;
    oldBoxSpread = 198;
    oldAmount = 18;
    crateNum += 1;
    getSkidSizeMixed();
  } 
}

// using the combined width of boxes, returns all crate dimensions and relates specs.
const getSkidSize = () => {
  resultPanelMod();
  if (combinedSpread > 40 && combinedSpread < 235 && newBoxSpread < 217 && oldBoxSpread < 199) {
    skidWidth = '43"';
    findCrateHeight(newBoxSpread, oldBoxSpread, 40, 5);
    getEnclosedValues();
    getWoodAmount();
    createTable(skidWidth, skidHeight + 8, '16\'', twoByFour, plywood, crateNum, 3, newAmount, oldAmount);
  } else if (combinedSpread > 0 && combinedSpread <= 24) {
    skidWidth = '12"';
    findCrateHeight(newBoxSpread, oldBoxSpread, 12, 5);
    getEnclosedValues();
    getWoodAmount();
    createTable(skidWidth, skidHeight + 8, '16\'', twoByFour, plywood, crateNum, 0, newAmount, oldAmount);
  } else if (combinedSpread > 24 && combinedSpread <= 40) {
    skidWidth = '18"';
    findCrateHeight(newBoxSpread, oldBoxSpread, 18, 5);
    getEnclosedValues();
    getWoodAmount();
    createTable(skidWidth, skidHeight + 8, '16\'', twoByFour, plywood, crateNum, 0, newAmount, oldAmount);
  } else if (newBoxSpread > 216 && oldBoxSpread < 1) {
    alert('newBoxFilter');
    // new boxes only
    const remainder = combinedSpread - 216;
    combinedSpread = remainder;
    newBoxSpread = remainder;
    const boxRemainder = remainder / newBox.width;
    newAmount = boxRemainder;
    getSkidSize();
    combinedSpread = 216;
    newBoxSpread = 216;
    newAmount = 36;
    crateNum += 1;
    getSkidSize();
  } else if (oldBoxSpread > 198) {
    alert('oldBoxFilter');
    // old boxes only
    const remainder = combinedSpread - 198;
    combinedSpread = remainder;
    oldBoxSpread = remainder;
    const boxRemainder = remainder / oldBox.width;
    oldAmount = boxRemainder;
    getSkidSize();
    combinedSpread = 198;
    oldBoxSpread = 198;
    oldAmount = 18;
    crateNum += 1;
    getSkidSize();
  } 

  // work on this function. This may need to be split into multiple functions instead of one.
  // treat new and old boxes as individual crates. Split the difference. 
   else if (combinedSpread > 234) {
    // 216 is the max number for new boxes, 198 is max for old. 234 max for mixed.
     alert('mixed filter');
    // remove old boxes from the equation and create new box skid 
    let newSpreadStorage = newBoxSpread;
    let oldSpreadStorage = oldBoxSpread;
    let combinedSpreadStorage = combinedSpread;
    let tempSpread = combinedSpread - oldBoxSpread; 
    combinedSpread = tempSpread;
    oldBoxSpread = 0; 
    getSkidSizeMixed();     // this should separate old from new boxes and create skids of new only.
    // remove new boxes from the equation and create old box skid
    /*newBoxSpread = newSpreadStorage;
    oldBoxSpread = oldSpreadStorage;
    combinedSpread = combinedSpreadStorage;
    tempSpread = combinedSpread - newBoxSpread;
    combinedSpread = tempSpread; 
    newBoxSpread = 0; */
    newAmount = tempNewAmount;
    
    oldBoxSpread = oldSpreadStorage;
    combinedSpread = oldBoxSpread + newAmount;
    getSkidSizeMixed();



   } 
};

// create new getSkidSize function just for mixed boxes!

////////////Unboxed Gates Caluclator Logic ///////////////

// returns width of specified number of alum bases (no sleeves) placed side by side.
const addAlumBases = (amount) => {
  alumBaseAmount = amount;
  alumBaseSpread = alumBase.width * amount;
  return {
    alumBaseSpread,
  };
};

// returns width of specified number of alum mids placed side by side.
const addAlumMids = (amount) => {
  alumMidAmount = amount;
  alumMidSpread = alumMid.width * amount;
  return {
    alumMidSpread,
  };
};

const getUnboxedSkidSize = () => {
  resultPanelMod();
  if (alumBaseSpread > 35) {
    skidWidth = '43';
    findCrateHeight(alumBaseSpread, 0, 40, 2);
    getEnclosedValues();
    getWoodAmount();
    createTable(skidWidth, skidHeight + 8, '16\'', twoByFour, plywood, crateNum, 3, 0, 0);
  }
};

const hoverEffect = () => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('crateComponents');
  const panel = document.getElementById('result-panel');
  panel.appendChild(newDiv);
  addComponentNames();
};

const reverseEffect = () => {
  const newDisplay = document.querySelector('.crateComponents');
  document.getElementById('result-panel').removeChild(newDisplay);
};

const displayComponents = () => {
  const dimensions = document.querySelector('.dimensions');
  dimensions.addEventListener('mouseover', hoverEffect);
  dimensions.addEventListener('mouseout', reverseEffect);
};

const addComponentNames = () => {
  const components = document.querySelector('.crateComponents');
  const sideBoards = document.createElement('div');
  const doors = document.createElement('div');
  const sidePly = document.createElement('div');
  const runningBoards = document.createElement('div');
  components.appendChild(sideBoards);
  components.appendChild(doors);
  components.appendChild(sidePly);
  components.appendChild(runningBoards);
  sideBoards.textContent = `2x4 side-boards: ${skidHeight}`;
  doors.textContent = 'Doors:';
  sidePly.textContent = 'Plywood sides:';
  runningBoards.textContent = '2x4 running-boards:';
};

// This function is self-explanatory.

const makeResetButton = (() => {
  document.querySelector('.reset').addEventListener('click', function() {
    resetValues.reset();
  });
})();

const checkBoxedValues = () => {
  const newBoxes = document.getElementById('new').value; // gets value of text fields and asigns them to newBoxes and oldBoxes variables //
  const oldBoxes = document.getElementById('old').value;
  const select = document.getElementById('crate_type');
  const values = select.options[select.selectedIndex].value;
  boxCombinator(newBoxes, oldBoxes);
  if (values === '--Choose one--') {
    alert('Please choose crate type!');
    tabNav.turnpageHome();
  } else if (values === 'Minimal - No plywood' || values === 'Fully enclosed') {
    if (newBoxes > 0 || oldBoxes > 0) {
      tabNav.turnpageResults(); // allow result page to display only if table has already been created
      getSkidSize();
      disableButton();
    } else if (newBoxes > 0 && oldBoxes > 0) {
      tabNav.turnpageResults();
      getSkidSize();
      disableButton();
    }
  }
};

const checkUnboxedValues = () => {
  const bases = document.getElementById('bases').value;
  const alum = document.getElementById('alum').value;
  const fg = document.getElementById('fiberglass').value;
  const radioValue = document.querySelector('input[name="type"]:checked').value;
  alert(radioValue);
  if (radioValue === 'alum') {
    addAlumBases(bases);
    if (alumBaseAmount > 1) {
      getUnboxedSkidSize();
      tabNav.turnpageResults();
      disableButton();
    }
  } else if (radioValue === 'fg') {
    console.log('fiberglass section under construction');
  } else if (radioValue === null) {
    alert('please choose material!');
  }
};

const disableButton = () => {
  document.getElementById('subButton').setAttribute('disabled', 'true');
};

function submitInput() {
  checkBoxedValues();
  checkUnboxedValues();
  displayComponents();
}

// resetValues.reset()
