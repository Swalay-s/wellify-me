"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { ChatMessage } from "./_components/ChatMessage";
import { Welcome } from "./_components/Welcome";

interface ChatMessage {
	role: "user" | "assistant";
	content: string;
}

export default function ChatPage() {
	// The content of the box where the user is typing
	const [message, setMessage] = useState<string>("");
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [currentAiMsg, setCurrentAiMsg] = useState<string | null>(null);
	const [state, setState] = useState<"idle" | "waiting" | "loading">("idle");

	function sendMessage(message: string, chatHistory: any) {
		if (!message.length) return;

		setChatHistory([...chatHistory, { role: "user", content: message } as const]);
		setState("waiting");

		// send message to api and wait for a response
		let response = `  ${message}`;
		setChatHistory((oldHistory) => {
			return [...oldHistory, { role: "assistant", content: response } as const];
		});

    // idc anymore, just wait for it to finish typewriting 
		setTimeout(() => {
			setState("idle");
		}, 20 * response.length);
	}

	function clear() {
		setChatHistory([]);
		setState("idle");
		setCurrentAiMsg(null);
	}

	// This is a ref to the bottom of the chat history. We use it to scroll
	// to the bottom when a new message is added.
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		scrollToBottom();
	}, [currentAiMsg, chatHistory, state]);

	const scrollToBottom = () => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	// This is a ref to the input box. We use it to focus the input box when the
	// user clicks on the "Send" button.
	const inputRef = useRef<HTMLInputElement>(null);
	const focusInput = () => {
		inputRef.current?.focus();
	};

	useEffect(() => {
		focusInput();
	}, [state]);

	return (
		<div className="flex flex-row justify-center items-center mt-1 h-4/5">
			<main className="md:rounded-lg shadow-md border-black p-6 w-[90%] h-full flex flex-col bg-[#86aeb0]">
				<section className="overflow-y-auto flex-grow mb-4 pb-8">
					<div className="flex flex-col space-y-4">
						{chatHistory.length === 0 ? (
							<>
								<Welcome />
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
									<button
										onClick={() => sendMessage("Hi Serenity, could you help me with something?", chatHistory)}
										className="bg-background-secondary border-gray-300 border-2 rounded-lg p-4"
									>
										Click for help
									</button>
								</div>
							</>
						) : (
							chatHistory.map((chat: any, i: any) => <ChatMessage key={i} message={chat} />)
						)}
					</div>

					<div ref={bottomRef} />
				</section>
				<div className="flex items-center justify-center h-20">
					{state === "idle" ? null : (
						<button className="bg-background-secondary text-gray-900 py-2 px-4 my-8" onClick={() => {}}>
							Stop generating
						</button>
					)}
				</div>
				<section className="bg-background-secondary rounded-lg p-2 mt-auto">
					<form
						className="flex"
						onSubmit={(e) => {
							e.preventDefault();
							sendMessage(message, chatHistory);
							setMessage("");
						}}
					>
						{chatHistory.length > 1 ? (
							<button
								className="bg-gray-100 text-gray-600 py-2 px-4 rounded-l-lg"
								type="button"
								onClick={(e) => {
									e.preventDefault();
									clear();
									setMessage("");
								}}
							>
								Clear
							</button>
						) : null}
						<input
							type="text"
							ref={inputRef}
							className="w-full rounded-l-lg p-2 outline-none bg-slate-100"
							placeholder={state == "idle" ? "Type your message..." : "..."}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							disabled={state !== "idle"}
						/>
						{state === "idle" ? (
							<button
								className="bg-foreground-tertiary text-white font-bold py-2 px-4 rounded-r-lg"
								type="submit"
							>
								Send
							</button>
						) : null}
					</form>
				</section>
			</main>
		</div>
	);
}
