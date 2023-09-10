import { addUser, selectUser, signin, delUser, updUser, selectAllUser, refToken } from "./services/user";

describe("Connexion a la base en fonction des users", () => {
    let accessToken = null;
    let refreshToken = null;
    let uuid = null;

    const identity = {
        email: "administrateur@admin.fr",
        password: "Admini9!",
    };

    test("Signin with admin account", async () => {
        const tokens = await signin(identity);
        accessToken = tokens.data.accessToken;
        refreshToken = tokens.data.refreshToken;

        expect(tokens).toHaveProperty("status", 200);
    });

    test("refresh token", async () => {
        const refresh = await refToken(accessToken, refreshToken, {});

        expect(refresh).toHaveProperty("status", 200);
    });

    test("Select all users when ou are admin", async () => {
        const allUsers = await selectAllUser(accessToken);

        expect(allUsers).toHaveProperty("status", 200);
    });

    test("select a user account by uuid", async () => {
        const uuid = "485d116d-9c2c-49f1-80e3-e227e33f67b7";
        const selectOneUser = await selectUser(accessToken, uuid);

        expect(selectOneUser).toHaveProperty("status", 200);
    });

    test("add a simple user", async () => {
        const newUser = await addUser({
            email: "john.doe@admin.fr",
            password: "Admini9!",
        });
        uuid = newUser.data.uuid;

        expect(newUser).toHaveProperty("status", 200);
    });

    test("Modification one info on a simple user", async () => {
        const modifUser = await updUser(accessToken, uuid, {
            role_code: 755,
        });
        expect(modifUser).toHaveProperty("status", 200);
    });

    test("delete a simple user", async () => {
        const deleteUser = await delUser(accessToken, uuid);

        expect(deleteUser).toHaveProperty("status", 200);
    });
});
