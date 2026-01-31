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

// LocalStorage 저장/불러오기
function savePortfolio() {
  const cards = [];
  document.querySelectorAll(".portfolio-box .card:not(.template)").forEach(card => {
    cards.push({
      title: card.querySelector("h3").innerText,
      desc: card.querySelector("p").innerText,
      img: card.querySelector("img")?.src || ""
    });
  });
  localStorage.setItem("portfolioData", JSON.stringify(cards));
}

function loadPortfolio() {
  const data = JSON.parse(localStorage.getItem("portfolioData") || "[]");
  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card fade-up show";
    card.innerHTML = `
      <button class="delete-btn">×</button>
      ${item.img ? `<img src="${item.img}" class="pf-img">` : ""}
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    `;
    card.querySelector(".delete-btn").onclick = () => {
      card.remove();
      savePortfolio();
    };
    portfolioBox.appendChild(card);
  });
}

// 카드 업로드
uploadConfirm.onclick = () => {
  if (!pfTitle.value || !pfDesc.value || !pfImage.files[0]) return;

  const reader = new FileReader();
  reader.onload = () => {
    const card = document.createElement("div");
    card.className = "card fade-up show";
    card.innerHTML = `
      <button class="delete-btn">×</button>
      <img src="${reader.result}" class="pf-img">
      <h3>${pfTitle.value}</h3>
      <p>${pfDesc.value}</p>
    `;

    card.querySelector(".delete-btn").onclick = () => {
      card.remove();
      savePortfolio();
    };

    portfolioBox.appendChild(card);
    savePortfolio();

    modalUpload.style.display = "none";
    pfTitle.value = "";
    pfDesc.value = "";
    pfImage.value = "";
  };
  reader.readAsDataURL(pfImage.files[0]);
};

// 페이지 로드 시 LocalStorage에서 불러오기
loadPortfolio();
