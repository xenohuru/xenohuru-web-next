// GitHub API integration for contributors
export async function getXenohurGitHubContributors() {
  try {
    const res = await fetch('https://api.github.com/repos/xenohuru/xenohuru-web-nextjs/contributors', {
      headers: { 'Accept': 'application/vnd.github+json' },
    });
    if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
    const data = await res.json();
    return data.map((c: any) => ({
      id: c.id,
      name: c.login,
      avatar: c.avatar_url,
      profile: c.html_url,
      contributions: c.contributions,
    }));
  } catch (err) {
    console.error('GitHub contributors fetch failed:', err);
    return [];
  }
}
