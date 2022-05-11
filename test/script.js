const openBtn=document.querySelector('.open-button button');
const contentIn=document.querySelector('#modal-hidden');
const closeBtn=document.querySelector('.close-button');


openBtn.addEventListener('click',()=>{
    contentIn.classList.remove('hidden');


})

closeBtn.addEventListener('click', ()=>{
    contentIn.classList.add('hidden');
})
