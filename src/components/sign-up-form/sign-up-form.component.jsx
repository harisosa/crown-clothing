import {  useState } from "react"
import { CreateAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formField, setFormField] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formField;
    

    const resetFormField = () => {
        setFormField(defaultFormFields)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match")
            return;
        }
        try {
            const { user } = await CreateAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName: displayName });
            resetFormField();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user,email already in use')
            } else {
                console.log('user creation encountered an error', error)
            }

        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormField({ ...formField, [name]: value })
    }
    return (
        <div className="sign-up-container">
            <h2>Don't have account?</h2>
            <span>Sign up with your Email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name'
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />

                <FormInput label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <FormInput label='Confirmation Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />
                <Button type='submit'>Sign Up </Button>
            </form>
        </div>
    )
}

export default SignUpForm