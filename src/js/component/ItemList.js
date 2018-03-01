const ItemList = ({items, clickHandler}) => {
    return (
        <div className="items_list">
            <ul onClick={clickHandler}>
              {items.map((item, idx) => <li className="truncate"
                                            key={item.name}
                                            data-index={idx}>{item.name}</li>
              )}
            </ul>
        </div>
    );
};

export default ItemList;