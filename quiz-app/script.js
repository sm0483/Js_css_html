//selected from html
const quiz=document.querySelector("#quiz-c");
const questionIn=document.querySelector('#Question');
const optionA=document.querySelector('#a_text');
const optionB=document.querySelector('#b_text');
const optionC=document.querySelector('#c_text');
const optionD=document.querySelector('#d_text');
const btn=document.querySelector('#btn');
const answerIn=document.querySelectorAll('input[name="quiz-op"]');
//question answer list
let questionNumber=0;
let questionData=[
    {
        question:'Who Is The President Of India ?',
        a:'R Govind',
        b:'bahubali',
        c:'Ravi',
        d:'lk advani',
        answer:'R Govind',

    },
    {
        question:'Who is pm of India ?',
        a:'narendra modi',
        b:'k gobalan',
        c:'ravi',
        d:'raja ravi varma',
        answer:'narendra modi',
    },
    {
        question:'Who is the pm of China ?',
        a:'Shijin ping',
        b:'ram goap k',
        c:'Ravi vasu',
        d:'mr dop ping',
        answer:'Shijin ping',
    },
    {
        question:'Who is the President of Usa ?',
        a:'Donald Trump',
        b:'Mr jhon sins',
        c:'Mr gibrane',
        d:'joe biden',
        answer:'joe biden',

    },
    {
        question:'Captial of India ?',
        a:'Mumbai',
        b:'Delhi',
        c:'Banglore',
        d:'Ravi puram',
        answer:'Delhi',

    }

];
//to insertData
let insertData = ()=>{
    clearSelect();
    let currentQuestion=questionData[questionNumber];
    if(questionNumber<questionData.length){
        questionIn.innerHTML=currentQuestion.question;
        optionA.innerHTML=currentQuestion.a;
        optionB.innerHTML=currentQuestion.b;
        optionC.innerHTML=currentQuestion.c;
        optionD.innerHTML=currentQuestion.d;
    }
    questionNumber++;

}

// to get id of selected element
let getAnswer =()=>{
    let answerId=undefined;
    answerIn.forEach((answer)=>{
        if(answer.checked) answerId=answer.id;
    })

    return answerId;

}

//to clear selected

let clearSelect=()=>{
    answerIn.forEach((answer)=>{
        if(answer.checked){
            answer.checked=false;
        }

    })

}

let main =()=>{
    insertData();
    btn.addEventListener('click',()=>{
        let answerId=getAnswer();
        console.log(`currentQuestionNUmber ${questionNumber}`);
        if(questionNumber<questionData.length &&  answerId!==undefined){
            scoreTracker(answerId);
            insertData();
        }else if(answerId===undefined){
            alert('Please select an option');

        }else if(questionNumber>=questionData.length){ 
            quiz.innerHTML=`<h2> You scored ${score+1}/${questionData.length}</h2>
                <button onclick="location.reload()">Reload</button>`
           // console.log(`score inside event ${score}`);
        }

    })

}
let score =0;
let scoreTracker =(answerId)=>{
    if(questionNumber-1<questionData.length){
        currentQuestion=questionData[questionNumber-1];
        if(currentQuestion[answerId]===currentQuestion['answer']) score++;
          //console.log(score);
    }
}

main();
