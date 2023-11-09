import axios from "axios";

export const client = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:800"}/api`,
	headers: {
		Accept: "application/json",
	},
});

let cachedResources: any = null;
let cachedQuizzes: any = null;

// fake api.. whatever
export async function posts(type: string) {
	try {
		if (cachedResources) return cachedResources[type];

		let res = await axios.get(`/resources/articles.json`);
		cachedResources = res.data;
		return res.data[type];
	} catch (err) {
		throw err;
	}
}

export async function post(id: string) {
	try {
		let resources = null;
		if (cachedResources) {
			resources = cachedResources;
		} else {
			let res = await axios.get(`/resources/articles.json`);
			resources = res.data;
		}

		for (let postCategory in resources) {
			let posts = resources[postCategory];
			let requiredPost = posts.find((p: any) => p.post_id == id);
			if (requiredPost) return requiredPost;
		}

		return null;
	} catch (err) {
		throw err;
	}
}

export async function quizzes() {
	try {
		if (cachedQuizzes) return cachedQuizzes;

		let res = await axios.get(`/resources/quizzes.json`);
		cachedQuizzes = res.data;
		return res.data;
	} catch (err) {
		throw err;
	}
}

export async function quiz(slug: string) {
	try {
		let quizzes = null;
		if (cachedResources) {
			quizzes = cachedQuizzes;
		} else {
			let res = await axios.get(`/resources/quizzes.json`);
			quizzes = res.data;
		}

		let requiredQuiz = quizzes.find((q: any) => q.quiz_slug == slug);

		if (requiredQuiz) return requiredQuiz;

		return null;
	} catch (err) {
		throw err;
	}
}

export async function getAiResponse(msg: string) {
	try {
		let res = await client.post(`/chat`, msg);
		return res.data;
	} catch (err) {
		throw err;
	}
}
