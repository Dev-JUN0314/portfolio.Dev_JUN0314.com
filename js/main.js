// 스크롤 부드럽게
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// 스크롤 애니메이션
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// 모달
const modalInquiry = document.getElementById("modalInquiry");
const modalContact = document.getElementById("modalContact");
const modalUpload = document.getElementById("modalUpload");

const btnInquiry = document.getElementById("openInquiry");
const btnContact = document.getElementById("openContact");
const uploadBtns = document.querySelectorAll(".openUpload");

const spans = document.getElementsByClassName("close");

// 모든 모달 초기 숨김
[modalInquiry, modalContact, modalUpload].forEach(m => m.style.display = "none");

// 버튼 클릭 시 모달 열기
btnInquiry.onclick = () => modalInquiry.style.display = "flex";
btnContact.onclick = () => modalContact.style.display = "flex";

// 업로드 비밀번호
const UPLOAD_PASSWORD = "junho123";
uploadBtns.forEach(btn => {
  btn.onclick = () => {
    const pass = prompt("포트폴리오 업로드 비밀번호를 입력하세요:");
    if(pass === UPLOAD_PASSWORD){
      modalUpload.style.display = "flex";
    } else {
      alert("비밀번호가 틀렸습니다!");
    }
  };
});

// 닫기 버튼
for (let span of spans) {
  span.onclick = () => {
    [modalInquiry, modalContact, modalUpload].forEach(m => m.style.display = "none");
  };
}

// 모달 외부 클릭 시 닫기
window.onclick = (e) => {
  if (e.target === modalInquiry || e.target === modalContact || e.target === modalUpload) {
    e.target.style.display = "none";
  }
};

// 포트폴리오 업로드
const uploadBtn = document.getElementById("uploadBtn");
uploadBtn.onclick = () => {
  const img = document.getElementById("uploadImage").files[0];
  const title = document.getElementById("uploadTitle").value;
  const desc = document.getElementById("uploadDesc").value;

  if(!img || !title || !desc){
    alert("모든 항목을 입력해주세요!");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const card = document.createElement("div");
    card.className = "card fade-up show";
    card.innerHTML = `
      <img src="${reader.result}" class="portfolio-img">
      <h3>${title}</h3>
      <p>${desc}</p>
    `;
    document.querySelector(".portfolio-box").appendChild(card);
    modalUpload.style.display = "none";

    // 초기화
    document.getElementById("uploadImage").value = "";
    document.getElementById("uploadTitle").value = "";
    document.getElementById("uploadDesc").value = "";
  };
  reader.readAsDataURL(img);
};
