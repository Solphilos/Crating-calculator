resetValues();

const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const homepage = document.getElementById('homepage');
const totalsWindow = document.getElementById('totals_window');
const unboxed = document.querySelector('.unboxed');
const boxed = document.querySelector('.boxed');
const home = document.querySelector('.home');
const totals = document.querySelector('.totals');
const tabs =  document.getElementById('tabs');


setToNone = (element1, element2, element3) => {
  element1.style.display = "none";  
  element2.style.display = "none";
  element3.style.display = "none";         
}

turnPage = () => {
  input1.style.display = "none";
  input2.style.display = "flex";
  homepage.style.display = "none"
  totalsWindow.style.display = "none";
  unboxed.setAttribute('id', 'unboxed');
  boxed.removeAttribute('id', 'boxed');
  home.removeAttribute('id', 'home');
  totals.removeAttribute('id', 'totals')
}

turnPage2 = () => {
  input2.style.display = "none"; 
  input1.style.display = "flex";
  homepage.style.display = "none";
  totalsWindow.style.display = "none";
  unboxed.removeAttribute('id', 'unboxed');
  boxed.setAttribute('id', 'boxed');
  home.removeAttribute('id', 'home');
  totals.removeAttribute('id', 'totals')
}

turnpageHome = () => {
  input2.style.display = "none"; 
  input1.style.display = "none";
  homepage.style.display = "flex";
  totalsWindow.style.display = "none";
  unboxed.removeAttribute('id', 'unboxed');
  boxed.removeAttribute('id', 'boxed');
  home.setAttribute('id', 'home');
  totals.removeAttribute('id', 'totals')
}

turnpageResults = () => {
  input2.style.display = "none"; 
  input1.style.display = "none";
  homepage.style.display = "none";
  totalsWindow.style.display = "flex";
  unboxed.removeAttribute('id', 'unboxed');
  boxed.removeAttribute('id', 'boxed');
  home.removeAttribute('id', 'home');
  totals.setAttribute('id', 'totals');
}


showInput = () => {
  totalsWindow.style.display = "none";      // hides result table
  homepage.style.display = "flex";          
  tabs.style.display = 'inline';            // displays tabs  
  input2.style.display = 'none';
  unboxed.removeAttribute('id', 'unboxed');
}

function resetValues() {
  document.getElementById("height").innerHTML =  '0';
  document.getElementById("width").innerHTML =  '0';
  document.getElementById("length").innerHTML = '0';
  document.getElementById("2x4").innerHTML =  '0';
  document.getElementById("ply").innerHTML = '0';
  document.getElementById("pallets").innerHTML = '0';
  document.getElementById("amount").innerHTML = '0';
}

document.querySelector('.unboxed').addEventListener('click', turnPage);
document.querySelector('.boxed').addEventListener('click', turnPage2);
document.querySelector('.home').addEventListener('click', turnpageHome);
document.querySelector('.totals').addEventListener('click', turnpageResults)




function clicky() {
  //document.getElementById('input1').style.display = 'none';      
  //document.getElementById('input2').style.display = 'none';    
  //document.getElementById('tabs').style.display = 'none';
  //document.getElementById('homepage').style.display = 'none';
  //document.getElementById('result-panel').style.display = "block";
  turnpageResults();
  document.querySelector('.reset').addEventListener('click', function() { 
  // showInput()
  resetValues();
  document.querySelector('input[name="new"]').value = '';
  document.querySelector('input[name="old"]').value = '';
});
   

function popResults(length, width, height, boards, ply, crate_num) {
    document.getElementById("length").innerHTML = length;    
    document.getElementById("width").innerHTML = width;     
    document.getElementById("height").innerHTML = height;
    document.getElementById("2x4").innerHTML = boards;
    document.getElementById("ply").innerHTML = ply;
    document.getElementById("amount").innerHTML = crate_num;
};





 // obtains value of text fields and asigns them to newBoxes and oldBoxes variables //
 let newBoxes = document.getElementById("new").value; 
 let oldBoxes = document.getElementById("old").value;
 
 let select = document.getElementById('crate_type');
 let minimal = select.options[select.selectedIndex].value;

 

// if both box types are entered return appropriate values 

if (newBoxes && oldBoxes) {
// takes the value of both text fields and concatenates them as as string. example: 11 would mean 1 new, 1 old.  1112 would be 11 new, 12 old.
let reference = newBoxes + oldBoxes;

switch (reference) {
  case '11':
    document.getElementById("result1").innerHTML =  'Crate dimensions: 12" wide, 16\' long';
    document.getElementById("result2").innerHTML = 'Wood used: 52\' of 2x4';
    document.getElementById("result3").innerHTML = 'another value:';
   break;
   // this would mean 1 new box, 2 old
   case '12': 
   document.getElementById("result1").innerHTML = 'combo test 2';
   break;
   case '21':
   document.getElementById("result1").innerHTML = 'combo test 3';
   break;
  }
 }

 

// if only new boxes are entered return appropriate values

// to make things more elegant, make a default crate size where needed instead of repeating, then make indiviual parameters for differences in wood amount.
// use boolean values to reduce repetition. example: if boxes <= a certain number, return the shared value

else if (newBoxes && minimal === 'Fully enclosed') {
switch (newBoxes) {        // try boolean values: i. e, if user inputs value >= a specific number, return appropriate values
   case '1': 
      popResults(16, 12, 15, 42, 0, 1);
    break;
     case '2':
      popResults(16, 12, 15, 42, 0, 1);
       break;
     case '3':
      popResults(16, 12, 18, 42, 0, 1);
       break;
     case '4':
      popResults(16, 12, 15, 42, 0, 1);
       break;
     case '5':
      popResults(16, 12, 15, 42, 0, 1);
       break;
     case '6':
      popResults(16, 12, 15, 42, 0, 1);
       break; }

}
 
// if only old boxes are entered return appropriate values

else if (oldBoxes) {
         
 switch (oldBoxes) {
   case '1':
    document.getElementById("result1").innerHTML = '12x16-old';
    break;
   case '2':
    document.getElementById("result1").innerHTML = '12x16';
     break;
   case '3':
    document.getElementById("result1").innerHTML = '12x16';
     break;
     case '4':
      document.getElementById("result1").innerHTML = '12x16';
       break;
     case '5':
      document.getElementById("result1").innerHTML = '12x16';
       break;
     case '6':
       document.getElementById("result1").innerHTML ='12x16';
       break;
      }
}


   
}

