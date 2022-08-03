 // tab navigation control
 tabNav = (() => {
  const input1 = document.getElementById('input1');
  const input2 = document.getElementById('input2');
  const homepage = document.getElementById('homepage');
  const totalsWindow = document.getElementById('totals_window');
  const unboxed = document.querySelector('.unboxed');
  const boxed = document.querySelector('.boxed');
  const home = document.querySelector('.home');
  const totals = document.querySelector('.totals');
  

  // sets properties that allow tabs to display or close windows
  setDisplay = (element1, element2, element3, element4) => {        
    element1.style.display = "none";  
    element2.style.display = "none";
    element3.style.display = "none";
    element4.style.display = "flex";         
  }

  
  // sets and removes id names for tabs, rendering them active or inactive 
  setAndRemove = (ele1, ele2, ele3, ele4) => {   
    let id1 = ele1.className; 
    let id2 = ele2.className; 
    let id3 = ele3.className;
    let id4 = ele4.className;
    ele1.removeAttribute('id', id1);
    ele2.removeAttribute('id', id2);
    ele3.removeAttribute('id', id3)
    ele4.setAttribute('id', id4);
  }
  
  // "unboxed" tab
  turnPage = () => {
    setDisplay(input1, homepage, totalsWindow, input2)
    setAndRemove(boxed, home, totals, unboxed)
  }
  
  // "boxed" tab
  turnPage2 = () => {
    setDisplay(input2, homepage, totalsWindow, input1)
    setAndRemove(unboxed, home, totals, boxed)
  }
  // "home" tab
  turnpageHome = () => {
    setDisplay(input2, input1, totalsWindow, homepage)
    setAndRemove(unboxed, boxed, totals, home)
  }
  
  // "results" tab
  turnpageResults = () => {
    setDisplay(input2, input1, homepage, totalsWindow)
    setAndRemove(unboxed, boxed, home, totals)
  }


  return {
    turnPage,
    turnPage2,
    turnpageHome,
    turnpageResults,
  }

})();


// sets table results to zero as default. Also returns all caculated values back to zero.
resetValues = (() => {
  function reset() {
    document.getElementById("height").innerHTML =  '0';
    document.getElementById("width").innerHTML =  '0';
    document.getElementById("length").innerHTML = '0';
    document.getElementById("2x4").innerHTML =  '0';
    document.getElementById("ply").innerHTML = '0';
    document.getElementById("pallets").innerHTML = '0';
    crateNum = 1;
  }

  return {
    reset,
  }

})();

// creates click events that allow tab/window navigation.
addListeners = (() => {
  document.querySelector('.unboxed').addEventListener('click', tabNav.turnPage);
  document.querySelector('.boxed').addEventListener('click', tabNav.turnPage2);
  document.querySelector('.home').addEventListener('click', tabNav.turnpageHome);
  document.querySelector('.totals').addEventListener('click', tabNav.turnpageResults)
})();

///////////////// Calculator Logic Module //////////////////////////////////////////////////////////////////////////////////////

/* this will be the logic for calculating the dimensions and materials of crates 
   based on amount of boxes. When user inputs number of boxes + box type, return width, length and height
   and amount of wood used.  */


  
  const newBox = {
    width: 6, 
    height: 5,
  }
  const oldBox = {
    width: 11, 
    height: 4.5,
  }
  let newBoxSpread;
  let oldBoxSpread;
  let combinedSpread;
  let skidHeight;
  let newAmount;
  let oldAmount;
  let newRowsHigh;
  let oldRowsHigh;
  let skidWidth;
  let length;
  let pallets;
  let twoByFour;
  let plywood;
  let crateNum = 1;
 
  
  
  
  addNewBoxes = (amount) => {                // returns width of specified number of new boxes when placed side by side. 
    newAmount = amount;
    newBoxSpread = newBox.width * amount;
    return {
      newBoxSpread,
    }
  }
  
  addOldBoxes = (amount) => {                // returns width of specified number of old boxes when placed side by side. 
    oldAmount = amount;
    oldBoxSpread = oldBox.width * amount;
    return {
     oldBoxSpread,
    }
  }
  
  boxCombinator = (amountNew, amountOld) => {   // returns the combined width of specified number of old and new boxes. 
    addNewBoxes(amountNew);
    addOldBoxes(amountOld);
    combinedSpread = newBoxSpread + oldBoxSpread;
    
    return {
      combinedSpread,
    }
  }
  
  
  getSkidSize = () => {                       // using the combined width of boxes, returns all crate dimensions and relates specs. 
    
    if (combinedSpread > 40 && combinedSpread < 235) {     // formerly combinedSpread < 217
      skidWidth = '40"';
      findCrateHeight(combinedSpread, 40);
      getEnclosedValues();
      getWoodAmount();
      createTable(skidWidth, skidHeight + 8, '16\'', twoByFour, plywood, crateNum, 3); 
    } 
    
    else if (combinedSpread > 0 && combinedSpread <= 24) {
      skidWidth = '12"';
      findCrateHeight(combinedSpread, 12);
      getEnclosedValues();
      getWoodAmount();
      createTable(skidWidth, skidHeight + 8, '16\'', twoByFour, plywood, crateNum, 0); 
    }
    
    else if (combinedSpread > 24 && combinedSpread < 40) {
      skidWidth = '18"';
      findCrateHeight(combinedSpread, 18);
      getEnclosedValues(); 
      getWoodAmount();
      createTable(skidWidth, skidHeight + 8, '16\'', twoByFour, plywood, crateNum, 0);
    }

    /* else if (combinedSpread > 234 || oldBoxSpread > 198) {  // 216 is the max number for new boxes, 198 is max for old. 234 max for mixed.
      skidWidth = '40"';
      getEnclosedValues();
      findCrateHeight(combinedSpread, 40);   // create a new table to display results for  successive crates.
      getWoodAmount();
      popResults(skidWidth, skidHeight + 8, '16\'', twoByFour, plywood, 2, 3);
     // startNewSkid();   this function causing inaccuracy in the math. 
    }

    else if (newBoxSpread > 216) { 
      skidWidth = '40"';
      getEnclosedValues();
      findCrateHeight(combinedSpread, 40);   
      getWoodAmount();
      popResults(skidWidth, skidHeight + 8, '16\'', twoByFour, plywood, 2, 3);
      createTable();
     // startNewSkid();        // start new skid after figuring out how to create new table for every generation of math results
    } */
    
    else if (newBoxSpread > 216) {  // 216 is the max number for new boxes, 198 is max for old. 234 max for mixed.
      let remainder = combinedSpread - 216;
      combinedSpread = remainder;
      getSkidSize();
      combinedSpread = 216;
      crateNum += 1;
      getSkidSize();
    }

    else if (combinedSpread > 234) {  // 216 is the max number for new boxes, 198 is max for old. 234 max for mixed.
      let remainder = combinedSpread - 234;
      combinedSpread = remainder;
      getSkidSize();
      combinedSpread = 234;
      crateNum += 1;
      getSkidSize();
    }

    else if (oldBoxSpread > 198) {
      let remainder = combinedSpread - 198;
      combinedSpread = remainder;
      getSkidSize();
      combinedSpread = 198;
      crateNum += 1;
      getSkidSize();
    }
    
    //// make table display what boxes go on which crate. 
    
  }

  
  
  startNewSkid = () => {                              // these variables are being populated to the first table, causing bad results
    if (skidHeight > 38) {                           // if populating new table they should work as expected.
      let remainder = combinedSpread - 216;           
      combinedSpread = remainder;
      crateNum + 1;
      getSkidSize();
      
    }
  }
  
  findCrateHeight = (amount, crateWidth) => {        // returns number of vertical rows of boxes, old and new. 
    rowsHigh = amount / crateWidth;                  // the total width of all boxes divided by max width of skid returns the number of vertical rows. 
    let x = Math.ceil(rowsHigh);                     // there can be no partial rows, so round the returned number to the next highest interger. 
    skidHeight = x * 5;                              // multiply the rounded number by height of the box to get height. Wood height to be added later.
                                                       
  }

  getWoodAmount = () => {
    let sideBoards; 
    
    if (skidWidth === '40"') {
      sideBoards = skidHeight * 8 / 12;
      twoByFour = `${Math.ceil(sideBoards) + 59} feet`;
    } 
    else if (skidWidth === '18"') {
      sideBoards = (skidHeight + 3) * 6 / 12;  
      twoByFour = `${Math.ceil(sideBoards) + 50} feet`;
    }

    else if (skidWidth === '12"') {
      sideBoards = (skidHeight + 3) * 6 / 12;
      twoByFour = `${Math.ceil(sideBoards) + 44} feet`;
    }
  }

  getPlyAmount = () => {
    let sidePanels;

    if (skidWidth === '40"') {
      sidePanels = skidHeight * 4 / 48;
      plywood = `${Math.ceil(sidePanels) + 4} sheets`;
    } 
    else if (skidWidth === '18"') {
      sidePanels = skidHeight * 4 / 48;  
      plywood = Math.ceil(sidePanels) + 1 + " sheets";
    }

    else if (skidWidth === '12"') {
      sidePanels = skidHeight * 4 / 48;
      plywood = Math.ceil(sidePanels) + 1 + " sheets";
    }
  }


  getEnclosedValues = () => {
    let select = document.getElementById('crate_type');
    let values = select.options[select.selectedIndex].value;
    if (values === 'Fully enclosed') {
      alert(values)
      getPlyAmount()
    }
    else if (values === 'Minimal - No plywood') {
       alert(values)
       plywood = 0; 
    }
  }  


///////////////////////////////////////////////////////////////////
// DOM table creation:  Save and delete table element from HTML
createTable = (width, height, length, boards, ply, crate_num, pallets) => {  ///// parameters experimental
let tableContainer = document.createElement('div');
tableContainer.setAttribute('id', 'tableContainer');
let resultPanel = document.getElementById('result-panel');
resultPanel.appendChild(tableContainer);
let header = document.createElement('div');
header.setAttribute('id', 'tableHeader');
tableContainer.appendChild(header);

tableContainer.style.width = "90%";

tableContainer.style.display = "flex";
tableContainer.style.justifyContent = "center"
header.textContent = `Crate ${crate_num}`;                    /////// change default "1" to variable that will change with every new table appended
header.style.border = "solid black 1px";
header.style.backgroundColor = "white";
header.style.textAlign = "center";
header.style.width = "4%";
let table = document.createElement('TABLE');
tableContainer.appendChild(table);
table.setAttribute('id', 'resultTable');             
let row1 = document.createElement('TR');
let row2 = document.createElement('TR');
let row3 = document.createElement('TR');
let row4 = document.createElement('TR');
row1.setAttribute('id', 'row1');
row2.setAttribute('id', 'row2');
row3.setAttribute('id', 'row3');
row4.setAttribute('id', 'row4');
table.appendChild(row1);
table.appendChild(row2);
table.appendChild(row3);
table.appendChild(row4);
let th1 = document.createElement('TH');
let th2 = document.createElement('TH');
let th3 = document.createElement('TH');
let th4 = document.createElement('TH');
th1.rowSpan = "2";
th1.style.backgroundColor = "#24507C";
th1.style.color = "white";
th1.textContent = "Dimensions";
th2.style.backgroundColor = "#24507C";
th2.style.color = "white";
th2.textContent = "Length";
th3.style.backgroundColor = "#24507C";
th3.style.color = "white";
th3.textContent = "Width";
th4.style.backgroundColor = "#24507C";
th4.style.color = "white";
th4.textContent = "Height";
row1.appendChild(th1);
row1.appendChild(th2);
row1.appendChild(th3);
row1.appendChild(th4);
let tdLength = document.createElement('TD');
let tdWidth = document.createElement('TD');
let tdHeight = document.createElement('TD');
tdLength.setAttribute('id', 'length');
tdWidth.setAttribute('id', 'width');
tdHeight.setAttribute('id', 'height');
row2.appendChild(tdLength);
row2.appendChild(tdWidth);
row2.appendChild(tdHeight);
let th5 = document.createElement('TH');
let th6 = document.createElement('TH');
let th7 = document.createElement('TH');
let th8 = document.createElement('TH');
th5.rowSpan = "2";
th5.colSpan = "1";
th5.style.backgroundColor = "rgb(189, 158, 93)";
th5.textContent = "Materials";
th6.style.backgroundColor = "rgb(189, 158, 93)";
th6.textContent = "2x4";
th7.style.backgroundColor = "rgb(189, 158, 93)";
th7.textContent = "Plywood";
th8.style.backgroundColor = "rgb(189, 158, 93)";
th8.textContent = "Pallets";
row3.appendChild(th5);
row3.appendChild(th6);
row3.appendChild(th7);
row3.appendChild(th8);
let tdTwoByFour = document.createElement('TD');
let tdPly = document.createElement('TD');
let tdPallet = document.createElement('TD'); 
tdTwoByFour.setAttribute('id', '2x4');
tdPly.setAttribute('id', 'ply');
tdPallet.setAttribute('id', 'pallets');
row4.appendChild(tdTwoByFour);
row4.appendChild(tdPly);
row4.appendChild(tdPallet);
//////////// experimental code below //////
tdWidth.innerHTML = width;     
tdHeight.innerHTML = height;
tdLength.innerHTML = length;    
tdTwoByFour.innerHTML = boards;
tdPly.innerHTML = ply;
//document.getElementById("amount").innerHTML = crate_num;        ///////////////////////////////////////
tdPallet.innerHTML = pallets;


}                              


   
// include module that controls box type / gate arm length. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// populates the "results" table with calculated results.
/*
popResults = (width, height, length, boards, ply, crate_num, pallets) => {
  document.getElementById("width").innerHTML = width;     
  document.getElementById("height").innerHTML = height;
  document.getElementById("length").innerHTML = length;    
  document.getElementById("2x4").innerHTML = boards;
  document.getElementById("ply").innerHTML = ply;
  document.getElementById("amount").innerHTML = crate_num;
  document.getElementById("pallets").innerHTML = pallets;
}  */



makeResetButton = (() => {
  document.querySelector('.reset').addEventListener('click', function() { 
    resetValues.reset()
    document.querySelector('input[name="new"]').value = '';
    document.querySelector('input[name="old"]').value = '';
    document.getElementById('result-panel').removeChild(document.getElementById('tableContainer')) /////////////////////////////// experimental
  });
})();



   
function submitInput() {
  let newBoxes = document.getElementById("new").value;       // gets value of text fields and asigns them to newBoxes and oldBoxes variables //
  let oldBoxes = document.getElementById("old").value;
  tabNav.turnpageResults();
  boxCombinator(newBoxes, oldBoxes);    // this logs the width of boxes laid flat, side by side and the type of crate they would go on
  getSkidSize()
}


resetValues.reset()


