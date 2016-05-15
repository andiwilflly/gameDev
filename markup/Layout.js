class Layout extends React.Component {

	render() {
		return (
			<div className="page-content">
				<div className="content">
					{ this.props.children }
				</div>
			</div>
		);
	}
}

export default Layout;
