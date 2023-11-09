import styles from "./chatPage.module.css";

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className={styles.bg} />
			{children}
		</>
	);
}
