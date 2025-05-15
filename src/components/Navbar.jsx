import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container justify-content-end">
				<div className="ml-auto">
					<Link to="/addcontact">
						<button className="btn btn-primary">Add Contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};