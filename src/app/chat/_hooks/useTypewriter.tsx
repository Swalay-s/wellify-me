import { useState, useEffect } from "react";

export default function useTypewriter(text: string, speed = 20) {
	const [displayText, setDisplayText] = useState("");

	useEffect(() => {
		console.log(text);
		
		let i = 0;
		const typingInterval = setInterval(() => {
			if (i < text.length) {
				setDisplayText((prevText) => prevText + text.charAt(i));
				i++;
			} else {
				clearInterval(typingInterval);
			}
		}, speed);

		return () => {
			clearInterval(typingInterval);
		};
	}, [text, speed]);

	return displayText;
}
