import './sing-up-form.styles.scss'
import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils.js"
import formInput from "../form-input/form-input.component.jsx";
import Button from '../button/button.component';
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};
const SignUpForm = () => {
    const [formFields,
        setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});

        } catch (error) {
            console.log("user creation encounterd an error");
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({
            ...setFormFields,
            [name]: value
        });
    };

    return (
        <div>
            <h2>Don't have an account?</h2>
            <span>Sign up with Email & Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label='DisplayName'
                    tpye='text'
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}/>

                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}/>

                <FormInput
                    label='Password'
                    type='text'
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}/>

                <FormInput
                    label='ConfirmPassword'
                    type='text'
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}/>
                <Button type='submit'>Sign up</Button>
            </form>
        </div>
    )
};

export default SignUpForm;