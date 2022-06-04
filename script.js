resetValues();


function turnPage() {
  document.getElementById('input1').style.display = "none";
  document.getElementById('input2').style.display = "flex";
  document.querySelector('.unboxed').setAttribute('id', 'unboxed');
  document.querySelector('.boxed').removeAttribute('id', 'boxed');
}

function turnPage2() {
  document.getElementById('input2').style.display = "none"; 
  document.getElementById('input1').style.display = "flex";
  document.querySelector('.unboxed').removeAttribute('id', 'unboxed');
  document.querySelector('.boxed').setAttribute('id', 'boxed');
}


function showInput() {
  document.getElementById('result-panel').style.display = "none";      // hides result table
  document.getElementById('input1').style.display = 'flex';            // displays boxed input element
  document.getElementById('tabs').style.display = 'inline';            // displays tabs  
  document.getElementById('input2').style.display = 'none';
  document.querySelector('.unboxed').removeAttribute('id', 'unboxed');
  document.querySelector('.boxed').setAttribute('id', 'boxed');
}

function resetValues() {
  document.getElementById("height").innerHTML =  '0';
  document.getElementById("width").innerHTML =  '0';
  document.getElementById("length").innerHTML = '0';
  document.getElementById("2x4").innerHTML =  '0';
  document.getElementById("ply").innerHTML = '0';
  document.getElementById("pallets").innerHTML = '0';
  document.getElementById("crate_num").innerHTML = '0';
}

document.querySelector('.unboxed').addEventListener('click', turnPage);
document.querySelector('.boxed').addEventListener('click', turnPage2);




function clicky() {
  document.getElementById('input1').style.display = 'none';      
  document.getElementById('input2').style.display = 'none';    
  document.getElementById('tabs').style.display = 'none';
  document.getElementById('result-panel').style.display = "block";
  document.querySelector('.reset').addEventListener('click', function() { 
  showInput();
  resetValues();
  document.querySelector('input[name="new"]').value = '';
  document.querySelector('input[name="old"]').value = '';
});
   
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
    document.getElementById("length").innerHTML = "16'";
    document.getElementById("width").innerHTML = '12"';
    document.getElementById("height").innerHTML = '15"';
    document.getElementById("2x4").innerHTML = '42 feet';
    document.getElementById("ply").innerHTML = 'None';
    document.getElementById("crate_num").innerHTML = '1';
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

