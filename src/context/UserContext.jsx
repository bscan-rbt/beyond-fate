import { createContext, useContext} from "solid-js";

const UserContext = createContext()

export default UserContext

export function getUserContext(){
    const user = useContext(UserContext)

    return user
}