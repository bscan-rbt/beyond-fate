import { A, useSubmission } from "@solidjs/router";
import PasswordInput from "~/components/input-validation/PasswordInput";
import UserInput from "~/components/input-validation/UserInput";
import { Login } from "~/lib";


export default function LoginPage() {

    const loginAttempt = useSubmission(Login)

    return (
        <div class="flex justify-center h-screen w-screen mx-auto bg-base-300">
            <div
                class="min-h-3/4 min-w-2/3 px-[10rem] bg-base-200 rounded-m shadow-xl shadow-primary/30">
                <form
                    class="flex flex-col mx-auto gap-[1.5rem] items-center mt-[20%] px-[20%]"
                    action={Login}
                    method="post"
                    name="login">
                
                    <h1>Login</h1>
                    <UserInput />
                    <PasswordInput noHint />
                    <Show when={loginAttempt.error} keyed>
                        {(error) => <p class=" label text-red-500">{error.message}</p>}
                    </Show>
                    <div class="mt-3">
                        <button
                            class="btn bg-base-300 btn-md min-w-[8rem] hover:bg-primary"
                            type="submit" name="loginButton">Login</button>
                    </div>
                    <div class="flex w-full flex-col items-center">
                        <A class="link link-primary text-sm mb-[-1rem]" href="/register">Don't have an account? Sign up here</A>
                        <div class="divider" />
                        <A class="link link-primary text-sm mt-[-1rem]" href="/">Reset password...</A>
                    </div>
                </form>
            </div>
        </div>

    )
}
