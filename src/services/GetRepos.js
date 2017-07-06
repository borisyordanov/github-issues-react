import RepoModel from '../utils/RepoModel';
import requestParams from '../utils/requestParams';

export default function GetRepos() {
    const params = requestParams();
    return fetch(params.topReposURL)
        .then(resp => resp.json())
        .then(response => {
            let topRepos = [];
            response.items.slice(0, 5).forEach(repo => {
                topRepos.push(new RepoModel(repo));
            });
            return topRepos;
        })
        .catch(error => {
            console.log(error);
        });
}
