const sections=document.querySelectorAll('.section');
const sectBtns=document.querySelectorAll('.controls');
const sectBtn=document.querySelectorAll('.control');
const allSections=document.querySelector('.main-content');

function isEmail(email){
	return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );	
}

function validateForm() {
    var nameInput = document.getElementById("Name");
    var emailInput = document.getElementById("Email");
    var msgInput = document.getElementById("Message");

    if (nameInput.value.trim() === "") {
        alert("Please write your name.")
        nameInput.focus();
        return false;
    }

    if (emailInput.value.trim() === "") {
        alert("Please write your email.")
        emailInput.focus();
        return false;
    }

    if (msgInput.value.trim() === "") {
        alert("Please write your message.")
        msgInput.focus();
        return false;
    }

    if (isEmail(emailInput.value.trim())==false){
        alert("Please write a valid email.")
        emailInput.focus();
        return false;
    }
    SendMail();
    return true;
}

function SendMail(){
    (function() {
        emailjs.init('2vE0h-UO3XWGge8wJ');
    })();
    var params={
        from_name:document.getElementById("Name").value,
        email_id:document.getElementById("Email").value,
        message:document.getElementById("Message").value
    }
    emailjs.send("service_kz68ic8","template_1fakq9s",params).then(function(res){
        alert("Email sent successfully!")
        document.getElementById("Name").value="";
        document.getElementById("Email").value="";
        document.getElementById("Message").value="";
    })
}

function updateDateTime() {
    let time=document.getElementById("local_time")

    setInterval(() => {
        let d = new Date();
        time.innerHTML =d.toLocaleString('en-GB', { timeZone: 'Europe/Istanbul' });
    }, 1000)
}
updateDateTime();

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