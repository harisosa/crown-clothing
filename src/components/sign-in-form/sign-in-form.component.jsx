import { useState } from "react"
import { signInWithGooglePopup, createUserDocumentFromAuth, SignInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formField, setFormField] = useState(defaultFormFields);
    const { email, password,  } = formField;

    const resetFormField = () => {
        setFormField(defaultFormFields)
    }

    const singInWithGoogle = async ()=> {

        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
        
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await SignInAuthUserWithEmailAndPassword(email,password);
            console.log(response)
            resetFormField();
        } catch (error) {

            switch(error.code){
                case 'auth/wrong-password' :  alert('incorrect email/password'); break;
                case 'auth/user-not-found' : alert('no user associated with this email');break;
                default: console.log(error);break;
            }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormField({ ...formField, [name]: value })
    }
    return (
        <div className="sign-up-container">
            <h2>Already have account?</h2>
            <span>Sign in with your Email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={singInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm