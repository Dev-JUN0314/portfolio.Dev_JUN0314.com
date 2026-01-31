// 부드러운 스크롤
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// 스크롤 애니메이션
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// 모달 열기/닫기
const modalInquiry = document.getElementById("modalInquiry");
const modalContact = document.getElementById("modalContact");
const modalUpload = document.getElementById("modalUpload");

document.getElementById("openInquiry").onclick = () => modalInquiry.style.display="block";
document.getElementById("openContact").onclick = () => modalContact.style.display="block";

document.querySelectorAll(".close").forEach(btn => {
  btn.onclick = () => {
    modalInquiry.style.display="none";
    modalContact.style.display="none";
    modalUpload.style.display="none";
  };
});

window.onclick = e => { if(e.target.classList.contains("modal")) e.target.style.display="none"; }

// 본인만 업로드 비밀번호
const uploadBtns = document.querySelectorAll(".private-btn");
const uploadPassword = "0314jun!"; // 본인만 설정
uploadBtns.forEach(btn => {
  btn.onclick = () => {
    const pwd = prompt("업로드 비밀번호를 입력하세요:");
    if(pwd === uploadPassword) modalUpload.style.display="block";
    else alert("비밀번호가 틀렸습니다.");
  };
});

// 포트폴리오 업로드
const uploadConfirm = document.getElementById("uploadConfirm");
const pfTitle = document.getElementById("pfTitle");
const pfDesc = document.getElementById("pfDesc");
const pfImage = document.getElementById("pfImage");
const portfolioBox = document.querySelector(".portfolio-box");

function savePortfolio() {
  const cards=[];
  document.querySelectorAll(".portfolio-box .card:not(.template)").forEach(card=>{
    cards.push({
      title: card.querySelector("h3").innerText,
      desc: card.querySelector("p").innerText,
      img: card.querySelector("img")?.src || ""
    });
  });
  localStorage.setItem("portfolioData",JSON.stringify(cards));
}

function loadPortfolio() {
  const data=JSON.parse(localStorage.getItem("portfolioData") || "[]");
  data.forEach(item=>{
    const card=document.createElement("div");
    card.className="card fade-up show";
    card.innerHTML=`
      <button class="delete-btn">×</button>
      ${item.img?`<img src="${item.img}" class="pf-img">`:``}
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    `;
    card.querySelector(".delete-btn").onclick=()=>{
      card.remove();
      savePortfolio();
    };
    portfolioBox.appendChild(card);
  });
}

uploadConfirm.onclick=()=>{
  if(!pfTitle.value||!pfDesc.value||!pfImage.files[0]) return;
  const reader=new FileReader();
  reader.onload=()=>{
    const card=document.createElement("div");
    card.className="card fade-up show";
    card.innerHTML=`
      <button class="delete-btn">×</button>
      <img src="${reader.result}" class="pf-img">
      <h3>${pfTitle.value}</h3>
      <p>${pfDesc.value}</p>
    `;
    card.querySelector(".delete-btn").onclick=()=>{
      card.remove();
      savePortfolio();
    };
    portfolioBox.appendChild(card);
    savePortfolio();
    modalUpload.style.display="none";
    pfTitle.value="";
    pfDesc.value="";
    pfImage.value="";
  }
  reader.readAsDataURL(pfImage.files[0]);
}

// 페이지 로드 시 LocalStorage 불러오기
loadPortfolio();
