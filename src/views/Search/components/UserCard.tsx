import classNames from 'classnames';

type User = {
    id: string;
    name: string;
    items: string[];
    address: string;
    pincode: string;
};

type Props = {
    user: User;
    index: number,
    query: string,
    isHighlighed: boolean,
    onMouseEnter: (index: number) => void
};



const UserCard: React.FC<Props> = ({ user, index, query, isHighlighed, onMouseEnter }) => {

    const highlightText = (text: string) => {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <span key={index} className="highlight">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };


    return (
        <div
            key={user.id}
            className={classNames('result-item', {
                'highlighted-item': isHighlighed,
            })}
            onMouseEnter={() => onMouseEnter(index)}
        >
            <div className="item-id">{highlightText(user.id)}</div>
            <div className="name">{highlightText(user.name)}</div>
            {query &&
                user.items.some(subItem =>
                    subItem.toLowerCase().includes(query.toLowerCase())
                ) && <div className="item-found">{`${query} found in items`}</div>}
            <div className="address">{highlightText(user.address)}</div>
        </div>
    )
}

export default UserCard