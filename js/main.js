// 부드러운 스크롤
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// 스크롤 애니메이션
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// 모달 공통
const modalInquiry = document.getElementById("modalInquiry");
const modalContact = document.getElementById("modalContact");
const modalUpload = document.getElementById("modalUpload");

document.getElementById("openInquiry").onclick = () => modalInquiry.style.display = "block";
document.getElementById("openContact").onclick = () => modalContact.style.display = "block";

document.querySelectorAll(".close").forEach(btn => {
  btn.onclick = () => {
    modalInquiry.style.display = "none";
    modalContact.style.display = "none";
    modalUpload.style.display = "none";
  };
});

window.onclick = e => {
  if (e.target.classList.contains("modal")) e.target.style.display = "none";
};

// 포트폴리오 업로드
const uploadBtns = document.querySelectorAll(".private-btn");
const uploadConfirm = document.getElementById("uploadConfirm");
const pfTitle = document.getElementById("pfTitle");
const pfDesc = document.getElementById("pfDesc");
const pfImage = document.getElementById("pfImage");
const portfolioBox = document.querySelector(".portfolio-box");

uploadBtns.forEach(btn => {
  btn.onclick = () => modalUpload.style.display = "block";
});

uploadConfirm.onclick = () => {
  if (!pfTitle.value || !pfDesc.value || !pfImage.files[0]) return;

  const reader = new FileReader();
  reader.onload = () => {
    const card = document.createElement("div");
    card.className = "card fade-up show";
    card.innerHTML = `
      <img src="${reader.result}" class="pf-img">
      <h3>${pfTitle.value}</h3>
      <p>${pfDesc.value}</p>
    `;
    portfolioBox.appendChild(card);
    modalUpload.style.display = "none";
    pfTitle.value = pfDesc.value = pfImage.value = "";
  };
  reader.readAsDataURL(pfImage.files[0]);
};
