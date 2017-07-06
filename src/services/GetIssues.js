import IssueModel from '../utils/IssueModel';
import requestParams from '../utils/requestParams';

export default function GetIssues(request) {
    const params = requestParams();
    return fetch(
        `https://api.github.com/search/issues?q=repo:${request.repo}+is:${request.type}&sort=${request.sort}&order=${request.order}&page=${request.page}&per_page=25&client_id=${params.clientID}&client_secret=${params.clientSecret}`
    )
        .then(resp => resp.json())
        .then(response => {
            let receivedIssues = [];
            response.items.forEach(issue => {
                receivedIssues.push(new IssueModel(issue));
            });
            return {
                totalIssueAmount: response.total_count,
                issues: receivedIssues
            };
        })
        .catch(error => {
            console.log(error);
        });
}
