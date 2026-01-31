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

// 모달 열기/닫기
const modalInquiry = document.getElementById("modalInquiry");
const modalContact = document.getElementById("modalContact");
const modalUpload = document.getElementById("modalUpload");

const btnInquiry = document.getElementById("openInquiry");
const btnContact = document.getElementById("openContact");
const uploadBtns = document.querySelectorAll(".openUpload");

const spans = document.getElementsByClassName("close");

// 열기
btnInquiry.onclick = () => modalInquiry.style.display = "flex";
btnContact.onclick = () => modalContact.style.display = "flex";
uploadBtns.forEach(btn => btn.onclick = () => modalUpload.style.display = "flex");

// 닫기
for (let span of spans) {
  span.onclick = () => {
    modalInquiry.style.display = "none";
    modalContact.style.display = "none";
    modalUpload.style.display = "none";
  }
}

// 모달 외부 클릭 시 닫기
window.onclick = (e) => {
  if (e.target == modalInquiry) modalInquiry.style.display = "none";
  if (e.target == modalContact) modalContact.style.display = "none";
  if (e.target == modalUpload) modalUpload.style.display = "none";
};

// 포트폴리오 업로드
const uploadBtn = document.getElementById("uploadBtn");
uploadBtn.onclick = () => {
  const img = document.getElementById("uploadImage").files[0];
  const title = document.getElementById("uploadTitle").value;
  const desc = document.getElementById("uploadDesc").value;

  if (!img || !title || !desc) {
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
