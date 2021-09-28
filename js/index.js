const submitBtn = document.querySelector(".submitBtn");
submitBtn.addEventListener("click", handleSearch);
let userName;
let userList = document.querySelector("#user-list");
let repoList = document.querySelector("#repos-list");
let form = document.querySelector("#github-form");

function handleSearch(event) {
  event.preventDefault();
  userName = document.querySelector("#search").value;
  handleUserInfo();
  form.reset();
}
function handleUserInfo() {
  fetch(`https://api.github.com/search/users?q=${userName}`).then((res) =>
    res.json().then((res) => appendToDom(res))
  );
}

function appendToDom(res) {
  const card = document.createElement("div");
  card.innerHTML = `
      <div class="card">
    <h2 class ='username'>${res.items[0].login} </h2>
    <img src=${res.items[0].avatar_url} class="icon"/>
    <a href='https://github.com/RogerMendez29'>${res.items[0].html_url}</a>
    <button class="deleteCard" id="deleteBtnn">Delete ID</button>
  </div>`;
  card.querySelector(".deleteCard").addEventListener("click", () => {
    card.remove();
  });
  userList.append(card);
  let names = document.querySelector(".username");
  names.addEventListener("click", getRepos);
}

function getRepos() {
  fetch(`https://api.github.com/users/${userName}/repos`)
    .then((res) => res.json())
    .then((repositories) =>
      repositories.forEach((repo) => {
        const repos = document.createElement("div");
        repos.innerHTML = `<h4 class ='repo'>${repo.name} </h4>
        <button class="deleteRepositories" id="deleteBtnn">Delete Repo</button>`;
        repos
          .querySelector(".deleteRepositories")
          .addEventListener("click", () => {
            repos.remove();
          });
        repoList.append(repos);
      })
    );
}
