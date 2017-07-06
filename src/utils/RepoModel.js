export default function RepoModel(repo) {
	return {
		fullName: repo.full_name,
		name: repo.name,
		forks: repo.forks_count,
		watchers: repo.watchers_count,
		stars: repo.stargazers_count,
		closedIssues: 'N/A',
		openIssues: repo.open_issues_count,
		totalIssues: 'N/A',
		key: repo.id,
		id: repo.id
	};
}
