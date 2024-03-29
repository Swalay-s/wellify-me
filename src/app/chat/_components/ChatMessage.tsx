import { FunctionComponent, DetailedHTMLProps, TableHTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useTypewriter from "../_hooks/useTypewriter";

interface ChatMessage {
	role: "user" | "assistant";
	content: string;
}
interface Props {
	message: ChatMessage;
}

// This lets us style any markdown tables that are rendered
const CustomTable: FunctionComponent<
	Omit<DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, "ref">
> = ({ children, ...props }) => {
	return (
		<div className="overflow-x-auto">
			<table {...props} className="w-full text-left border-collapse table-auto">
				{children}
			</table>
		</div>
	);
};

const AiMsg: React.FC<React.PropsWithChildren<Props>> = ({ message }) => {
	const displayText = useTypewriter(message.content);

	return (
		<div className="flex items-end">
			<div className="bg-gray-100 border-gray-300 border-2 rounded-lg p-2 mr-20 w-full">
				<ReactMarkdown
					// eslint-disable-next-line react/no-children-prop
					children={displayText}
					remarkPlugins={[remarkGfm]}
					components={
						{
							table: CustomTable,
						} as any
					}
				/>
			</div>
		</div>
	);
};
/**
 * This component renders a single chat message. It is rendered according to
 * whether it isa  message from the assistant or the user.
 */

export const ChatMessage: React.FC<React.PropsWithChildren<Props>> = ({ message }) => {
	return message.role === "user" ? (
		<div className="flex items-end justify-end">
			<div className="bg-gray-300 border-gray-100 border-2 rounded-lg p-2 max-w-lg">
				<p>{message.content}</p>
			</div>
		</div>
	) : (
		<AiMsg message={message} />
	);
};
