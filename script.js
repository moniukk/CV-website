const browserInfo = navigator.userAgent;
const platformInfo = navigator.platform;

localStorage.setItem("browserInfo", browserInfo);
localStorage.setItem("platformInfo", platformInfo);

const infoText = `Браузер: ${browserInfo} | ОС: ${platformInfo}`;
const footer = document.getElementById("footer");
const infoParagraph = document.createElement("p");
infoParagraph.textContent = infoText;
footer.appendChild(infoParagraph);

const fakeComments = [
  {
    postId: 17,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  },
  {
    postId: 17,
    id: 2,
    name: "quo vero reiciendis velit similique earum",
    email: "Jayne_Kuhic@sydney.com",
    body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
  },
  {
    postId: 17,
    id: 3,
    name: "odio adipisci rerum aut animi",
    email: "Nikita@garfield.biz",
    body: "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
  },
  {
    postId: 17,
    id: 4,
    name: "alias odio sit",
    email: "Lew@alysha.tv",
    body: "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
  },
  {
    postId: 17,
    id: 5,
    name: "vero eaque aliquid doloribus et culpa",
    email: "Hayden@althea.biz",
    body: "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
  }
];

const main = document.getElementById("content");

const commentsSection = document.createElement("section");
commentsSection.id = "comments";
commentsSection.innerHTML = "<h2>Коментарі роботодавців</h2>";

fakeComments.forEach(comment => {
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment-box");

  commentDiv.innerHTML = `
    <h3>${comment.name}</h3>
    <p><strong>Email:</strong> ${comment.email}</p>
    <p>${comment.body.replace(/\n/g, "<br>")}</p>
  `;

  commentsSection.appendChild(commentDiv);
});

main.insertBefore(commentsSection, footer);

setTimeout(() => {
  const modal = document.getElementById("feedbackModal");
  modal.style.display = "block";

  const closeBtn = modal.querySelector(".close");
  closeBtn.onclick = () => modal.style.display = "none";

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}, 60000);

const storageKey = 'theme-preference';

const getColorPreference = () => {
  const hour = new Date().getHours();
  return (hour < 7 || hour >= 21) ? 'dark' : 'light';
};

const theme = { value: getColorPreference() };

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
};

const reflectPreference = () => {
  document.documentElement.setAttribute('data-theme', theme.value);
  document
    .querySelector('#theme-toggle')
    ?.setAttribute('aria-label', theme.value);
};

reflectPreference();

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    setPreference();
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll("main section, main article").forEach(el => {
  el.classList.add("fade-in");
  observer.observe(el);
});
