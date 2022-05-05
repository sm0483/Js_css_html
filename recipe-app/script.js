//get meals elment
const mealsIn=document.querySelector('.meals');
const searchTermIn=document.querySelector('.search-text')
const searchBtnIn=document.querySelector('.search-button');
const favButtonIn=document.querySelectorAll('.fav-button');

//TODO 
//create a liked list and pop about it

//remve already existing data
let clearPage=()=>{
    mealsIn.innerHTML="";
}


//create new data and append to parent
let addData=(mealData,random=false)=>{
    const par=document.createElement('div');
    par.classList.add('meal');
    par.innerHTML=`
    ${random ?
            `
               <span class="random">Random Recipe</span>
    ` : " "
    }
                    <div class="meal-header">
                    <img src="${mealData.strMealThumb}" alt="">
                </div>
                <div class="meal-body">
                    <h4>${mealData.strMeal}</h4>
                    <button class="fav-button", id="${mealData.idMeal}">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>

    `;
    let meal=undefined;
    let likedMeal=[];
    mealsIn.appendChild(par);
    par.addEventListener('click', (res)=>{
        if(res.target.className==='fav-button'){
            console.log(res.target.id);
            meal=getMealbyId(res.target.id);
            meal.then((data)=>{
         //       console.log(data[0]);
                likedMeal.push(data[0]);

            })
        }
    })

    for(let meal of likedMeal){
        console.log(meal);

    }



}

//get radome meal
let getRandomeMeal = async (clear=false)=>{
    let resData=undefined;
    try{
        const res=await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        resData=await res.json();
    }
    catch(e){
        console.log(e)

    }

    if(clear) mealsIn.innerHTML="";

    addData(resData.meals[0],true);

}

//get meals by name
let getMealByName = async (foodName,clear=false)=>{
    let meals=undefined;
    try{
        const res=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+foodName);
        const resData=await res.json();
        meals=resData.meals;
        //console.log(meals);
    }
    catch(e){
        console.log(e)

    }

    if(clear) mealsIn.innerHTML="";
    if(meals!=undefined){
        meals.forEach((meal)=>{
            addData(meal,false,true);

        })
    }


}

//get meal by letter

let getMealbyId =async (id)=>{
    let meal=undefined;
    try{
        const res=await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id);
        const resData=await res.json();
        meal=resData.meals;
    }
    catch(e){
        console.log(e)

    }

    return meal;


}

let getMealByLetter = async (letter)=>{
    let meals=undefined;
    try{
        const res=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+letter);
        const resData=await res.json();
        meals=resData.meals;
    }
    catch(e){
        console.log(e)

    }

    for(let meal of meals){
        addData(meal);
    }
}

let doReplay =()=>{
    getRandomeMeal();
    let searchText=undefined;
    searchBtnIn.addEventListener('click',()=>{
        searchText=searchTermIn.value;
        console.log(searchText);
        if(searchText!=undefined) getMealByName(searchText,true);
        else console.log("test");
    })
}

doReplay();
