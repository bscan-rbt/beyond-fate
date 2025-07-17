import { useNavigate } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import '../styles/Home.css';
import { LoadArticle } from "~/lib";


export default function Home() {
    const navigate = useNavigate()
    const [currentNews] = createResource(() => LoadArticle('./public/compendium/Core Gameplay/Summary.md'))

    return (
        <>
            <div class="header" style={{
                "background-image": `url(${"/herobanner.webp"})`
            }}>
                <div class="hero-content flex text-neutral-content text-center max-w-[100dvw]">
                    <div class="max-w-md">
                        <h1 class="text-5xl font-bold">TTRPG Combat Reimagined</h1>
                        <p class="py-6">
                            Combining the best elements of an immersive tabletop RPG with the pristine combat experience of a deck builder.
                        </p>
                        <button class="btn btn-primary" onClick={() => navigate('/login')}>Get Started</button>
                    </div>
                </div>
            </div>

            <Show when={currentNews()}>
                <div class="prose prose-lg max-w-3/4 mx-auto p-3" innerHTML={currentNews()} />
            </Show>

        </>
    );

}
