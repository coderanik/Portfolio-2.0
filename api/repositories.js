const axios = require('axios');

const fetchRepositories = async (url, headers, retries = 3) => {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    if (retries > 0 && error.response?.status === 403) {
      console.warn(`Rate limit reached. Retrying in 60 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 60 seconds
      return fetchRepositories(url, headers, retries - 1);
    }
    throw error;
  }
};

module.exports = async (req, res) => {
  const username = 'coderanik'; // Replace with the GitHub username
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=created&direction=desc`;

  // GitHub Personal Access Token (optional)
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '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'; 

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}` // Optional for higher rate limits
      }
    });

    // Return only the top 6 repositories
    const recentRepos = response.data.slice(0, 6);
    res.status(200).json(recentRepos);
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch repositories' });
  }
};