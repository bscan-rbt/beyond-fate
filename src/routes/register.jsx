import { A } from "@solidjs/router";
import PasswordInput from "~/components/input-validation/PasswordInput";
import UserInput from "~/components/input-validation/UserInput";
import { Register } from "~/lib";



export default function RegisterPage() {



    return (
        <div class="flex justify-center h-screen w-screen mx-auto bg-base-300">
            <div class="min-h-3/4 min-w-2/3 px-[10rem] bg-base-200 rounded-m shadow-xl shadow-primary/30">
                <form class="flex flex-col mx-auto gap-[1.5rem] items-center mt-[20%]" action={Register} method="post">
                    <h1 name="loginType" value="register">Register</h1>
                    <input class="input w-full" type="text" placeholder="Name" name="name" />
                    <UserInput  />
                    <PasswordInput  />
                    <div class="mt-3"><button class="btn bg-base-300 btn-md min-w-[8rem] hover:bg-primary" type="submit">Register</button></div>
                    <div class="flex w-full flex-col items-center">
                        <div class="divider" />
                        <A class="link link-primary text-sm mb-[-1rem]" href="/login">Already have an account? Sign in here...</A>
                    </div>
                </form>
            </div>
        </div>

    )
}

