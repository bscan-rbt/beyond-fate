
export default function Slider(props) {

    return (
        <div class={`w-full max-w-md ${props.class}`}>
            <input type="range" min="1" max="6" value="1" class="range w-full" step="1" name={props.name} />
           
            <div class="flex justify-between mt-1 text-xs mx-2">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
            </div>
        </div>
    )
}