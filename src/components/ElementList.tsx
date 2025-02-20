import React from 'react';

interface ElementListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

export const ElementList = <T,>({ items, renderItem }: ElementListProps<T>) => {
    return (
        
        <ul className="list bg-base-100 rounded-box shadow-md">
            {items.map((item, index) => (
                <li key={index} className='list-row'>
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    );
};
