import ComboBox from "./ComboBox";


export default function MultilineForm() {

    return (

        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend class="fieldset-legend">Card Details</legend>

            <label class="label">Title</label>
            <input type="text" class="input" placeholder="Cool high fantasy name!" name="title" />

            <label class="label">Description</label>
            <textarea placeholder="Description" class="textarea textarea-primary" name="description"></textarea>

            <label class="label">Origins</label>
            <ComboBox title="Origins" ></ComboBox>

            
        </fieldset>

    )
}



