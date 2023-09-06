import { signin } from "./services/user";

describe("Connexion a la base en fonction des users", () => {
    test("Signin with admin", async () => {
        const identity = {
            email: "administrateur@admin.fr",
            password: "Admini9!",
        };

        expect(await signin(identity)).toHaveProperty("status", 200);
    });
});