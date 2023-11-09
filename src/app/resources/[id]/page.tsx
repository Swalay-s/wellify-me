"use client";
import Image from "next/image";
import styles from "./post.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { getPost } from "@/lib/postSlice";

export default function Page(props: { params: { id: string } }) {
	const post = useAppSelector((state) => state.postSlice.currentPost);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getPost(props.params.id));
	}, []);

	return (
		<div className={styles.outerContainer}>
			{post ? (
				<div className={styles.postContainer}>
					<div className={styles.titleBar}>
						<div className={styles.postData}>
							<h1 style={{ fontSize: "35px", fontWeight: "600" }}>{post?.title}</h1>
							<h2
								style={{ fontSize: "30px", color: "#757575", fontWeight: "500" }}
							>{`By ${post.author} in ${post.type}`}</h2>
						</div>
						<div className={styles.thumbnail}>
							<Image src={post?.thumbnail} alt={post?.title} fill={true} />
						</div>
					</div>
					<div className={styles.content}>
						<p>{post?.content}</p>
					</div>
				</div>
			) : null}
		</div>
	);
}
