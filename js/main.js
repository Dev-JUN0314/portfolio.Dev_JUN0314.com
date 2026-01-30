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
const btnInquiry = document.getElementById("openInquiry");
const btnContact = document.getElementById("openContact");
const spans = document.getElementsByClassName("close");

btnInquiry.onclick = () => modalInquiry.style.display = "block";
btnContact.onclick = () => modalContact.style.display = "block";

for (let span of spans) {
  span.onclick = () => {
    modalInquiry.style.display = "none";
    modalContact.style.display = "none";
  }
}

window.onclick = (e) => {
  if (e.target == modalInquiry) modalInquiry.style.display = "none";
  if (e.target == modalContact) modalContact.style.display = "none";
};
