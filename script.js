const textbox = document.querySelector('input');
const btn = document.getElementById('btn');
let list = document.querySelector('.list');
let noOfList=localStorage.length;
// add reset button next
function createHtml(present,total,subject){
	let percentage=0;
	if(total===0){
		percentage=100;
	}
	else{
		percentage=present/total*100;
	}
	return `<div class="progress-bar">
                 <div class="progress" >${percentage.toFixed(0)}</div>
                </div>
                <span class="subject-name">${subject}</span>
                <span class="Attendance"> <input type="text" class="present" value="${present}" readonly />/<input type ="text" class="total" value="${total}" readonly /> </span>
                <button id="present">&#x2713;</button>
                <button id="absent">&#x2717;</button>
                <button id="edit">&#9998;</button>
                <button id="del">-</button>`;
}

(function getItemsFromLocal(){
	for(let i=0;i<noOfList;i++){
		const item = document.createElement('li');
		item.className='card';
    	const subinfo =JSON.parse(localStorage.getItem(localStorage.key(i)));
    	item.innerHTML=createHtml(subinfo.present,subinfo.total,subinfo.subject);
		item.id=localStorage.key(i);
		const progressbar = item.querySelector('.progress-bar');
		percentage=item.querySelector('.progress').textContent;
		if(percentage >= 75.0){
    		progressbar.style.background = 'limegreen';
    	}
    	else{
    		progressbar.style.background = 'red';
    	}
		addDeleteListener(item);
		addPresentListener(item);
		addEditListener(item);
		addAbsentListener(item);
		list.appendChild(item);
	}
})();
function additem(){
	const item = document.createElement('li');
	item.className='card';
    item.innerHTML =createHtml(0,0,textbox.value) ;
	item.id=noOfList++;
	let progressbar=item.querySelector('progress-bar');
	addDeleteListener(item);
	addPresentListener(item);
	addAbsentListener(item);
	addEditListener(item);
	list.appendChild(item);
	const data={
		present:0,
		total:0,
		subject:textbox.value
	}
	textbox.value="";
    localStorage.setItem(item.id,JSON.stringify(data));
}
textbox.addEventListener("keypress",(e)=>{
	if(e.key==='Enter'){
		e.preventDefault();
		btn.click();
	}
})
btn.addEventListener('click',additem );

function addPresentListener(item) {
    const presentBtn = item.querySelector('#present');
    const progress = item.querySelector('.progress');
    const progressbar = item.querySelector('.progress-bar');
    const presentfield = item.querySelector('.present');
    const totalfield = item.querySelector('.total');
    presentBtn.addEventListener('click', () => {
    	let data=JSON.parse(localStorage.getItem(item.id));
    	data.total++;
    	data.present++;
    	percentage=data.present/data.total*100;
    	presentfield.value=data.present;
    	totalfield.value=data.total;
    	progress.textContent=percentage.toFixed(0);
    	if(percentage >= 75.0){
    		progressbar.style.background = 'limegreen';
    	}
    	localStorage.setItem(item.id, JSON.stringify(data));
    });
}

function addAbsentListener(item) {
    const absentBtn = item.querySelector('#absent');
    const progress = item.querySelector('.progress');
    const progressbar = item.querySelector('.progress-bar');
    const totalfield = item.querySelector('.total');
    absentBtn.addEventListener('click', () => {
    	let data=JSON.parse(localStorage.getItem(item.id));
    	data.total++;
    	percentage=data.present/data.total*100;
    	totalfield.value=data.total;
    	progress.textContent=percentage.toFixed(0);
    	if(percentage < 75.0){
    		progressbar.style.background = 'red';
    	}
    	localStorage.setItem(item.id, JSON.stringify(data));
    });
}

function addDeleteListener(item) {
    const deleteBtn = item.querySelector('#del');
    deleteBtn.addEventListener('click', () => {
        localStorage.removeItem(item.id);
        list.removeChild(item);
    });
}

function addEditListener(item){
	const presentfield = item.querySelectorAll('.Attendance input');
	const editbtn=item.querySelector('#edit');
	const progress = item.querySelector('.progress');
	const progressbar = item.querySelector('.progress-bar');
	editbtn.addEventListener('click',()=>{
		console.log(presentfield);
		if(presentfield[0].readOnly){
			presentfield.forEach(field=>{
				field.readOnly=false;
			})
			editbtn.style.background="green";
		}
		else{
			presentfield.forEach(field=>{
				field.readOnly=true;
		})
		let data=JSON.parse(localStorage.getItem(item.id));
    	data.total=parseInt(presentfield[1].value);
    	data.present=parseInt(presentfield[0].value);
    	if(data.total>0){

    	percentage=data.present/data.total*100;
    	}
    	else{
    		percentage=100;
    		data.present=0;
    	}
    	progress.textContent=percentage.toFixed(0);
    	if(percentage >= 75.0){
    		progressbar.style.background = 'limegreen';
    	}
    	else{
    		progressbar.style.background = 'red';
    	}
    	editbtn.style.background="orange";
    	localStorage.setItem(item.id, JSON.stringify(data));
		}
	})
}