
export default function DiceSelect(props) {

    return (
        <div class={`flex gap-x-2 ${props.class}`}>
            <input class="input input-primary w-1/6" placeholder="1" />
            <form class="filter">
                <input class="btn btn-square" type="reset" value="×" />
                <input class="btn" type="radio" name="dice" aria-label="D4" />
                <input class="btn" type="radio" name="dice" aria-label="D6" />
                <input class="btn" type="radio" name="dice" aria-label="D8" />
                <input class="btn" type="radio" name="dice" aria-label="D10" />
                <input class="btn" type="radio" name="dice" aria-label="D12" />
            </form>
        </div>
    )
}