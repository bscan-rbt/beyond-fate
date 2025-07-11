import { createSignal } from 'solid-js'
import CardPreview from '~/components/CardPreview'
import ComboBox from '~/components/user-input/ComboBox'
import DiceSelect from '~/components/user-input/DiceSelect'
import Slider from '~/components/user-input/Slider'
import '../styles/DeckBuilder.css'
import { createStore } from 'solid-js/store'


export default function DeckBuilder() {

    const defaultCard = {
        title: "Title",
        desc: "Description",
        apCost: 1,
        origins: {},
        damage: { numberOf: 1, dice: "D6", type: "Slashing" }
    }

    const [cards, setCards] = createStore([])
    const [cardInfo, setCardInfo] = createStore({ ...defaultCard })

    const cardHandler = (e) => {
        e.preventDefault()
        setCards(cards.length, { ...cardInfo })
        setCardInfo(defaultCard)
        console.log(defaultCard.title)
        e.target.reset()
    }

    const handleReset = (e) => {
        e.preventDefault()
        setCards([])
    }

    const customValidity = (e, message) => {
        e.target.setCustomValidity(message)
    }


    return (
        <div class="deck-builder">
            <form class="card-form size-auto " onSubmit={cardHandler}>
                <fieldset class="fieldset w-3/4 bg-base-200 border-base-300 rounded-box border p-4 gap-2 text-xs drop-shadow-md drop-shadow-primary/15 ">
                    <legend class="fieldset-legend text-xl">Card Details</legend>

                    <label class="label">Title</label>
                    <input type="text" class="input input-primary w-full mb-1.5" placeholder="Cool high fantasy name!" name="title" onInput={(e) => setCardInfo("title", e.currentTarget.value)} />

                    <label class="label">Description</label>
                    <textarea
                        placeholder="Description"
                        class="textarea textarea-primary w-full mb-1.5" name="description"
                        onInput={(e) => setCardInfo("desc", e.currentTarget.value)}
                        required
                        onInvalid={(e) => customValidity(e, "Please enter a description for your card!")} />

                    <label class="label">Origins</label>
                    <ComboBox name="origin" items={["1", "2"]} class="mb-1.5" />

                    <label class="label">Action Point Cost</label>
                    <Slider name="ap" class="mb-2.5" />

                    <label class="label">Damage Die</label>
                    <DiceSelect class="mb-1.5" />

                    <label class="label">Damage Type</label>
                    <ComboBox name="origin" items={["1", "2"]} class="mb-1.5" />

                    <button class="btn btn-primary justify-self-center mt-5 w-3xs">Save</button>

                </fieldset>
            </form>
            <div class="preview-window  size-auto inset-shadow-[0px_0px_30px] inset-shadow-primary/35">

                <CardPreview info={cardInfo} class="w-[43%]" />
            </div>
            <div class="toolbar">
                <button class="btn btn-info">Save</button>
                <button class="btn btn-error" onClick={handleReset}>Reset</button>
            </div>
            <div class="card-matrix size-auto">
                <For each={cards}>
                    {(card, index) => (<CardPreview info={card} />)}
                </For>
            </div>

        </div>
    )


}