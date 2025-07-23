import { useAction } from "@solidjs/router"
import { Logout } from "~/lib"

export default function AccountDropdown(props) {

    const logout = useAction(Logout)

    return (
        <div class={`dropdown dropdown-hover ${props.class}`}>
            <div tabIndex={0} role="button" class="btn m-1">{props.userEmail}</div>
            <ul tabIndex={0} class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a>My Account</a></li>
                <li><a onClick={logout}>Logout</a></li>
            </ul>
        </div>
    )
}