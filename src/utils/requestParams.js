export default function requestParams() {
	return {
		clientID: '4baf5db08718ca02f3d8',
		clientSecret: '9b6cae2642a5a9887a22e2cbdc8db141458773e8',
		baseURL: 'https://api.github.com/search',
		topReposURL: `https://api.github.com/search/repositories?client_id=4baf5db08718ca02f3d8&client_secret=9b6cae2642a5a9887a22e2cbdc8db141458773e8&order=desc&q=language:javascript&sort=stars`
	};
}
