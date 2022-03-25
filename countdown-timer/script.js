

const daysIn=document.getElementById("day");
const monIn=document.getElementById("month");
const hourIn=document.getElementById("hour");

let currentDate=new Date();
let targetDate=new Date('01/01/2023');

function date(){

   let diffMil=Math.abs(targetDate-currentDate);
   let diffDate=Math.ceil(diffMil/(1000*60*60*24));
   let diffMon=Math.floor(diffDate/30);
   let diffDay=Math.floor(diffMon%30);
   let diffHour=Math.floor((diffMon%30)%24);

   //putting in html
   daysIn.innerHTML=diffDay;
   monIn.innerHTML=diffMon;
   hourIn.innerHTML=diffHour;




}

date();

