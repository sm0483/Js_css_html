//get meals elment
const mealsIn=document.querySelector('.meals');
const searchTermIn=document.querySelector('.search-text')
const searchBtnIn=document.querySelector('.search-button');
const favButtonIn=document.querySelectorAll('.fav-button');
const favMealListIn=document.querySelector('.fav-meals');

//TODO 
//create a liked list and pop about it
//global list for saving liked  content;

let likedMeal=[];
let rmLikedMeal= (id)=>{
    likedMeal=likedMeal.filter((meal)=>{
        if(meal.idMeal!==id) return meal;
    })

}

//store all meal id currently loaded
const clearAllMealData= ()=>{
    allMealData=[];

}

//clear already loaded meal from html page
let clearPage=()=>{
    mealsIn.innerHTML="";
}
//clear fav list from html page
let clearFavMealListIn= ()=>{
    favMealListIn.innerHTML=" ";

}

let changeBtnColor=  (id)=>{
    //event listner for general button in html page

    let btn=document.querySelector(`#id${id}`);
    btn.addEventListener('click',(res)=>{
        //let likeMealId=res.target.id.substring(2);
        if(res.target.className==='fav-button' || res.target.className==='fas fa-heart'){
            likedMealData=getMealbyId(id)
                .then((res)=>{
                    //console.log(res[0]);
                    likedMeal.push(res[0]);
                    btn.classList.add('active');
                    addToFavorite();
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
        else{
            try{
            btn.classList.remove('active');
            }
            catch(err){
                console.log(err);

            }
            rmLikedMeal(id);
            addToFavorite();

        }
    })
}

//create new data and append to parent
let addDataToMealBody=(mealData,random=false)=>{
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
                    <button class="fav-button", id="id${mealData.idMeal}">
                        <i class="fas fa-heart" ></i>
                    </button>
                </div>

    `;
    mealsIn.appendChild(par);

    //save all button to list
    changeBtnColor(mealData.idMeal);



}

let removeFav =(id)=>{ 
    let btn=undefined;
    let btnInMain=undefined;
    try{
        btn=document.querySelector(`#rm${id}`);
        btnInMain=document.querySelector(`#id${id}`);
    }
    catch(err){
        console.log(err);

    }
    btn.addEventListener('click', (res)=>{
        //console.log(likedMeal);
        rmLikedMeal(id);
        addToFavorite();
        try{
        btnInMain.classList.remove('active');
        }
        catch(err){
            console.log(err);

        }

    })
}

let addToFavorite= ()=>{
    //store meal data
    //stringify
    let stringMealData=JSON.stringify(likedMeal);
    //JSON.stringify(stringMealData);

    localStorage.setItem('localMeal',stringMealData);
    let retriveData=JSON.parse(localStorage.getItem('localMeal'));

    clearFavMealListIn();
    for(let mealData of retriveData){
        const li=document.createElement('li');

        li.innerHTML=`
                    <img src="${mealData.strMealThumb}" alt=" ">
                    <span>${mealData.strMeal}</span>
                    <span><button class="rm-button"id="rm${mealData.idMeal}">&times</button></span>
        `
        favMealListIn.appendChild(li);
        //rm button
        removeFav(mealData.idMeal);

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

    if(clear) clearPage();

    addDataToMealBody(resData.meals[0],true);

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
            addDataToMealBody(meal,false,true);

        })
    }


}

//get meal by letter

let getMealbyId =async (id)=>{
    let meal=undefined;
    try{
        const res=await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id);
        const resData=await res.json();
        //console.log(res.ok);
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
        addDataToMealBody(meal);
    }
}

let doReplay =()=>{
    getRandomeMeal();
    let searchText=undefined;
    searchBtnIn.addEventListener('click',()=>{
        clearAllMealData();
        searchText=searchTermIn.value;
        console.log(searchText);
        if(searchText!=undefined) getMealByName(searchText,true);
        else console.log("test");
    })
}

doReplay();


