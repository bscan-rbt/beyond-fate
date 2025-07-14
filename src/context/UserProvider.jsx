import { createAsync } from "@solidjs/router";
import UserContext from "./UserContext";
import { getUser } from "~/lib";


export default function UserProvider(props) {

    const user = createAsync(() => getUser())

    return (
        <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    )

}

