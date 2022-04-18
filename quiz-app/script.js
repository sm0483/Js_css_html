//selected from html
const questionIn=document.querySelector('#Question');
const optionA=document.querySelector('#a_text');
const optionB=document.querySelector('#b_text');
const optionC=document.querySelector('#c_text');
const optionD=document.querySelector('#d_text');
const btn=document.querySelector('#btn');
const answerIn=document.querySelectorAll('input[name="quiz-op"]');
//question answer list
let dataHandle= (questionNumber,answerId=undefined)=>{
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
        },
        {
            question:'Who is the President of Usa',
            a:'Donald Trump',
            b:'Mr jhon sins',
            c:'Mr gibrane',
            d:'Mr ramgopal vermal',
            answer:'Donald Trump'

        }


    ];
    let objectList=undefined;

    if(questionNumber<questionData.length){
        objectList=questionData[questionNumber];
    }

    if(answerId!=undefined && objectList!=undefined){
        return objectList[answerId]===objectList.answer;
    }

    if(answerId===undefined){
        return objectList;

    }
    return undefined;





}


let insertData = (questionNumber)=>{
    let questionData=dataHandle(questionNumber);
    if(questionData!=undefined){
        questionIn.innerHTML=questionData.question;
        optionA.innerHTML=questionData.a;
        optionB.innerHTML=questionData.b;
        optionC.innerHTML=questionData.c;
        optionD.innerHTML=questionData.d;
    }
    /*
    else{
        questionIn.remove();
        optionA.remove();
        optionB.remove();
        optionC.remove();
        optionD.remove();

        for(let i=0;i<4;i++){
            answerIn=getAnswer();
            answerIn[i].remove();
        }
    }
    */


}

let getAnswer=()=>{ 
    for(let i=0;i<4;i++){
        let answer=answerIn[i];
        if(answer.checked) return answer.id;
    }

    return 'e';

}

let score=0;
let scoretTracker= (questionNumber)=>{
    let answerId=getAnswer();
    console.log(`before dataHandle ${answerId}`);
    if(dataHandle(questionNumber,answerId)){
        score++;
    }
    console.log(score);

}
let questionNumber=0;
let  main= ()=>{
    insertData(questionNumber);
    btn.addEventListener('click',()=>{
        let answerId=getAnswer();
        if(answerId!='e'){
            scoretTracker(questionNumber);
            questionNumber++;
            insertData(questionNumber);


        }

        else alert('Please tick the option ');
    })
}

main();

