import { For } from "solid-js";

export default function ComboBox(props) {

    return (
        <fieldset class={`fieldset w-full ${props.class}`}>
            <select defaultValue={props.default} class="select w-full" name={props.name}>
                <option disabled={true}>{props.default}</option>
                <For each={props.items}>
                    {(item, index) => <option>{item}</option>}
                </For>
            </select>
        </fieldset>
    )
}