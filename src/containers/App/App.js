import React from 'react';
import RepoSelector from '../../components/RepoSelector/RepoSelector';
import IssueFilters from '../../components/IssueFilters/IssueFilters';
import RepoStats from '../../components/RepoStats/RepoStats';
import IssueList from '../../components/IssueList/IssueList';
import './App.css';

import GetRepos from '../../services/GetRepos';
import GetIssues from '../../services/GetIssues';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			topFiveRepos: [],
			repoStats: {},
			filters: [
				[
					{
						name: 'All',
						value: ''
					},
					{
						name: 'Open',
						value: 'open'
					},
					{
						name: 'Closed',
						value: 'closed'
					}
				],
				[
					{
						name: 'Most Commented',
						value: 'comments'
					},
					{
						name: 'Least Commented',
						value: 'comments'
					},
					{
						name: 'Recently Updated',
						value: 'updated'
					},
					{
						name: 'Least Recently Updated',
						value: 'updated'
					}
				]
			],
			issues: [],
			selectedRepo: null
		};
		this.request = {
			sort: 'comments',
			order: 'desc',
			type: '',
			page: 1,
			isLoading: false,
			clientID: '4baf5db08718ca02f3d8',
			clientSecret: '9b6cae2642a5a9887a22e2cbdc8db141458773e8'
		};

		this.topReposURL = `https://api.github.com/search/repositories?client_id=${this.request
			.clientID}&client_secret=${this.request.clientSecret}&order=desc&q=language:javascript&sort=stars`;

		this.repoSelect = this.repoSelect.bind(this);
		this.filterSelect = this.filterSelect.bind(this);
		this.onScroll = this.onScroll.bind(this);
	}

	componentDidMount() {
		GetRepos().then(response => {
			this.setState({
				topFiveRepos: response,
				selectedRepo: response[0]
			});
			this.addIssues(false);
		});

		window.addEventListener('scroll', this.onScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll);
	}

	onScroll() {
		const buffer = this.parseScrollBuffer('100px');
		const vpHeight = document.body.offsetHeight - window.innerHeight;

		if (!this.request.isLoading && vpHeight - buffer <= document.body.scrollTop) {
			this.addIssues(true);
		}
	}

	parseScrollBuffer(heightInPx) {
		return +heightInPx.slice(0, -2);
	}

	repoSelect(e) {
		this.state.topFiveRepos.forEach(repo => {
			if (repo.fullName === e.target.value) {
				this.setState({
					selectedRepo: repo
				});
			}
		});

		this.addIssues(false);
	}

	filterSelect(e) {
		const selectedFilter = e.target.value;
		if (selectedFilter === 'comments' || selectedFilter === 'updated') {
			if (this.request.sort === selectedFilter && this.request.order === 'asc') {
				this.request.order = 'desc';
			} else if (this.request.sort === selectedFilter && this.request.order === 'desc') {
				this.request.order = 'asc';
			} else {
				this.request.sort = selectedFilter;
			}
		} else {
			this.request.type = selectedFilter;
			this.request.order = 'desc';
		}
		this.addIssues(false);
	}

	addIssues(append) {
		this.request.isLoading = true;
		GetIssues({
			repo: this.state.selectedRepo.fullName,
			type: this.request.type,
			sort: this.request.sort,
			order: this.request.order,
			page: this.request.page
		})
			.then(response => {
				//if there is no reponse
				if (response.issues.length <= 0) {
					this.setState({
						issues: [{ title: 'No issues found', id: 1 }]
					});
				} else {
					//update repo stats
					let topRepos = this.state.topFiveRepos.slice();
					topRepos.forEach(repo => {
						const repoNeedsData =
							repo.fullName === this.state.selectedRepo.fullName &&
							this.request.type === '' &&
							repo.totalIssues === 'N/A';

						if (repoNeedsData) {
							repo.totalIssues = response.totalIssueAmount;
							repo.closedIssues = response.totalIssueAmount - repo.openIssues;

							this.setState({
								topFiveRepos: topRepos
							});
						}
					});

					//append or replace issues
					if (append) {
						this.setState(prevState => {
							issues: prevState.issues.push(...response.issues);
						});
					} else {
						this.setState({
							issues: response.issues
						});
					}
				}
				this.request.page++;
				this.request.isLoading = false;
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="app">
				<RepoSelector changeHandler={this.repoSelect} repos={this.state.topFiveRepos} />
				<RepoStats {...this.state.selectedRepo} />
				<IssueFilters changeHandler={this.filterSelect} filters={this.state.filters} />
				<IssueList issues={this.state.issues} />
			</div>
		);
	}
}
export default App;
