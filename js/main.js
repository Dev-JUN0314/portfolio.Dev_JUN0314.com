// ======================= 스크롤 =======================
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ======================= 스크롤 애니메이션 =======================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
},{threshold:0.15});
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ======================= 모달 =======================
const modalInquiry = document.getElementById("modalInquiry");
const modalContact = document.getElementById("modalContact");
const modalUpload = document.getElementById("modalUpload");

const btnInquiry = document.getElementById("openInquiry");
const btnContact = document.getElementById("openContact");
const uploadBtns = document.querySelectorAll(".openUpload");

const spans = document.getElementsByClassName("close");
const portfolioBox = document.getElementById("portfolioBox");

// ======================= 초기 숨김 =======================
[modalInquiry, modalContact, modalUpload].forEach(m => m.style.display = "none");

// ======================= 모달 열기 =======================
btnInquiry.onclick = () => modalInquiry.style.display="flex";
btnContact.onclick = () => modalContact.style.display="flex";

// ======================= 업로드 비밀번호 =======================
const UPLOAD_PASSWORD="0314jun!";
uploadBtns.forEach((btn,index)=>{
  btn.onclick=()=>{
    const pass = prompt("포트폴리오 업로드 비밀번호를 입력하세요:");
    if(pass === UPLOAD_PASSWORD){
      modalUpload.dataset.type = index===0?"server":"bot";
      modalUpload.style.display="flex";
    } else alert("비밀번호가 틀렸습니다!");
  }
});

// ======================= 닫기 버튼 =======================
for(let span of spans){
  span.onclick = ()=>[modalInquiry,modalContact,modalUpload].forEach(m=>m.style.display="none");
}

// ======================= 모달 외부 클릭 시 닫기 =======================
window.onclick = (e)=>{
  if(e.target===modalInquiry||e.target===modalContact||e.target===modalUpload) e.target.style.display="none";
}

// ======================= 포트폴리오 업로드 =======================
const uploadBtn = document.getElementById("uploadBtn");
uploadBtn.onclick = ()=>{
  const img = document.getElementById("uploadImage").files[0];
  const titleInput = document.getElementById("uploadTitle").value;
  const desc = document.getElementById("uploadDesc").value;

  if(!img||!desc){ alert("이미지와 설명은 필수입니다!"); return; }

  const reader = new FileReader();
  reader.onload = ()=>{
    let cardTitle="";
    if(modalUpload.dataset.type==="server") cardTitle="🛠 서버 제작";
    else if(modalUpload.dataset.type==="bot") cardTitle="🤖 봇 개발";

    if(titleInput) cardTitle += " | "+titleInput;

    addPortfolioCard(reader.result, cardTitle, desc);
    modalUpload.style.display="none";

    document.getElementById("uploadImage").value="";
    document.getElementById("uploadTitle").value="";
    document.getElementById("uploadDesc").value="";
  };
  reader.readAsDataURL(img);
}

// ======================= 카드 추가 함수 + 삭제 + localStorage =======================
function addPortfolioCard(imgSrc,title,desc){
  const card = document.createElement("div");
  card.className="card fade-up show";
  card.innerHTML=`
    <img src="${imgSrc}" class="portfolio-img">
    <h3>${title}</h3>
    <p>${desc}</p>
    <button class="delete-btn">삭제</button>
  `;
  portfolioBox.appendChild(card);

  card.querySelector(".delete-btn").onclick=()=>{
    portfolioBox.removeChild(card);
    savePortfolioToStorage();
  };

  savePortfolioToStorage();
}

// ======================= localStorage 저장 =======================
function savePortfolioToStorage(){
  const cards = portfolioBox.querySelectorAll(".card");
  const data=[];
  cards.forEach(c=>{
    const img = c.querySelector(".portfolio-img")?.src;
    const title = c.querySelector("h3")?.textContent;
    const desc = c.querySelector("p")?.textContent;
    if(img&&title&&desc) data.push({img,title,desc});
  });
  localStorage.setItem("portfolioData",JSON.stringify(data));
}

// ======================= localStorage 불러오기 =======================
function loadPortfolioFromStorage(){
  const data = JSON.parse(localStorage.getItem("portfolioData")||"[]");
  data.forEach(item=>{
    addPortfolioCard(item.img,item.title,item.desc);
  });
}

window.onload = loadPortfolioFromStorage;
