const sections=document.querySelectorAll('.section');
const sectBtns=document.querySelectorAll('.controls');
const sectBtn=document.querySelectorAll('.control');
const allSections=document.querySelector('.main-content');

function PageTransitions(){
    //Button click active class
    for (let i=0 ; i<sectBtn.length;i++) {
        sectBtn[i].addEventListener('click',function(){
            let currentBtn=document.querySelectorAll('.active-btn');
            currentBtn[0].className=currentBtn[0].className.replace('active-btn','');
            this.className += ' active-btn';
        })

    }
    //sections active class
    allSections.addEventListener('click',(e) =>{
        const id=e.target.dataset.id;
        if(id){
            //remove selected from the other btns
            sectBtns.forEach((btn) =>{
                btn.classList.remove('active')
            })
            e.target.classList.add('active')

            //hide other sections
            sections.forEach((section) =>{
                section.classList.remove('active')
            })

            const element = document.getElementById(id);
            element.classList.add('active');
        }
    })

    const themeBtn=document.querySelector('.theme-btn');
    themeBtn.addEventListener('click',()=>{
        let element=document.body;
        element.classList.toggle('dark-mode')
    })
}
PageTransitions();

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
document.getElementById('c1').addEventListener('click', scrollToTop);
document.getElementById('c2').addEventListener('click', scrollToTop);
document.getElementById('c3').addEventListener('click', scrollToTop);
document.getElementById('c4').addEventListener('click', scrollToTop);