let getOtpBtn = document.getElementById('get-otp');
let checkOtpBtn = document.getElementById('check-otp');
let alertBox = document.querySelector('.alert-box');
let resetBtn = document.getElementById('reset');
let otp = "";
alertBox.classList.remove('show');
checkOtpBtn.disabled = true;
resetBtn.disabled = true;
let inputBoxes = document.querySelectorAll('.box');

inputBoxes.forEach(box=>{
  box.disabled = true;
})

getOtpBtn.addEventListener('click' , (e)=>{
  e.preventDefault();
  checkOtpBtn.disabled = false;
  inputBoxes.forEach(box=>{
    box.disabled = false;
  });
  inputBoxes[0].focus();

  alertBox.classList.add('show');
  getOtpBtn.disabled = true;
  otp =  Math.floor(100000 + Math.random() * 900000).toString();
  alertBox.innerHTML = `Your Otp is : ${otp}`;
  
  console.log(otp)
  
});


inputBoxes.forEach((box , i)=>{
  box.addEventListener('input' , ()=>{
    box.value = box.value.replace(/[^0-9]/g, '');
      if (box.value !== "" && i < inputBoxes.length - 1) {
      inputBoxes[i + 1].focus();
      }
  });
  box.addEventListener('keydown', (e) => {
     if (e.key === 'Backspace') { 
       if (box.value === "" && i > 0) { 
         inputBoxes[i - 1].focus();
        }
     }
     if(e.key === 'ArrowLeft')
     {
      if(i>0)
      {
        e.preventDefault();
        inputBoxes[i-1].focus();
      }
     }
     if(e.key === 'ArrowRight')
     {
      if(i<inputBoxes.length - 1)
      {
        inputBoxes[i+1].focus();
      }
     }
     if(e.key === 'Enter')
     {
        checkOtp();
     }
  });
});


checkOtpBtn.addEventListener('click' , (e)=>{
  e.preventDefault();
  checkOtp();
  
});

resetBtn.addEventListener('click' , (e)=>{
  e.preventDefault();
  reset();
});
function reset()
{
  inputBoxes.forEach(box =>{
    box.value = '';
    box.classList.remove('correct');
  });
  checkOtpBtn.disabled = true;
  alertBox.classList.remove('right');
  alertBox.classList.remove('wrong');
  otp = '';
  getOtpBtn.disabled = false;
  alertBox.innerText = '';
  alertBox.classList.remove('show');

}
function checkOtp()
{
  alertBox.innerHTML = '';
  resetBtn.disabled = false;
  // checkOtpBtn.disabled = true;
  let boxOtp = "";
  inputBoxes.forEach(box =>{
    boxOtp += box.value;
  });
  if(boxOtp.length < inputBoxes.length)
  {
    reset();
    return;
  }
  if(otp === boxOtp)
  {
    
    alertBox.classList.remove('wrong');
    alertBox.classList.add('right');
    alertBox.innerText = 'Correct';
    inputBoxes.forEach(box =>{
      box.classList.add('correct');
    })
  }
  else
  {
    alertBox.classList.remove('right');
    alertBox.classList.add('wrong');
    alertBox.innerText = 'Oops ! Wrong';
  }
}