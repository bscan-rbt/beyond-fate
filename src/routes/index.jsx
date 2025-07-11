import { useNavigate } from "@solidjs/router";
import { getUser } from "~/lib";
import '../styles/Home.css';


export const route = {
  preload: () => getUser()
}

export default function Home() {
    const navigate = useNavigate()
    return (
        <div class="header" style={{
            "background-image": `url(${"/herobanner.png"})`
        }}>
            <div class="hero-content flex text-neutral-content text-center max-w-[100dvw]">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">TTRPG Combat Reimagined</h1>
                    <p class="py-6">
                        Combining the best elements of an immersive tabletop RPG with the pristine combat experience of a deck builder. 
                    </p>
                    <button class="btn btn-primary" onClick={() => {navigate("/")}}>Get Started</button>
                </div>
            </div>
        </div>
    );

}
