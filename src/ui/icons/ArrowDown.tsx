export interface Props {
    className:string
}

export default ({className}:Props)=>(
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className = {className}
    >
        <title>arrow-down</title>
        <g>
            <path
                d="M19.707,14.707l-7,7a1,1,0,0,1-1.414,0l-7-7a1,1,0,0,1,1.414-1.414L11,18.586V3a1,1,0,0,1,2,0V18.586l5.293-5.293a1,1,0,0,1,1.414,1.414Z"
            ></path>
        </g>
    </svg>
)
