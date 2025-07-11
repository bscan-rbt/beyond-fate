

export default function CardPreview(props) {

    const cardInfo = props.info

    return (
        <div class={`relative ${props.class}`}>
            <img src="./card-template.png" class="w-full" />
            <div class="absolute bottom-[39.5%] left-1/2 -translate-x-1/2 text-md text-black font-medium ">
                {cardInfo.title}
            </div>
            <div class="absolute top-[70.5%] left-1/2 -translate-x-1/2 text-xs text-black w-3/4 wrap-anywhere">
                {cardInfo.desc}
            </div>
        </div>

    )
}