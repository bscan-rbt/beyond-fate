import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { getUserContext } from "~/context/UserContext";
import '../styles/Navbar.css';
import AccountDropdown from "./AccountDropdown";


export default function Navbar() {
    const navigate = useNavigate()
    const user = getUserContext()

    return (
        <nav class="navbar">
            <button class="btn btn-ghost" onClick={() => { navigate("/") }}>Home</button>
            <button class="btn btn-ghost" onClick={() => { navigate("/compendium") }}>Compendium</button>
            <button class="btn btn-ghost" onClick={() => { navigate("/deckbuilder") }}>Deck Builder</button>
            <button class="btn btn-ghost" onClick={() => { navigate("/about") }}>About</button>
            <Show when={user()} fallback={<LoginButton class="absolute right-3" /> }>
                <AccountDropdown class="absolute right-3" userEmail={user().email} />
            </Show>
        </nav>
    );
}

function LoginButton(props) {
    const navigate = useNavigate()

    return (
        <button class={`btn btn-ghost ${props.class}`} onClick={() => { navigate("/login") }}>
            Login
        </button>
    )
}



