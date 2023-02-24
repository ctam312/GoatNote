import React from "react";
import { Link } from "react-router-dom";
import logo from "../SplashPage/Goatnote.png"
import homepage from "../SplashPage/evernotehome.PNG"

import "./SplashPage.css";

export default function SplashLanding() {
	return (
		<div className="splashpage-container">
			<div className="splashpage-nav">
				<div className="splashpagenav-header">
					<div>
						<img src={logo} id="splashpagelogo" alt="logo" />
					</div>
				</div>
				<div>
					<Link to="/login">
						<button className="splashpage-login">Log in</button>
					</Link>
				</div>
			</div>
			<div className="splashpage-top">
				<h1>Tame your work, organize your life</h1>
				<h2>
					Remember everything and tackle any project with your notes, tasks, and notebooks all in one place.
				</h2>
				<Link to="/signup">
					<button className="splashpage-sign-up">Sign up for free</button>
				</Link>
				<Link to="/login">
					<p>Already have an account? Log in</p>
				</Link>
			</div>
			<div className="splashpage-body">
                <div>
					<img src={homepage} id="splashpage-img" alt="home example page" />{" "}
                </div>
				<div className="splashpage-four">
					<div className="splashpage-item">
						<div className="title">WORK ANYWHERE</div>
						<div className="desc">
							Keep important info handy — your notes sync automatically to your account.
						</div>
					</div>
					<div className="splashpage-item">
						<div className="title">REMEMBER EVERYTHING</div>
						<div className="desc">
							Make notes more useful by being organized into notebooks.
						</div>
					</div>
					<div className="splashpage-item">
						<div className="title">TURN TO-DO INTO DONE</div>
						<div className="desc">
							Bring your notes, tasks, and notebooks together to get things done more easily.
						</div>
					</div>
					<div className="splashpage-item">
						<div className="title">FIND THINGS FAST</div>
						<div className="desc">
							Notes are easily displayed and organized at the tip of your fingers.
						</div>
					</div>
				</div>
			</div>

			<footer className="splashpage-footer">
				<div className="dev-footer">An Evernote clone by Christian A. Tam</div>
				<div className="links-footer">
					<a
						className="social"
						href="https://www.linkedin.com/in/ctam312/"
					>
						<i className="fa-brands fa-linkedin fa-xl" />
					</a>
					<a
						className="social"
						href="https://github.com/ctam312"
					>
						<i class="fa-brands fa-github"></i>
					</a>
				</div>
			</footer>
		</div>
	);
}
