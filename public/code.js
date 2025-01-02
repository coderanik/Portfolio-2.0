const toggleButton = document.querySelector('.toggle-button');
const navLinks = document.querySelector('.navlinks');

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

async function fetchRepositories() {
  try {
    const response = await fetch('/api/repositories'); // Calls the serverless function
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const repos = await response.json();
    renderRepositories(repos);
  } catch (error) {
    document.getElementById('repositories').innerHTML = `<p>Error fetching repositories: ${error.message}</p>`;
    console.error("Failed to fetch repositories:", error.message);
  }
}

function renderRepositories(repos) {
  const repoContainer = document.getElementById('repositories');
  repoContainer.innerHTML = ''; // Clear the loading message

  repos.forEach(repo => {
    const repoElement = document.createElement('div');
    repoElement.className = 'repo';
    repoElement.innerHTML = `
      <h3>${repo.name}</h3>
      <p>Created At: ${new Date(repo.created_at).toLocaleString()}</p>
      <p>Language: ${repo.language || 'Not specified'}</p>
      <button onclick="window.open('${repo.html_url}', '_blank')">View on GitHub</button>
    `;
    repoContainer.appendChild(repoElement);
  });
}

fetchRepositories();

const sr = ScrollReveal({
  origin: 'top',
  distance: '45px',
  duration: 1500,
  reset: true
})

sr.reveal ('#home',{delay:200});
sr.reveal ('#about-me',{delay:200});
sr.reveal ('#stack-section',{delay:200});
sr.reveal ('#soft-section',{delay:200});
sr.reveal ('#works',{delay:200});
