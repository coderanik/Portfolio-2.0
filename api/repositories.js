const axios = require('axios');

const fetchRepositories = async (url, headers, retries = 3) => {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    if (retries > 0 && error.response?.status === 403) {
      console.warn(`Rate limit reached. Retrying in 60 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 60000));
      return fetchRepositories(url, headers, retries - 1);
    }
    throw error;
  }
};

module.exports = async (req, res) => {
  const username = 'coderanik'; 
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=created&direction=desc`;

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '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'; 

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}` 
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