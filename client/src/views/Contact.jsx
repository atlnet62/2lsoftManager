import { useMemo, useState } from "react";
import Input from "../Components/Input/Index";
import Textarea from "../Components/Textarea/Index";

function Contact() {
    const [letter, setLetter] = useState({ email: "", subject: "", message: "" });

    const isCompleted = useMemo(() => {
        if (!letter.email || !letter.subject || !letter.message) {
            return true
        }
        return false
    })

    return (
        <section className="contact">
            <h2>Contact Form</h2>
            <form id="contact-form">
                <Input
                    type="email"
                    placeholder="E-mail@domain.com"
                    value={letter.email}
                    onChange={(e) => {
                        setLetter({ ...letter, email: e.target.value });
                    }}
                    isRequired={true}
                />

                <Input
                    placeholder="Subject"
                    value={letter.subject}
                    onChange={(e) => {
                        setLetter({ ...letter, subject: e.target.value });
                    }}
                    isRequired={true}
                />

                <Textarea
                    placeholder="Your message"
                    cols={75}
                    rows={10}
                    value={letter.message}
                    onChange={(e) => {
                        setLetter({ ...letter, message: e.target.value });
                    }}
                    isRequired={true}
                />

                <div className="form-button">
                    <Input type="submit" value="Back" onChange={(e) => null} />
                    <Input type="submit" value="Send" onChange={(e) => null} isDisabled={isCompleted}/>
                </div>
            </form>
        </section>
    );
}

export default Contact;
