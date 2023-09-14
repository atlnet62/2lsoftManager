import { addUser, selectUser, signin, delUser, updUser, selectAllUser, refToken } from "./services/user";

describe("To logins and actions on the BDD in admin mode", () => {
    let accessToken = null;
    let refreshToken = null;
    let uuid = null;

    const userLogin = {
        email: "user@user.fr", 
        password: "Admini9!" 
    }

    const adminLogin = {
        email: "administrateur@admin.fr",
        password: "Admini9!",
    };

    const newUserDatas = {
        email: "john.doe@admin.fr",
        password: "Admini9!",
    };

    const fakeNewUserDatas = {
        email: "john.doe@admin.fr",
        password: "A",
    };

    const userModifDatas = {
        role_code: 755,
    };

    const fakeUserModifDatas = {
        role_code: 'e',
    };

    test("Return an error to signin with user account", async () => {
        const tokens = await signin(userLogin);
        expect(tokens.isError).toBe(true);
    });

    test("Signin with admin account validated", async () => {
        const tokens = await signin(adminLogin);
        accessToken = tokens.accessToken;
        refreshToken = tokens.refreshToken;
        expect(tokens.isLogged).toBe(true);
    });

    test("Return an error to select all users when you are admin", async () => {
        const allUsers = await selectAllUser();
        expect(allUsers.isError).toBe(true);
    });

    test("Select all users when you are admin", async () => {
        const allUsers = await selectAllUser(accessToken);
        expect(allUsers.isRetrieved).toBe(true);
    });

    test("Return an error to add an user", async () => {
        const newUser = await addUser(fakeNewUserDatas);
        expect(newUser.isError).toBe(true);
    });

    test("Add a simple user", async () => {
        const newUser = await addUser(newUserDatas);
        uuid = newUser.uuid;
        expect(newUser.isCreated).toBe(true);
    });

    test("Return an error due to a uuid failed", async () => {
        const selectOneUser = await selectUser(accessToken, 'xxx');
        expect(selectOneUser.isError).toBe(true);
    });

    test("Select a user account by uuid", async () => {
        const selectOneUser = await selectUser(accessToken, uuid);
        expect(selectOneUser.isRetrieved).toBe(true);
    });

    test("Return an error to modify the role code on a simple user to pass in modo account", async () => {
        const modifUser = await updUser(accessToken, uuid, fakeUserModifDatas);
        expect(modifUser.isError).toBe(true);
    });

    test("To modify the role code on a simple user to pass in modo account", async () => {
        const modifUser = await updUser(accessToken, uuid, userModifDatas);
        expect(modifUser.isUpdated).toBe(true);
    });

    test("Return an error to delete a simple user account", async () => {
        const deleteUser = await delUser(accessToken, 'xxx');
        expect(deleteUser.isError).toBe(true);
    });

    test("Delete a simple user account", async () => {
        const deleteUser = await delUser(accessToken, uuid);
        expect(deleteUser.isDeleted).toBe(true);
    });

    test("Refresh the token correctly", async () => {
        const refresh = await refToken(accessToken, refreshToken, {});
        expect(refresh.isRefreshed).toBe(true);
    });

    test("Return an error on refresh the token", async () => {
        const refresh = await refToken(accessToken, accessToken, {});
        expect(refresh.isError).toBe(true);
    });
});