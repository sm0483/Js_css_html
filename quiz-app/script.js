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
    let objectList=questionData[questionNumber];
    console.log(questionNumber);
    console.log(objectList.answer===objectList[answerId]);
    if(answerId!==undefined){
        return objectList.answer===objectList[answerId]

    }
1
    if(questionNumber<questionData.length){
        return objectList;

    }

    return undefined;


}

let questionNumber=0;
let insertData =()=>{
    let data=dataHandle(questionNumber);
    if(data!=undefined){
        questionIn.innerHTML=data.question;
        optionA.innerHTML=data.a;
        optionB.innerHTML=data.b;
        optionC.innerHTML=data.c;
        optionD.innerHTML=data.d;
    }

}



let getAnswer= ()=>{
    for(let i=0;i<4;i++){
        let answer=answerIn[i];
        if(answer.checked){
            return answer.id;
        }
    }

    return 'e';
}

let score=0;
let main= ()=>{
    insertData();
    btn.addEventListener('click',()=>{
        let answerId=getAnswer();
       // console.log(answerId);
        if(answerId!='e'){
           if(dataHandle(questionNumber,answerId))score++;
            console.log(score);
            if(dataHandle(questionNumber)!==undefined){
                questionNumber++;
                insertData();
            }
            else{
                console.log(score);


            }



        }



    })

}

main();
