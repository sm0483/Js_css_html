const addBtn=document.querySelector('#add');
const bodyIn=document.querySelector('.body');

let randomValue=343;


let handleButton= (id)=>{
    let deleteBtn=document.querySelector(`#delete-button${id}`);
    let editBtn=document.querySelector(`#edit-button${id}`);
//remove created node
    if(deleteBtn!=undefined){
        deleteBtn.addEventListener('click',()=>{
            let panelIn=document.querySelector(`#note-pannel${id}`);
            panelIn.parentNode.removeChild(panelIn);
        })

    }
//edi button set up
    if(editBtn!=undefined){
        editBtn.addEventListener('click',()=>{
            let textArea=document.querySelector(`#textarea${id}`);
            if(textArea.classList.contains('freeze-area')){
                textArea.classList.remove('freeze-area');
            }
            else{
                textArea.classList.add('freeze-area');

            }

        })

    }

}
let addNotePlane= ()=>{
    let noteBox=document.createElement('div');
    noteBox.innerHTML=`
            <div class="note-pannel" id="note-pannel${randomValue}">
            <div class='tools'>
                <button class="edit-button" id="edit-button${randomValue}"><i class="fas fa-edit"></i></button>
                <button class="delete-button" id= "delete-button${randomValue}"><i class="fas fa-trash-alt"></i></button>
            </div>

            <div class='text-area' id="text-area${randomValue}">
            <textarea class="freeze-area" id="textarea${randomValue}"></textarea>
            </div>
        </div>`;
    bodyIn.append(noteBox);
    handleButton(randomValue);
    randomValue++;

}


let addNotes= ()=>{
    addBtn.addEventListener('click', ()=>{
        addNotePlane();

    })

}

addNotes();
