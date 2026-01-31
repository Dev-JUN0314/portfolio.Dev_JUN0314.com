// ================= 스크롤 =================
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ================= 스크롤 애니메이션 =================
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
},{threshold:0.15});
document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));

// ================= 모달 =================
const modalInquiry = document.getElementById("modalInquiry");
const modalContact = document.getElementById("modalContact");
const modalUpload = document.getElementById("modalUpload");
const btnInquiry = document.getElementById("openInquiry");
const btnContact = document.getElementById("openContact");
const uploadBtns = document.querySelectorAll(".openUpload");
const spans = document.getElementsByClassName("close");
const portfolioBox = document.getElementById("portfolioBox");

[modalInquiry, modalContact, modalUpload].forEach(m=>m.style.display="none");
btnInquiry.onclick = ()=>modalInquiry.style.display="flex";
btnContact.onclick = ()=>modalContact.style.display="flex";

// ================= 업로드 비밀번호 =================
const UPLOAD_PASSWORD="0314jun!";
uploadBtns.forEach((btn,index)=>{
  btn.onclick=()=>{
    const pass = prompt("포트폴리오 업로드 비밀번호를 입력하세요:");
    if(pass===UPLOAD_PASSWORD){
      modalUpload.dataset.type = index===0?"server":"bot";
      modalUpload.style.display="flex";
    } else alert("비밀번호가 틀렸습니다!");
  }
});

// ================= 닫기 =================
for(let span of spans){
  span.onclick = ()=>[modalInquiry,modalContact,modalUpload].forEach(m=>m.style.display="none");
}
window.onclick=(e)=>{
  if([modalInquiry,modalContact,modalUpload].includes(e.target)) e.target.style.display="none";
}

// ================= 포트폴리오 업로드 (여러 이미지) =================
const uploadBtn = document.getElementById("uploadBtn");
uploadBtn.onclick = ()=>{
  const files = document.getElementById("uploadImage").files;
  const titleInput = document.getElementById("uploadTitle").value;
  const desc = document.getElementById("uploadDesc").value;

  if(!files.length || !desc){ alert("이미지와 설명은 필수입니다!"); return; }

  Array.from(files).forEach(file=>{
    const reader = new FileReader();
    reader.onload = ()=>{
      let cardTitle="";
      if(modalUpload.dataset.type==="server") cardTitle="🛠 서버 제작";
      else cardTitle="🤖 봇 개발";
      if(titleInput) cardTitle+=" | "+titleInput;
      addPortfolioCard([reader.result], cardTitle, desc);
    };
    reader.readAsDataURL(file);
  });

  modalUpload.style.display="none";
  document.getElementById("uploadImage").value="";
  document.getElementById("uploadTitle").value="";
  document.getElementById("uploadDesc").value="";
}

// ================= 카드 생성 (슬라이더 지원) =================
function addPortfolioCard(imgSrcArray,title,desc){
  const card = document.createElement("div");
  card.className="card fade-up show";
  card.style.position="relative";

  const splitTitle = title.split("|");
  const tagText = splitTitle[0].trim();
  const mainTitle = splitTitle[1]? splitTitle[1].trim():"";

  const sliderDiv = document.createElement("div");
  sliderDiv.className="slider";
  imgSrcArray.forEach(src=>{
    const img = document.createElement("img");
    img.src = src;
    sliderDiv.appendChild(img);
  });

  card.innerHTML=`
    <div class="card-tag">${tagText}</div>
    <h3>${mainTitle}</h3>
    <p>${desc}</p>
    <button class="delete-btn">삭제</button>
  `;
  card.insertBefore(sliderDiv, card.querySelector("h3"));
  portfolioBox.appendChild(card);

  card.querySelector(".delete-btn").onclick=()=>{
    portfolioBox.removeChild(card);
    savePortfolioToStorage();
  };

  savePortfolioToStorage();
}

// ================= localStorage 저장 =================
function savePortfolioToStorage(){
  const cards = portfolioBox.querySelectorAll(".card");
  const data=[];
  cards.forEach(c=>{
    const sliderImgs = Array.from(c.querySelectorAll(".slider img")).map(i=>i.src);
    const tag = c.querySelector(".card-tag")?.textContent;
    const title = c.querySelector("h3")?.textContent;
    const desc = c.querySelector("p")?.textContent;
    if(sliderImgs.length && desc) data.push({imgs:sliderImgs,title: tag+" | "+title, desc});
  });
  localStorage.setItem("portfolioData",JSON.stringify(data));
}

// ================= localStorage 불러오기 =================
function loadPortfolioFromStorage(){
  const data = JSON.parse(localStorage.getItem("portfolioData")||"[]");
  data.forEach(item=>{
    addPortfolioCard(item.imgs,item.title,item.desc);
  });
}
window.onload = loadPortfolioFromStorage;
