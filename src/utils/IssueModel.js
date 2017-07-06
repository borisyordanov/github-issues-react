export default function IssueModel(issue) {
	return {
		title: issue.title,
		state: issue.state,
		updateDate: issue.updated_at,
		comments: issue.comments,
		key: issue.id,
		id: issue.id
	};
}
