import styles from "./resources.module.css";

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className={styles.bg} />
			{children}
		</>
	);
}
