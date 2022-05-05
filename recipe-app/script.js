//get meals elment
const mealsIn=document.querySelector('.meals');
const searchTermIn=document.querySelector('.search-text')
const searchBtnIn=document.querySelector('.search-button');
const favButtonIn=document.querySelectorAll('.fav-button');
const favMealListIn=document.querySelector('.fav-meals');

//TODO 
//create a liked list and pop about it

//remve already existing data

//global list for saving liked  content;

let likedMeal=[];
let clearPage=()=>{
    mealsIn.innerHTML="";
}

let clearFav= ()=>{
    favMealListIn.innerHTML=" ";

}

let checkPresent= (id)=>{
    for(let meal of likedMeal){
        if (meal.idMeal===id) return false;

    }
    return true;

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
    mealsIn.appendChild(par);

    //store data in array;

    par.addEventListener('click', (res)=>{
        if(res.target.className==='fav-button'){
            let mealId=res.target.id;
            if(checkPresent(mealId)){
                meal=getMealbyId(res.target.id);
                meal
                    .then((data)=>{
                        //console.log(data[0]);
                        likedMeal.push(data[0]);
                        addToFavorite();

                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            }
        }
    })
    //testing data saved to likedMeal array
    //console.log(likedMeal);
    




}

let addToFavorite= ()=>{
    //store meal data
    //stringify
    let stringMealData=JSON.stringify(likedMeal);
    JSON.stringify(stringMealData);

    localStorage.setItem('localMeal',stringMealData);
    let retriveData=JSON.parse(localStorage.getItem('localMeal'));

    clearFav();
    for(let mealData of retriveData){
        const li=document.createElement('li');

        li.innerHTML=`
                    <img src="${mealData.strMealThumb}" alt=" ">
                    <span>${mealData.strMeal}</span>
                    <span><button class="rm-button"id="${mealData.idMeal}">&times</button></span>
        `
        favMealListIn.appendChild(li);
        favMealListIn.addEventListener('click', (res)=>{
            if(res.target.className==='rm-button'){
                let mealId=res.target.id;
                //remove this id
                likedMeal=likedMeal.filter((data)=>{
                    if(data.idMeal!==mealId) return data;
                })
                addToFavorite();
            }
            

        })
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
