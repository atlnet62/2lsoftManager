import { useMemo, useState } from "react";
import Checkbox from "../../Components/Checkbox/Index";
import useToggle from "../../utils/hooks/useToggle";
import Input from "../../Components/Input/Index";
import useSecurity from "../../utils/hooks/useSecurity";
import useMatch from "../../utils/hooks/useMatch";
import useSizingString from "../../utils/hooks/useSizingString";

/**
 *
 * @typedef {object} auth // hook content the object
 * @property {string} login
 * @property {string} password
 * @property {string} confirmPassword
 * Registration User Form
 * @returns {() => string} A message to valid or reject the user creation
 *
 */

export default function Signup() {
    const [auth, setAuth] = useState({ login: "", password: "", confirmPassword: "" });
    const [isTermAccepted, setIsTermAccepted] = useToggle(false);
    const [testPassword, setTestPassword] = useSecurity(null);
    const [isPassMatched, setIsPassMatched] = useMatch(null, null);
    const [loginLength, setLoginLength] = useSizingString(false, 0);

    const passForce = useMemo(() => {
        const tab = [];

        if (testPassword === "High") {
            tab.push("text-green");
        }

        if (testPassword === "Medium") {
            tab.push("text-orange");
        }

        if (testPassword === "Low") {
            tab.push("text-red");
        }

        tab.push(testPassword);
        return tab;
    }, [testPassword]);

    const isMatched = useMemo(() => {
        const tab = [];
        if (isPassMatched) {
            tab.push("text-green", "🗸 The passwords are same.");
        }
        if (!isPassMatched) {
            tab.push("text-red", "⚠️ The passwords aren't same.");
        }
        return tab;
    }, [isPassMatched]);

    const minLoginLengthRequired = useMemo(() => {
        const tab = [];

        if (loginLength) {
            tab.push("text-green", "🗸 E-mail is OK.");
        }
        
        if (!loginLength) {
            tab.push("text-red", "⚠️ E-mail is too small (min: 5 charcaters)");
        }
        return tab;
    }, [loginLength]);

    return (
        <section className="signup">
            <h2>Registration form</h2>
            <form id="signup-form">
                <Input
                    type="email"
                    placeholder="E-mail@domain.com"
                    value={auth.login}
                    onChange={(e) => {
                        setAuth({ ...auth, login: e.target.value }), setLoginLength(e.target.value, 5);
                    }}
                    children={<strong className={minLoginLengthRequired[0]}>{minLoginLengthRequired[1]}</strong>}
                    isRequired={true}
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={auth.password}
                    onChange={(e) => {
                        setAuth({ ...auth, password: e.target.value }), setTestPassword(e.target.value), setIsPassMatched(e.target.value, auth.confirmPassword);
                    }}
                    children={<strong className={passForce[0]}>{passForce[1] !== "High" ? "⚠️"  : "🗸"}{` Sécurity : ${passForce[1]}`}</strong>}
                    isRequired={true}
                />

                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={auth.confirmPassword}
                    onChange={(e) => {
                        setAuth({ ...auth, confirmPassword: e.target.value }), setIsPassMatched(auth.password, e.target.value);
                    }}
                    children={<strong className={isMatched[0]}>{isMatched[1]}</strong>}
                    isRequired={true}
                />

                <Checkbox children="Accepted the CGU Terms." checked={isTermAccepted} onCheck={setIsTermAccepted} />

                <div className="form-button">
                    <Input type="submit" value="Back" onChange={(e) => null} />

                    <Input
                        type="submit"
                        value="Register"
                        onChange={(e) => null}
                        isDisabled={!isTermAccepted || auth.confirmPassword.length === 0 || auth.password.length === 0 || !isMatched || !loginLength ? true : false}
                    />
                </div>
            </form>
        </section>
    );
}