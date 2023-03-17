const Navbar = () => {
	return (
		<nav className="navbar bg-secondary text-secondary-content">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost btn-circle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h7"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<a className="text-neutral">Homepage</a>
						</li>
						<li>
							<a className="text-neutral">Portfolio</a>
						</li>
						<li>
							<a className="text-neutral">About</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="navbar-center">
				<a className="btn btn-ghost normal-case text-xl">React with Pocketbase</a>
			</div>
			<div className="navbar-end">
				<div className="avatar cursor-pointer">
  					<div className="lg:w-10 w-8 rounded-full">
    					<img src="https://placehold.co/50X50/deeppink/white?text=M" />
  					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
