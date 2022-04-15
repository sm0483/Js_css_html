//selected from html
const questionIn=document.querySelector('#Question');
const optionA=document.querySelector('#a_text');
const optionB=document.querySelector('#b_text');
const optionC=document.querySelector('#c_text');
const optionD=document.querySelector('#d_text');
const btn=document.querySelector('#btn');
const answerIn=document.querySelectorAll('input[name="quiz-op"]');

//question answer list
let questionData=[
    {
        question:'Who Is The President Of India ?',
        a:'R Govind',
        b:'bahubali',
        c:'Ravi',
        d:'lk advani',
        answer:'R Govind'


    },
    {
        question:'Who is pm of India ?',
        a:'narendra modi',
        b:'k gobalan',
        c:'ravi',
        d:'raja ravi varma',
        answer:'narendra modi'
    },
    {
        question:'Who is the pm of China ?',
        a:'Shijin ping',
        b:'ram goap k',
        c:'Ravi vasu',
        d:'mr dop ping',
        answer:'Shijin ping'
    }


];


//operation on list

let questionNumber=0;

const main =() =>{
    numberedQuestion=questionData[questionNumber];
    questionIn.innerHTML=numberedQuestion.question;
    optionA.innerHTML=numberedQuestion.a;
    optionB.innerHTML=numberedQuestion.b;
    optionC.innerHTML=numberedQuestion.c;
    optionD.innerHTML=numberedQuestion.d;
    questionNumber++;

}

let flag=false;
const getAnswer =()=>{
    answerIn.forEach((answer)=>{
        if(answer.checked){
            flag=true;
        }
    })

    return flag;

}

btn.addEventListener('click',function(){
    if(getAnswer() && questionNumber< questionData.length){
        main();

    }
    else if(questionNumber>=questionData.length){ 
        alert("yep fully done");
    }

});


main();
