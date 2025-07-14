import { A, useAction, useNavigate, useSubmission } from "@solidjs/router";
import { createSignal } from "solid-js";
import PasswordInput from "~/components/input-validation/PasswordInput";
import UserInput from "~/components/input-validation/UserInput";
import { Login } from "~/lib";

export default function LoginPage() {

    // const loginAttempt = useSubmission(Login)
    const [email, setEmail] = createSignal()
    const [password, setPassword] = createSignal()

    const login = useAction(Login)

    return (
        <div class="flex justify-center h-screen w-screen mx-auto bg-base-300">
            <div
                class="min-h-3/4 min-w-2/3 px-[10rem] bg-base-200 rounded-m shadow-xl shadow-primary/30">
                <div
                    class="flex flex-col mx-auto gap-[1.5rem] items-center mt-[20%] px-[20%]"
                    name="login">
                    <input type="hidden" name="form-name" value="login" />
                    
                    <h1 name="loginType" value="login">Login</h1>
                    <UserInput emailSetter={setEmail} />
                    <PasswordInput passwordSetter={setPassword}/>
                    {/* <Show when={loginAttempt.error} keyed>
                        {(error) => <p class=" label text-red-500">{error.message}</p>}
                    </Show> */}
                    <div class="mt-3">
                        <button
                            class="btn bg-base-300 btn-md min-w-[8rem] hover:bg-primary"
                             name="loginButton" onClick={() => login(email(), password())}>Login</button>
                    </div>
                    <div class="flex w-full flex-col items-center">
                        <A class="link link-primary text-sm mb-[-1rem]" href="/register">Don't have an account? Sign up here</A>
                        <div class="divider" />
                        <A class="link link-primary text-sm mt-[-1rem]" href="/">Reset password...</A>
                    </div>
                </div>
            </div>
        </div>

    )
}
