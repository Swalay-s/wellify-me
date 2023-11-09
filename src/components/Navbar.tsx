import Link from "next/link";

function NavButton({ href, children }: any) {
	return (
		<Link className="text-2xl font-bold hover:text-foreground-tertiary" href={href}>
			{children}
		</Link>
	);
}
export default function Navbar() {
	return (
		<nav className="bg-transparent flex items-center w-full h-20">
			<div className="w-2/5 ml-10">
				<h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground-tertiary to-background-secondary">
					<Link href="/">Wellify Me</Link>
				</h3>
			</div>
			<ul className="list-none flex flex-row items-center space-x-5 float-right ml-auto mr-10">
				<li className="mr-4">
					<NavButton href="/resources">Resources</NavButton>
				</li>
				<li className="mr-4">
					<NavButton href="/quizzes">Quizzes</NavButton>
				</li>
				<li className="bg-foreground-primary p-2 rounded-lg">
					<NavButton href="/chat">Talk to the bot</NavButton>
				</li>
			</ul>
		</nav>
	);
}
