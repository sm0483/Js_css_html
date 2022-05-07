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

//clear already loaded meal from html page
let clearPage=()=>{
    mealsIn.innerHTML="";
}
//clear fav list from html page
let clearFav= ()=>{
    favMealListIn.innerHTML=" ";

}

//check already present in the array of data
let checkPresent= (id)=>{
    for(let meal of likedMeal){
        if (meal.idMeal===id) return false;

    }
    return true;

}

let changeBtnColor= (par)=>{
    let meal=undefined;
    //event listner for general button in html page
    par.addEventListener('click', (res)=>{
        let mealId=res.target.id;
        let mealBtnClassName=res.target.className;
        let likeButton=undefined;
        //console.log(mealId);
        try{
            likeButton=document.querySelector(`#${mealId}`);
        }
        catch(err){
            likeButton=undefined;

        }
        if(mealBtnClassName==='fav-button'){
            if(checkPresent(mealId.substring(2))){
                //get fav meal details from api
                meal=getMealbyId(mealId.substring(2))
                    .then((data)=>{
                        //console.log(data[0]);
                        likedMeal.push(data[0]);
                        //to change color add additonal class active
                        likeButton.classList.add('active');
                        //load new fav container
                        addToFavorite();

                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            }

        }
        //if already liked then remove that like
        else if(mealBtnClassName==='fav-button active'){
            likedMeal=likedMeal.filter((data)=>{
                if(data.idMeal!==mealId.substring(2)){ 
                    return data;
                }
            })
            likeButton.classList.remove('active');
            console.log(likeButton.className);
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
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>

    `;
    mealsIn.appendChild(par);

    //store data in array; and change color of button
    changeBtnColor(par);

}

let removeFav =()=>{ 
    let mealBtnFav=undefined;
    favMealListIn.addEventListener('click', (res)=>{
        mealBtnFav=document.querySelector(`#id${res.target.id.substring(2)}`);
        if(res.target.className==='rm-button'){
            let mealId=res.target.id.substring(2);
            console.log(mealId);
            //remove this id
            likedMeal=likedMeal.filter((data)=>{
                if(data.idMeal!==mealId) return data;
            })
            try{
                mealBtnFav.classList.remove('active');
            }
            catch(err){
                console.error(err);

            }
            addToFavorite();
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

    clearFav();
    for(let mealData of retriveData){
        const li=document.createElement('li');

        li.innerHTML=`
                    <img src="${mealData.strMealThumb}" alt=" ">
                    <span>${mealData.strMeal}</span>
                    <span><button class="rm-button"id="rm${mealData.idMeal}">&times</button></span>
        `
        favMealListIn.appendChild(li);
        //rm button
        removeFav();

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
        searchText=searchTermIn.value;
        console.log(searchText);
        if(searchText!=undefined) getMealByName(searchText,true);
        else console.log("test");
    })
}

doReplay();
