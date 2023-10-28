import { selectAllPost, selectOnePost, insertOnePost } from "./services/post";
import { signin } from "./services/user";

describe("all test about the posts", () => {
    const adminLogin = {
        email: "administrateur@admin.fr",
        password: "Admini9!",
    };

    const datas = {
        uuid: "485d116d-9c2c-49f1-80e3-e227e33f67b7",
        title: "test",
        content: "test",
        categories: [1, 3, 5],
    };

    test("Return all post inside the BDD", async () => {
        const tokens = await signin(adminLogin);
        if (tokens.isLogged) {
            const posts = await selectAllPost(tokens.accessToken);
            expect(posts.isRetrieved).toBe(true);
        }
    });

    test("Insert one post inside the BDD", async () => {
        const tokens = await signin(adminLogin);
        if (tokens.isLogged) {
            const post = await insertOnePost(tokens.accessToken, datas);
            expect(post.isCreated).toBe(true);
        }
    });

    test("Return one post inside the BDD", async () => {
        const tokens = await signin(adminLogin);
        if (tokens.isLogged) {
            const post = await selectOnePost(tokens.accessToken, 1);
            expect(post.isRetrieved).toBe(true);
        }
    });
});
