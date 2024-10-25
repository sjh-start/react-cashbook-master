import '@/assets/icon/iconfont.js'
export default function Index(props) {
    return (
        <svg   className="icon" aria-hidden="true">
            <use  xlinkHref={`#${props.type}`} />
            <style     jsx>{`
		.icon {
	 
       		width: 20px; height: 20px;
       		vertical-align: -0.15em;
       		fill: currentColor;
       		overflow: hidden;
       	}
	  `}</style>
        </svg>
    )
}

