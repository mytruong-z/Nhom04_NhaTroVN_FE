function CardItem({src, title, subTitle, btnText, linkBtn = '#'}) {
    return (
        <div className="row border border-secondary p-2 rounded-3 shadow-sm mb-4">
            <div className="col-2 p-0">
                <img src={`/assets/images/rooms/${src}`} width="160"/>
            </div>
            <div className="col-7">
                <h3 className="text-w-dots">{title}</h3>
                <span className="text-h-dots">{subTitle}</span>
            </div>
            <div className="col-3 p-2 d-flex justify-content-end align-items-end">
                <a href={linkBtn} className="btn btn-default text-white" variant="primary">
                    {btnText}
                </a>
            </div>
        </div>
    );
}

export default CardItem;