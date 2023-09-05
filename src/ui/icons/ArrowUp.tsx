export interface Props {
    className:string
}

export default ({className}: Props ) =>(
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <title>arrow-up</title>
        <g>
            <path
                d="M19.707,10.707a1,1,0,0,1-1.414,0L13,5.414V21a1,1,0,0,1-2,0V5.414L5.707,10.707A1,1,0,0,1,4.293,9.293l7-7a1,1,0,0,1,1.414,0l7,7A1,1,0,0,1,19.707,10.707Z"
            ></path>
        </g>
    </svg>

)
